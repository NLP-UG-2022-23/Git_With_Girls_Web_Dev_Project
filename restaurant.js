const locationListener = document.getElementById("locationSelect");
locationListener.onchange = function() {
    var selectedDistrict = locationListener.options[locationListener.selectedIndex].value; 
    console.log('wybrana dzielnica: ', selectedDistrict);
    changeInnerHtmlRestaurantChoice(sessionStorage.getItem("quizResult"), selectedDistrict);
}

function getURL(selectedCuisine, selectedDistrict) {
    districts = [
        {"districtName": "Wrzeszcz", "lat": 54.379317, "lng": 18.604422},
        {"districtName": "Przymorze", "lat": 54.408599, "lng": 18.588910},
        {"districtName": "Oliwa", "lat": 54.408160, "lng": 18.559219},
        {"districtName": "Orunia", "lat": 54.323289, "lng": 18.634601},
        {"districtName": "Brzeźno", "lat": 54.405137, "lng": 18.630530},
        {"districtName": "Chełm", "lat": 54.340376, "lng": 18.617366},
        {"districtName": "Stogi", "lat": 54.360841, "lng": 18.712520},
        {"districtName": "Osowa", "lat": 54.423502, "lng": 18.473740},
        {"districtName": "Jasień", "lat": 54.342399, "lng": 18.560852},
        {"districtName": "Śródmieście", "lat": 54.349750, "lng": 18.653272},
        {"districtName": "Zaspa", "lat": 54.394556, "lng": 18.601721},
        {"districtName": "Łostowice", "lat": 54.311967, "lng": 18.596904}
    ];

    const cuisine = encodeURIComponent(selectedCuisine);
    let url = `https://local-business-data.p.rapidapi.com/search-nearby?query=restauracja%20${cuisine}`;

    for (let x of districts) {
        if (selectedDistrict === x["districtName"]) {
            url += `&lat=${x["lat"]}&lng=${x["lng"]}&limit=10&language=pl&region=pl`;
			//change the number of restauarants here ^ limit =x
            return url;
        }
    }
}

function changeInnerHtmlRestaurantChoice(selectedCuisine, selectedDistrict) {
    const restaurantContainer = document.getElementById('restaurant-container');
    restaurantContainer.innerHTML = `<h2>Restauracja ${selectedCuisine} w dzielnicy ${selectedDistrict}</h2><p>Ładowanie proszę czekać </p>`;

    const data = null;
    const url = getURL(selectedCuisine, selectedDistrict);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.setRequestHeader('x-rapidapi-key', '0eab28cc7fmshd12412eef43bae6p144ef1jsn55b5128ff4b6');
    xhr.setRequestHeader('x-rapidapi-host', 'local-business-data.p.rapidapi.com');
    
    xhr.send(data);
    
    xhr.addEventListener('readystatechange', function() {
        if (this.readyState === this.DONE) {
            const status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                const jsonResponse = JSON.parse(this.responseText);
                console.log(jsonResponse);
                let pasteIn = `
                    <h2>Restauracja ${selectedCuisine} w dzielnicy ${selectedDistrict}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Nazwa</th>
                                <th>Adres</th>
                                <th>Link</th>
								<th class="hide-smol-screen">Godziny otwarcia</th>
                            </tr>
                        </thead>
                        <tbody>`;
                for (let i = 0; i < jsonResponse.data.length; i++) {
                    pasteIn += `
                            <tr>
                                <td>${jsonResponse.data[i].name}</td>
                                <td>${jsonResponse.data[i].address}</td>
                                <td><a href="${jsonResponse.data[i].place_link}" target="_blank">Zobacz na mapie</a></td>
								<td class="hide-smol-screen">${jsonResponse.data[i].opening_status}</td>
                            </tr>`;
                }
                pasteIn += `
                        </tbody>
                    </table>`;
                restaurantContainer.innerHTML = pasteIn;
            } else {
                console.log("There has been an error with the request.");
            }
        }
    });
}
