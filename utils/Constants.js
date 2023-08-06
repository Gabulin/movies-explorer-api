const {
  constants: {
    HTTP_STATUS_INTERNAL_SERVER_ERROR,
    HTTP_STATUS_UNAUTHORIZED,
    HTTP_STATUS_BAD_REQUEST,
    HTTP_STATUS_FORBIDDEN,
    HTTP_STATUS_NOT_FOUND,
    HTTP_STATUS_CONFLICT,
    HTTP_STATUS_CREATED,
    HTTP_STATUS_OK,
  },
} = require('http2');

const REGEXP = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const MONGODB_CONFLICT = 11000;

const MESSAGE_ERROR_AUTH_REQUIRED = 'Требуется авторизация';
const MESSAGE_ERROR_AUTH_WRONG_DATA = 'Некорректные данные почты или пароля';

const MESSAGE_ERROR_NOT_FOUND = 'Страница не найдена';
const MESSAGE_ERROR_INVALID = 'Некорректные данные';
const MESSAGE_ERROR_FATAL = 'Ошибка сервера';

const MESSAGE_ERROR_WRONG_DELETE = 'Некорректные данные для удаления';
const MESSAGE_ERROR_WRONG_ID = 'Неверный формат идентификатора';

const MESSAGE_ERROR_NOT_FOUND_USER = 'Пользователей не найдено';
const MESSAGE_ERRIR_USER_EXISTS = 'Пользователь уже существует';

const MESSAGE_ERROR_WRONG_EMAIL = 'Некорректные данные почты';
const MESSAGE_ERROR_WRONG_URL = 'Неккоректные данные ссылки';

const MESSAGE_VIDEO_DELETED = 'Видео успешно удалено';
const MESSAGE_LOGOUT = 'Сессия завершена';

module.exports = {
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_CONFLICT,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
  MONGODB_CONFLICT,
  MESSAGE_VIDEO_DELETED,
  MESSAGE_LOGOUT,
  MESSAGE_ERROR_AUTH_REQUIRED,
  MESSAGE_ERROR_AUTH_WRONG_DATA,
  MESSAGE_ERRIR_USER_EXISTS,
  MESSAGE_ERROR_FATAL,
  MESSAGE_ERROR_INVALID,
  MESSAGE_ERROR_WRONG_ID,
  MESSAGE_ERROR_WRONG_URL,
  MESSAGE_ERROR_WRONG_EMAIL,
  MESSAGE_ERROR_WRONG_DELETE,
  MESSAGE_ERROR_NOT_FOUND,
  MESSAGE_ERROR_NOT_FOUND_USER,
  REGEXP,
};
