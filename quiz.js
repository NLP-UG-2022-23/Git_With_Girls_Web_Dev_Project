const userSelections = {};
const cuisineList = [{ "question_id": 'question0', "culture": 'Italian', "images": ["https://www.pexels.com/photo/delicious-spaghetti-with-bolognese-sauce-and-parmesan-cheese-7218637/", "https://www.pexels.com/photo/woman-taking-a-slice-of-pizza-17942040/"] },
{ "question_id": 'question1', "culture": 'Polish', "images": ["https://www.pexels.com/photo/brown-cookies-on-brown-wooden-table-4084924/", "https://www.pexels.com/photo/delicious-potato-dumplings-with-fried-bacon-slices-on-round-plate-4202381/"] },
{ "question_id": 'question2', "culture": 'Greek', "images": ["https://www.pexels.com/photo/fresh-tofu-and-tomatoes-on-a-bowl-10780004/", "https://unsplash.com/photos/a-plate-of-food-on-a-table-with-vegetables-zON7CMCQogQ"] },
{ "question_id": 'question3', "culture": 'Japanese', "images": ["https://www.pexels.com/photo/cooked-food-on-brown-wooden-board-670705/", "https://www.pexels.com/photo/close-up-photo-of-mouth-watering-sashimi-628776/"] },
{ "question_id": 'question4', "culture": 'Thai', "images": ["https://unsplash.com/photos/a-table-topped-with-plates-filled-with-food-rWq_kKjrOfo", "https://www.pexels.com/photo/pad-thai-in-white-ceramic-plate-12481161/"] },
{ "question_id": 'question5', "culture": 'Chinese', "images": ["https://www.pexels.com/photo/soup-with-dimsums-and-vegetables-on-ceramic-bowl-5409015/", "https://www.pexels.com/photo/trays-with-delicious-asian-dumplings-with-chopsticks-placed-on-table-7364181/"] },
{ "question_id": 'question6', "culture": 'French', "images": ["https://www.pexels.com/photo/top-view-of-a-charcuterie-5975493/", "https://www.pexels.com/photo/appetizing-escargots-dish-served-in-restaurant-4946442/"] },
{ "question_id": 'question7', "culture": 'American', "images": ["https://unsplash.com/photos/burger-with-lettuce-and-tomatoes-on-white-ceramic-plate-MH_lBTvkvPM", "https://www.pexels.com/photo/person-holding-hotdog-4676419/"] }
]

//const randomElement = array[Math.floor(Math.random() * array.length)];
//use sth like this to implement the random pic thing



function nextQuestion(selectedChoice, nextQuestionId) {
    const questionContainer = document.getElementById('question-container');

    // Store user's selection
    // this is fine
    const currentQuestionId = questionContainer.lastElementChild.id;
    userSelections[currentQuestionId] = selectedChoice;

    // Update the content based on the selected choice
    // step 1 picks next cuisine
    let nextCuisine;
    for (let i = 2; i <cuisineList.length;i++)
    {
        if (nextQuestionId === cuisineList[i].question_id) {
            nextCuisine = cuisineList[i].culture;}
    } 

    // step 2 Display final result if at the end of the quiz

    if (parseInt(nextQuestionId.charAt(8))===cuisineList.length)
    { 
        const finalCuisine = userSelections[currentQuestionId];
        questionContainer.innerHTML = `
                <div class="result">
                    <p>It looks like you're in the mood for ${finalCuisine} cuisine!</p>
                </div>
            `;
            //gives the result and terminates the question iteration, ends the recursive main function
        return;}

    questionContainer.innerHTML = `
        <div class="question" id="${nextQuestionId}">
            <p>${selectedChoice} or ${nextCuisine}?</p>
            <div class="choices">
                <div class="choice" onclick="nextQuestion('${selectedChoice}', 'question${parseInt(nextQuestionId.charAt(8)) + 1}')">${selectedChoice}</div>
                <div class="choice" onclick="nextQuestion('${nextCuisine}', 'question${parseInt(nextQuestionId.charAt(8)) + 1}')">${nextCuisine}</div>
            </div>
        </div>
    `;

        }
