document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token');


     /**
     *  The request below gets the welcome message for the welcome 
     *  section. It will get back the title and welcome message. From 
     *  here it will check if the section is shown, if so it will create
     *  new elements for each element before appending it to the welcome
     *  section. 
     */
    fetch('/welcome').then(response => response.json()).then(data => {

        title = data.title || "Dalton's Portfolio";
        message = data.message || "It looks like were experience some technical difficulties at the moment";
        desktopImg = data.desktopImg || "/Resources/genericExperience.png";
        mobileImg = data.mobileImg || "/Resources/genericProject.jpg";

        const welcomeSection = document.getElementById('welcome');

        if(welcomeSection){
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

            titleElement.textContent = title;
            messageElement.textContent = message;

            desktopImgElement.src = desktopImg;
            mobileImgElement.src = mobileImg;

            titleDiv.appendChild(titleElement);
            messageDiv.appendChild(messageElement);
    
            if(token){
                const editBtn = document.createElement('button');
                editBtn.classList.add('editBtn');
                editBtn.textContent = "Edit";
                editBtn.addEventListener('click', () => {
                    editWelcome(data, welcomeInnerDiv, welcomeSection, editBtn);
                });
                welcomeSection.appendChild(editBtn);
            }
            if(window.innerWidth >= 768){
                welcomeImgDiv.appendChild(desktopImgElement);
            }else{
                welcomeImgDiv.appendChild(mobileImgElement);
            }
            welcomeInnerDiv.appendChild(titleDiv);
            welcomeInnerDiv.appendChild(messageDiv);
            welcomeInnerDiv.appendChild(welcomeImgDiv);
            welcomeSection.appendChild(welcomeInnerDiv);
        }
    }).catch(err => {
        console.error('Error fetching welcome data:', err);
    });

});


function editWelcome(data, welcomeInnerDiv, welcomeSection, editBtn){

    const editWelcomeForm = document.createElement('form');
    const titleLabel = document.createElement('h2');
    const titleInput = document.createElement('input');
    const messageLabel = document.createElement("label");
    const messageInput = document.createElement('input');
    const desktopImgLabel = document.createElement('label');
    const desktopImgInput = document.createElement("input");
    const mobileImgLabel = document.createElement("label");
    const mobileImgInput = document.createElement("input");
    const submitBtn = document.createElement('button');
    const closeBtn = document.createElement("button");

    editWelcomeForm.classList.add("editWelcomeForm");
    titleLabel.classList.add("editTitleLabel");
    titleInput.classList.add("editTitleInput");
    messageLabel.classList.add("editMessageLabel");
    messageInput.classList.add("editMessageInput");
    desktopImgLabel.classList.add("desktopImgLabel");
    desktopImgInput.classList.add("desktopImgInput");
    mobileImgLabel.classList.add("mobileImgLabel");
    mobileImgInput.classList.add("mobileImgInput");
    submitBtn.classList.add("editBtn");
    closeBtn.classList.add('closeBtn');

    titleLabel.textContent = "Title";
    messageLabel.textContent = "Message";
    desktopImgLabel.textContent = "Desktop Image";
    mobileImgLabel.textContent = "Mobile Image";
    submitBtn.textContent = '✔️'
    closeBtn.textContent = 'x';

    titleInput.value = data.title;
    messageInput.textContent = data.message;

    desktopImgInput.type = "file";
    mobileImgInput.type = "file";

    editBtn.style.display = 'none';
    welcomeInnerDiv.style.display = 'none';

    editWelcomeForm.appendChild(titleLabel);
    editWelcomeForm.appendChild(titleInput);
    editWelcomeForm.appendChild(messageLabel);
    editWelcomeForm.appendChild(messageInput);
    editWelcomeForm.appendChild(desktopImgLabel);
    editWelcomeForm.appendChild(desktopImgInput);
    editWelcomeForm.appendChild(mobileImgLabel);
    editWelcomeForm.appendChild(mobileImgInput);
    editWelcomeForm.appendChild(submitBtn);
    editWelcomeForm.appendChild(closeBtn);
    welcomeSection.appendChild(editWelcomeForm);

    submitBtn.addEventListener("click", () => {
        event.preventDefault();
        const newTitle = titleInput.value;
        const newMessage = messageInput.value;
        const newDesktopImg = desktopImgInput.value;
        const newMobileImg = mobileImgInput.value;
        updateWelcome(newTitle, newMessage, newDesktopImg, newMobileImg); 

        editWelcomeForm.style.display = 'none';
        welcomeInnerDiv.style.display = 'block';
        editBtn.style.display = 'block';
    });


    closeBtn.addEventListener('click', () => {
        event.preventDefault();

        editWelcomeForm.style.display = 'none';
        welcomeInnerDiv.style.display = 'block';
        editBtn.style.display = 'block';
    });
};




/**
 *  This function is going to be used to send a post request to the server
 *  to add in the updated content, it currently has the form data passed
 *  to it. 
 */
function updateWelcome(newTitle, newMessage, newDesktopImg, newMobileImg){
    console.log(`New Title: ${newTitle}`);
    console.log(`New Message: ${newMessage}`);
    console.log(`New DesktopImg: ${newDesktopImg}`);
    console.log(`New Mobile Image: ${newMobileImg}`);
};