export default class Form {
    constructor(name, method, node) {
        let formHTML = `
            <form action="#" method="${method}" novalidate name="${name}" style="width: 35vw;">
                <div class="mb-3" data-form=container>
                    <input type="number" class="form-control" min="0" name="id" placeholder="ID" required>
                    <div class="form-text error erro--hidden" data-form=error></div>
                </div>
                <div class="mb-3" data-form=container>
                    <input type="text" class="form-control" name="name" placeholder="Name" required required>
                    <div class="form-text error erro--hidden" data-form=error></div>
                </div>
                <div class="mb-3" data-form=container>
                    <input type="number" min="1" max="10" class="form-control" name="rate" placeholder="Rate">
                    <div class="form-text error erro--hidden" data-form=error></div>
                </div>
                    <div class="mb-3" data-form=container>
                    <input type="number" min="1" class="form-control" name="age" placeholder="Age">
                    <div class="form-text error erro--hidden" data-form=error></div>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" name="favourite" id="favourite">
                    <label class="form-check-label" for="favourite">Favourite</label>
                </div>
                <div class="mb-3" data-form=container>
                    <textarea class="form-control" name="description" placeholder="Description" style="resize: none;"></textarea>
                    <div class="form-text error erro--hidden" data-form=error></div>
                </div>
                <div class="mb-3" data-form=container>
                    <input type="text" class="form-control" name="img_link" placeholder="Image link">
                    <div class="form-text error erro--hidden" data-form=error></div>
                </div>
                <div class="d-flex justify-content-end">
                    <button name="submit" type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        `;

        node.insertAdjacentHTML('beforeend', formHTML);

        this.name = name;
        this.method = method;
        this.form = document.forms[name];
        this.elements = this.form.elements;
        this.listeners = [];
        this.storage = JSON.parse(localStorage.getItem(this.name)) || {};

        let storageKeys = Object.keys(this.storage);

        if (storageKeys.length) {
            for (let key of storageKeys) {
                if (this.elements[key].type === 'checkbox') this.elements[key].checked = this.storage[key];

                this.elements[key].value = this.storage[key];
            }
        }
        
        this.addEvent('input', this.localStorageHandler.bind(this));
    }

    addEvent(type, handler, name) {
        this.listeners.push({
            type, 
            handler, 
            name
        })

        if (name) {
            this.form.elements[name].addEventListener(type, handler);
        } else {
            this.form.addEventListener(type, handler);
        }
    }

    localStorageHandler(event) {
        let storage = JSON.parse(localStorage.getItem(this.name)) || {};

        if (event.target.type === 'checkbox') {
            storage[event.target.name] = event.target.checked;
        } else {
            storage[event.target.name] = event.target.value;
        }
        localStorage.setItem(String(this.name), JSON.stringify(storage));
    }

    clear() {
        for (let listener of this.listeners) {
            if (listener.name) {
                this.form.elements[listener.name].removeEventListener(listener.name, listener.handler);
            } else {
                this.form.removeEventListener(listener.name, listener.handler);
            }
        }
    }
}