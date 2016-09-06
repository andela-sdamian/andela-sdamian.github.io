/**
 * @fileOverview
 * This script is responsible for dashboard related matters
 * @author Damian Simon Peter on 9/26/2015.
 */

document.addEventListener("DOMContentLoaded", function(e){

    handleState();

    var d = document.frmUserData;
    var userData =  getData(getCurrentUser());

    d.firstname.value = userData.firstname;
    d.lastname.value = userData.lastname;
    d.email.value = userData.email;

    var h = document.getElementById("question");
    h.innerHTML = "Welcome, <i>" + userData.firstname + "</i>";

    /** Logout Button */
    var btnLogout = byID("btnLogout");

    btnLogout.addEventListener("click", function(e){

        logoutUser();
    });

    /** Quiz Button */
    var btnQuiz = byID("btnQuiz");

    btnQuiz.addEventListener("click", function(e){

        stateGo('quiz.html');
    });


    /** Change Password button */
    var btnChangePwd = byID("btnChangePwd");
        btnChangePwd.addEventListener("click", function(e){

           var old_pwd = prompt("Enter previous password!");

            if(!old_pwd){
                return false;
            }
           var new_pwd = prompt("Enter new password!");
           var confirm_pwd = prompt("Confirm new password");

           var result = changePassword(old_pwd, new_pwd, confirm_pwd);

            alert(result.message);

        });


    /** Update Data button */

    var countClicks = 0;
    var btnUpdateData = byID("btnUpdateData");
        btnUpdateData.addEventListener("click", function(e){

            countClicks++;
           var firstname_disabled = byID("firstname").disabled;
           var lastname_diabled = byID("lastname").disabled;

            if(firstname_disabled && lastname_diabled){

                alert("Please note that you cannot update your email. Thanks");
                    byID("firstname").disabled = false;
                    byID("lastname").disabled = false;
                    btnUpdateData.value = "Save";
          }

            if(countClicks > 1){

                var userData = getData(getCurrentUser());
                var firstname = byID("firstname").value;
                var lastname = byID("lastname").value;

                if(userData.firstname != firstname || userData.lastname != lastname ){

                    var res = confirm("It seems you have made some changes\n Are you willing to save it?");
                    if(res){

                        userData.firstname = firstname;
                        userData.lastname = lastname;
                        insertData(getCurrentUser(), userData);
                        countClicks = 0;
                        btnUpdateData.value = "Update Data";
                        byID("firstname").disabled = true;
                        byID("lastname").disabled = true;
                    }
                }

            }

        });
});