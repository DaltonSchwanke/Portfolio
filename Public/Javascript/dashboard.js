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

    fetch('/welcome').then(response => response.json()).then(data => {
        // Set the variables with the data returned from the server
        title = data.title || "No Title Available";
        message = data.message || "No Message Available";
        // For now, log the variables to the console to verify
        console.log("Title:", title);
        console.log("Message:", message);
    }).catch(err => {
        console.error('Error fetching welcome data:', err);
    });

    fetch('/contact').then(response => response.json()).then(data => {
        // Set the variables with the data returned from the server
        phone = data.phone || "No Title Available";
        email = data.email || "No Message Available";
        linkedIn = data.linkedIn || "No Title Available";
        github = data.github || "No Message Available";

        // For now, log the variables to the console to verify
        console.log(phone);
        console.log(email);
        console.log(linkedIn);
        console.log(github);
    }).catch(err => {
        console.error('Error fetching welcome data:', err);
    });


    const loginLink = document.getElementById('loginBtn');
    const dashboardLink = document.getElementById('dashboardLink');
    if (loginLink) {
        if (sessionStorage.getItem('token')) {
            loginLink.textContent = 'Log Out';
            loginLink.href = '/index';
            if (dashboardLink) {
                dashboardLink.style.display = 'block';
            }
            loginLink.addEventListener('click', () => {
                sessionStorage.removeItem('token');
                if (dashboardLink) {
                    dashboardLink.style.display = 'none';
                }
            });
        } else {
            loginLink.textContent = 'Admin';
            loginLink.href = '/login';
            if (dashboardLink) {
                dashboardLink.style.display = 'none';
            }
        }
    }
});

