const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, err) => err(null, `${__dirname}/../uploads`),
  filename: (req, file, err) => err(null, `${req.params.id}.png`),
});

const upload = multer({ storage });

module.exports = upload.single('image');