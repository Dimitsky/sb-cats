export default class Render {
    constructor($parenNode) {
        this.parenNode = $parenNode;
    }

    getInfoHTML(data) {
        return `
            <div class="card" style="max-width: 1200px; border: none;" data-cat-id="${data.id}">
                <div class="row g-0">
                    <div class="col-md-7">
                        <img src="${data.img_link}" class="img-fluid rounded-start w-100 h-100" style="object-fit: cover;" alt="${data.description}">
                    </div>
                    <div class="col-md-5">
                        <div class="card-body">
                            <h5 class="card-title mb-0">${data.id}</h5>
                            <p class="card-text mb-2"><small class="text-muted">id</small></p>

                            <h5 class="card-title mb-0">${data.name}</h5>
                            <p class="card-text mb-2"><small class="text-muted">name</small></p>

                            <h5 class="card-title mb-0">${data.age}</h5>
                            <p class="card-text mb-2"><small class="text-muted">age</small></p>

                            <h5 class="card-title mb-0">${data.rate}</h5>
                            <p class="card-text mb-2"><small class="text-muted">rating</small></p>

                            <h5 class="card-title mb-0" style="max-height: 3em; overflow: auto;">${data.description}</h5>
                            <p class="card-text mb-2"><small class="text-muted">description</small></p>

                            <h5 class="card-title mb-0">${data.favourite}</h5>
                            <p class="card-text mb-2"><small class="text-muted">favourite</small></p>

                            <h5 class="card-title mb-0" style="max-height: 3em; overflow: auto;">${data.img_link}</h5>
                            <p class="card-text mb-2"><small class="text-muted">image link</small></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    showCat(data, node) {
        let catHTML = `
            <div class="col-3" data-cat-id="${data.id}" >
                <div class="card h-100">
                    <div style="height: 200px;">
                        <img src="${data.img_link}" class="card-img-top w-100 h-100" alt="${data.description}" data-cat-img style="object-fit: cover">
                    </div>
                    <div class="card-body d-flex flex-column align-items-start">
                        <h5 class="card-title" data-cat-name>${data.name}</h5>
                        <p class="card-text" data-cat-description>${data.description}</p>
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

    showAllCats(dataArr, node) {
        dataArr.forEach(data => this.showCat(data, node));
    }
}