document.addEventListener('DOMContentLoaded', function() {
    setDefaultStartDate('offerStartDate');

    const localStorageKey = 'formData';
    clearFormIfSuccessful(localStorageKey);
    setSavedFormData(localStorageKey);

    document.getElementById('offerForm').addEventListener('submit', saveFormData);
});



function setDefaultStartDate(dateInputId) {
    const date = new Date();

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    document.getElementById(dateInputId).value = `${year}-${month}-${day}T${hours}:${minutes}`;
}

function clearFormIfSuccessful(localStorageKey) {
    const messageEl = document.getElementById('message');
    if (messageEl) {
        localStorage.removeItem(localStorageKey);
    }
}

function setSavedFormData(localStorageKey) {
    const storedData = JSON.parse(localStorage.getItem(localStorageKey));
    if (!storedData) {
        return;
    }
    let input;
    for (const key in storedData) {
        input = document.querySelector(`[name="${key}"]`);
        if (input) {
            input.value = storedData[key];
        }
    }
}

function saveFormData() {
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    localStorage.setItem('formData', JSON.stringify(formObject));
}
