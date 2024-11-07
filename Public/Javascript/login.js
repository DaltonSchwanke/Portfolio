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
      if (response.ok) {
          console.log("Successful Login");
          window.location.href = '/dashboard';
      } else {
          const result = await response.json();
          console.log("Unsuccessful Login:", result.message);
          window.location.href = '/index';
      }
  } catch (error) {
      console.error("Error during login:", error);
      window.location.href = '/index';
  }
}