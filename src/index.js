import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const searchCountry = () => {
  let name = searchBox.value.trim();
  if (name === '' || name === undefined) {
    clearResult();
    Notiflix.Notify.failure('Enter the name of the country');
  } else {
    fetchCountries(name)
      .then(data => {
        // console.log(`Data: ${data}`);
        // console.log(`Liczba obiektów: ${data.length}`);
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length === 1) {
          renderCountryCard(data);
        } else {
          renderList(data);
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
};

const renderList = data => {
  const markup = data
    .map(country => {
      return `<li class="list__item">
      <img class="list__flag" src="${country.flag}" alt="Flag of ${country.name}" width="55" >
      <p class="list__name">${country.name}</p>
      </li>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
};

const renderCountryCard = data => {
  const markup = data
    .map(country => {
      return `<img class="country__flag" src="${country.flag}" alt="Flag of ${
        country.name
      }" width="55" >
      <span class="country__name">${country.name}</span>
      <p class="country__data"><b>Capital</b>: ${country.capital}</p>
      <p class="country__data"><b>Population</b>: ${country.population}</p>
      <p class="country__data"><b>Languages</b>: ${country.languages.map(
        language => ' ' + language.name
      )}</p>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
};

searchBox.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function clearResult() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
