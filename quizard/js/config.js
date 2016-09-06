/**
 * @fileOverview
 * This is where certain constants are kept to make life a little bit easier
 * @author Damian Simon Peter on 9/25/2015.
 */

const DB_URL = "http://localhost/api4/php/api.php"; /** This url is where my PHP API gets list of register users*/

const QUIZ_SOURCE = "../package.json"; /** The link to the quiz source, pls feel free to change this to another source */

/**
 * Generates a random number between 0 and the specified length;
 * @param {number} len The length of the number indicating numbers between 0 and len
 * @returns {number} returns a random number
 * */
function rand(len){

    return Math.floor(Math.random() * len);
}


/**
 * Repositions element in an array on every call to the function i.e. each item takes a random index on every call
 * @param{object} arr The array you wish to shuffle
 * @returns{object} returns a new array
 * */
function shuffleArray(arr){
    var newArr = [];
    var len = arr.length;
    var ele = arr[rand(len)];

    if(newArr[0] === undefined){

        newArr.push(ele);
    }

    var j = 0;
    while(j<len*len){
        ele = arr[rand(len)];
        if(!valueInArray(newArr, ele)){
            newArr.push(ele);
        }

        j++;
    }
    return newArr;
}


/**
 * Checks to see if a value exist in an array
 * @param{object} arr The array you wish to check
 * @param{value} value The value you wish to check for in the array
 * @returns{boolean} returns true or false
 * */
function valueInArray(arr, value){

    var result = arr.some(function(val){

        if(val != value){
            return false;
        }
        return true;
    });

    return result;
}

