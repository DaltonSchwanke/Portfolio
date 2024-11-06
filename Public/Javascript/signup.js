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
            window.location.href = '/login.html';
        } else {
            console.log(result.message || "Signup failed. Please try again.");
        }
      } catch (error) {
            console.error("Error during signup:", error);
            console.log("An error occurred during signup.");
      }
 }