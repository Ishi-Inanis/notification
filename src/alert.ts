export enum AlertType {
    ERROR = "error",
    MESSAGE = "message",
    SUCCESS = "success",
    WARNING = "warning",
    LOADING = "loading",
}

export class Alert {
    static MSG_TIMEOUT = 5000;
    static MSG_LONG_TIMEOUT = 30000;
    static collection: Set<Alert> = new Set();
    static type = AlertType;
    static containerNode: HTMLElement;
    type: AlertType = Alert.type.MESSAGE;
    message: string;
    node: HTMLElement;
    timeout: number = 0;

    static init(name: string = '') {
        this.containerNode = document.querySelector(`[data-alert-container${name ? `="${name}"` : ''}]`);

        if (this.containerNode) {
            this.containerNode.classList.add('alertContainer');
        }
    }

    constructor(message: string, type?: AlertType, timeout?: number) {
        this.message = message;
        if (type) this.type = type;
        if (timeout) this.timeout = timeout;

        this._nodeInit();

        Alert.containerNode?.insertAdjacentElement('afterbegin', this.node);
        Alert.collection.add(this);
    }

    _nodeInit() {
        this.node = document.createElement('button');
        this.node.id = 'alert';
        this.node.classList.add('alert', 'alertInContainer', 'animationOpen');
        this.node.insertAdjacentHTML('beforeend', `<span class="caption">hello world</span>`);
        this.node.addEventListener('click', this._startCloseAnimation);
    }

// FIXME: Why `this` is an HTMLElement and not an Alert
    _startCloseAnimation() {
        const height = this.getBoundingClientRect().height;
        new Promise<void>((resolve) => {
            this.style.marginBottom = `${-height}px`;
            // node.style.zIndex--;
            this.classList.add('animationClosing');
            setTimeout(() => {
                resolve();
            }, 300);
        }).then(() => this.remove());
    }
}