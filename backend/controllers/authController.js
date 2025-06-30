const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const {
      nama, email, no_telepon, provinsi, kabupaten,
      kecamatan, alamat_lengkap, password, konfirmasi_password
    } = req.body;

    if (password !== konfirmasi_password) {
      return res.status(400).json({ message: 'Password tidak sama' });
    }

    const userLama = await User.findOne({ email });
    if (userLama) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const foto_ktp = req.file?.path;

    const newUser = await User.create({
      nama,
      email,
      no_telepon,
      provinsi,
      kabupaten,
      kecamatan,
      alamat_lengkap,
      password: hashedPassword,
      foto_ktp
    });

    res.status(201).json({ message: 'Registrasi berhasil', data: newUser });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Gagal registrasi' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email tidak ditemukan' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Password salah' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(200).json({ message: 'Login berhasil', token, user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Gagal login' });
  }
};

module.exports = { register, login };
