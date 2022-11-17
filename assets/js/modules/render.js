export default class Render {
    constructor($parenNode) {
        this.parenNode = $parenNode;
    }

    getInfoHTML(data) {
        return `
            <div 
                class="card" 
                style="max-width: 1200px; border: none;"
                data-cat-id="${data.id}" 
                data-cat-age="${data.age}" 
                data-cat-name="${data.name}" 
                data-cat-rate="${data.rate}" 
                data-cat-description="${data.description}" 
                data-cat-favourite="${data.favourite}" 
                data-cat-img_link="${data.img_link}"
            >
                <div class="row g-0">
                    <div class="col-md-7">
                        <img src="${data.img_link}" class="img-fluid rounded-start w-100 h-100" style="object-fit: cover;" alt="${data.description}">
                    </div>
                    <div class="col-md-5">
                        <div class="card-body">
                            <h5 class="card-title mb-0" data-editable data-cat-id>${data.id}</h5>
                            <p class="card-text mb-2"><small class="text-muted">id</small></p>

                            <h5 class="card-title mb-0" data-editable>${data.name}</h5>
                            <p class="card-text mb-2"><small class="text-muted">name</small></p>

                            <h5 class="card-title mb-0" data-editable>${data.age}</h5>
                            <p class="card-text mb-2"><small class="text-muted">age</small></p>

                            <h5 class="card-title mb-0" data-editable>${data.rate}</h5>
                            <p class="card-text mb-2"><small class="text-muted">rating</small></p>

                            <h5 class="card-title mb-0" data-editable style="max-height: 3em; overflow: auto;">${data.description}</h5>
                            <p class="card-text mb-2"><small class="text-muted">description</small></p>

                            <h5 class="card-title mb-0" data-editable>${data.favourite}</h5>
                            <p class="card-text mb-2"><small class="text-muted">favourite</small></p>

                            <h5 class="card-title mb-0" data-editable style="max-height: 3em; overflow: auto;">${data.img_link}</h5>
                            <p class="card-text mb-2"><small class="text-muted">image link</small></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    showCat(data, node) {
        let catHTML = `
            <div 
                class="col-3"
                data-cat-id="${data.id}" 
                data-cat-age="${data.age}" 
                data-cat-name="${data.name}" 
                data-cat-rate="${data.rate}" 
                data-cat-description="${data.description}" 
                data-cat-favourite="${data.favourite}" 
                data-cat-img_link="${data.img_link}"
            >
                <div class="card h-100">
                    <div style="height: 200px;">
                        <img src="${data.img_link}" class="card-img-top w-100 h-100" alt="${data.description}" data-card-img style="object-fit: cover">
                    </div>
                    <div class="card-body d-flex flex-column align-items-start">
                        <h5 class="card-title" data-card-name>${data.name}</h5>
                        <p class="card-text" data-card-description>${data.description}</p>
                        <div class="mt-auto">
                            <button type="button" class="btn btn-info me-2" data-action="info">Info</button>
                            <button type="button" class="btn btn-danger" data-action="delete">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        node.insertAdjacentHTML('beforeend', catHTML);
    }

    showInfoCat(data, node) {
        node.insertAdjacentHTML('beforeend', this.getInfoHTML(data));
    }

    showForm(node) {
        let formHTML = `
            <form action="#" method="POST" novalidate name="add_cat" style="width: 35vw;">
                <div class="mb-3" data-form="container">
                    <input type="number" class="form-control" min="0" name="id" aria-describedby="emailHelp" placeholder="ID" required>
                    <div class="form-text error erro--hidden" data-form="error"></div>
                </div>
                <div class="mb-3" data-form="container">
                    <input type="text" class="form-control" name="name" aria-describedby="emailHelp" placeholder="Name" required required>
                    <div class="form-text error erro--hidden" data-form="error"></div>
                </div>
                    <div class="mb-3" data-form="container">
                    <input type="number" min="1" max="10" class="form-control" name="rate" aria-describedby="rate" placeholder="Rate">
                <div class="form-text error erro--hidden" data-form="error"></div>
                </div>
                    <div class="mb-3" data-form="container">
                    <input type="number" min="1" class="form-control" name="age" aria-describedby="rate" placeholder="Age">
                <div class="form-text error erro--hidden" data-form="error"></div>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" name="favourite" id="favourite">
                    <label class="form-check-label" for="favourite">Favourite</label>
                </div>
                <div class="mb-3" data-form="container">
                    <textarea class="form-control" name="description" aria-describedby="description" placeholder="Description" style="resize: none;"></textarea>
                    <div class="form-text error erro--hidden" data-form="error"></div>
                </div>
                <div data-form="container">
                    <input type="text" class="form-control" name="img_link" aria-describedby="image link" placeholder="Image link">
                    <div class="form-text error erro--hidden" data-form="error"></div>
                </div>
            </form>
        `;
        node.insertAdjacentHTML('beforeend', formHTML);
    }

    showAllCats(dataArr, node) {
        dataArr.forEach(data => this.showCat(data, node));
    }
}