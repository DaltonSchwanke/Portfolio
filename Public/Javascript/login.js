 /**
  *  -- This doesn't work on this page for some reason????????
  *  
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
          console.log("got here");
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

/**
 *  Below is code used to capture the function of the login button/form
 *  once clicked it will collect the username and password inputted from the 
 *  user and then pass that data to the 'loginUser()' function. 
 */
const loginBtn = document.getElementById('loginBtn');
if(loginBtn){
    loginBtn.addEventListener('click', () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        console.log(username);
        console.log(password);
        loginUser(username, password);
    });
}

/**
 * This function is used to log in a user into the site, it will take 
 * in the user username and password and then stringifies it before setting 
 * it as the request body. From there it is requested from the server, if
 * the login is successful then it will redirect them to the dashboard page. 
 * if not it will redirect them back to the home page. 
 */
async function loginUser(user, pass) {
  try {   
      const response = await fetch('/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user, pass })
      });
      const result = await response.json();
      if (response.ok) {
          console.log(result.token);
          sessionStorage.setItem('token', result.token);
          window.location.href = '/dashboard';
      } else {
          console.log(result);
          window.location.href = '/index';
      }
  } catch (error) {
      console.error("Error during login:", error);
      window.location.href = '/index';
  }
}