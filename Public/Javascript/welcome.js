document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token');
    console.log("welcome content token: ", token || "no token");


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

            const titleDiv = document.createElement('div');
            titleDiv.classList.add("titleDiv");
            const titleElement = document.createElement('h2');
            titleElement.id = "welcomeTitle";
            titleElement.textContent = title;
            titleDiv.appendChild(titleElement);


            const messageDiv = document.createElement('div');
            messageDiv.classList.add("messageDiv");
            const messageElement = document.createElement('p');
            messageElement.textContent = message;
            messageDiv.appendChild(messageElement);

            const welcomeImgDiv = document.createElement('div');
            welcomeImgDiv.classList.add("welcomeImgDiv");
            const desktopImgElement = document.createElement('img');
            desktopImgElement.classList.add("desktopImg");
            desktopImgElement.src = desktopImg;
            const mobileImgElement = document.createElement("img");
            mobileImgElement.classList.add("mobileImg");
            mobileImgElement.src = mobileImg;

            if(token){
                const editBtn = document.createElement('button');
                editBtn.classList.add('editBtn');
                editBtn.textContent = "Edit";
                editBtn.addEventListener('click', () => {
                    console.log(`Edit Welcome Section`);
                })
                welcomeSection.appendChild(editBtn);
            }



            if(window.innerWidth >= 768){
                welcomeImgDiv.appendChild(desktopImgElement);
            }else{
                welcomeImgDiv.appendChild(mobileImgElement);
            }
            welcomeSection.appendChild(titleDiv);
            welcomeSection.appendChild(messageDiv);
            welcomeSection.appendChild(welcomeImgDiv);
        }
    }).catch(err => {
        console.error('Error fetching welcome data:', err);
    });

});