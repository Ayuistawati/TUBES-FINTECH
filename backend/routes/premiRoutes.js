const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { hitungPremi, klaimPremi } = require('../controllers/premiController');

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/foto_lahan'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'lahan-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Rute API
router.post('/hitung', hitungPremi);
router.post('/klaim/:id', upload.single('foto_lahan'), klaimPremi);

module.exports = router;
