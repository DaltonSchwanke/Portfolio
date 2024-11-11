var projectCount = 0;
var projectIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token');
    console.log("project content token: ", token || "no token");

    /**
     *  The route below is used to get the project data for the page.
     *  Once the data is set back it will create a variable linked to
     *  the section that the data will go in on the page. From here it
     *  will iterate over all the projects, creating new elements in the 
     *  and finally appending it to the section. 
     */
    fetch('/projects').then(response => response.json()).then(data => {
        const projects = data.projects;
        const projectContainer = document.querySelector(".projectContainer");
        projects.forEach(project => {
            projectCount++;
            const projectDiv = document.createElement('div');
            projectDiv.classList.add("projectDiv");
            const title = document.createElement('h2');
            title.textContent = project.title;
            const thumbnail = document.createElement('img');
            thumbnail.classList.add('projectImg');
            thumbnail.src = project.thumbnail || "/Resources/genericProject.jpg";
            const dates = document.createElement('h4');
            dates.textContent = project.date;
            const githublink = document.createElement("a");
            githublink.href = project.github;
            githublink.target = "_blank";
            const githubImg = document.createElement('img');
            githubImg.classList.add("projectGithubImg");
            githubImg.src = '/Resources/githubLogo.png';
            const description = document.createElement('p');
            description.textContent = project.description;

            if(token){
                var editBtn = document.createElement('button');
                var deleteBtn = document.createElement('button');
                editBtn.classList.add('editBtn');
                deleteBtn.classList.add('deleteBtn');
                editBtn.textContent = "Edit";
                deleteBtn.textContent = "x";
                editBtn.addEventListener('click', () => {
                    console.log(`Edit Project: ${project.title}`);
                })
                deleteBtn.addEventListener('click', () => {
                    console.log(`Delete Project: ${project.title}`);
                });
                projectDiv.appendChild(editBtn);
                projectDiv.appendChild(deleteBtn);
            }

            githublink.append(githubImg);
            if(project.github){
                projectDiv.append(githublink);
            }
            projectDiv.append(title, thumbnail, dates, description);
            projectContainer.append(projectDiv);
        });
    }).catch(err => {
    console.error('Error fetching project data:', err);
    });
    
    
    /**
     * The code below is used to track the next button for the projects. 
     * It then sets a variable to the amount of projects are in the 
     * container. Then it will 
     */
    const projectNextBtn = document.getElementById("projectNextBtn");
    if(projectNextBtn){
        projectNextBtn.addEventListener("click", () => {
            if (projectIndex < projectCount - 1) {
                projectIndex++;
                updateProjectCarousel();
            }
        });
    }
    
    
     /**
     * The code below is used to track the back button for the projects. 
     * It then sets a variable to the amount of projects are in the 
     * container. Then it will 
     */
    const projectPrevBtn = document.getElementById("projectPrevBtn");
    if(projectPrevBtn){
        projectPrevBtn.addEventListener("click", () => {
            if (projectIndex > 0) {
                projectIndex--;
                updateProjectCarousel();
            }
        });
    }
});


/**
 *  The function below is used to update the project carousel
 *  it first selects the section if the id 'projects' then the
 *  style transforms it by setting translating the x value 
 *  using the current index and then multiplying it by 100.
 */
function updateProjectCarousel() {
    console.log(`projectIndex: ${projectIndex}`);
    console.log(`projectCount: ${projectCount}`);
    const projectContainer = document.querySelector("#projects .projectContainer");
    projectContainer.style.transform = `translateX(-${projectIndex * 100}%)`;
}