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
    Notiflix.Notify.failure('Enter the name of the country');
  } else {
    fetchCountries(name)
      .then(data => {
        console.log(`Data: ${data}`);
        console.log(`Liczba obiektów: ${data.length}`);
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length < 10 && data.length > 2) {
          renderList(data);
          countryInfo.innerHTML = '<p>Kilka krajów</p>';
        } else if (data.length === 1) {
          renderCountryCard(data);
          countryList.innerHTML = '<p>Jedno państwo</p>';
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
};

const renderList = data => {
  const makrup = data.map(object => {
    return '<li class = "list__item"> <img class = "list__img" src = "${object.flag}" alt="${object.name} flag" width = "55"> <p class = "list__name">${object.name}</p></li>';
  });
  join('');
  countryList.innerHTML = makrup;
};

searchBox.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));
