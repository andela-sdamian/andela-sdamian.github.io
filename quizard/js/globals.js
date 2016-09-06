/**
 * @fileOverview
 * This is the bootstrap script, its the main entry to Quizard. Questions are fetched here and rendered to users
 * @author Damian Simon Peter on 9/25/2015.
 */
var n = 0; /**the question index */
var score = 0; /**holds the user score */
var state = []; /**Keeps track of the user choice in case of navigating front and back */
var questions;
var req = new FetchAjax(QUIZ_SOURCE, function(n){
    questions = JSON.parse(n) ;

    questions = shuffleArray(questions);

});

req.send();

