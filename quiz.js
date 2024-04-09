const userSelections = {};
const cuisineList = [{"question_id":'question0', "culture":'Italian', "images":["https://images.pexels.com/photos/7218637/pexels-photo-7218637.jpeg", "https://images.pexels.com/photos/17942040/pexels-photo-17942040.jpeg"]}, 
{"question_id":'question1', "culture":'Polish', "images":["https://images.pexels.com/photos/4084924/pexels-photo-4084924.jpeg", "https://images.pexels.com/photos/4202381/pexels-photo-4202381.jpeg"]}, 
{"question_id":'question2', "culture":'Greek', "images":["https://images.pexels.com/photos/10780004/pexels-photo-10780004.jpeg", "https://plus.unsplash.com/premium_photo-1667215177072-6539146bc577"]}, 
{"question_id":'question3', "culture":'Japanese', "images":["https://images.pexels.com/photos/670705/pexels-photo-670705.jpeg", "https://images.pexels.com/photos/628776/pexels-photo-628776.jpeg"]}, 
{"question_id":'question4', "culture":'Thai', "images":["https://plus.unsplash.com/premium_photo-1669150852119-74b41d658be5", "https://images.pexels.com/photos/12481161/pexels-photo-12481161.jpeg"]}, 
{"question_id":'question5', "culture":'Chinese', "images":["https://images.pexels.com/photos/5409015/pexels-photo-5409015.jpeg", "https://images.pexels.com/photos/7364181/pexels-photo-7364181.jpeg"]}, 
{"question_id":'question6', "culture":'French', "images":["https://images.pexels.com/photos/5975493/pexels-photo-5975493.jpeg", "https://images.pexels.com/photos/4946442/pexels-photo-4946442.jpeg"]}, 
{"question_id":'question7', "culture":'American', "images":["https://images.unsplash.com/photo-1602030638412-bb8dcc0bc8b0", "https://images.pexels.com/photos/4676419/pexels-photo-4676419.jpeg"]}
]


function pickImage (whatIdToRoll)
{
    let number=parseInt(whatIdToRoll.charAt(8))
    let randomElement = cuisineList[number].images[Math.floor(Math.random() * cuisineList[number].images.length)];
    return randomElement;
}



function nextQuestion(selectedChoice, nextQuestionId,selectedChoicePicture) {
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

        //new question

        changeInnerHtmlAddImages(selectedChoice,nextCuisine,nextQuestionId,selectedChoicePicture)
        }

function changeInnerHtmlAddImages (selectedChoice,nextCuisine,nextQuestionId,selectedChoicePicture){

    const questionContainer = document.getElementById('question-container');
    let nextPicture = pickImage(nextQuestionId);
    questionContainer.innerHTML = `
        <div class="question" id="${nextQuestionId}">
            <p>${selectedChoice} or ${nextCuisine}?</p>
            <div class="choices">
                <div class="choice" onclick="nextQuestion('${selectedChoice}', 'question${parseInt(nextQuestionId.charAt(8)) + 1}','${selectedChoicePicture}')">${selectedChoice} <img src="${selectedChoicePicture}"></div>
                <div class="choice" onclick="nextQuestion('${nextCuisine}', 'question${parseInt(nextQuestionId.charAt(8)) + 1}','${nextPicture}')">${nextCuisine} <img src="${nextPicture}"></div>
            </div>
        </div>
    `;
}