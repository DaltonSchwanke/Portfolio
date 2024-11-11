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
            languages.forEach(language => {
                const languageDiv = document.createElement('div');
                languageDiv.classList.add('languageContainer');
                const languageLogo = document.createElement('img');
                languageLogo.classList.add('languageImg');
                languageLogo.src = language.logo || '/Resources/languageGeneric.png';
                const languageName = document.createElement('h3');
                languageName.classList.add('languageName');
                languageName.textContent = language.name || "Oops forgot to put a language name!";
                const deleteLanguageBtn = document.createElement("button");
                deleteLanguageBtn.classList.add("deleteLanguageBtn");
                deleteLanguageBtn.textContent = 'x';
                languageDiv.appendChild(languageLogo);
                languageDiv.appendChild(languageName);
                languageDiv.appendChild(deleteLanguageBtn);
                languagesDiv.appendChild(languageDiv);
            });
        
            languagesFrameworks.appendChild(languagesDiv);
        }

    }).catch(err => {
        console.error('Error fetching language data:', err);
    });

});