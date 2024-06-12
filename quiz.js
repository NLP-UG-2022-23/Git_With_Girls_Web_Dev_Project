const userSelections = {};
const cuisineList = [{"question_id":'question0', "culture":'Włoska',"images":["https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/769969/pexels-photo-769969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]},
{"question_id":'question1', "culture":'Polska',"images":["https://images.pexels.com/photos/4084924/pexels-photo-4084924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/4202385/pexels-photo-4202385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/6133/food-polish-cooking-making.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]},
{"question_id":'question2', "culture":'Grecka',"images":["https://images.pexels.com/photos/434258/pexels-photo-434258.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/726001/pexels-photo-726001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]},
{"question_id":'question3', "culture":'Japońska',"images":["https://images.pexels.com/photos/628776/pexels-photo-628776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/359993/pexels-photo-359993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/3763814/pexels-photo-3763814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]},
{"question_id":'question4', "culture":'Tajska',"images":["https://images.pexels.com/photos/12481161/pexels-photo-12481161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/10756648/pexels-photo-10756648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/6454806/pexels-photo-6454806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]},
{"question_id":'question5', "culture":'Chińska',"images":["https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/3054690/pexels-photo-3054690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/1028734/pexels-photo-1028734.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]},
{"question_id":'question6', "culture":'Francuska',"images":["https://images.pexels.com/photos/8350198/pexels-photo-8350198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/3850431/pexels-photo-3850431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/8350663/pexels-photo-8350663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]},
{"question_id":'question7', "culture":'Amerykańska',"images":["https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/4676400/pexels-photo-4676400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/4790307/pexels-photo-4790307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]},]


function pickImage (whatIdToRoll)
{
    let number=parseInt(whatIdToRoll.charAt(8))
    let randomElement = cuisineList[number].images[Math.floor(Math.random() * cuisineList[number].images.length)];
    if (randomElement===undefined)
    {
        return cuisineList[number].images[0];
        //fallback option
    }
    else   {return randomElement;}

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
                    <p>Wygląda na to, że ${finalCuisine} kuchnia jest tym, na co masz ochotę!</p>
                    <p>Przekierowanie do strony wyboru restauracji...</p>
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
