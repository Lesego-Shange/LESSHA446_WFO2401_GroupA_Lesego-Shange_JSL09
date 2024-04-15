const resBackground = fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=money")
    .then(response => {
        if (!response.ok) {
            throw Error("Failed to fetch background image");
        }
        return response.json();
    })
    .then(dataBackground => {
        document.body.style.backgroundImage = `url(${dataBackground.urls.regular})`;
        document.getElementById("author").textContent = `By: ${dataBackground.user.name}`;
    })
    .catch(err => {
        console.error(err);
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1543699565-003b8adda5fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTI5MzUzNjJ8&ixlib=rb-4.0.3&q=80&w=1080)`;
        document.getElementById("author").textContent = `By: Dmytro Demidko`;
    });

const resCrypto = fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then(response => {
        if (!response.ok) {
            throw Error("Failed to fetch cryptocurrency data");
        }
        return response.json();
    })
    .then(dataCrypto => {
        document.getElementById("crypto-top").innerHTML = `
            <img src=${dataCrypto.image.small} />
            <span>${dataCrypto.name}</span>
        `;
        document.getElementById("crypto").innerHTML += `
            <p>📍: R${dataCrypto.market_data.current_price.zar}</p>
            <p>📈: R${dataCrypto.market_data.high_24h.zar}</p>
            <p>📉: R${dataCrypto.market_data.low_24h.zar}</p>
        `;
    })
    .catch(err => {
        console.error(err);
    });

function getCurrentTime() {
    const date = new Date();
    document.getElementById("time").textContent = date.toLocaleTimeString("en-ZA", { timeStyle: "short" });
}

setInterval(getCurrentTime, 1000);

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw Error("Weather data not available");
            }
            return response.json();
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `;
        })
        .catch(err => {
            console.error(err);
        });
});
