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
        const frameworksContainer = document.createElement('div');
        frameworksContainer.classList.add('frameworksContainer');
        if(token){
            const test = document.createElement('p');
            test.textContent = "this works for frameworks";
            frameworksContainer.appendChild(test);
            languagesFrameworks.appendChild(frameworksContainer);
        }
    }).catch(err => {
        console.error('Error fetching framework data:', err);
    });
});