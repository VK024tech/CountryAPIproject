countryName = new URLSearchParams(location.search).get("name");

const flagImage = document.querySelector(".country-details img");
const countryHeading = document.querySelector(".country-details h1");
const nativeName = document.querySelector(".Native-name");
const countryPopulation = document.querySelector(".population");
const countryRegion = document.querySelector(".region");
const countrySubregion = document.querySelector(".sub-region");
const countryCapital = document.querySelector(".capital");
const countryTldomain = document.querySelector(".domain");
const countryCurrency = document.querySelector(".currency");
const countryLanguages = document.querySelector(".languages");
const borderCountries = document.querySelector(".border-countries");
const backButton = document.querySelector(".back-button");
const locationHead = document.querySelector(".heading");

const darkLightMode = document.querySelector(".mode");
const body = document.querySelector("body");
const icon = document.querySelector(".mode i");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    console.log(country)

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }

    if (country.currencies) {
      countryCurrency.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    }

    if (country.languages) {
      countryLanguages.innerText = Object.values(country.languages).join(", ");
    }

    if (country.region) {
      countryRegion.innerText = country.region;
    }

    if (country.subregion) {
      countrySubregion.innerText = country.subregion;
    }

    if (country.capital) {
      countryCapital.innerText = country.capital?.[0];
    }

    if (country.population) {
      countryPopulation.innerText = country.population.toLocaleString("en-IN");
    } else {
      countryPopulation.innerText = 0;
    }

    if (country.borders) {
      country.borders.forEach((border) => {
        // console.log(border)
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            // console.log(borderCountry)
            const countryBorderTag = document.createElement("a");
            countryBorderTag.innerText = borderCountry.name.common;
            // console.log(countryBorderTag)
            countryBorderTag.href = `country.html?name=${borderCountry.name.common}`;
            borderCountries.append(countryBorderTag);
          });
      });
    }


    locationHead.addEventListener('click', () => {
        window.open(country.maps.googleMaps  , "_blank")
    })

    flagImage.src = country.flags.svg;
    countryHeading.innerText = country.name.common;
    countryRegion.innerText = country.region;
    countryTldomain.innerText = country.tld.join(",  ");
    backButton.addEventListener("click", () => {
      history.back();
    });
  });

darkLightMode.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (
    darkLightMode.innerHTML ==
    '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark mode'
  ) {
    darkLightMode.innerHTML =
      '<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light mode';
  } else {
    darkLightMode.innerHTML =
      '<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark mode';
  }

  // icon.classList.toggle('fa-moon')
  // icon.classList.toggle('fa-sun')
});

