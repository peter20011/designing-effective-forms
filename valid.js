function validateForm() {
    const emailInput = document.getElementById('exampleInputEmail1');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const vatNumberInput = document.getElementById('vatNumber');
    let valid = true;

    // Walidacja emaila
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
        emailInput.classList.add('is-invalid'); // Dodanie klasy CSS dla nieprawidłowego pola
        valid = false;
    } else {
        emailInput.classList.remove('is-invalid'); // Usunięcie klasy CSS, jeśli pole jest poprawne
    }

    // Walidacja numeru telefonu
    const phonePattern = /^\+?\d{9}$/;
    if (!phonePattern.test(phoneNumberInput.value)) {
        phoneNumberInput.classList.add('is-invalid');
        valid = false;
    } else {
        phoneNumberInput.classList.remove('is-invalid');
    }

    // Walidacja numeru VAT
    const vatPattern = /^[A-Z]{2}\d{9,12}$/;
    if (!vatPattern.test(vatNumberInput.value)) {
        vatNumberInput.classList.add('is-invalid');
        valid = false;
    } else {
        vatNumberInput.classList.remove('is-invalid');
    }

    return valid;
}

document.getElementById('exampleInputEmail1').addEventListener('input', validateForm);
document.getElementById('phoneNumber').addEventListener('input', validateForm);
document.getElementById('vatNumber').addEventListener('input', validateForm);

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    if (validateForm()) {
        this.submit();
    } else {
        alert('Formularz zawiera błędy.');
    }
});
