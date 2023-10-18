const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Определение модели
const fileSchema = new Schema({
  data: Buffer, // Поле для хранения бинарных данных
  contentType: String, // Тип содержимого (например, image/png)
});

// Создание модели
const FileModel = mongoose.model("File", fileSchema);

module.exports = FileModel;
