document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token');
    const languageFrameworks = document.getElementById("languagesFrameworks");
    if(!token){
        languageFrameworks.remove();
    }


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
                deleteLanguageBtn.addEventListener('click', () => {
                    deleteLanguage(language.name, languageDiv);
                });
                languageDiv.appendChild(languageLogo);
                languageDiv.appendChild(languageName);
                languageDiv.appendChild(deleteLanguageBtn);
                languagesDiv.appendChild(languageDiv);
            });

            const addlanguage = document.createElement('div');
            addlanguage.classList.add('languageContainer');
            addlanguage.classList.add('addLanguage');
            const addLanguageBtn = document.createElement('button');
            addLanguageBtn.classList.add('addLanguageBtn');
            addLanguageBtn.textContent = "+";
            addLanguageBtn.addEventListener("click", () => {
                console.log("button clicked");
                addNewLanguage(addlanguage, addLanguageBtn);
            });
            addlanguage.appendChild(addLanguageBtn);
            languagesDiv.appendChild(addlanguage);
            languagesFrameworks.appendChild(languagesDiv);
        }

    }).catch(err => {
        console.error('Error fetching language data:', err);
    });

});


function deleteLanguage(languageName, languageDiv){
    console.log(`Deleting: ${languageName}`);
    languageDiv.remove();
    /**
     *  This is where the post request for deleting
     *  an item goes. 
     */
}

function addNewLanguage(addLanguages, addLangaugesBtn){
    const languageForm = document.createElement("form");
    languageForm.classList.add("languageForm");
    const languageLogo = document.createElement("input");
    languageLogo.type = "file";
    languageLogo.accept = "image/*";        
    languageLogo.classList.add("addLanguageLogo");
    const languageName = document.createElement("input");
    languageName.type = "text";
    languageName.classList.add("addLanguageName");
    languageName.placeholder = "Language Name";
    const submitLanguage = document.createElement("button");
    submitLanguage.classList.add("submitLanguage");
    submitLanguage.textContent = "✔️"
    const closeLanguage = document.createElement("button");
    closeLanguage.classList.add("closeLanguage");
    closeLanguage.textContent = "x";

    addLangaugesBtn.style.display = "none";
    languageForm.appendChild(languageLogo);
    languageForm.appendChild(languageName);
    languageForm.appendChild(submitLanguage);
    languageForm.appendChild(closeLanguage);
    addLanguages.appendChild(languageForm);


    closeLanguage.addEventListener('click', () => {
        event.preventDefault();
        languageForm.style.display = 'none';
        addLangaugesBtn.style.display = 'block';

    });
    submitLanguage.addEventListener("click", () => {
        event.preventDefault();
        const logo = languageLogo.value;
        const name = languageName.value;
        postLanguage(logo, name, addLangaugesBtn, languageForm);
        
       
    });
 }

 function postLanguage(logo, name, addLanguagesBtn, languageForm){
    console.log(logo);
    console.log(name);
    /**
     *  Add in code here to handle post request
     */
    languageForm.style.display = 'none';
    addLanguagesBtn.style.display = 'block';
}