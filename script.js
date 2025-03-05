const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector(".search-container input");
const darkLightMode = document.querySelector(".mode");
const body = document.querySelector("body");
const icon = document.querySelector(".mode i");
let allCountriesData;

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });

filterByRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries);
  //   console.log(filterByRegion.value);
});

function renderCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    // console.log(country);

    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/country.html?name=${country.name.common}`;

    // const cardImg = document.createElement('img')
    // cardImg.src = "https://flagcdn.com/is.svg"
    // countryCard.append(cardImg)

    const cardHTML = `
     <img src="${country.flags.svg}" alt=${country.name.common}/>
            <div class="card-text">
              <h3 class="card-title">${country.name.common}</h3>
              <p><b>Population: </b>${country.population.toLocaleString(
                "en-IN"
              )}</p>
              <p><b>Region: </b>${country.region}</p>
              <p><b>Capital: </b>${country.capital?.[0]}</p>
            </div>
  `;

    countryCard.innerHTML = cardHTML;
    countriesContainer.append(countryCard);
  });
}

searchInput.addEventListener("input", (e) => {
  // console.log(e.target.value)
  const filteredCountries = allCountriesData.filter((countries) => {
    return countries.name.common
      .toLowerCase()
      .includes(e.target.value.toLowerCase());
  });
  renderCountries(filteredCountries);

  if (Object.keys(filteredCountries).length < 3) {
    countriesContainer.classList.add("less-than-three");
  }
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
