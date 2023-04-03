import { Notification } from './Notification.js';
import { NotificationView } from './NotificationView.js';

export default class NotificationService {
  static allServices = new Set()

  types = {
    ERROR: 'error',
    MESSAGE: 'message',
    SUCCESS: 'success',
    WARNING: 'warning',
    LOADING: 'loading'
  }

  collection = new Map()
  view = new NotificationView(this);
  MSG_TIMEOUT = 5000
  MSG_LONG_TIMEOUT = 30000

  constructor(id, view) {
    NotificationService.allServices.add(this);

    this.container = document.getElementById(id);
    this.container.classList.add('notificationContainer');
  }

  _log(message, type) {
    if (message) {
      const notification = new Notification(this, message, type);
      this.collection.set(notification.id, notification);
    }
  }

  error(message) {
    this._log(message, this.types.ERROR);
  }

  message(message) {
    this._log(message, this.types.MESSAGE);
  }

  success(message) {
    this._log(message, this.types.SUCCESS);
  }

  warning(message) {
    this._log(message, this.types.WARNING);
  }

  loading(message) {
    this._log(message, this.types.LOADING);
  }

  add(notification) {
    let element = this.view.getElement(notification) ?? this.view[`get${notification.type[0].toUpperCase() + notification.type.slice(1)}`](notification);

    this.container.insertAdjacentElement('afterbegin', element);

    return element;
  }
}