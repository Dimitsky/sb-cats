/*

Валидация формы с помощью Constraint Validation API

*/

export default class Validator {
    constructor($form) {
        this.form = $form;
        this.inputs = $form.querySelectorAll('input:not([type=checkbox])');

        this.inputs.forEach($input => $input.addEventListener('input', this.inputHandler.bind(this)));
    }

    showError($input, $error) {
        $error.classList.remove('error--hidden');

        if ($input.validity.valueMissing) {
            $error.innerText = 'A value has not been entered';
        } else if ($input.validity.rangeUnderflow) {
            $error.innerText = 'The value is less than the min attribute';
        } else if ($input.validity.rangeOverflow) {
            $error.innerText = 'The value is greater than the max attribute';
        } else if ($input.validity.typeMismatch) {
            let errorTextPattern = 'The input field value is not the correct syntax';
            let innerText = $input.type === 'url' ? errorTextPattern + ' (need url)' : errorTextPattern;
     
            $error.innerText = innerText;
        }
    }

    getErrorContainer($input) {
        return $input.closest('[data-form=container]').querySelector('[data-form=error]');
    }

    removeListeners() {
        this.inputs.forEach($input => $input.removeEventListener('input', this.inputHandler.bind(this)));
    }

    inputHandler(event) {
        const $error = this.getErrorContainer(event.target);
            
            if (event.target.validity.valid) {
                $error.innerText = '';
                $error.classList.add('error--hidden');
            } else {
                this.showError(event.target, $error);
            }
    }

    check() {
        let AllInputsAreValid = true;

        this.inputs.forEach($input => {
            if (!$input.validity.valid) {
                this.showError($input, this.getErrorContainer($input));
                AllInputsAreValid = false; 
            }
        });
    
        if (AllInputsAreValid) {
            return true;
        } else {
            return false;
        }
    }
}