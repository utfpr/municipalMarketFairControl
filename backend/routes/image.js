const express = require('express');

const multer = require('multer');

const url = require('url');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const extArray = file.mimetype.split('/');
    const extension = extArray[extArray.length - 1];
    cb(null, `${Date.now()}.${extension}`);
  },
});
const upload = multer({ storage });

// const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/upload', upload.single('photo'), (req, res) => {
  if (req.file) {
    res.json(req.file);
  }
});


router.get('/:filename', (req, res) => {
  const request = url.parse(req.url, true);
  const filename = request.pathname;
  const filePath = `./uploads${filename}`;
  fs.exists(filePath, (exists) => {
    if (!exists) {
      // 404 missing files
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const img = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.end(img, 'binary');
  });
});


module.exports = router;
