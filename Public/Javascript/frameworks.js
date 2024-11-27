// document.addEventListener('DOMContentLoaded', () => {
//     const token = sessionStorage.getItem('token');
//     const languageFrameworks = document.getElementById("languagesFrameworks");
//     if(token){
//         /**
//         *  The route below is used to get the frameworks from the server
//         *  it for now when it returns it will just set it to an object, this code
//         *  will later be used in the functionality in adding a new theme and adding
//         *  new frameworks to the website. 
//         */
//         fetch("/frameworks").then(response => response.json()).then(data => {
//             const frameworks = data.frameworks;
//             const languagesFrameworks = document.getElementById('languagesFrameworks');
//             const frameworksDiv = document.createElement('div');
//             const addFramework = document.createElement('div');
//             const addFrameworkBtn = document.createElement("button");

//             frameworksDiv.classList.add('frameworksContainer');
//             addFramework.classList.add("frameworkContainer");
//             addFramework.classList.add("addFramework");
//             addFrameworkBtn.classList.add("addFrameworkBtn");

//             addFrameworkBtn.textContent = "+";

//             if (token) {
//                 frameworks.forEach(framework => {
//                     const frameworkDiv = document.createElement('div');
//                     const frameworkLogo = document.createElement('img');
//                     const frameworkName = document.createElement('h3');
//                     const deleteFrameworkBtn = document.createElement("button");

//                     frameworkDiv.classList.add('frameworkContainer');
//                     frameworkLogo.classList.add('frameworkImg');
//                     frameworkName.classList.add('frameworkName');
//                     deleteFrameworkBtn.classList.add("deleteFrameworkBtn");

//                     deleteFrameworkBtn.textContent = 'x';
//                     frameworkName.textContent = framework.name || "Oops forgot to put a framework name!";

//                     frameworkLogo.src = framework.logo || '/Resources/frameworkGeneric.png';
            
//                     deleteFrameworkBtn.addEventListener("click", () => {
//                         deleteFramework(framework.name, frameworkDiv);
//                     });

//                     frameworkDiv.appendChild(frameworkLogo);
//                     frameworkDiv.appendChild(frameworkName);
//                     frameworkDiv.appendChild(deleteFrameworkBtn);
//                     frameworksDiv.appendChild(frameworkDiv);
//                 });

    

//                 addFrameworkBtn.addEventListener("click", () => {
//                     addNewFramework(addFramework, addFrameworkBtn);
//                 });

//                 addFramework.appendChild(addFrameworkBtn);
//                 frameworksDiv.appendChild(addFramework);
//                 languagesFrameworks.appendChild(frameworksDiv);
//             }
//         }).catch(err => {
//             console.error('Error fetching framework data:', err);
//         });
//     }
// });


// function deleteFramework(frameworkName, frameworkDiv){
//     frameworkDiv.remove();
// }

// function addNewFramework(addFramework, addFrameworkBtn){

//     const frameworkForm = document.createElement("form");
//     const frameworkLogo = document.createElement("input");
//     const frameworkName = document.createElement("input");
//     const submitFramework = document.createElement('button');
//     const closeFramework = document.createElement("button");

//     frameworkForm.classList.add("frameworkForm");
//     frameworkLogo.classList.add("addFrameworkLogo");
//     frameworkName.classList.add("addFrameworkName");
//     submitFramework.classList.add("submitFrameowrk");
//     closeFramework.classList.add("closeFramework");

//     submitFramework.textContent = "✔️";
//     closeFramework.textContent = "x";

//     frameworkLogo.type = 'file';
//     frameworkLogo.accept = "image/*"; 
//     frameworkName.placeholder = "Framework Name";

//     addFrameworkBtn.style.display = 'none';

//     frameworkForm.appendChild(frameworkLogo);
//     frameworkForm.appendChild(frameworkName);
//     frameworkForm.appendChild(submitFramework);
//     frameworkForm.appendChild(closeFramework);
//     addFramework.appendChild(frameworkForm);

//     closeFramework.addEventListener("click", () => {
//         event.preventDefault();
//         frameworkForm.style.display = "none";
//         addFrameworkBtn.style.display = "block";
//     });

//     submitFramework.addEventListener('click', () => {
//         event.preventDefault();
//         const logo = frameworkLogo.value;
//         const name = frameworkName.value;
//         postFramework(logo, name, addFrameworkBtn, frameworkForm);
//     });
// }


// function postFramework(logo, name, addFrameworkBtn, frameworkForm){
//     /**
//      *  Add in code here to handle post request
//      */
//     frameworkForm.style.display = "none";
//     addFrameworkBtn.style.display = "block";

// }