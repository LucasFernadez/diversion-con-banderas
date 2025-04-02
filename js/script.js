document.addEventListener("DOMContentLoaded", () => {
    const countriesList = document.getElementById("countries-list");
    const modal = document.createElement("div");
    modal.classList.add("modal");
    document.body.appendChild(modal);
    
    async function fetchCountries() {
        try {
            const response = await fetch("https://restcountries.com/v3.1/all");
            let countries = await response.json();
            
            countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
            
            countries.forEach(country => {
                const countryDiv = document.createElement("div");
                countryDiv.classList.add("country");
                countryDiv.innerHTML = `
                    <img src="${country.flags.png}" alt="Bandera de ${country.name.common}">
                    <p>${country.name.common}</p>
                `;
                countryDiv.addEventListener("click", () => showCountryDetails(country));
                countriesList.appendChild(countryDiv);
            });
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    }
    
    function showCountryDetails(country) {
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>${country.name.common}</h2>
                <img src="${country.flags.png}" alt="Bandera de ${country.name.common}">
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
                <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Circulación:</strong> ${country.car ? country.car.side : "Desconocido"}</p>
            </div>
        `;
        
        modal.style.display = "flex";
        document.querySelector(".close").addEventListener("click", () => {
            modal.style.display = "none";
        });
    }
    
    fetchCountries();
});
