/* 



*/

import Validator from './validator.js';
import Form from './form.js';

export default class Events {
    constructor(api, render, modal) {
        this.api = api;
        this.render = render;
        this.modal = modal;
        document.body.addEventListener('click', this.handler.bind(this));
    }

    getLocalCatData($card) {
        return {
            id: $card.dataset.catId, 
            age: $card.dataset.catAge, 
            name: $card.dataset.catName, 
            rate: $card.dataset.catRate, 
            description: $card.dataset.catDescription, 
            favourite: $card.dataset.catFavourite === 'true' ? true : false,
            img_link: $card.dataset.catImg_link, 
        }
    }

    add(target) {
        this.modal.show(
            'Add a new cat', 
            null, 
            null
        );

        this.addForm = new Form('add_cat', 'POST', document.querySelector('[data-modal-body]'));
        this.validator = new Validator(this.addForm.form);
        this.addForm.addEvent('click', event => {
            event.preventDefault();

            if (!this.validator.check()) return; 

            this.api.addCat(this.addForm.form)
                .then(data => {
                    localStorage.removeItem(this.addForm.name);
                    this.addForm.clear();
                    this.closeModal();
                    this.render.showCat(data, document.querySelector('[data-cats-node]'));
                })
                .catch(error => alert(error));
        }, 'submit');
    }

    info(target) {
        this.api.getAllCats()
            .then(dataArr => {
                let id = target.closest('[data-cat-id]').dataset.catId;
                let data = dataArr.find(data => data.id == id);

                this.modal.show(
                    'Cat info', 
                    null, 
                    '<button type="button" class="btn btn-primary" data-action="edit">Edit</button>');
                this.render.showInfoCat(data, document.querySelector('[data-modal-body]'));
            })
            .catch(error => alert(error))
    }

    delete(target) {
        let $cat = target.closest('[data-cat-id]');
        let id = +$cat.dataset.catId;

        // Защищает от повторного нажатия (например, при медленной сети)
        target.setAttribute('disabled', '');

        this.api.deleteCat(id)
            .then(() => {
                $cat.remove();
            })
            .catch(error => {
                alert(error);
                target.removeAttribute('disabled');
            })
    }

    edit(target) {
        // Защищает от повторного нажатия (например, при медленной сети)
        target.setAttribute('disabled', '');
        
        this.api.getAllCats()
            .then(dataArr => {
                    let id = target.closest('[data-modal]').querySelector('[data-cat-id]').dataset.catId;
                    let data = dataArr.find(data => data.id == id);
                    
                    this.modal.close();
                    this.modal.show(
                        'Edit the cat', 
                        null, 
                        null
                        // '<button type="button" class="btn btn-primary" data-action="submit" form="edit_cat">Submit</button>'
                    );

                    this.editForm = new Form('edit_cat', 'PUT', document.querySelector('[data-modal-body]'));
                    this.validator = new Validator(this.editForm.form);

                    this.editForm.elements.id.value = data.id;
                    this.editForm.elements.id.setAttribute('disabled', '');
                    this.editForm.elements.age.value = data.age;
                    this.editForm.elements.name.value = data.name;
                    this.editForm.elements.name.setAttribute('disabled', '');
                    this.editForm.elements.rate.value = data.rate;
                    this.editForm.elements.description.innerText = data.description;
                    this.editForm.elements.favourite.checked = data.favourite;
                    this.editForm.elements.img_link.value = data.img_link;
                    
                    this.editForm.addEvent('click', event => {
                        event.preventDefault();
            
                        if (!this.validator.check()) return; 
            
                        this.api.editCat(this.editForm)
                            .then(data => {           
                                this.validator.remove();
                                this.editForm.clear();
                                this.closeModal();

                                let $catImg = document.querySelector(`[data-cat-id="${data.id}"] [data-cat-img]`);
                                let $catDescription = document.querySelector(`[data-cat-id="${data.id}"] [data-cat-description]`);

                                $catImg.src = data.img_link;
                                $catImg.alt = data.description;
                                $catDescription.innerText = data.description;
                            })
                            .catch(error => alert(error));
                    }, 'submit');
                })
            .catch(error => alert(error))
    }

    fill(target) {
        let $form = document.forms[0];

        $form.elements.id.value = 100;
        $form.elements.name.value = 'Царапка';
        $form.elements.age.value = 5;
        $form.elements.rate.value = 10
        $form.elements.description.value = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi aspernatur deserunt voluptas dolor inventore eveniet qui accusantium.';
        $form.elements.favourite.checked = true;
        $form.elements.img_link.value = 'https://funart.pro/uploads/posts/2022-06/1654368709_15-funart-pro-p-dva-tolstikh-kota-zhivotnie-krasivo-foto-15.jpg';
    }

    clear(target) {
        let $form = document.forms[0];

        $form.elements.id.value = '';
        $form.elements.name.value = '';
        $form.elements.age.value = '';
        $form.elements.rate.value = ''
        $form.elements.description.value = '';
        $form.elements.favourite.checked = false;
        $form.elements.img_link.value = '';
    }

    closeModal(target) {
        if (this.validator) {
            this.validator.remove();
            this.validator = null;
        }

        this.modal.close();
    }

    handler(event) {
        let action = event.target.dataset.action;

        if (action && this[action]) {
            this[action](event.target);
        }
    }
}