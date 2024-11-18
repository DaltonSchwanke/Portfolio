document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token');

    fetch('/welcome')
        .then(response => response.json())
        .then(data => {
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

                // IDs for Typed.js selectors
                titleElement.id = "welcomeTitle";
                messageElement.id = "welcomeMessage";

                // Initially empty for Typed.js animation
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
                if (window.innerWidth >= 768) {
                    welcomeImgDiv.appendChild(desktopImgElement);
                } else {
                    welcomeImgDiv.appendChild(mobileImgElement);
                }
                welcomeInnerDiv.appendChild(titleDiv);
                welcomeInnerDiv.appendChild(messageDiv);
                welcomeInnerDiv.appendChild(welcomeImgDiv);
                welcomeSection.appendChild(welcomeInnerDiv);

                // Initialize Typed.js for the title
                new Typed('#welcomeTitle', {
                    strings: [title],
                    typeSpeed: 100,
                    backSpeed: 50,
                    loop: false,
                    showCursor: false, // Disable blinking cursor for the title
                    onComplete: () => {
                        // Start the message animation after the title completes
                        new Typed('#welcomeMessage', {
                            strings: [message],
                            typeSpeed: 50,
                            backSpeed: 25,
                            loop: false,
                            showCursor: false, // Disable blinking cursor for the message
                        });
                    },
                });
            }
        })
        .catch(err => {
            console.error('Error fetching welcome data:', err);
        });
});


function editWelcome(data, welcomeInnerDiv, welcomeSection, editBtn) {
    const editWelcomeForm = document.createElement('form');
    editWelcomeForm.classList.add("editWelcomeForm");

    // Title
    const editPrompt = document.createElement('h2');
    editPrompt.id = "editWelcomePrompt";
    editPrompt.textContent = "Edit Welcome Content";

    // Title Input 
    const titleInput = document.createElement('input');
    titleInput.id = "editWelcomeTitle";
    titleInput.value = data.title;
    titleInput.required = true;

    // Message
    const messageInput = document.createElement('input');
    messageInput.id = "editWelcomeMessage";
    messageInput.value = data.message;
    messageInput.required = true;

    // Desktop Image
    const desktopImgLabel = document.createElement('label');
    desktopImgLabel.id = "desktopImgLabel";
    desktopImgLabel.textContent = "Desktop Image";
    const desktopImgInput = document.createElement("input");
    desktopImgInput.id = "desktopImgInput";
    desktopImgInput.type = "file";

    // Mobile Image
    const mobileImgLabel = document.createElement("label");
    mobileImgLabel.id = "mobileImgLabel";
    mobileImgLabel.textContent = "Mobile Image";
    const mobileImgInput = document.createElement("input");
    mobileImgInput.id = "mobileImgInput";
    mobileImgInput.type = "file";

    // Buttons
    const submitBtn = document.createElement('button');
    submitBtn.id = 'saveWelcomeContent';
    submitBtn.textContent = "Save";
    submitBtn.formAction = "submit";
    const closeBtn = document.createElement("button");
    closeBtn.id = 'closeWelcomeForm';
    closeBtn.textContent = "X";

    // Add inputs and buttons to form
    editWelcomeForm.appendChild(editPrompt);
    editWelcomeForm.appendChild(titleInput);
    editWelcomeForm.appendChild(messageInput);
    editWelcomeForm.appendChild(desktopImgLabel);
    editWelcomeForm.appendChild(desktopImgInput);
    editWelcomeForm.appendChild(mobileImgLabel);
    editWelcomeForm.appendChild(mobileImgInput);
    editWelcomeForm.appendChild(submitBtn);
    editWelcomeForm.appendChild(closeBtn);

    // Hide original welcome content and show the form
    editBtn.style.display = 'none';
    welcomeInnerDiv.style.display = 'none';
    welcomeSection.appendChild(editWelcomeForm);

    // Save functionality
    submitBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const newTitle = titleInput.value;
        const newMessage = messageInput.value;
        const newDesktopImg = desktopImgInput.value;
        const newMobileImg = mobileImgInput.value;

        updateWelcome(newTitle, newMessage, newDesktopImg, newMobileImg);

        editWelcomeForm.remove();
        welcomeInnerDiv.style.display = 'block';
        editBtn.style.display = 'block';
    });

    // Close functionality
    closeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        editWelcomeForm.remove();
        welcomeInnerDiv.style.display = 'block';
        editBtn.style.display = 'block';
    });
}




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