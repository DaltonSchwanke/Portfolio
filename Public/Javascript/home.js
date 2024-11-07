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
});