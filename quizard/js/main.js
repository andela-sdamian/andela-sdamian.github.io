/**@fileOverview
 * This script is responsible for navigating the quiz such as moving back and forth as well as maintaining state of the user choice
 * @author Damian Simon Peter on 9/25/2015.
 */


byID("submit").addEventListener("click", checkAnswer);

start();



function start(){
    var qCount = byID("qCount");
    qCount.innerHTML = n+1 + "/" + questions.length; /** question index */
    var prevBtn = byID('previous');

    if(prevBtn){

        prevBtn.remove(null); /** removes duplicate previous buttons */
    }

    if(n > 0){

        previousBtn(); /** shows previous button */

    }

    /**
     * Checks if user is at the last question
     * and tally's the user score
     * */

    if(n === questions.length){

        var right = questions;
        for(var j = 0; j < state.length; j++){

            if(state[j] == right[j].answer){

                score = score + 1;
            }
        }
        tallyScore();
        return;
    }
        postQuestionToDiv();

    if(state.length >= n){

        var form = document.frmOptions;
        var choice = form.option;
        var picked = state[n];

        for(var i = 0; i<choice.length; i++){

            if(choice[i].value == picked){
                choice[i].checked = true;

            }
        }

    }
}


function checkAnswer(){

    var answer = questions[n].answer; /** holds the answer */

    var userChoice = handleSelectedOption(); /** holds the user choice */

    if(userChoice == "") {alert('Please select an option'); return;}

    if(state.length == 0){

        state.push(userChoice);
    }

    /** update user choice */

    state[n] = userChoice;
    if(state[n] === undefined){
        state.push(userChoice);
    }

    n++;
    replaceQuestion();

}

/**
 * Handle previous questions routines
 * */
function prevQuestion(){

    /** no previous question, do nothing */
    if(n < 0){
        return false;
    }
    n = n - 1; /** change the question index to load the previous button */

    replaceQuestion();

    /**
     * Checks to see if the state global array is not empty
     * if not empty, it pre-checks the radio button
     * with the user previous choice
     * */
    if(state.length > 0){
        var choice = document.frmOptions.option;
        var index = state[n];
        choice[index].checked = true;

    }

}
