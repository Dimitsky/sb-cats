import App from './modules/events.js';
import API from './modules/api.js';
import Render from './modules/render.js';
import Modal from './modules/modal.js';

const login = 'dimitsky';
const $catsNode = document.querySelector('[data-cats-node]');
const api = new API(login);
const render = new Render($catsNode);
const modal = new Modal();
const app = new App(api, render, modal);

api.getAllCats()
    .then(arr => render.showAllCats(arr, $catsNode))
    .catch(error => alert('[api.getAllCats()] ' + error))