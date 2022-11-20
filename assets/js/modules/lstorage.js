/*

Данный класс управляет localStorage. LS настроен для работы с формой. 

*/

export default class LStorage {
    constructor($form) {
        this.form = $form;
        this.ls = JSON.parse(localStorage.getItem(this.form.getAttribute('name'))) || {};

        for (let key in this.ls) {
            let $formElem = this.form.elements[key];

            if ($formElem.type === 'checkbox') {
                $formElem.checked = this.ls[key];
            } else {
                $formElem.value = this.ls[key];
            }
        }

        this.form.addEventListener('input', this._handler.bind(this));
    }

    removeListeners() {
        this.form.removeEventListener('input', this._handler.bind(this));
    }

    _handler(e) {
        if (e.target.type === 'checkbox') {
            this.ls[e.target.name] = e.target.checked;
        } else {
            this.ls[e.target.name] = e.target.value;
        }
        
        localStorage.setItem(String(this.form.getAttribute('name')), JSON.stringify(this.ls));
    }
}