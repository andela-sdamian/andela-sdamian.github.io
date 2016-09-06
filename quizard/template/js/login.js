/**
 * @fileOverview
 * This script handles login related matters
 * It utilizes the user-manager.js file I created
 * @author Damian Simon Peter on 9/26/2015.
 */
document.addEventListener("DOMContentLoaded", function(e){


    if(getCurrentUser() != null){

        stateGo('template/dashboard.html');
    }
    var btnLogin = document.getElementById("btnLogin");

    btnLogin.addEventListener("click", function(e){

        e.preventDefault();

        var d = document.frmLogin;
        var result = loginUser(d.email.value, d.password.value);

        alert(result.message);


    });

});