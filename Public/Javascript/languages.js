document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token');
    console.log("languages content token: ", token || "no token");


    /**
     *  The route below is used to get the languages from the server
     *  it for now just sets the data to a new variable. This code will 
     *  be used in creating a new project and the adding new languages 
     *  to the website. 
     */
      fetch("/languages").then(response => response.json()).then(data => {
        const languages = data.languages;
        const languagesFrameworks = document.getElementById('languagesFrameworks');
        const languagesDiv = document.createElement('div');
        languagesDiv.classList.add('languagesContainer');
        if(token){
            const editBtn = document.createElement('button');
                editBtn.classList.add('editBtn');
                editBtn.textContent = "Edit";
                editBtn.addEventListener('click', () => {
                    console.log(`Edit Languages Section`);
                });
            const test = document.createElement('p');
            test.textContent = "this works for languages";
            languagesFrameworks.appendChild(editBtn);
            languagesDiv.appendChild(test);
            languagesFrameworks.appendChild(languagesDiv);
        }

    }).catch(err => {
        console.error('Error fetching language data:', err);
    });

});