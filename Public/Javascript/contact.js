document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token');
    console.log("contact content token: ", token || "no token");


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
        github = data.github;
        const contactSection = document.getElementById('contact');
        if(contactSection){
            const phoneElement = document.createElement('p');
            phoneElement.textContent = phone;
            const emailElement = document.createElement('p');
            emailElement.textContent = email;
            const linkedInElement = document.createElement('a');
            const linkedinImg = document.createElement('img');
            linkedinImg.id = 'linkedInButton';
            linkedinImg.src = "/Resources/linkedInLogo.png"; 
            linkedInElement.href = linkedIn;
            linkedInElement.target = "__blank";
            const githubElement = document.createElement('a');
            const githubImg = document.createElement('img');
            githubImg.id = 'githubButton';
            githubImg.src = "/Resources/githubLogo.png"; 
            if(github){
                githubElement.href = github;
                githubElement.target = "__blank";
            }

            if(token){
                const editBtn = document.createElement('button');
                editBtn.classList.add('editBtn');
                editBtn.textContent = "Edit";
                editBtn.addEventListener('click', () => {
                    console.log(`Edit Contact Section`);
                })
                contactSection.appendChild(editBtn);
            }


            contactSection.appendChild(phoneElement);
            contactSection.appendChild(emailElement);
            if(data.linkedIn){
                linkedInElement.appendChild(linkedinImg);
                contactSection.appendChild(linkedInElement);
            }
            if(data.github){
                githubElement.appendChild(githubImg);
                contactSection.appendChild(githubElement);
            }
        }
    }).catch(err => {
        console.error('Error fetching welcome data:', err);
    });

});