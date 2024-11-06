const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message){
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check if fields required
function checkRequired(inputArr) {
    inputArr.forEach(function(input){
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

// Validate email
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(input.value)) {
        showError(input, 'Email is not valid');
    } else {
        showSuccess(input);
    }
}

// Check password match
function checkPasswordMatch(input1, input2) {
    if ( input1.value !== input2.value ) {
        showError(input2, 'Password is not match');
    } else {
        showSuccess(input2);
    }
}

// Get field name
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check length input value
function checkLength(input, min, max) {
    if ( input.value.length < min ) {
        showError(input, `${getFieldName(input)} must be at least ${min}`);
    } else if ( input.value.length > max ) {
        console.log(input.value)
        showError(input, `${getFieldName(input)} must be less than ${max}`);
    } else {
        showSuccess(input);
    }
}

// Submit form
form.addEventListener('submit', function(e){
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 30);
    checkEmail(email);
    checkPasswordMatch(password, password2);
});

