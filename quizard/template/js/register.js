/**
 * This script is responsible for handling users registration
 * It utilizes the user-manager.js file I created
 * @author Damian Simon Peter on 9/26/2015.
 */

byID("terms").addEventListener("click", function(e){

   e.preventDefault();


    alert("There are no terms and conditions!\nEnjoy 100% open source software by\n-Damian Simon Peter");
});

byID("btnRegister").addEventListener("click", function(e){

    e.preventDefault();


    var data = document.frmRegister;
    var userData = {

        firstname:data.firstname.value,
        lastname:data.lastname.value,
        email:data.email.value,
        password:data.password.value,
        password2:data.password2.value
    };
    var chkAgree = byID("agree").checked;

   var result = registerNewUser(userData, chkAgree);
      alert(result.message);
});


