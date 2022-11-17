export default class Modal {
    constructor() {
        this.pattern = `
            <div class="modal" tabindex="-1" style="display: flex; background: rgba(0 0 0 /.8);" data-modal>
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" style="max-width: unset;">
                    <div class="modal-content">
                        <div class="modal-header" data-modal-header>
                            <h5 class="modal-title"><!-- title --></h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" data-action="closeModal"></button>
                        </div>
                        <div class="modal-body" data-modal-body><!-- body --></div>
                        <div class="modal-footer" data-modal-footer><!-- footer --></div>
                    </div>
                </div>
            </div>
        `;
        this.parentNode = document.querySelector('body');
    }

    show(titleHTML, bodyHTML, footerHTML) {
        let scrollWidth = window.innerWidth - document.documentElement.clientWidth;
        let pattern = this.pattern;

        pattern = titleHTML ? pattern.replace('<!-- title -->', titleHTML) : pattern.replace('<!-- title -->', 'Modal title');
        pattern = bodyHTML ? pattern.replace('<!-- body -->', bodyHTML) : pattern.replace('<!-- body -->', '');
        pattern = footerHTML ? pattern.replace('<!-- footer -->', footerHTML) : pattern.replace('<!-- footer -->', '<button type="button" class="btn btn-secondary" data-action="closeModal">Close</button>');
        
        this.parentNode.insertAdjacentHTML('beforeend', pattern);
        document.querySelector('body').style.cssText = `overflow: hidden; padding-right: ${scrollWidth}px`;
    }

    close() {
        document.querySelector('[data-modal]').remove();
        document.querySelector('body').removeAttribute('style');
    }
}