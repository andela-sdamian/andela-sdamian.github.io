/**
 * @fileOverview
 * This class is responsible for fetching questions from any source and loads into the quiz app
 * @author Damian Simon Peter on 9/28/2015.
 */

/**
 * @constructor
 * Fetch Questions from any source synchronously not asynchronous this is to ensure the quiz is loaded before taking the test
 * @param {string} url The source url where questions are kept
 * @param {object} callback A callback function That executes after the question is loaded
 * */
function FetchAjax(url, callback){

    this.data = "";
    this.request = new XMLHttpRequest();

    this.request.open('GET', url, false);

    var temReq = this.request;


    function reqReadyStateChange(){

        if(temReq.readyState == 4){
            if(temReq.status == 200){

                callback(temReq.responseText);
            }else{

                return "Error occurred";
            }
        }
    }

    this.request.onreadystatechange = reqReadyStateChange;
}

FetchAjax.prototype.send = function(){

    this.request.send(null);
};