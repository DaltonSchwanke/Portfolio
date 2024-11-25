var projectCount = 0;
var projectIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    getProjects();
});


/**
 *  The function below is used to get the project data and then
 *  display it on the page. It first will send a 'GET' request to 
 *  the server and from there it will take in the data that it gave
 *  back (projects) and create carousel items for each one. Each 
 *  project will contain an image, title, date, description, link, 
 *  and github. If there is no stored image it will set it to a generic
 *  image. The link and github link will be checked and if they are 
 *  undefined then their button will not be displayed. If the user is 
 *  logged in as admin then there will be buttons for each project 
 *  for editing and deleting the project. There is also buttons to 
 *  switch through the project carousel items. 
 */
function getProjects(){
    const token = sessionStorage.getItem('token');
    const projectNextBtn = document.getElementById("projectNextBtn");
    const projectPrevBtn = document.getElementById("projectPrevBtn");
    fetch('/projects').then(response => response.json()).then(data => {

        const projects = data.projects;
        const projectContainer = document.querySelector(".projectContainer");

        projects.forEach(project => {
            projectCount++;

            const projectDiv = document.createElement('div');
            const projectDetails = document.createElement('div');
            const thumbnail = document.createElement('img');
            const title = document.createElement('h2');
            const dates = document.createElement('h4');
            const description = document.createElement('p');
            const projectBtn = document.createElement('button');
            const githubBtn = document.createElement('button');
            
            projectDiv.classList.add('projectDiv');
            projectDetails.classList.add('projectDetails');
            thumbnail.classList.add('projectImg');
            title.classList.add('projectTitle');
            dates.classList.add('projectDate');
            description.classList.add('projectDescription');
            projectBtn.classList.add("projectLinkBtn");
            githubBtn.classList.add('projectGithubBtn');
        
            title.textContent = project.title;
            dates.textContent = project.date;
            description.textContent = project.description;
            projectBtn.textContent = "Visit";
            githubBtn.textContent = "Code";
            thumbnail.src = project.thumbnail || "/Resources/genericProject.jpg";
            
            projectBtn.target = "_blank";
            githubBtn.target = "_blank";

            projectBtn.addEventListener('click', () => {
                window.open(project.url, "_blank");
            })
            githubBtn.addEventListener('click', () => {
                window.open(project.github, '_blank');
            });
        
            if (token) {

                const editBtn = document.createElement('button');
                const deleteBtn = document.createElement('button');

                editBtn.classList.add('editProjectBtn');
                deleteBtn.classList.add('deleteProjectBtn');

                editBtn.textContent = "Edit";
                deleteBtn.textContent = "x";

                editBtn.addEventListener('click', () => {
                     updateProject(project);
                });
                deleteBtn.addEventListener('click', () => {
                     deleteProject(project);
                });

                projectDiv.appendChild(editBtn);
                projectDiv.appendChild(deleteBtn);
            }

            projectDetails.append(title, dates, description);
            if(project.url){
                projectDetails.appendChild(projectBtn);
            }
            else{
                console.log("Project ", projectIndex, ": no link");
            }
            if(project.github){
                projectDetails.appendChild(githubBtn);
            }
            else{
                console.log("Project ", projectIndex, ": no github");
            }
            projectDiv.append(thumbnail, projectDetails);
            projectContainer.append(projectDiv);
        });

        updateProjectCarousel();
    }).catch(err => {
        console.error('Error fetching project data:', err);
    });

    if (projectNextBtn) {
        projectNextBtn.addEventListener("click", () => {
            if (projectIndex < projectCount - 1) {
                projectIndex++;
                updateProjectCarousel();
            }
        });
    }

    if (projectPrevBtn) {
        projectPrevBtn.addEventListener("click", () => {
            if (projectIndex > 0) {
                projectIndex--;
                updateProjectCarousel();
            }
        });
    }
}


/**
 *  The function below is used to update what is shown in the carousel. 
 *  it will get the an instance of the buttons and from there set the 
 *  x axis of the container to the x value and subtract the project 
 *  index * 100 as a percentage. Below that there is three conditions
 *  that control the visibility of the next and previous buttons. If 
 *  the user is on the first item it will remove the previous button. If
 *  the user is at the end of the list then it will remove the next button. 
 *  If there is only one or less project items then it won't show either 
 *  button. 
 */
function updateProjectCarousel() {
    const projectContainer = document.querySelector("#projects .projectContainer");
    const projectPrevBtn = document.getElementById("projectPrevBtn");
    const projectNextBtn = document.getElementById("projectNextBtn");

    projectContainer.style.transform = `translateX(-${projectIndex * 100}%)`;

    if (projectPrevBtn) {
        projectPrevBtn.style.display = projectIndex === 0 ? 'none' : 'block';
    }

    if (projectNextBtn) {
        projectNextBtn.style.display = projectIndex === projectCount - 1 ? 'none' : 'block';
    }
    
    if(projectCount <= 1 ){
        projectPrevBtn.style.display = 'none';
        projectNextBtn.style.display = 'none';
    }
}


/**
 *  This function will be used to update a projects data
 * 
 * @param {*} data 
 */
function updateProject(data){
    console.log("Updating Project: ", data);
}

/**
 *  This function will be used to delete a project. 
 * 
 * @param {*} data 
 */
function deleteProject(data){
    console.log("Deleting Project: ", data);
}