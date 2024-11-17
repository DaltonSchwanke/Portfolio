document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token');


    /**
     *  The request below gets the contact information from the back
     *  end of the site. It will get back the email, phone, linkedIn
     *  and Github. Then it will check if the contact section is shown
     *  if so then it will create new elements that will hold each 
     *  piece of information before it appends it to the contact section.
     */
    fetch('/contact').then(response => response.json()).then(data => {

        phone = data.phone || "Current not reachable by phone";
        email = data.email || "Currently not reachable by phone";
        linkedIn = data.linkedIn || "Not very professional of me to not have my linked in linked";
        github = data.github ;

        const contactSection = document.getElementById('contact');

        if(contactSection){
            const contactDiv = document.createElement('div');
            const phoneElement = document.createElement('p');
            const emailElement = document.createElement('p');
            const linkedInElement = document.createElement('a');
            const linkedinImg = document.createElement('img');
            const githubElement = document.createElement('a');
            const githubImg = document.createElement('img');

            contactDiv.classList.add("contactDiv");
            phoneElement.classList.add("phoneElement");
            emailElement.classList.add("emailElement");
            linkedInElement.classList.add("linkedInElement");
            githubElement.classList.add("githubElement");
            linkedinImg.classList.add("linkedInImg");
            githubImg.classList.add("githubImg");

            phoneElement.textContent = phone;
            emailElement.textContent = email;
           
           
            linkedinImg.id = 'linkedInButton';
            githubImg.id = 'githubButton';

            linkedinImg.src = "/Resources/linkedInLogo.png"; 
            githubImg.src = "/Resources/githubLogo.png"; 


            if(data.linkedIn){
                linkedInElement.href = data.linkedIn;
                linkedInElement.target = "__blank";
            }
            
            if(data.github){
                githubElement.href = data.github;
                githubElement.target = "__blank";
            }

            if(token){
                const editBtn = document.createElement('button');
                editBtn.classList.add('editBtn');
                editBtn.textContent = "Edit";
                editBtn.addEventListener('click', () => {
                    editContact(data, editBtn, contactDiv, contactSection);
                })
                contactSection.appendChild(editBtn);
            }

            contactDiv.appendChild(phoneElement);
            contactDiv.appendChild(emailElement);

            if(data.linkedIn){
                linkedInElement.appendChild(linkedinImg);
                contactDiv.appendChild(linkedInElement);
            }

            if(data.github){
                githubElement.appendChild(githubImg);
                contactDiv.appendChild(githubElement);
            }

            contactSection.appendChild(contactDiv);
        }
    }).catch(err => {
        console.error('Error fetching welcome data:', err);
    });

});



function editContact(data, editBtn, contactDiv, contactSection){
    const contactForm = document.createElement('form');
    const editPhoneLabel = document.createElement('label');
    const editEmailLabel = document.createElement('label');
    const editLinkedInLabel = document.createElement('label'); 
    const editGithubLabel = document.createElement('label');
    const editPhoneInput = document.createElement('input');
    const editEmailInput = document.createElement('input');
    const editLinkedInInput = document.createElement('input');
    const editGithubInput = document.createElement('input');
    const submit = document.createElement('button');
    const close = document.createElement('button');

    contactForm.classList.add("contactForm");
    editPhoneLabel.classList.add('editPhoneLabel');
    editPhoneInput.classList.add('editPhoneInput');
    editEmailLabel.classList.add('editEmailLabel');
    editEmailInput.classList.add('editEmailInput');
    editLinkedInLabel.classList.add('editLinkedInLabel');
    editLinkedInInput.classList.add('editLinkedInInput');
    editGithubLabel.classList.add("editGithubLabel");
    editGithubInput.classList.add('editGithubInput');
    
    editPhoneLabel.textContent = "Phone";
    editEmailLabel.textContent = "Email";
    editLinkedInLabel.textContent = "LinkedIn";
    editGithubLabel.textContent = "GitHub";
    submit.textContent = "✔️";
    close.textContent = "x";

    editPhoneInput.value = data.phone;
    editEmailInput.value = data.email;
    editLinkedInInput.value = data.linkedIn;
    editGithubInput.value = data.github;

    editPhoneInput.type = "phone";
    editEmailInput.type = "text";
    editLinkedInInput.type = "text";
    editGithubInput.type = "text";

    contactForm.appendChild(editPhoneLabel);
    contactForm.appendChild(editPhoneInput);
    contactForm.appendChild(editEmailLabel);
    contactForm.appendChild(editEmailInput);
    contactForm.appendChild(editLinkedInLabel);
    contactForm.appendChild(editLinkedInInput);
    contactForm.appendChild(editGithubLabel);
    contactForm.appendChild(editGithubInput);
    contactForm.appendChild(submit);
    contactForm.appendChild(close);

    editBtn.style.display = 'none';
    contactDiv.style.display = 'none';
    contactSection.append(contactForm);

    submit.addEventListener('click',  () => {
        event.preventDefault();
        const newPhone = editPhoneInput.value;
        const newEmail = editEmailInput.value;
        const newLinkedin = editLinkedInInput.value;
        const newGithub = editGithubInput.value;
        updateContact(newPhone, newEmail, newLinkedin, newGithub);

        contactForm.style.display = 'none';
        editBtn.style.display = 'block';
        contactDiv.style.display = 'block';
    });


    close.addEventListener('click',  () => {
        event.preventDefault();
        contactForm.style.display = 'none';
        editBtn.style.display = 'block';
        contactDiv.style.display = 'block';
    });
};


function updateContact(newPhone, newEmail, newLinkedin, newGithub){
    console.log(`New Phone: ${newPhone}`);
    console.log(`New Email: ${newEmail}`);
    console.log(`New LinkedIn: ${newLinkedin}`);
    console.log(`New Github: ${newGithub}`);
}