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
    if (dashboardLink) {
        dashboardLink.addEventListener('click', async (event) => {
            event.preventDefault(); // Prevent the default link behavior

            const token = sessionStorage.getItem('token'); // Get token from sessionStorage
            if (!token) {
                window.location.href = '/login'; // Redirect to login if no token
                return;
            }

            // Send token in Authorization header
            try {
                const response = await fetch('/dashboard', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    // If the response is OK (valid token), navigate to dashboard
                    window.location.href = '/dashboard';
                } else {
                    // If token is invalid, redirect to login
                    window.location.href = '/login';
                }
            } catch (error) {
                console.error('Error fetching dashboard:', error);
                window.location.href = '/login'; // On error, redirect to login
            }
        });
    }
});

/**
 *  The code below is used to track the user signup functionality. 
 *  Once the user clicks the button on the form it will then take the 
 *  username and password values before passing it off to the function 
 *  'signupUser'. 
 */
const signupBtn = document.getElementById('signupBtn');
if(signupBtn){
    signupBtn.addEventListener('click', () => {
        event.preventDefault();
        const signupUsername = document.getElementById('usernameSU').value;
        const signupPass = document.getElementById('passwordSU').value;
        console.log(signupUsername);
        console.log(signupPass);
        signupUser(signupUsername, signupPass);
    });
}

/**
 * The function below is used to sign a user up for the site. it will stringify the
 * username and password before it sets it to the request body. From there it will send it 
 * to the server. If the server sends back status 200 then it will redirect them to the 
 * login page. Otherwise it will send back an error message that will be seen in the console.  
 * @param {*} user 
 * @param {*} pass 
 */
async function signupUser(user, pass) {
    console.log(JSON.stringify({ user, pass }));
    try {
        const response = await fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user, pass })
        });
        const result = await response.json();
        if (response.ok) {
            console.log('Signup successful!');
            window.location.href = '/login';
        } else {
            console.log(result.message || "Signup failed. Please try again.");
        }
      } catch (error) {
            console.error("Error during signup:", error);
            console.log("An error occurred during signup.");
      }
 }
