// document.addEventListener('DOMContentLoaded', () => {
//     const token = sessionStorage.getItem('token');
//     const languageFrameworks = document.getElementById("languagesFrameworks");
//     if(!token){
//         languageFrameworks.remove();
//     }


//     /**
//      *  The route below is used to get the languages from the server
//      *  it for now just sets the data to a new variable. This code will 
//      *  be used in creating a new project and the adding new languages 
//      *  to the website. 
//      */
//       fetch("/languages").then(response => response.json()).then(data => {

//         const languages = data.languages;
//         const languagesFrameworks = document.getElementById('languagesFrameworks');
//         const languagesDiv = document.createElement('div');

//         languagesDiv.classList.add('languagesContainer');

//         if(token){

//             const addlanguage = document.createElement('div');
//             const addLanguageBtn = document.createElement('button');

//             languages.forEach(language => {

//                 const languageDiv = document.createElement('div');
//                 const languageLogo = document.createElement('img');
//                 const languageName = document.createElement('h3');
//                 const deleteLanguageBtn = document.createElement("button");

//                 languageDiv.classList.add('languageContainer');
//                 languageLogo.classList.add('languageImg');
//                 languageName.classList.add('languageName');
//                 deleteLanguageBtn.classList.add("deleteLanguageBtn");

//                 deleteLanguageBtn.textContent = 'x';

//                 languageLogo.src = language.logo || '/Resources/languageGeneric.png';
//                 languageName.textContent = language.name || "Oops forgot to put a language name!";

//                 deleteLanguageBtn.addEventListener('click', () => {
//                     deleteLanguage(language.name, languageDiv);
//                 });

//                 languageDiv.appendChild(languageLogo);
//                 languageDiv.appendChild(languageName);
//                 languageDiv.appendChild(deleteLanguageBtn);
//                 languagesDiv.appendChild(languageDiv);
//             });

//             addlanguage.classList.add('languageContainer');
//             addlanguage.classList.add('addLanguage');
//             addLanguageBtn.classList.add('addLanguageBtn');

//             addLanguageBtn.textContent = "+";

//             addLanguageBtn.addEventListener("click", () => {
//                 addNewLanguage(addlanguage, addLanguageBtn);
//             });
            
//             addlanguage.appendChild(addLanguageBtn);
//             languagesDiv.appendChild(addlanguage);
//             languagesFrameworks.appendChild(languagesDiv);
//         }

//     }).catch(err => {
//         console.error('Error fetching language data:', err);
//     });

// });


// function deleteLanguage(languageName, languageDiv){
//     const name = languageName;
//     /**
//      *  This is where the post request for deleting
//      *  an item goes. 
//      */
//     languageDiv.remove();
// }

// function addNewLanguage(addLanguages, addLangaugesBtn){

//     const languageForm = document.createElement("form");
//     const languageLogo = document.createElement("input");
//     const languageName = document.createElement("input");
//     const submitLanguage = document.createElement("button");
//     const closeLanguage = document.createElement("button");

//     languageForm.classList.add("languageForm");
//     languageLogo.classList.add("addLanguageLogo");
//     languageName.classList.add("addLanguageName");
//     submitLanguage.classList.add("submitLanguage");
//     closeLanguage.classList.add("closeLanguage");

//     submitLanguage.textContent = "✔️"
//     closeLanguage.textContent = "x";

//     languageLogo.type = "file";
//     languageName.type = "text";

//     languageLogo.accept = "image/*";        
//     languageName.placeholder = "Language Name";

//     addLangaugesBtn.style.display = "none";

//     languageForm.appendChild(languageLogo);
//     languageForm.appendChild(languageName);
//     languageForm.appendChild(submitLanguage);
//     languageForm.appendChild(closeLanguage);
//     addLanguages.appendChild(languageForm);

//     closeLanguage.addEventListener('click', () => {
//         event.preventDefault();
//         languageForm.style.display = 'none';
//         addLangaugesBtn.style.display = 'block';

//     });

//     submitLanguage.addEventListener("click", () => {
//         event.preventDefault();
//         const logo = languageLogo.value;
//         const name = languageName.value;
//         postLanguage(logo, name, addLangaugesBtn, languageForm);    
//     });
//  }

//  function postLanguage(logo, name, addLanguagesBtn, languageForm){
//     /**
//      *  Add in code here to handle post request
//      */
//     languageForm.style.display = 'none';
//     addLanguagesBtn.style.display = 'block';
// }