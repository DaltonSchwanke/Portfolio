/**
 *  Below is code used for when the page loads and will call the function
 *  'getWelcomeData' that will then attach content to the html page and 
 *  control what the content is showing and doing inside of the welcome 
 *  section on the page. 
 */
document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token');
    getWelcomeData(token);    
});


/**
 *  The function below is used to get the welcome data from the server and then
 *  show it on the page. It will first send a get request to the server and when
 *  the gets back it will set the data content to new variables. Following this 
 *  it will then clear the welcome section and create new page elements for the 
 *  data. It will set the classes and IDs for the elements and the variables to
 *  their respective page elements. It will also add in a function button if the 
 *  user is logged in which will then call the function 'editWelcome'. 
 * 
 *  @param {*} token 
 */
function getWelcomeData(token){
    fetch('/welcome').then(response => response.json()).then(data => {
        const title = data.title || "Dalton's Portfolio";
        const message = data.message || "It looks like we're experiencing some technical difficulties at the moment";
        const desktopImg = data.desktopImg || "/Resources/genericExperience.png";
        const mobileImg = data.mobileImg || "/Resources/genericProject.jpg";
        const welcomeSection = document.getElementById('welcome');

        if (welcomeSection) {
            welcomeSection.innerHTML = '';

            const welcomeInnerDiv = document.createElement("div");
            const titleDiv = document.createElement('div');
            const titleElement = document.createElement('h2');
            const messageDiv = document.createElement('div');
            const messageElement = document.createElement('p');
            const welcomeImgDiv = document.createElement('div');
            const desktopImgElement = document.createElement('img');
            const mobileImgElement = document.createElement("img");

            titleDiv.classList.add("titleDiv");
            messageDiv.classList.add("messageDiv");
            welcomeImgDiv.classList.add("welcomeImgDiv");
            desktopImgElement.classList.add("desktopImg");
            mobileImgElement.classList.add("mobileImg");

            titleElement.id = "welcomeTitle";
            messageElement.id = "welcomeMessage";

            titleElement.textContent = '';
            messageElement.textContent = '';

            desktopImgElement.src = desktopImg;
            mobileImgElement.src = mobileImg;

            titleDiv.appendChild(titleElement);
            messageDiv.appendChild(messageElement);

            if (token) {
                const editBtn = document.createElement('button');
                editBtn.id = "editWelcomeBtn";
                editBtn.textContent = "Edit";
                editBtn.addEventListener('click', () => {
                    editWelcome(data, welcomeInnerDiv, welcomeSection, editBtn);
                });
                welcomeSection.appendChild(editBtn);
            }
            /**
            if (window.innerWidth >= 768) {
                welcomeImgDiv.appendChild(desktopImgElement);
            } else {
                welcomeImgDiv.appendChild(mobileImgElement);
            }
            */
            welcomeInnerDiv.appendChild(titleDiv);
            welcomeInnerDiv.appendChild(messageDiv);
            //welcomeInnerDiv.appendChild(welcomeImgDiv);
            welcomeSection.appendChild(welcomeInnerDiv);

            new Typed('#welcomeTitle', {
                strings: [title],
                typeSpeed: 100,
                backSpeed: 50,
                loop: false,
                showCursor: false,
                onComplete: () => {
                    new Typed('#welcomeMessage', {
                        strings: [message],
                        typeSpeed: 50,
                        backSpeed: 25,
                        loop: false,
                        showCursor: false,
                    });
                },
            });
        }
    })
    .catch(err => {
        console.error('Error fetching welcome data:', err);
    });
}


/**
 *  The code below is used to edit the welcome section on the page, it will
 *  start by first creating elements for the new elements, the form and it's 
 *  contents. From there it will set the classes/Ids of the elements along with
 *  the text content and other parameters. It will then set functions to update 
 *  and close the form which will either call the function 'updateWelcome' and 
 *  check if the required fields are null or not before closing the form, the 
 *  close button will close the form sending the user back the page section 
 *  content and doesn't read or send any data to the server.  
 * 
 *  @param {*} data 
 *  @param {*} welcomeInnerDiv 
 *  @param {*} welcomeSection 
 *  @param {*} editBtn 
 */
function editWelcome(data, welcomeInnerDiv, welcomeSection, editBtn) {

    const editWelcomeForm = document.createElement('form');
    const editPrompt = document.createElement('h2');
    const titleInput = document.createElement('input');
    const messageInput = document.createElement('input');
    const desktopImgLabel = document.createElement('label');
    const desktopImgInput = document.createElement("input");
    const mobileImgLabel = document.createElement("label");
    const mobileImgInput = document.createElement("input");
    const submitBtn = document.createElement('button');
    const closeBtn = document.createElement("button");

    editWelcomeForm.classList.add("editWelcomeForm");

    editPrompt.id = "editWelcomePrompt";
    titleInput.id = "editWelcomeTitle";
    messageInput.id = "editWelcomeMessage";
    desktopImgLabel.id = "desktopImgLabel";
    desktopImgInput.id = "desktopImgInput";
    mobileImgLabel.id = "mobileImgLabel";
    mobileImgInput.id = "mobileImgInput";
    submitBtn.id = 'saveWelcomeContent';
    closeBtn.id = 'closeWelcomeForm';

    titleInput.value = data.title;
    messageInput.value = data.message;
    editPrompt.textContent = "Edit Welcome Content";
    desktopImgLabel.textContent = "Desktop Image";
    mobileImgLabel.textContent = "Mobile Image";
    submitBtn.textContent = "Save";
    closeBtn.textContent = "X";

    desktopImgInput.type = "file";
    mobileImgInput.type = "file";

    titleInput.required = true;
    messageInput.required = true;

    editWelcomeForm.appendChild(editPrompt);
    editWelcomeForm.appendChild(titleInput);
    editWelcomeForm.appendChild(messageInput);
    editWelcomeForm.appendChild(desktopImgLabel);
    editWelcomeForm.appendChild(desktopImgInput);
    editWelcomeForm.appendChild(mobileImgLabel);
    editWelcomeForm.appendChild(mobileImgInput);
    editWelcomeForm.appendChild(submitBtn);
    editWelcomeForm.appendChild(closeBtn);

    editBtn.style.display = 'none';
    welcomeInnerDiv.style.display = 'none';
    welcomeSection.appendChild(editWelcomeForm);

    submitBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const newTitle = titleInput.value;
        const newMessage = messageInput.value;
        const newDesktopImg = desktopImgInput.value;
        const newMobileImg = mobileImgInput.value;

        if (!newTitle) {
            titleInput.style.backgroundColor = "rgba(128, 0, 0, 0.8) !important ";
            titleInput.style.border = "2px solid rgba(255, 0, 0.5)";
            titleInput.focus();
            return;
        }
        if(!newMessage){
            messageInput.style.backgroundColor = "rgba(128, 0, 0, 0.8) !important";
            messageInput.style.border = "2px solid rgba(255, 0, 0.5)";
            messageInput.focus();
            return;
        }

        updateWelcome(newTitle, newMessage, newDesktopImg, newMobileImg);

        editWelcomeForm.remove();
        welcomeInnerDiv.style.display = 'block';
        editBtn.style.display = 'block';
    });

    closeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        editWelcomeForm.remove();
        welcomeInnerDiv.style.display = 'block';
        editBtn.style.display = 'block';
    });
}


/**
 *  The function below is used to update the welcome content on the page. 
 *  It takes in all the fields from the welcome form and set them to a new object
 *  before it sends a post request to the server to update the welcome
 *  content. If the update was successful it will then call the function
 *  'getWelomeData' which will update the page section. 
 */
async function updateWelcome(newTitle, newMessage, newDesktopImg, newMobileImg) {
    const welcomeData = {
        title: newTitle,
        message: newMessage,
        desktopImg: newDesktopImg,
        mobileImg: newMobileImg,
    };

    try {
        const response = await fetch('/update-welcome', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(welcomeData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const token = sessionStorage.getItem('token');
        getWelcomeData(token);
    } catch (error) {
        console.error('Error updating welcome data:', error);
    }
}