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