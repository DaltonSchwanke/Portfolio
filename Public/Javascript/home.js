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
     * 
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
            //const logo = document.createElement('img');
            //logo.src = experience.logo;
            const description = document.createElement('p');
            description.textContent = experience.description;

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