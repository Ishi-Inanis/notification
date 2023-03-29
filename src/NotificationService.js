class NotificationService {
  static allServices = new Set()

  types = {
    ERROR: 'error',
    MESSAGE: 'message',
    SUCCESS: 'success',
    WARNING: 'warning',
    LOADING: 'loading'
  }

  collection = new Map()
  lastKey = 0
  MSG_TIMEOUT = 5000
  MSG_LONG_TIMEOUT = 30000

  Notification = class {
    constructor(service, message, type = service.types.MESSAGE, timeout = service.MSG_TIMEOUT) {
      service.lastId = Date.now();

      this.service = service;
      this.id = service.lastId;
      this.message = message;
      this.type = type;
      this.element = service.add(this);

      setTimeout(() => this.close(), timeout);
    }

    close() {
      this.service.startCloseAnimation(this.element);
    }
  }

  constructor(id) {
    NotificationService.allServices.add(this);

    this.container = document.getElementById(id);
    this.container.classList.add('notificationContainer');
  }

  _log(message, type) {
    if (message) {
      const notification = new this.Notification(this, message, type);
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
    const container = document.getElementById('container'),
        button = document.createElement('button');

    button.id = `notification-${NotificationService.allServices.size}-${notification.id}`;
    button.classList.add('notification', 'notificationInContainer', 'animationOpen');
    button.innerHTML = `<span class="caption">${notification.message}</span>`;
    button.addEventListener('click', notification.close.bind(notification));

    container.insertAdjacentElement('afterbegin', button);

    return button;
  }

  startCloseAnimation(node) {
    const height = node.getBoundingClientRect().height;

    new Promise(resolve => {
      node.style.marginBottom = `${-height}px`;
      node.classList.add('animationClosing');

      setTimeout(() => {
        resolve();
      }, 300);
    }).then(() => {
      node.remove();
    });
  }

  removeLastNotification = () => {
    this.collection.get(this.lastKey).close();
    this.collection.delete(this.lastKey);
  }
  showMessage = () => {
    // this.lastKey = notification.message('This is just a message', MSG_TIMEOUT);
  }
}