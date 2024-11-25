document.addEventListener('DOMContentLoaded', () => {
    getAbout();
});

function getAbout(){
    const token = sessionStorage.getItem('token');
    fetch('/about').then(response => response.json()).then(data => {

        texts = data.texts || [];
        images = data.images || "No Images available";

        const aboutSection = document.getElementById("about");
        aboutSection.innerHTML = "";
        const textContainer = document.createElement('div');
        const imgContainer = document.createElement('div');

        textContainer.classList.add("textContainer");
        imgContainer.classList.add("imgContainer");


        texts.forEach(textItem => {
            const textSection = document.createElement('div');
            const heading = document.createElement('h3');
            const content = document.createElement('p');
            const editBtn = document.createElement('button');
            textSection.classList.add('textDiv');
            textSection.classList.add('text-item');
            heading.classList.add('textHeader');
            content.classList.add('textContent');
            editBtn.classList.add('editAboutSection');
            heading.textContent = textItem.heading;
            content.textContent = textItem.content;
            editBtn.textContent = "Edit";

            editBtn.addEventListener('click', editAboutSection);

            if(token){
                textSection.appendChild(editBtn);
            }
            textSection.appendChild(heading);
            textSection.appendChild(content);
            textContainer.appendChild(textSection);
        });
        aboutSection.appendChild(textContainer);
 

        // images.forEach(image => {
        //     const imageSection = document.createElement('div');
        //     const img = document.createElement('img');
        //     const fallbackText = document.createElement('div');

        //     imageSection.classList.add("imageDiv");
        //     imageSection.classList.add('image-item');
        //     img.classList.add("aboutImg");
        //     fallbackText.classList.add("fallbackText");

        //     img.alt = image.caption;
        //     img.src = image.url;
        //     fallbackText.textContent = image.caption;

        //     imgContainer.append(img);

        //     img.onerror = function() {
        //         img.remove();
        //         imgContainer.appendChild(fallbackText);
        //     };
        //     imgContainer.appendChild(imageSection);
        // });
        // aboutSection.appendChild(imgContainer);
        
    }).catch(err => {
        console.error("Error fetching about data:", err);
    });
}




function editAboutSection(event) {
    // Get the clicked button's parent section
    const textSection = event.target.closest('.textDiv');

    // Save current title and description for reverting later
    const currentTitle = textSection.querySelector('.textHeader').textContent;
    const currentContent = textSection.querySelector('.textContent').textContent;

    // Clear the section's inner HTML
    textSection.innerHTML = '';

    // Create input fields for title and description
    const prompt = document.createElement('h3');
    const titleInput = document.createElement('input');
    const descInput = document.createElement('textarea');
    prompt.textContent = 'Edit';
    titleInput.value = currentTitle;
    descInput.value = currentContent;
    prompt.classList.add("editAboutFormTitle");
    titleInput.classList.add('editTitleInput');
    descInput.classList.add('editDescInput');

    // Create buttons
    const closeButton = document.createElement('button');
    const submitButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    closeButton.textContent = 'Close';
    submitButton.textContent = 'Submit';
    deleteButton.textContent = 'Delete';

    // Add event listeners for buttons
    closeButton.addEventListener('click', () => {
       getAbout();
    });

    submitButton.addEventListener('click', async() => {
        const updatedData = {
            heading: titleInput.value,
            content: descInput.value
        };
    
        // Call the update function
        updateAboutSection(updatedData);
    });
    
    deleteButton.addEventListener('click', async () => {
        const headingToDelete = titleInput.value;
    
        // Call the delete function
        deleteAboutSection(headingToDelete);
        getAbout();
    });

    // Add inputs and buttons to the section
    textSection.appendChild(prompt);
    textSection.appendChild(titleInput);
    textSection.appendChild(descInput);
    textSection.appendChild(closeButton);
    textSection.appendChild(submitButton);
    textSection.appendChild(deleteButton);
}


async function updateAboutSection(data) {
    try {
        const response = await fetch('/update-about', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Updated successfully:', result.message);
        } else {
            console.error('Failed to update about section:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating about section:', error);
    }
}


async function deleteAboutSection(heading) {
    try {
        const response = await fetch('/delete-about', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ heading })
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Deleted successfully:', result.message);
        } else {
            console.error('Failed to delete about section:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting about section:', error);
    }
}