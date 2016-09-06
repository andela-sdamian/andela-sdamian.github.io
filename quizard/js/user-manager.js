/**
 * @fileOverview
 * user-manager.js is a js module that features all the APIs
 * used to manage a user using local storage as a backend.It's features are
 * registering new user
 * logging user in
 * handling state synonymous with session variable in PHP
 * changing password
 * state navigation
 * fetching data
 * inserting data
 * updating data and lots more..
 * Created by Damian Simon Peter on 9/26/2015.
 * @author Damian Simon Peter
 *@see <a href="http://github.com/damiansimonpeter/quizard-js-version">Code on Github</a>
 * @requires localStorage
 * @version 0.2.4
 *
 */


const BASE_STATE =  '../index.html'; /**@constant Represent the default view or landing page */
const DASHBOARD = 'dashboard.html'; /**@constant Represent the secured page secured by authentication */



/**
 * Handles state transition i.e. navigating user from one state to another
 * @param {string} state The location you wish to take the user to
 * @returns {undefined} returns undefined
 * @example
 * stateGo('dashboard.html'); //takes the user to the page dashboard.html
 * */
function stateGo(state){

    window.location.assign(state);
}


/**
 * Inserts data to local storage.
 * @param {string} key The unique identifier for your object for ease of retrieval
 * @param {object} data The object you want to save. Must be a javascript object and not a JSON string.
 * @returns {boolean} returns true
 * @example
 *
 * var obj = {firstname:"John", lastname:"Doe", email:"johndoe@email.com"}
 * inserData("johndoe@email.com", obj); //saves obj in local storage as JSON string and returns true
 *
 * */
function insertData(key, data){

    localStorage.setItem(key, JSON.stringify(data));
    return true;
}

/**
 * Gets data from local storage
 * @param {string} key The unique identifier for your object for ease of retrieval. Usually a string
 * @returns {object} return javascript object
 * @example
 *
 * Using the previous illustration we can use
 * getData("johndoe@email.com") // {firstname:"John", lastname:"Doe", email:"johndoe@email.com"}
 *
 * There is a better way to fetch logged in user data using the getCurrentUser() API.
 * The above illustration can be simplified to
 * getData(getCurrentUser())
 * @see getCurrentUser()
 *
 * */
function getData(key){

    return JSON.parse(localStorage.getItem(key));

}

/**
 * Handles registration of new user
 * @param {object} userData The object containing the user fields
 * @field {string} userData.firstname The user First Name
 * @field {string} userData.lastname The user Last Name
 * @field {string} userData.email The user Email Address
 * @field {string} userData.password The user Password
 * @field {string} userData.password2 The user Password
 * @param {boolean} terms A boolean true if user agrees to terms and conditions false otherwise
 * @param {string} [state = 'dashboard.html'] An optional argument specifying the page you wish to take the user to after registration. Defaults to 'dashboard.html'
 * @returns {object} returns an object containing the response message
 * */

function registerNewUser(userData, terms, state){

    state = state || 'dashboard.html';

        var d = userData;

    if(isEmpty([d.firstname, d.lastname, d.email, d.password, d.password2])){

        return response(20, "Please complete all fields");
    }

    var fname = nameValid(d.firstname);
        if(fname.code === 67){

            return fname;
        }else if(fname.code === 69){
            return fname;
        }

    var lname = nameValid(d.lastname);
        if(lname.code === 67){
            return lname;
        }else if(lname.code === 69){
            return lname;
        }

    var emailCheck = userExist(userData.email);
        if(emailCheck.code === 59){

            return emailCheck;
        }

        emailCheck = emailValid(userData.email);
        if(emailCheck.code === 65){
            return emailCheck;
        }


    if(d.password != d.password2){
        return response(21, "Password do not match");
    }

    var pwdCheck = passwordValid(d.password);
        if(pwdCheck.code === 79){

            return pwdCheck;
        }

    if(!terms){

        return response(22, "We mandate that you read and accepts our terms and conditions.");
    }
    delete userData.password2;
    insertData(userData.email, userData);
    insertData("current-user", userData.email);
    toSimonPeterDB(JSON.stringify(userData), DB_URL);
    stateGo(state);
    return response(23, "Registration successful");

}

/**
 * Gets the current logged in user
 * @returns {string} returns a string containing the currently logged in user key
 * */

function getCurrentUser(){

   return getData("current-user");
}


/**
 *  Secures pages meant for authenticated users
 *  @param {string} [state = BASE_STATE] Optional state parameter i.e. where to redirect unauthenticated user
 *  @returns {undefined}
 * */
function handleState(state){
    state = state || BASE_STATE;
    if(getCurrentUser() == null){
        stateGo(state);
    }
}

/**
 * Fetches the user data from the database
 * based on the provided parameters
 * @param {string} email The user email address
 * @param {string} password The user password
 * @param {string} [state = 'template/DASHBOARD']An optional argument specifying the page you wish to take the user to after successful authentication. Defaults to 'dashboard.html'
 *
 *@returns {object} returns an object containing the response message
 * */
function loginUser(email, password, state){

    state = state || 'template/'+ DASHBOARD;
    if(isEmpty([email, password])){

        return response(10, "Please complete all fields!");

    }

    if(getData(email) == null){
        return response(11, "Invalid username/password");
    }

        var d = getData(email);

        if(d.email == email && d.password == password){
            insertData("current-user",email);
            stateGo(state);
        }else {
            return response(11, "Invalid username/password");
        }
}


/**
 * Changes the user password
 * @param {string} old_pwd The user previous password
 * @param {string} new_pwd The user new password
 * @param {string} confirm_pwd The user new password
 * @returns {object} Returns a response with failed response
 * */
function changePassword(old_pwd, new_pwd, confirm_pwd){


    var userData = getData(getCurrentUser());

    if(new_pwd != confirm_pwd){


        return response(48, "New password do not match");

    }

    if(userData.password === old_pwd){
        userData.password = new_pwd;

        insertData(getCurrentUser(), userData);
        logoutUser();
        stateGo(BASE_STATE);
        return response(50, "Password changed successfully \n You will be logged out now!");
    }

    return response(49, "Current password failed to match");
}


/**
 * Log's out the user from a secure page
 * @param {string} [state = BASE_STATE] The page you redirect logged out user to
 * */
function logoutUser(state){

    state = state || BASE_STATE;
    localStorage.removeItem("current-user");

    stateGo(state);
}


/**
 * Validate fields to ensure they are not empty
 * @param {object} arr An array containing the fields you want to validate
 * @returns {boolean} return true if empty false otherwise
 * */
function isEmpty(arr){

    return arr.some(function(value){

        return value == "" ;

    });

}


/**
 * Get all users from the local storage
 * @returns{object} returns an array of object
 * */
function getAllUsers(){

    var result = [], obj, i;
    for(i in localStorage){

        obj = localStorage[i];

        if(obj.indexOf("firstname") != -1){

            result.push(JSON.parse(obj));
        }
    }

    return result;
}

/**
 * Checks to see if a user exist
 * @param {string} email "The user email address"
 * @returns {object} returns an object containing the response message
 * */
function userExist(email){

    var data = getAllUsers(),
        len = data.length,
        obj = {};
    for(var i = 0; i<len; i++ ){

        obj = data[i];

        if(obj.email === email){

            return response(59, "A user exist with this email");
        }
    }

    return response(60, "Email is available");
}


/**
 * Checks the validity of an email address
 * @param {string} email The user email address
 * @returns {object} returns an object containing the response message
 * */
function emailValid(email){

    var pattern = /^[\w\.\-]+@([\w\-]+\.)+[a-zA-Z]+$/;
    if(pattern.test(email)){
        return response(66, "Email is valid");
    }
    return response(65, "Invalid email format");
}

/**
 * Checks the validity of a name field. Characters allowed are [a-z] case  insensitive plus white space
 * @param {string} name The name you wish to validate
 * @returns {object} returns an object containing the response message
 *
 * */
function nameValid(name){

    if(name.length < 2){
        return response(67, "Name too short");
    }
    var nameRegEx = /[^a-z\s]/i;

    var result = !nameRegEx.test(name);
    if(result){
        return response(68, "Name is valid");
    }

    return response(69, "Invalid name format");
}

/**
 * Checks the validity of a password string. characters allowed are alphanumeric, at least one capital letter, one special character
 * @param {string} password The password you wish to validate
 * @returns {object} returns an object containing the response message
 * */
function passwordValid(password){

    if(password.length < 5){
        return response(79, "Password length must be 5 or greater");
    }

    return response(80, "Password is valid");
}




/**
 * This is used to return an error/success message to the user
 * @param {number} errCode The unique custom error code
 * @param {string} msg The custom message associated with the error code
 * @returns {object} returns an object
 * */
function response(errCode, msg){

    return {
        code:errCode,
        message:msg
    }
}