
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
    console.log(token || "no token");

    /**
     *  The request below gets the welcome message for the welcome 
     *  section. It will get back the title and welcome message. From 
     *  here it will check if the section is shown, if so it will create
     *  new elements for each element before appending it to the welcome
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
     *  The route below is used to get the project data for the page.
     *  Once the data is set back it will create a variable linked to
     *  the section that the data will go in on the page. From here it
     *  will iterate over all the projects, creating new elements in the 
     *  and finally appending it to the section. 
     */
    fetch('/projects').then(response => response.json()).then(data => {
        const projects = data.projects;
        const projectSection = document.getElementById("projects");
        projects.forEach(project => {
            const projectDiv = document.createElement('div');
            const title = document.createElement('h2');
            title.textContent = project.title;
            const company = document.createElement('h3');
            company.textContent = project.company;
            const dates = document.createElement('h4');
            dates.textContent = project.date;
            const githublink = document.createElement("a");
            githublink.href = project.github;
            const githubImg = document.createElement('img');
            githubImg.classList.add("projectGithubImg");
            githubImg.src = '/Resources/githubLogo.png';
            if(project.github){
                githublink.src = project.github;
                githublink.target = "__blank";
            }
            const description = document.createElement('p');
            description.textContent = project.description;
            githublink.append(githubImg);
            projectDiv.append(title);
            projectDiv.append(company);
            projectDiv.append(dates);
            projectDiv.append(githublink);
            projectDiv.append(description);
            projectSection.append(projectDiv);
        });

    }).catch(err => {
        console.error('Error fetching project data:', err);
    });


    /**
     *  The route below is used to get the languages from the server
     *  it for now just sets the data to a new variable. This code will 
     *  be used in creating a new project and the adding new languages 
     *  to the website. 
     */
    fetch("/languages").then(response => response.json()).then(data => {
        const languages = data.languages;
    }).catch(err => {
        console.error('Error fetching language data:', err);
    });


    /**
     *  The route below is used to get the frameworks from the server
     *  it for now when it returns it will just set it to an object, this code
     *  will later be used in the functionality in adding a new theme and adding
     *  new frameworks to the website. 
     */
    fetch("/frameworks").then(response => response.json()).then(data => {
        const frameworks = data.frameworks;
    }).catch(err => {
        console.error('Error fetching framework data:', err);
    });


    /**
     *  The fetch method below is used to get the experience data from the
     *  server. It will then set the data sent back as a variable, then 
     *  create a variable for the section the content will go on the page. 
     *  From there it will iterate over each item in experiences, creating
     *  new elements for each piece of data. Finally it will append it to
     *  the page section. 
     */
    fetch('/experience').then(response => response.json()).then(data => {
        const experiences = data.experience;
        const experienceSection = document.getElementById("experience");
        experiences.forEach(experience => {
            const experienceDiv = document.createElement('div');
            const company = document.createElement('h2');
            company.textContent = experience.company;
            const title = document.createElement('h3');
            title.textContent = experience.title;
            const dates = document.createElement('h4');
            dates.textContent = experience.dates;
            const logo = document.createElement('img');
            logo.classList.add("experienceImg");
            logo.src = experience.logo || "/Resources/genericExperience.png";
            const description = document.createElement('p');
            description.textContent = experience.description;
            experienceDiv.append(logo);
            experienceDiv.append(company);
            experienceDiv.append(title);
            experienceDiv.append(dates);
            experienceDiv.append(description);
            experienceSection.append(experienceDiv);
        });
    }).catch(err => {
        console.error("Error fetching experience data:", err);
    });


    /** 
     *  This section is used to get the data for the education section
     *  it once it gets the data back it will loop through each item in
     *  the array. For each item it will create a new element for that 
     *  piece of data before appending it to it's div container and 
     *  then to the 'aboutSection' on the home page. 
     */
    fetch('/education').then(response => response.json()).then(data => {
        const educations = data.educations;
        const educationSection = document.getElementById("education");
        educations.forEach(education => {
            const educationDiv = document.createElement('div');
            const school = document.createElement('h2');
            school.textContent = education.school;
            const title = document.createElement('h3');
            title.textContent = education.title;
            const dates = document.createElement('h4');
            dates.textContent = education.dates;
            const logo = document.createElement('img');
            logo.classList.add("educationImg");
            logo.src = education.logo || "/Resources/education.png";
            const description = document.createElement('p');
            description.textContent = education.description;
            educationDiv.append(school);
            educationDiv.append(title);
            educationDiv.append(dates);
            educationDiv.append(logo);
            educationDiv.append(description);
            educationSection.append(educationDiv);
        });
    }).catch(err => {
        console.error("Error fetching education data:", err);
    });


    /**
     *  Below is code used to get the about section content. It will
     *  send a request to the server and then set the data sent back
     *  to two objects, 'texts' and 'images'. From here it will then 
     *  create new sections for each text and image, if the image
     *  source doesn't work then it will create a different element
     *  containing the caption for the image.
     */
    fetch('/about').then(response => response.json()).then(data => {
        texts = data.texts || [];
        images = data.images || "No Images available";
        const aboutSection = document.getElementById("about");
        texts.forEach(textItem => {
            const textSection = document.createElement('section');
            textSection.classList.add('text-item');
            const heading = document.createElement('h3');
            heading.textContent = textItem.heading;
            const content = document.createElement('p');
            content.textContent = textItem.content;
            textSection.appendChild(heading);
            textSection.appendChild(content);
            aboutSection.appendChild(textSection);
        });
        images.forEach(image => {
            const imageSection = document.createElement('section');
            imageSection.classList.add('image-item');
            const img = document.createElement('img');
            img.alt = image.caption;
            img.src = image.url;
            img.onerror = function() {
                const fallbackText = document.createElement('div');
                fallbackText.textContent = image.caption;
                fallbackText.style.color = 'gray';
                aboutSection.append(fallbackText);
            };
            aboutSection.append(imageSection);
        })
    }).catch(err => {
        console.error("Error fetching about data:", err);
    });


    /**
     *  The request below gets the contact information from the back
     *  end of the site. It will get back the email, phone, linkedIn
     *  and Github. Then it will check if the contact section is shown
     *  if so then it will create new elements that will hold each 
     *  piece of information before it appends it to the contact section.
     */
    fetch('/contact').then(response => response.json()).then(data => {
        phone = data.phone || "Current not reachable by phone";
        email = data.email || "Currently not reachable by phone";
        linkedIn = data.linkedIn || "Not very professional of me to not have my linked in linked";
        github = data.github;
        const contactSection = document.getElementById('contact');
        if(contactSection){
            const phoneElement = document.createElement('p');
            phoneElement.textContent = phone;
            const emailElement = document.createElement('p');
            emailElement.textContent = email;
            const linkedInElement = document.createElement('a');
            const linkedinImg = document.createElement('img');
            linkedinImg.id = 'linkedInButton';
            linkedinImg.src = "/Resources/linkedInLogo.png"; 
            if(linkedIn){
                linkedInElement.href = linkedIn;
                linkedInElement.target = "__blank";
                console.log("got here");
            }
            const githubElement = document.createElement('a');
            const githubImg = document.createElement('img');
            githubImg.id = 'githubButton';
            githubImg.src = "/Resources/githubLogo.png"; 
            if(github){
                githubElement.href = github;
                githubElement.target = "__blank";
            }
            linkedInElement.append(linkedinImg);
            githubElement.append(githubImg);
            contactSection.appendChild(phoneElement);
            contactSection.appendChild(emailElement);
            contactSection.appendChild(linkedInElement);
            contactSection.appendChild(githubElement);
        }
    }).catch(err => {
        console.error('Error fetching welcome data:', err);
    });



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
                const loginForm = document.getElementById('loginFormContainer');
                loginForm.style.display = "block";
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
        console.log("close");
        loginForm.style.display = "none";
    }
}

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
        if (response.ok) {
            console.log(result.token);
            sessionStorage.setItem('token', result.token);
            message.textContent = "Hi Dalton!";
            

        } else {
            console.log("error logging in");
            message.textContent = "You aren't Dalton!"
        }
        const formBox = document.getElementById('formBox');
        formBox.innerHTML = '';
        formBox.append(message);
        setTimeout(() => {
            const loginForm = document.getElementById('loginFormContainer');
            if(loginForm){
                console.log("close after wait");
                loginForm.style.display = "none";
            }  
            window.location.href = '/'; 
        },1000);
    } catch (error) {
        console.error("Error during login:", error);
        window.location.href = '/index';
    }
}
