const notice = new NotificationService('container');

document.forms.newNotification.addEventListener('submit', (event) => {
  event.preventDefault();
  notice.message(event.currentTarget.message.value);
});