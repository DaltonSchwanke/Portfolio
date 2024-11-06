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
          console.log("It worked");
          window.location.href = '/dashboard.html'; // Fixed typo in 'dashboard'
        } else {
          // Show error message
          alert(result.message || "Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login.");
      }
 }