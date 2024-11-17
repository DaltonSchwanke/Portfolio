var projectCount = 0;
var projectIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token');

    /**
     * Fetch and display project data
     */
    fetch('/projects').then(response => response.json()).then(data => {
        const projects = data.projects;
        const projectContainer = document.querySelector(".projectContainer");
        projects.forEach(project => {
            projectCount++;
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('projectDiv');
        
            // Create elements for the project
            const thumbnail = document.createElement('img');
            thumbnail.classList.add('projectImg');
            thumbnail.src = project.thumbnail || "/Resources/genericProject.jpg";
        
            const title = document.createElement('h2');
            title.classList.add('projectTitle');
            title.textContent = project.title;
        
            const dates = document.createElement('h4');
            dates.classList.add('projectDate');
            dates.textContent = project.date;
        
            const description = document.createElement('p');
            description.classList.add('projectDescription');
            description.textContent = project.description;
        
            const githublink = document.createElement("a");
            githublink.classList.add('projectGithub');
            githublink.href = project.github;
            githublink.target = "_blank";
            const githubImg = document.createElement('img');
            githubImg.classList.add("projectGithubImg");
            githubImg.src = '/Resources/githubLogo.png';
        
            // Append elements in the desired order
            githublink.append(githubImg);
            if (project.github) {
                projectDiv.append(githublink);
            }
        
            if (token) {
                const editBtn = document.createElement('button');
                const deleteBtn = document.createElement('button');
                editBtn.classList.add('editBtn');
                deleteBtn.classList.add('deleteBtn');
                editBtn.textContent = "Edit";
                deleteBtn.textContent = "x";
                editBtn.addEventListener('click', () => {
                    console.log(`Edit Project: ${project.title}`);
                });
                deleteBtn.addEventListener('click', () => {
                    console.log(`Delete Project: ${project.title}`);
                });
                projectDiv.appendChild(editBtn);
                projectDiv.appendChild(deleteBtn);
            }
        
            // Arrange elements (thumbnail left, text right)
            const projectDetails = document.createElement('div');
            projectDetails.classList.add('projectDetails');
            projectDetails.append(title, dates, description);
            projectDiv.append(thumbnail, projectDetails);
            projectContainer.append(projectDiv);
        });

        // Ensure the carousel starts in the correct state
        updateProjectCarousel();
    }).catch(err => {
        console.error('Error fetching project data:', err);
    });

    /**
     * Add click event for the next button
     */
    const projectNextBtn = document.getElementById("projectNextBtn");
    if (projectNextBtn) {
        projectNextBtn.addEventListener("click", () => {
            if (projectIndex < projectCount - 1) {
                projectIndex++;
                updateProjectCarousel();
            }
        });
    }

    /**
     * Add click event for the previous button
     */
    const projectPrevBtn = document.getElementById("projectPrevBtn");
    if (projectPrevBtn) {
        projectPrevBtn.addEventListener("click", () => {
            if (projectIndex > 0) {
                projectIndex--;
                updateProjectCarousel();
            }
        });
    }
});

/**
 * Update the project carousel and control visibility of navigation buttons
 */
function updateProjectCarousel() {
    console.log(`projectIndex: ${projectIndex}`);
    console.log(`projectCount: ${projectCount}`);
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
}