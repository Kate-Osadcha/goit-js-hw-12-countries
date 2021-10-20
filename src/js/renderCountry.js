import fetchCountries from "./fetchCountries";
import countryList from "../templates/country-list.hbs";
import countryCard from "../templates/country-card.hbs";

import { alert, error, notice, defaultModules } from "@pnotify/core";
import * as PNotifyDesktop from "@pnotify/desktop";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

const debounce = require("lodash.debounce");

const refs = {
  textInputRef: document.querySelector("input"),
  countryRef: document.querySelector(".render"),
};

refs.textInputRef.addEventListener(
  "input",
  debounce((e) => {
    if (e.target.value.length > 0) {
      fetchCountries(e.target.value).then(rendCountry).catch(fetchError);
    }
  }, 500)
);

function rendCountry(country) {
  if (country.length >= 2 && country.length <= 10) {
    let markupList = countryList(country);
    refs.countryRef.innerHTML = markupList;
    const refsListCountry = document.querySelector(".country-list");
    refsListCountry.addEventListener("click", targetValue);
  } else if (country.length === 1) {
    let markupCard = countryCard(country);
    refs.countryRef.innerHTML = markupCard;
  } else if (country.length > 10) {
    const myNotice = notice({
      title: "Too many matches found.",
      text: " Please enter a mare specific query!",
    });
  }
}

function targetValue(e) {
  if (e.target.nodeName !== "LI") {
    return;
  }
  refs.textInputRef.value = e.target.textContent;
  fetchCountries(refs.textInputRef.value).then(rendCountry);
}

function fetchError(mistake) {
  const myError = error({
    title: "Error",
    text: `${mistake}`,
  });
}
