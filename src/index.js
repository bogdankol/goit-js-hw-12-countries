import './sass/main.scss';
import debounce from 'lodash/debounce'
import fetchCountries from './js/fetchCountries';
import templateForOne from './templates/list-element-template.hbs'
import templateForMany from './templates/list-elements-template.hbs'
import {
  info,
  success,
  error,
  defaultModules,
} from '../node_modules/@pnotify/core/dist/PNotify';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile';
import '@pnotify/core/dist/BrightTheme.css';

defaultModules.set(PNotifyMobile, {});


const refs = {
  mainDiv: document.querySelector('.js-container'),
  div: document.querySelector('.countries-div'),
  input: document.querySelector('.js-input'),
  countriesList: document.querySelector('.js-countries-list'),
};

refs.input.addEventListener('input', debounce(onInputHandler, 500))

function onInputHandler() {
  const inputValue = refs.input.value;
  const array = inputValue.split('').every(el => isNaN(el));

  array ? null : error({
        text: 'Please, do not use numbers in your request',
        animation: 'fade',
        shadow: true,
        delay: 1500,
        closer: true,
      });
  
    if (isNaN(inputValue)) {
      fetchCountries(inputValue).then(result => {

        if (result.length === 1) {
          refs.div.innerHTML = '';
          refs.div.insertAdjacentHTML('beforeend', templateForOne(result[0]));

          success({
            text: 'Success!',
            animation: 'fade',
            shadow: true,
            delay: 1500,
            closer: true,
          });

          if (success) {
            refs.input.value = '';
          }

        } else if (result.length > 1 && result.length <= 10) {
          refs.div.innerHTML = '';

          const filtered = result.map(el => el.name.includes(refs.input.value));
          refs.div.insertAdjacentHTML('beforeend', templateForMany(result.splice(0, 9)));

          info({
            text: 'Here are the matches! Please enter one of them in search field to get more specific data',
            animation: 'fade',
            shadow: true,
            delay: 1500,
            closer: true,
          });

        } else if (result.length > 10) {
          refs.div.innerHTML = '';

          info({
            text: 'Too much matches, please enter more specific text',
            animation: 'fade',
            shadow: true,
            delay: 1500,
            closer: true,
          });

        } else if (result.length === 0) {
          refs.div.innerHTML = '';

          error({
            text: 'No matches. Please, enter other data',
            animation: 'fade',
            shadow: true,
            delay: 1500,
            closer: true,
          });

        } 
      });
    } 
}






















































































































































































