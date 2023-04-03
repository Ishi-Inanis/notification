export class Notification {
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
    this.service.view.startCloseAnimation(this);
  }
}