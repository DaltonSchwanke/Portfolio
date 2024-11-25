
 /**
  *  The code below is used to control whether the user is about to
  *  login or log out of account for the website. It first will check 
  *  to see if the login link is present, if so then it will check if
  *  there is a token in the session storage, if so then set the 
  *  text content of the link to 'log out' and the href to 'index'.
  *  If there is no token in session storage then set the link href
  *  to 'login' and set the text content to 'Admin'. 
 */
 document.addEventListener('DOMContentLoaded', () => {

    const token = sessionStorage.getItem('token');
    const loginForm = document.getElementById('loginFormContainer');


    /**
     *  This code manages the login link in the footer of the 
     *  page, it creates a variable assigned to it and then 
     *  will check if the user has a token, if so it will 
     *  set the button's text content to 'log out' and have
     *  the user redirected back home, otherwise it will 
     *  have the text content 'Admin' and have the href set 
     *  to the login page. 
     */
    const loginLink = document.getElementById('loginBtn');
    if (loginLink) {
        if(token){
            loginLink.textContent = "Log Out";
            loginLink.addEventListener('click', () => {
                event.preventDefault();
                sessionStorage.removeItem('token');
                window.location.href = '/index';
            })
        }else{
            loginLink.textContent = "Admin";
            loginLink.addEventListener('click', () => {
                event.preventDefault();
                loginLink.textContent = "Admin";
                loginForm.classList.remove('hidden');
                loginForm.classList.add("popup");
            }); 
        }
    }
});


/**
 *  The function below is used to close the login form if the user 
 *  decides not to log in. This is used in the 'index.html' file.
 *  It is only going to be used when the form is open. 
*/
function closeLogin(){
    const loginForm = document.getElementById('loginFormContainer');
    if(loginForm){
        loginForm.classList.remove('popup');
        loginForm.classList.add("hidden");
    }
}


/**
 *  The code below is used to log the user into the admin varient 
 *  of the page. It will first get the values of the username and 
 *  password fields of the page, then it will send a fetch request
 *  to the server to check is the user is valid. If the user exists
 *  then it will then remove the form and pop up a message saying hello
 *  otherwise it will pop up a message saying the user who tried to 
 *  login isn't the admin. It will then wait a second before reloading
 *  the page. 
 */
async function loginUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    try {   
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const result = await response.json();
        const message = document.createElement('h3');
        message.id = "loginResMessage";
        if (response.ok) {
            sessionStorage.setItem('token', result.token);
            message.textContent = "Hi Dalton!";

        } else {
            message.textContent = "You aren't Dalton!"
        }
        const formBox = document.getElementById('formBox');
        formBox.innerHTML = '';
        formBox.append(message);
        setTimeout(() => {
            const loginForm = document.getElementById('loginFormContainer');
            if(loginForm){
                loginForm.classList.remove('popup');
                loginForm.classList.add("hidden");
            }  
            window.location.href = '/'; 
        },1000);
    } catch (error) {
        console.error("Error during login:", error);
        window.location.href = '/index';
    }
}

