const axios = require('axios');
const Premi = require('../models/Premi');

const formatRupiah = (angka) => {
  return 'Rp ' + Number(angka).toLocaleString('id-ID');
};

// ========== HITUNG PREMI ==========
const hitungPremi = async (req, res) => {
  try {
    const {
      petani_id,
      provinsi,
      kabupaten,
      kecamatan,
      detail_alamat,
      luas_panen,
      produktivitas,
      produksi,
      riwayat_gagal_panen,
      nilai_panen
    } = req.body;

    if (!petani_id || !provinsi || !kabupaten || !kecamatan || !detail_alamat ||
        luas_panen == null || produktivitas == null || produksi == null ||
        riwayat_gagal_panen == null || nilai_panen == null) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    const response = await axios.post(`${process.env.FLASK_API_URL}`, {
      Provinsi: provinsi,
      'Luas Panen (ha)': luas_panen,
      'Produktivitas (ku/ha)': produktivitas,
      'Produksi (ton)': produksi,
      riwayat_gagal_panen
    });

    const { tarif_premi } = response.data; 

    const premi_dibayar = nilai_panen * tarif_premi;

    const newPremi = await Premi.create({
      petani: petani_id,
      lokasi_lahan: {
        provinsi,
        kabupaten,
        kecamatan,
        detail_alamat
      },
      luas_panen,
      produktivitas,
      produksi,
      riwayat_gagal_panen,
      nilai_panen,
      tarif_premi,
      premi_dibayar,
      klaim: 0
    });

    res.status(201).json({
      message: ' Premi berhasil dihitung & disimpan.',
      data: {
        id: newPremi._id,
        petani: petani_id,
        tarif_premi: `${(tarif_premi * 100).toFixed(2)}%`,
        nilai_panen: formatRupiah(nilai_panen),
        premi_dibayar: formatRupiah(premi_dibayar)
      }
    });

  } catch (error) {
    console.error('❌ Error hitung premi:', error.message);
    res.status(500).json({ message: 'Gagal menghitung premi' });
  }
};

// ========== KLAIM PREMI ==========
const klaimPremi = async (req, res) => {
  try {
    const { id } = req.params;
    const { tingkat_kerusakan } = req.body;
    const fotoLahanPath = req.file ? req.file.path : null;

    if (tingkat_kerusakan == null) {
      return res.status(400).json({ message: 'Tingkat kerusakan wajib diisi' });
    }

    const premi = await Premi.findById(id);
    if (!premi) {
      return res.status(404).json({ message: 'Data premi tidak ditemukan' });
    }

    let klaim = 0;
    const persen = parseFloat(tingkat_kerusakan);

    if (persen >= 75) {
      klaim = premi.nilai_panen;
    } else if (persen >= 50) {
      klaim = premi.nilai_panen * 0.5;
    } else {
      klaim = 0;
    }

    premi.tingkat_kerusakan = persen;
    premi.klaim = klaim;
    if (fotoLahanPath) {
      premi.foto_lahan = fotoLahanPath;
    }

    await premi.save();

    res.status(200).json({
      message: '✅ Klaim berhasil dihitung',
      data: {
        premi_id: premi._id,
        tingkat_kerusakan: `${persen}%`,
        klaim: formatRupiah(klaim),
        foto_lahan: fotoLahanPath || 'Belum ada foto'
      }
    });

  } catch (error) {
    console.error('❌ Error klaim premi:', error.message);
    res.status(500).json({ message: 'Gagal menghitung klaim' });
  }
};


module.exports = {
  hitungPremi,
  klaimPremi
};
