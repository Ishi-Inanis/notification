export class NotificationView {
  icons = {
    message: '/message.svg',
    error: '/error.svg',
    loading: '/loading.svg',
    success: '/success.svg',
    warning: '/warning.svg'
  }

  constructor(service) {
    this.service = service;
  }

  getElement(notification) {
    const classes = ['flex', 'border-2', 'justify-between', 'gap-5', 'shadow', 'bg-neutral-50', 'dark:bg-neutral-800', 'text-neutral-900', 'dark:text-neutral-50', 'min-w-[288px]', 'max-w-sm', 'rounded-2xl', 'p-4', 'relative', 'z-10', 'duration-300'],
        element = document.createElement('article'),
        borderColors = {
          message: 'border-blue-600',
          error: 'border-red-600',
          loading: 'border-neutral-700',
          success: 'border-green-500',
          warning: 'border-amber-500'
        };

    classes.push(borderColors[notification.type]);

    element.classList.add(...classes);
    element.classList.add('animationOpen');
    element.innerHTML = `
      <div class="flex items-center gap-5">
        <img src="${this.icons[notification.type]}" alt="${notification.type}" draggable="false">
        <p>${notification.message}</p>
      </div>
      <button><img src="/close.svg" alt="close" draggable="false"></button>
    `;

    element.querySelector('button').addEventListener('click', notification.close.bind(notification));

    return element;
  }

  getError(notification) {}

  getMessage(notification) {}

  getSuccess(notification) {}

  getWarning(notification) {}

  getLoading(notification) {}

  startCloseAnimation(notification) {
    const height = notification.element.getBoundingClientRect().height;

    new Promise(resolve => {
      notification.element.style.marginBottom = `${-height}px`;
      notification.element.classList.add('animationClosing');

      setTimeout(() => {
        resolve();
      }, 300);
    }).then(() => {
      notification.element.remove();
      this.service.collection.delete(notification.id);
    });
  }
}