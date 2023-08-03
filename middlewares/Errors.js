// Подключаем константу MESSAGE_ERROR_FATAL из файла ../utils/Constants
const { MESSAGE_ERROR_FATAL } = require('../utils/Constants');

// Экспортируем функцию для обработки ошибок
module.exports = (err, req, res) => {
  // Извлекаем statusCode и message из объекта ошибки
  const { statusCode = 500, message } = err;

  // Отправляем ответ с соответствующим статусом и сообщением
  res.status(statusCode).send({
    message: statusCode === 500 ? MESSAGE_ERROR_FATAL : message,
  });
};
