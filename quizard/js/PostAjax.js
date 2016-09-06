/**
 * @fileOverview
 * This is a simple function that sends user registration data to my MYSQL DB via my PHP API. Contact me if you want the backend code.
 * @author Damian Simon Peter on 9/30/2015.
 */

function toSimonPeterDB(data, url){

    var req = new XMLHttpRequest();
    req.open('POST', url, true);
    req.send(data);
    return req.responseText;
}