document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token');
    console.log("frameworks content token: ", token || "no token");


    /**
     *  The route below is used to get the frameworks from the server
     *  it for now when it returns it will just set it to an object, this code
     *  will later be used in the functionality in adding a new theme and adding
     *  new frameworks to the website. 
     */
      fetch("/frameworks").then(response => response.json()).then(data => {
        const frameworks = data.frameworks;
        const languagesFrameworks = document.getElementById('languagesFrameworks');
        const frameworksDiv = document.createElement('div');
        frameworksDiv.classList.add('frameworksContainer');
        if (token) {
            frameworks.forEach(framework => {
                const frameworkDiv = document.createElement('div');
                frameworkDiv.classList.add('frameworkContainer');
                const frameworkLogo = document.createElement('img');
                frameworkLogo.classList.add('frameworkImg');
                frameworkLogo.src = framework.logo || '/Resources/frameworkGeneric.png';
                const frameworkName = document.createElement('h3');
                frameworkName.classList.add('frameworkName');
                frameworkName.textContent = framework.name || "Oops forgot to put a framework name!";
                const deleteFrameworkBtn = document.createElement("button");
                deleteFrameworkBtn.classList.add("deleteFrameworkBtn");
                deleteFrameworkBtn.textContent = 'x';
                frameworkDiv.appendChild(frameworkLogo);
                frameworkDiv.appendChild(frameworkName);
                frameworkDiv.appendChild(deleteFrameworkBtn);
                frameworksDiv.appendChild(frameworkDiv);
            });
            languagesFrameworks.appendChild(frameworksDiv);
        }
    }).catch(err => {
        console.error('Error fetching framework data:', err);
    });
});