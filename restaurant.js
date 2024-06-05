

const locationListener = document.getElementById("locationSelect");
locationListener.onchange = function() 
{
var selectedDistrict = locationListener.options[locationListener.selectedIndex].value; 
console.log('wybrana dzielnica: ', selectedDistrict);
changeInnerHtmlRestaurantChoice(sessionStorage.getItem("quizResult"),selectedDistrict);
}

function getURL (selectedCuisine, selectedDistrict)
{
// function to be expanded upon if we include GPS localisation

districts=[{"districtName": "Wrzeszcz",  "lat":54.37931710641546.toFixed(6), "lng":18.604422368069187.toFixed(6)},
{"districtName": "Przymorze",  "lat":54.40859920920207.toFixed(6), "lng":18.588910165896515.toFixed(6)},
{"districtName": "Oliwa",  "lat":54.408160243529224.toFixed(6), "lng":18.559219422889726.toFixed(6)},
{"districtName": "Orunia",  "lat":54.32328943517544.toFixed(6), "lng":18.634600590481888.toFixed(6)},
{"districtName": "Brzeźno",  "lat":54.4051365354555.toFixed(6), "lng":18.630530031917402.toFixed(6)},
{"districtName": "Chełm",  "lat":54.34037636497941.toFixed(6), "lng":18.617366473033968.toFixed(6)},
{"districtName": "Stogi",  "lat":54.3608405860934.toFixed(6), "lng":18.712520356874155.toFixed(6)},
{"districtName": "Osowa",  "lat":54.423502295376196.toFixed(6), "lng":18.47373961819481.toFixed(6)},
{"districtName": "Jasień",  "lat":54.34239934972428.toFixed(6), "lng":18.560852136474324.toFixed(6)},
{"districtName": "Śródmieście",  "lat":54.34975036518239.toFixed(6), "lng":18.653272386818543.toFixed(6)},
{"districtName": "Zaspa",  "lat":54.394556438771005.toFixed(6), "lng":18.601721036899615.toFixed(6)},
{"districtName": "Łostowice",  "lat":54.31196713295995.toFixed(6), "lng":18.596903901818514.toFixed(6)}
];

//example url:
//'https://local-business-data.p.rapidapi.com/search-nearby?query=restauracja%20w%C5%82oska&lat=54.34673338855652&lng=18.61090728474828&limit=5&language=pl&region=pl'
//constructing the url
const cuisine = encodeURIComponent(selectedCuisine);
var url='https://local-business-data.p.rapidapi.com/search-nearby?query=restauracja%20'+cuisine;

for (let x of districts)
	{
	if (selectedDistrict === x["districtName"]) {//console.log('lat:', x["lat"],', lng:', x["lng"]);
	url+='}&lat='+x["lat"]+'&lng='+x["lng"]+'&limit=5&language=pl&region=pl'; return url;}
	}
}


function changeInnerHtmlRestaurantChoice(selectedCuisine,selectedDistrict){
	

	
const restaurantContainer = document.getElementById('restaurant-container');
restaurantContainer.innerHTML = `<h2>Restauracja ${selectedCuisine} ${selectedDistrict}</h2>
<p>Loading please wait</p>`

const data = null;
var url=getURL(selectedCuisine,selectedDistrict);
const xhr = new XMLHttpRequest();
var jsonResponse = null;
xhr.open('GET', url);
xhr.setRequestHeader('x-rapidapi-key', '8f28b2e0dbmshbfab90bd82a890dp1e7a0ajsn2c0482aaa7e5');
xhr.setRequestHeader('x-rapidapi-host', 'local-business-data.p.rapidapi.com');
xhr.send(data);
	
xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
	const status = xhr.status;
    if (status === 0 || (status >= 200 && status < 400)) {
      // The request has been completed successfully
		var jdata=this.responseText;
		jsonResponse = JSON.parse(jdata);
		console.log(jsonResponse);	
	
	var pasteIn=`
        <h2>Restauracja ${selectedCuisine} ${selectedDistrict}</h2>
        <table>
            <tr>
              <th>Name</th>
              <th>Address</th>
            </tr>`
	for (let i = 0 ; i < 5 ; i++){
		pasteIn+=`
            <tr>
              <td>${jsonResponse["data"][i]["name"]}</td>
              <td>${jsonResponse["data"][i]["address"]}</td>
            </tr>
            <tr>
              <td>Centro comercial Moctezuma</td>
              <td>Francisco Chang</td>
            </tr>
   `
pasteIn+=`</table>`;
restaurantContainer.innerHTML = pasteIn;
   ;}
	}
    else {console.log("There has been an error with the request.");}	
	}
	});
	
	
	
	}

