document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token');

    /**
     *  Below is code used to get the about section content. It will
     *  send a request to the server and then set the data sent back
     *  to two objects, 'texts' and 'images'. From here it will then 
     *  create new sections for each text and image, if the image
     *  source doesn't work then it will create a different element
     *  containing the caption for the image.
     */
    fetch('/about').then(response => response.json()).then(data => {

        texts = data.texts || [];
        images = data.images || "No Images available";

        const aboutSection = document.getElementById("about");
        const editBtn = document.createElement('button');
        const textContainer = document.createElement('div');
        const imgContainer = document.createElement('div');

        textContainer.classList.add("textContainer");
        imgContainer.classList.add("imgContainer");
        editBtn.classList.add('editBtn');
        editBtn.textContent = "Edit";

        if(token){
            editBtn.addEventListener('click', () => {
                console.log("this button works");
                //editAbout(editBtn, aboutSection, textContainer, imgContainer, texts, images);
            })
            aboutSection.appendChild(editBtn);
        }


        texts.forEach(textItem => {
            const textSection = document.createElement('div');
            const heading = document.createElement('h3');
            const content = document.createElement('p');
            textSection.classList.add('textDiv');
            textSection.classList.add('text-item');
            heading.classList.add('textHeader');
            content.classList.add('textContent');
            heading.textContent = textItem.heading;
            content.textContent = textItem.content;
            textSection.appendChild(heading);
            textSection.appendChild(content);
            textContainer.appendChild(textSection);
        });
        aboutSection.appendChild(textContainer);
 

        images.forEach(image => {
            const imageSection = document.createElement('div');
            const img = document.createElement('img');
            const fallbackText = document.createElement('div');

            imageSection.classList.add("imageDiv");
            imageSection.classList.add('image-item');
            img.classList.add("aboutImg");
            fallbackText.classList.add("fallbackText");

            img.alt = image.caption;
            img.src = image.url;
            fallbackText.textContent = image.caption;

            imgContainer.append(img);

            img.onerror = function() {
                img.remove();
                imgContainer.appendChild(fallbackText);
            };
            imgContainer.appendChild(imageSection);
        });
        aboutSection.appendChild(imgContainer);
    }).catch(err => {
        console.error("Error fetching about data:", err);
    });
});


// function editAbout(aboutSection, editBtn){

//     const closeEdit = document.createElement('button');
//     closeEdit.classList.add("closeAboutEdit");

//     closeEdit.textContent = 'x';

//     editBtn.style.display = 'none';
//     aboutSection.appendChild(closeEdit);
//     closeEdit.style.display = 'block';

//     closeEdit.addEventListener('click', () => {
//         closeEdit.style.display = 'none';
//         editBtn.style.display = 'block';
//     });
// } 


//textContainer, imgContainer, texts, images