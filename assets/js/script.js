import API from './modules/api.js';
import { modal } from './modules/modal.js';
import { rawElems } from './modules/rawElems.js';
import Validator from './modules/validator.js';
import LStorage from './modules/lstorage.js';
import { $catsNode } from './modules/nodes.js';

const login = 'dimitsky';
const api = new API(login);

class App {
    constructor() {
        document.body.addEventListener('click', this._handler.bind(this));
    }

    add(target) {
        this.formName = 'cat_add';
        this.formMethod = 'POST';
        
        modal.insertContentHTML(rawElems.getForm(this.formName, this.formMethod));
        modal.addListener('modal-open', e => {
            this.validator = new Validator(document.forms[this.formName]);
            this.ls = new LStorage(document.forms[this.formName]);
        });
        modal.addListener('modal-close', e => {
            this.validator.removeListeners();
            this.validator = null;
            this.ls.removeListeners();
            this.ls = null;
        });
        modal.addListener('click', this._formSubmitHandler.bind(this), {}, document.forms[this.formName].submit);
        modal.open();
    }

    delete(target) {
        target.setAttribute('disabled', '');

        const $cat = target.closest('[data-cat-id]');
        const id = $cat.dataset.catId;

        api.deleteCat(id)
            .then(() => {
                $cat.remove();
            })
            .catch(error => {
                target.removeAttribute('disabled');
                alert(error)
            });
    }
    
    info(target) {
        target.setAttribute('disabled', '');

        const $localCat = target.closest('[data-cat-id]');
        const $localCatImg = $localCat.querySelector('[data-cat-img]');
        const $localCatDescription = $localCat.querySelector('[data-cat-description]');
        const id = $localCat.dataset.catId;

        api.getAllCats()
            .then(dataArr => {
                target.removeAttribute('disabled');

                const data = dataArr.find(data => data.id == id);

                // Обновить данные при необходимости
                if ($localCatImg.src != data.img_link) {
                    $localCatImg.src = data.img_link;
                }

                if ($localCatImg.alt != data.description) {
                    $localCatImg.alt = data.description;
                }

                if ($localCatDescription != data.description ) {
                    $localCatDescription.innerText = data.description;
                }

                const raw = rawElems.getInfoCard(data);

                modal.insertContentHTML(raw);
                modal.open();
            })
            .catch(error => {
                target.removeAttribute('disabled');
            })
    }

    edit(target) {
        const $cat = target.closest('[data-cat-id]');
        const id = $cat.dataset.catId;
        
        api.getAllCats()
            .then(dataArr => {
                this.formName = 'edit_cat';
                this.formMethod = 'PUT';

                const data = dataArr.find(data => data.id == id);
                const rawForm = rawElems.getForm(this.formName, this.formMethod, data);

                modal.close();
                modal.insertContentHTML(rawForm);
                modal.addListener('modal-open', e => {
                    this.validator = new Validator(document.forms[this.formName]);
                    document.forms[this.formName].elements.id.setAttribute('disabled', '');
                    document.forms[this.formName].elements.name.setAttribute('disabled', '');
                });
                modal.addListener('modal-close', e => {
                    this.validator.removeListeners();
                    this.validator = null;
                    this.formName = null;
                    this.formMethod = null;
                })
                modal.addListener('modal-close-end', e => {
                    modal.addListener('click', e => {
                        e.preventDefault();
                        e.target.setAttribute('disabled', '');
    
                        if (this.validator && !this.validator.check()) {
                            e.target.removeAttribute('disabled');
                            return;
                        };
    
                        api.editCat(document.forms[this.formName])
                            .then(data => {
                                modal.close();
                                const $cat = document.querySelector(`[data-cat-id="${data.id}"]`);
                                const $catImg = $cat.querySelector('[data-cat-img]');
                                const $catDescription = $cat.querySelector('[data-cat-description]');
    
                                // Обновить данные при необходимости
                                if ($catImg.src != data.img_link) {
                                    $catImg.src = data.img_link;
                                }
    
                                if ($catImg.alt != data.description) {
                                    $catImg.alt = data.description;
                                }
    
                                if ($catDescription != data.description) {
                                    $catDescription.innerText = data.description;
                                }
                            })
                    }, {}, document.forms[this.formName].elements.submit);
                })
                modal.open();
            })
    }

    showCat(data, node) {
        let raw = rawElems.getCard(data);

        node.insertAdjacentHTML('beforeend', raw);
    }

    _handler(event) {
        let action = event.target.dataset.action;
    
        if (action && this[action]) {
            this[action](event.target);
        }
    }

    _submitFormHandler(event) {
        event.preventDefault();
        
        if (!this.validator.check()) return;

        api.addCat()
            .then(data => {
                modal.closeModal();
                this.showCat(data);
            })
    }

    _formSubmitHandler(e) {
        e.preventDefault();

        if (this.validator && !this.validator.check()) return;

        e.target.setAttribute('disabled', '');
        api.addCat(document.forms[this.formName])
            .then(data => {
                this.showCat(data, $catsNode);
                modal.close();
                localStorage.removeItem(this.formName);
                this.formName = null;
            })
            .catch(error => {
                e.target.removeAttribute('disabled');
                alert(error);
            })
    }
}

api.getAllCats()
    .then(dataArr => {
        dataArr.forEach(data => app.showCat(data, $catsNode));
    })
    .catch(error => alert(error))

const app = new App();