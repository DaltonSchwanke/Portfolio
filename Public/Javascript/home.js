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

    /**
     *  The request below gets the welcome message for the welcome 
     *  section. It will get back the title and welcome message. From 
     *  here it will check if the section is shown, if so it will create
     *  new elements for each elements before appending it to the welcome
     *  section. 
     */
    fetch('/welcome').then(response => response.json()).then(data => {
        title = data.title || "Dalton's Portfolio";
        message = data.message || "It looks like were experience some technical difficulties at the moment";
        const welcomeSection = document.getElementById('welcome');
        if(welcomeSection){
            welcomeSection.innerHTML = '';
            const titleElement = document.createElement('h2');
            titleElement.textContent = title;
            const messageElement = document.createElement('p');
            messageElement.textContent = message;
            welcomeSection.appendChild(titleElement);
            welcomeSection.appendChild(messageElement);
        }
    }).catch(err => {
        console.error('Error fetching welcome data:', err);
    });



    /**
     *  The request below gets the contact information from the back
     *  end of the site. It will get back the email, phone, linkedIn
     *  and Github. Then it will check if the contact section is shown
     *  if so then it will create new elements that will hold each 
     *  piece of information before it appends it to the contact section.
     */
    fetch('/contact').then(response => response.json()).then(data => {
        phone = data.phone || "No Title Available";
        email = data.email || "No Message Available";
        linkedIn = data.linkedIn || "No Title Available";
        github = data.github || "No Message Available";
        const contactSection = document.getElementById('contact');
        if(contactSection){
            const phoneElement = document.createElement('p');
            phoneElement.textContent = phone;
            const emailElement = document.createElement('p');
            emailElement.textContent = email;
            const linkedInElement = document.createElement('button');
            linkedInElement.textContent = linkedIn;
            const githubElement = document.createElement('button');
            githubElement.textContent = github;

            contactSection.appendChild(phoneElement);
            contactSection.appendChild(emailElement);
            contactSection.appendChild(linkedInElement);
            contactSection.appendChild(githubElement);
        }
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


    if (dashboardLink) {
        dashboardLink.addEventListener('click', async (event) => {
            event.preventDefault();
            const token = sessionStorage.getItem('token');
            if (!token) {
                window.location.href = '/login';
                return;
            }
            try {
                const response = await fetch('/dashboard', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    window.location.href = '/dashboard';
                } else {
                    window.location.href = '/login';
                }
            } catch (error) {
                console.error('Error fetching dashboard:', error);
                window.location.href = '/login';
            }
        });
    }
});