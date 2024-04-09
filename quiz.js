const userSelections = {};
const cuisineList = [{"question_id":'question0', "culture":'Italian',"images":["https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", ""]},
{"question_id":'question1', "culture":'Polish',"images":["https://images.pexels.com/photos/4084924/pexels-photo-4084924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", ""]},
{"question_id":'question2', "culture":'Greek',"images":["https://images.pexels.com/photos/434258/pexels-photo-434258.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", ""]},
{"question_id":'question3', "culture":'Japanese',"images":["https://images.pexels.com/photos/628776/pexels-photo-628776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", ""]},
{"question_id":'question4', "culture":'Thai',"images":["https://images.pexels.com/photos/12481161/pexels-photo-12481161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", ""]},
{"question_id":'question5', "culture":'Chinese',"images":["https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", ""]},
{"question_id":'question6', "culture":'French',"images":["https://images.pexels.com/photos/8350198/pexels-photo-8350198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", ""]},
{"question_id":'question7', "culture":'American',"images":["https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", ""]},]


function pickImage (whatIdToRoll)
{
    //currently we only have one image per cuisine so commenting out the randomising part
    let number=parseInt(whatIdToRoll.charAt(8))
    // let randomElement = cuisineList[number].images[Math.floor(Math.random() * cuisineList[number].images.length)];
    // return randomElement;

    return cuisineList[number].images[0];
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
        sessionStorage.setItem("quizResult",finalCuisine);
        questionContainer.innerHTML = `
                <div class="result">
                    <p>It looks like you're in the mood for ${finalCuisine} cuisine!</p>
                </div>
            `;
        
            // timing of changing page 
            setTimeout(() => {
                window.location.href = 'restaurant.html';
            }, 3000);

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
