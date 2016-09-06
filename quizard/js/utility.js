/**
 * @author Damian Simon Peter on 9/25/2015.
 */


/**
 *  This function is responsible for
 *  getting the user selected choice
 * */
function handleSelectedOption(){
    var form = document.frmOptions;
    var options = form.option;
    for(var index = 0, max = options.length; index < max; index++){

        if(options[index].checked){
            return options[index].value;
        }

    }
    return "";
}

/** This function sets the question On a div
 * @param{string} question The question we wish to set to the DIV
 * */
function setQuestion(question){

    byID("question").textContent = question;
}


/**
 * This function generateOption is responsible for dynamically generating options and placing them on the DOM
 * @param{string} name The name of the radio button
 * @param{string} value The value in the radio button
 * @param{string} optionText The text beside the radio button
 * @param{string} [klass = 'form-control'] Optional class parameter
 *
 * */

function generateOption(name, value, optionText, klass){

    var radio = create("input"),
        label = create("label"),
        textNode = document.createTextNode(optionText);

    label.appendChild(textNode);
    label.insertBefore(radio,textNode);
    label.setAttribute("class", klass || "form-control");

    radio.type = "radio";
    radio.name = name;
    radio.value = value;

    return label;
}


/** This function is responsible for
 * taking away divs and letting the main
 * function generate new divs
 * */
function replaceQuestion(){

    setQuestion(null);
    var node = document.querySelectorAll("label");

    for(var i = 0; i<node.length; i++){

        document.frmOptions.removeChild(node[i]);
    }

    start();
}


/**
 * Handles the creation of previous button as well as attach event listener to the previous button
 * */
function previousBtn(){

    /**
     * Create a previous button if the question index (n) is greater than 1
     * */

    prevBtn = create('button');

    prevBtn.id = 'previous';
    prevBtn.setAttribute("class", "btn btn-danger");

    var span = create('span');
    span.setAttribute('class', 'glyphicon glyphicon-chevron-left');


    prevBtn.textContent = ' Previous';
    prevBtn.insertBefore(span, prevBtn.firstChild);
    ele = byID('btnHolder');

    ele.appendChild(prevBtn);

    byID("previous").addEventListener("click", prevQuestion);
}


/**
 * Responsible for tallying the user score
 * */
function tallyScore(){

    var btn = byID("submit");

    btn.remove(null);

    btn = byID('previous');
    btn.remove(null);

    var qCount = byID("qCount");
        qCount.remove(null);

    var ele = create("h1");

    ele.textContent = "Your score is " + score + "/" + questions.length;

    document.frmOptions.appendChild(ele);

}


/**
 * Responsible for post questions and Options to div
 * */
function postQuestionToDiv(){


    var question = questions[n].question;
    var options = questions[n].options;
    form = document.frmOptions;
    setQuestion(question);
    var max = options.length;
    for( i = 0; i < max; i++){
        form.appendChild(generateOption("option", i, " " + options[i]));
    }

}