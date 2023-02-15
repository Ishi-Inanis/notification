import './style.css';
import { Alert } from './alert';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <button id="add">Add</button>
  <div data-alert-container></div>
`;

Alert.init();

document.querySelector('#add')?.addEventListener('click', () => new Alert('hello world'));

console.log(new Alert('Hello'));
console.log(Alert.collection);