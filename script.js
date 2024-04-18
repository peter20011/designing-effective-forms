let clickCount = 0;

const countryInput = document.getElementById('country');
const myForm = document.getElementById('form');
const modal = document.getElementById('form-feedback-modal');
const clicksInfo = document.getElementById('click-count');

function handleClick() {
    clickCount++;
    clicksInfo.innerText = clickCount;
}

async function fetchAndFillCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        const data = await response.json();
        const countries = data.map(country => country.name.common);
        countries.sort((a, b) => a.localeCompare(b));

        const datalist = document.createElement('datalist');
        datalist.id = 'countrySuggestions';

        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            datalist.appendChild(option);
        });

        document.body.appendChild(datalist);

        countryInput.addEventListener("input", () => {
            const search = countryInput.value.toLowerCase();
            const suggestions = countries.filter(country => country.toLowerCase().startsWith(search));

            while (datalist.firstChild) {
                datalist.removeChild(datalist.firstChild);
            }

            suggestions.forEach(suggestion => {
                const option = document.createElement('option');
                option.value = suggestion;
                datalist.appendChild(option);
            });
        });

        countryInput.setAttribute('list', 'countrySuggestions');
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}

const updateCountryByIP = async () => {
    await fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const country = data.country;
            countryInput.value = country;

            addCountryCodeToVATNumber(data.country_code);
            selectVATIfEU(data.continent_code);
        })
        .catch(error => {
            console.error('Błąd pobierania danych z serwera GeoJS:', error);
        });
}

const selectVATIfEU = (continentCode) => {
    const vatUECheckbox = document.querySelector('#vatUE');

    if (continentCode === "EU") {
        vatUECheckbox.click();
    }
}

const addCountryCodeToVATNumber = (countryCode) => {
    console.log(countryCode);
    const vatNumberField = document.querySelector('#vatNumber');
    vatNumberField.value += countryCode;
}

const updateCountryCode = async () => {
    const countryCodeSelect = document.querySelector('#countryCode');
    const countryName = countryInput.value;
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    await fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        return response.json();
    })
    .then(data => {        
        const countryCode = data[0].idd.root + data[0].idd.suffixes.join("");

        Array.from(countryCodeSelect.options).forEach((option) => {
            if (option.value === countryCode) {
                countryCodeSelect.value = countryCode;
            }
        });
    })
    .catch(error => {
        console.error('Wystąpił błąd:', error);
    });
}

const addListenersToButtons = (buttons, methodValue) => {
    buttons.forEach((button) => {
        button.addEventListener('click', function() {
            buttons.forEach((btn) => {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline-primary');
            });

            this.classList.add('btn-primary');
            this.classList.remove('btn-outline-primary');
        
            let selectedMethod = this.getAttribute('data-value');
            methodValue.value = selectedMethod;
        });
    });
}

const initializeButtonListeners = () => {
    const shippingMethodButtons = document.querySelectorAll('.shipping-field');
    const shippingMethodValue = document.querySelector('#shippingMethod');
    const paymentMethodButtons = document.querySelectorAll('.payment-field');
    const paymentMethodValue = document.querySelector('#paymentMethod');

    addListenersToButtons(shippingMethodButtons, shippingMethodValue);
    addListenersToButtons(paymentMethodButtons, paymentMethodValue);
}


(async () => {
    document.addEventListener('click', handleClick);
    initializeButtonListeners();

    fetchAndFillCountries();
    await updateCountryByIP();
    await updateCountryCode();
})()