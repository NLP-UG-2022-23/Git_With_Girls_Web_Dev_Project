
function changeInnerHtmlRestaurantChoice (selectedDistrict,selectedCuisine){

    const restaurantContainer = document.getElementsByClassName('container');
    restaurantContainer.innerHTML = `
        <h2>Nearby ${selectedCuisine} restaurants for ${selctedDistrict}</h2>
        <table>
            <tr>
              <th>Restaurant</th>
              <th>Address</th>
            </tr>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
            </tr>
            <tr>
              <td>Centro comercial Moctezuma</td>
              <td>Francisco Chang</td>
            </tr>
          </table>
   `;
}
