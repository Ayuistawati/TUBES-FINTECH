const mongoose = require('mongoose');

const lokasiLahanSchema = new mongoose.Schema({
  provinsi: { type: String, required: true },
  kabupaten: { type: String, required: true },
  kecamatan: { type: String, required: true },
  detail_alamat: { type: String, required: true }
}, { _id: false });

const premiSchema = new mongoose.Schema({
  petani: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Petani',
    required: true
  },
  lokasi_lahan: {
    type: lokasiLahanSchema,
    required: true
  },
  luas_panen: {
    type: Number,
    required: true
  },
  produktivitas: {
    type: Number,
    required: true
  },
  produksi: {
    type: Number,
    required: true
  },
  riwayat_gagal_panen: {
    type: Number,
    required: true
  },
  nilai_panen: {
    type: Number,
    required: true
  },
  tarif_premi: {
    type: Number,
    required: true
  },
  premi_dibayar: {
    type: Number,
    required: true
  },
  tingkat_kerusakan: {
    type: Number,
    default: null
  },
  klaim: {
    type: Number,
    default: 0
  },
  foto_lahan: {
    type: String,  
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Premi', premiSchema);
