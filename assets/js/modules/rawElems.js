/*

Сырая html  разметка для карточек с котиками и формы для добавления и редактирования котиков.

*/

class RawElems {
    constructor() {}

    getCard(data) {
        return `
            <div class="col-12 col-md-6 col-lg-4 col-xxl-3" data-cat-id="${data.id}" >
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
    }

    getInfoCard(data) {
        return `
            <div class="card" style="max-width: 1200px; border: none;" data-cat-id="${data.id}">
                <div class="row g-0 mb-3">
                    <div class="col-md-7">
                        <img src="${data.img_link}" class="img-fluid rounded-start w-100 h-100" style="object-fit: cover;" alt="${data.description}">
                    </div>
                    <div class="col-md-5">
                        <div class="card-body">
                            <h6 class="card-title mb-0">${data.id}</h6>
                            <p class="card-text mb-2"><small class="text-muted">id</small></p>

                            <h6 class="card-title mb-0">${data.name}</h6>
                            <p class="card-text mb-2"><small class="text-muted">name</small></p>

                            <h6 class="card-title mb-0">${data.age}</h6>
                            <p class="card-text mb-2"><small class="text-muted">age</small></p>

                            <h6 class="card-title mb-0">${data.rate}</h6>
                            <p class="card-text mb-2"><small class="text-muted">rating</small></p>

                            <h6 class="card-title mb-0" style="max-height: 3em; overflow: auto;">${data.description}</h6>
                            <p class="card-text mb-2"><small class="text-muted">description</small></p>

                            <h6 class="card-title mb-0">${data.favourite}</h6>
                            <p class="card-text mb-2"><small class="text-muted">favourite</small></p>

                            <h6 class="card-title mb-0" style="max-height: 3em; overflow: auto;">${data.img_link}</h6>
                            <p class="card-text mb-2"><small class="text-muted">image link</small></p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 d-flex justify-content-end align-item-center">
                        <button type="button" class="btn btn-primary" data-action="edit">Edit</button>
                    </div>
                </div>
            </div>
        `;
    }

    getForm(name, method, data = {}) {
        return `
            <form class="form" action="#" method="${method}" novalidate name="${name}">
                <div class="mb-3" data-form=container>
                    <input type="number" class="form-control" min="0" name="id" placeholder="ID" required value="${data.id ? data.id : ''}">
                    <div class="form-text error erro--hidden" data-form=error></div>
                </div>
                <div class="mb-3" data-form=container>
                    <input type="text" class="form-control" name="name" placeholder="Name" required required value="${data.name ? data.name : ''}">
                    <div class="form-text error erro--hidden" data-form=error></div>
                </div>
                <div class="mb-3" data-form=container>
                    <input type="number" min="1" max="10" class="form-control" name="rate" placeholder="Rate" value="${data.rate ? data.rate : ''}">
                    <div class="form-text error erro--hidden" data-form=error></div>
                </div>
                    <div class="mb-3" data-form=container>
                    <input type="number" min="1" class="form-control" name="age" placeholder="Age" value="${data.age ? data.age : ''}">
                    <div class="form-text error erro--hidden" data-form=error></div>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" name="favourite" id="favourite" ${data.favourite ? 'checked' : ''}>
                    <label class="form-check-label" for="favourite">Favourite</label>
                </div>
                <div class="mb-3" data-form=container>
                    <textarea class="form-control" name="description" placeholder="Description" style="resize: none;">${data.description ? data.description : ''}</textarea>
                    <div class="form-text error erro--hidden" data-form=error></div>
                </div>
                <div class="mb-3" data-form=container>
                    <input type="text" class="form-control" name="img_link" placeholder="Image link" value="${data.img_link ? data.img_link : ''}">
                    <div class="form-text error erro--hidden" data-form=error></div>
                </div>
                <div class="d-flex justify-content-end">
                    <button name="submit" type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        `;
    }
}

const rawElems = new RawElems();

export {
    rawElems, 
}