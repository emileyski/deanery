const multer = require("multer");
// Устанавливаем хранилище для multer (можете выбрать другое в зависимости от ваших требований)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;
