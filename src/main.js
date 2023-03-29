import './index.css';

import NotificationService from './NotificationService';

const notice = new NotificationService('app');

document.forms.newNotification.addEventListener('submit', (event) => {
  event.preventDefault();
  notice.message(event.currentTarget.message.value);
});