const userSelections = {};

        function nextQuestion(selectedChoice, nextQuestionId) {
            const questionContainer = document.getElementById('question-container');

            // Store user's selection
            const currentQuestionId = questionContainer.lastElementChild.id;
            userSelections[currentQuestionId] = selectedChoice;

            // Example logic: Update the content based on the selected choice
            if (nextQuestionId && currentQuestionId !== nextQuestionId) {
                let nextCuisine;
                if (nextQuestionId === 'question2') {
                    nextCuisine = 'Greek';
                } else if (nextQuestionId === 'question3') {
                    nextCuisine = 'Japanese';
                } else if (nextQuestionId === 'question4') {
                    nextCuisine = 'Thai';
                } else if (nextQuestionId === 'question5') {
                    nextCuisine = 'Chinese';
                } else if (nextQuestionId === 'question6') {
                    nextCuisine = 'French';
                } else if (nextQuestionId === 'question7') {
                    nextCuisine = 'American';
                } else if (nextQuestionId === 'question8') {
                    nextCuisine = 'American'; // Adjust as needed
                } else {
                    // Display final result
                    const finalCuisine = userSelections[currentQuestionId] || 'Italian';
                    questionContainer.innerHTML = `
                        <div class="result">
                            <p>It looks like you're in the mood for ${finalCuisine} cuisine!</p>
                        </div>
                    `;
                    return;
                }

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
        }
