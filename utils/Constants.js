const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_FOUND = 404;
const STATUS_FATAL = 500;
const STATUS_AUTH = 401;
const STATUS_CONFLICT = 409;
const STATUS_FORBIDDEN = 403;

const MESSAGE_ERROR_AUTH = 'Требуется авторизация';
const MESSAGE_ERROR_FATAL = 'Ошибка сервера';
const MESSAGE_ERROR_NOT_FOUND = 'Страница не найдена';

const MESSAGE_ERROR_INVALID = 'Некорректные данные';
const MESSAGE_ERROR_WRONG_DELETE = 'Некорректные данные для удаления';
const MESSAGE_ERROR_WRONG_ID = 'Неверный формат идентификатора';

const MESSAGE_ERROR_NOT_FOUND_USER = 'Пользователей не найдено';
const MESSAGE_ERRIR_USER_EXISTS = 'Пользователь уже существует';

const MESSAGE_ERROR_WRONG_URL = 'Неккоректные данные ссылки';
const MESSAGE_ERROR_WRONG_EMAIL = 'Некорректные данные почты';
const MESSAGE_ERROR_AUTH_WRONG_DATA = 'Некорректные данные почты или пароля';

module.exports = {
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_FATAL,
  STATUS_AUTH,
  STATUS_CONFLICT,
  STATUS_FORBIDDEN,
  MESSAGE_ERROR_AUTH,
  MESSAGE_ERROR_FATAL,
  MESSAGE_ERROR_NOT_FOUND,
  MESSAGE_ERROR_INVALID,
  MESSAGE_ERROR_WRONG_DELETE,
  MESSAGE_ERROR_WRONG_ID,
  MESSAGE_ERROR_NOT_FOUND_USER,
  MESSAGE_ERRIR_USER_EXISTS,
  MESSAGE_ERROR_AUTH_WRONG_DATA,
  MESSAGE_ERROR_WRONG_URL,
  MESSAGE_ERROR_WRONG_EMAIL,
};
