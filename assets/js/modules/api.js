export default class API {
    constructor(host) {
        this.host = `http://sb-cats.herokuapp.com/api/2/${host}/`;
        this.cache = null;
    }

    getPreparedData($form) {
        let data = {};

        for (let i = 0; i < $form.elements.length; i++) {
            if ($form.elements[i].type === 'checkbox') {
                data[$form.elements[i].name] = $form.elements[i].checked;
            } else {
                data[$form.elements[i].name] = $form.elements[i].value;

            }
        }

        // Переменная должна содержать число
        data.id = +data.id;

        // Переменная должна содержать число
        if (data.age) {
            data.age = +data.age;
        }

        // Переменная должна содержать число. По умолчанию равно 1
        if (!data.rate) {
            data.rate = 1;
        } else {
            data.rate = +data.rate;
        }

        return data;
    }

    async getAllCats() {
        let response = await fetch(this.host + 'show');
        let body = await response.json();
        
        return body.data;
    }

    async addCat($form) {
        let data = this.getPreparedData($form);
        let init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8', 
            }, 
            body: JSON.stringify(data), 
        }
        let response = await fetch(this.host + 'add', init);
        let body = await response.json();

        if (body.message != 'ok' || !response.ok) {
            throw new Error(`SERVER: "${body.message}"; RESPONSE STATUS: "${response.status}"`);
        } else {
            return data;
        }
    }

    async editCat($form) {
        let data = this.getPreparedData($form);
        let id = data.id;
        let name = data.name;

        // Запрещено менять name и id
        delete data.name;
        delete data.id;

        let init = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8', 
            }, 
            body: JSON.stringify(data), 
        }
        let response = await fetch(this.host + 'update/' + id, init);
        let body = await response.json();

        if (body.message != 'ok' || !response.ok) {
            throw new Error(`SERVER: "${String(body.message)}"; RESPONSE STATUS: "${response.status}"`);
        } else {
            data.id = id;
            data.name = name;

            return data;
        }
    }

    async deleteCat(id) {
        let init = {
            method: 'DELETE', 
        };
        let response = await fetch(this.host + `delete/${id}`, init);

        if (!response.ok) {
            throw new Error(`Server status: ${response.status}`);
        }
    }
}