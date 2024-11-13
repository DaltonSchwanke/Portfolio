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

        if(token){
            const editBtn = document.createElement('button');
            editBtn.classList.add('editBtn');
            editBtn.textContent = "Edit";
            editBtn.addEventListener('click', () => {
                console.log(`Edit About Section`);
            })
            aboutSection.appendChild(editBtn);
        }

        texts.forEach(textItem => {
            const textSection = document.createElement('div');
            textSection.classList.add('textDiv');
            textSection.classList.add('text-item');
            const heading = document.createElement('h3');
            heading.textContent = textItem.heading;
            const content = document.createElement('p');
            content.textContent = textItem.content;
            textSection.appendChild(heading);
            textSection.appendChild(content);
            aboutSection.appendChild(textSection);
        });
        images.forEach(image => {
            const imageSection = document.createElement('div');
            imageSection.classList.add("imageDiv");
            imageSection.classList.add('image-item');
            const img = document.createElement('img');
            img.alt = image.caption;
            img.src = image.url;
            img.onerror = function() {
                const fallbackText = document.createElement('div');
                fallbackText.textContent = image.caption;
                fallbackText.style.color = 'gray';
                imageSection.appendChild(fallbackText);
            };
            aboutSection.appendChild(imageSection);
        })
    }).catch(err => {
        console.error("Error fetching about data:", err);
    });
});