/*

Анимированное модальное окно. 

*/

import { $modal } from './nodes.js';

class Modal {
    constructor(modal) {
        this.closed = true;
        this.elem = modal;
        this.backdrop = modal.querySelector('[data-modal-backdrop]');
        this.content = modal.querySelector('[data-modal-content]');
        this.bodyElem = document.querySelector('body');
        this.listeners = [];
    }

    open() {
        // Функция нужна, чтобы убедиться, что окно открывается только после его закрытия. Иначе ломается анимация. 
        const f = () => {
            this.elem.dispatchEvent(new CustomEvent("modal-open", {
                bubbles: true, 
                detail: {}, 
            }))
    
            this.addListener('click', e => {
                if (!e.target.closest('[data-modal-content]')) this.close();
            });
    
            this.bodyElem.style.cssText = `overflow: hidden; padding-right: ${this._getScrollWidth()}px`;
            document.querySelector('[data-modal]').classList.remove('modal__hidden');
            setTimeout(() => {
                this.backdrop.classList.remove('modal__backdrop--hidden');
                this.content.classList.add('modal__content--show');
                this.elem.dispatchEvent(new CustomEvent('modal-open-end'), {
                    bubbles: true, 
                })  
            });  
        }

        // Если модалка закрыта (анимация завершилась), то ее можно снова открыть.
        // Иначе подписываемся на событие закрытия модального окна.
        if (this.closed) {
            f();
        } else {
            this.elem.addEventListener('modal-close-end', f, {once: true});
        }
    }

    close() {
        this.closed = false;
        this.elem.dispatchEvent(new CustomEvent('modal-close', {
            bubbles: true, 
            detail: {}, 
        }));
        this.removeAllListeners();

        this.content.classList.remove('modal__content--show');
        this.backdrop.classList.add('modal__backdrop--hidden');        
        setTimeout(() => {
            document.querySelector('[data-modal]').classList.add('modal__hidden');
            this.bodyElem.removeAttribute('style');
            this.clearContentHTML();

            this.elem.dispatchEvent(new CustomEvent('modal-close-end'), {
                bubbles: true, 
            })
            // После завершения анимации отмечаем, что модалка закрыта.
            this.closed = true;
        }, 450);
    }

    insertContentHTML(innerHTML) {
        const f = () => this.content.insertAdjacentHTML('beforeend', innerHTML);
        
        // Добавляем контент только после закрытия модалки и завершения всех анимаций.
        if (this.closed) {
            f();
        } else {
            this.elem.addEventListener('modal-close-end', f, {once: true});
        }
    }

    clearContentHTML() {
        this.content.innerHTML = '';
    }

    // Можно подключить слушателя для добавляемых внутрь модалки элементов.
    // После закрытия модалки все слушатели будут удалены
    addListener(type, callback, options = {}, node = this.elem) {
        this.listeners.push({
            type, 
            callback, 
            options, 
            node
        });

        node.addEventListener(type, callback, options);
    }

    removeAllListeners() {
        for (let {type, callback, options, node} of this.listeners) {
            node.removeEventListener(type, callback, options);
        }
    }

    _getScrollWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }
}

const modal = new Modal($modal);

export {
    modal, 
}