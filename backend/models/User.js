const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nama: String,
  email: { type: String, unique: true },
  no_telepon: String,
  foto_ktp: String,
  provinsi: String,
  kabupaten: String,
  kecamatan: String,
  alamat_lengkap: String,
  password: String
});

module.exports = mongoose.model('User', userSchema);
