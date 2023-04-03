import './index.css';

import NotificationService from './NotificationService';

const notice = new NotificationService('app'),
    button = document.createElement('button');

button.classList.add('border', 'border-neutral-200', 'px-2', 'py-1', 'rounded', 'shadow', 'm-4', 'bg-neutral-50', 'text-neutral-900', 'hover:bg-neutral-100', 'duration-100');
button.textContent = 'Add';
button.addEventListener('click', () => {
  const randomTimeout = (min, max) => Math.floor(Math.random() * (max - min) + min),
      show = (functions, text) => {
        if (!functions.length) return;
        new Promise(resolve => setTimeout(() => {
          notice[functions.shift()](text);
          resolve();
        }, randomTimeout(300, 1000))).then(() => show(functions, text));
      };

  show(['error', 'warning', 'message', 'loading', 'success'], "Hello, I'm test message");
});

document.body.insertAdjacentElement('afterbegin', button);