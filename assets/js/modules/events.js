/* 



*/

import Validator from './validator.js';

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
            `
                <button type="button" class="btn btn-danger" data-action="clear">Clear form</button>
                <button type="button" class="btn btn-primary" data-action="fill">Fill form</button>
                <button type="button" class="btn btn-primary" data-form="submit" data-action="submit">Submit</button>`
        );
        this.render.showForm(document.querySelector('[data-modal-body]'));
        this.validator = new Validator(document.querySelector('form'));
    }

    info(target) {
        let catData = this.getLocalCatData(target.closest('[data-cat-id]'));

        this.modal.show(
            'Cat info', 
            null, 
            '<button type="button" class="btn btn-primary" data-action="edit">Edit</button>');
        this.render.showInfoCat(catData, document.querySelector('[data-modal-body]'));
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
        this.modal.close();
        this.modal.show(
            'Edit the cat', 
            null, 
            '<button type="button" class="btn btn-primary" data-form="submit" data-action="submit">Submit</button>'
        );
        this.render.showForm(document.querySelector('[data-modal-body]'));
        
        let catData = this.getLocalCatData(target.closest('[data-modal]').querySelector('[data-cat-id]'));
        let $form = document.forms[0];

        $form.method = 'PUT';
        this.validator = new Validator($form);
        $form.elements.id.value = catData.id;
        $form.elements.id.setAttribute('disabled', '');
        $form.elements.name.value = catData.name;
        $form.elements.name.setAttribute('disabled', '');
        $form.elements.age.value = catData.age;
        $form.elements.rate.value = catData.rate;
        $form.elements.description.value = catData.description;
        $form.elements.favourite.checked = catData.favourite;
        $form.elements.img_link.value = catData.img_link;
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

    submit(target) {
        if (!this.validator.check()) return;

        const $form = document.forms[0];
        const method = $form.getAttribute('method').toUpperCase();
        const id = $form.elements.id;

        if (method === 'POST') {
            this.api.addCat($form)
                .then(data => {
                    this.validator.remove();
                    this.closeModal();
                    this.render.showCat(data, document.querySelector('[data-cats-node]'));
                })
                .catch(error => alert(error));
        } else if (method === 'PUT') {
            this.api.editCat($form)
                .then(data => {
                    this.validator.remove();
                    this.closeModal();
                    
                    let $cat = document.querySelector(`[data-cat-id="${data.id}"]`);
                    let $catImg = $cat.querySelector('[data-card-img]');
                    let $catName = $cat.querySelector('[data-card-name]');
                    let $catDescription = $cat.querySelector('[data-card-description]');

                    $catImg.src = data.img_link;
                    $catImg.alt = data.description;
                    $catName.name = data.name;
                    $catDescription.innerText = data.description;

                    $cat.dataset.catAge = data.age;
                    $cat.dataset.catRate = data.rate;
                    $cat.dataset.catDescription = data.description;
                    $cat.dataset.catFavourite = data.favourite;
                    $cat.dataset.catImg_link = data.img_link;
                })
                .catch(error => alert(error));
        }
    }

    handler(event) {
        let action = event.target.dataset.action;

        if (action) {
            this[action](event.target);
        }
    }
}