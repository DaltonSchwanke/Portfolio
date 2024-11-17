

/**
 *  The code below is used to set the nav bar action on init and when the 
 *  user resizes the window. It will call the function 'setNavigation'
 *  which is the starter method for changing the nav bar actions depending
 *  if the user is on mobile or on dekstop.  
 */
var isMobile;
var alreadyMobile;
var alreadyDesktop;
document.addEventListener('DOMContentLoaded', () => {
    alreadyDesktop = false;
    alreadyMobile = false;
    setNavigation();
    window.addEventListener('resize', () => {
        setNavigation();
    });
});




/**
 * the code below is used to track the window size of the user's device
 *  it will then set the 'isMobile' boolean accordingly which will be used in
 *  the function that sets the nav bar action. 
 */
function setNavigation(){
    if(window.innerWidth <= 768){
        isMobile  = true;
    }
    else{
        isMobile = false;
    }
    navBarAction();
}




/**
 *  The code below is used to control which version of the nav bar is shown to the user.
 *  If the user is on mobile it will show a carousel nav bar, otherwise it will show
 *  a vertical desktop nav bar. 
 */
function navBarAction(){
    if(isMobile){
        mobileNav();
    }
    else{
        desktopNav();
    }
}


/**
 *  This function is used to control the navigation bar for the mobile view, it
 *  will check the value of 'alreadyMobile' and will either create the new nav bar
 *  or it will simply leave it. 
 */
function mobileNav() {
    const sections = document.querySelectorAll(".pageSection");
    const navLinks = document.querySelectorAll(".nav-link");

    if (alreadyMobile) {
        console.log("Already on mobile: mobileNav()");
    } else {
        alreadyMobile = true;
        alreadyDesktop = false;
        console.log("Change to mobile: mobileNav()");
    }

    // Function to update visible link
    const updateActiveLinkCarousel = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;

                // Loop through nav links and show the one matching the section
                navLinks.forEach((link) => {
                    const linkHref = link.getAttribute("href").substring(1);

                    if (linkHref === sectionId) {
                        link.classList.add("visible");
                        link.classList.remove("hidden");
                    } else {
                        link.classList.add("hidden");
                        link.classList.remove("visible");
                    }
                });
            }
        });
    };

    // Intersection Observer to track sections
    const observer = new IntersectionObserver(updateActiveLinkCarousel, {
        root: null, // Use viewport as root
        threshold: 0.5, // Trigger when 50% of the section is visible
    });

    // Observe all sections
    sections.forEach((section) => observer.observe(section));
}



/**
 *  The function below is used to control the nav bar for if the user is on desktop or just
 *  changed over to desktop. 
 */
function desktopNav() {
    const sections = document.querySelectorAll(".pageSection");
    const navLinks = document.querySelectorAll(".nav-link");

    if (alreadyDesktop) {
        console.log("Already on desktop: desktopNav()");
    } else {
        alreadyDesktop = true;
        alreadyMobile = false;
        console.log("Change to desktop: desktopNav()");
    }

    // Function to update active link
    const updateActiveLink = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Get the ID of the currently visible section
                const sectionId = entry.target.id;

                // Loop through nav links and highlight the corresponding one
                navLinks.forEach((link) => {
                    if (link.getAttribute("href").substring(1) === sectionId) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }
                });
            }
        });
    };

    // Intersection Observer to track sections
    const observer = new IntersectionObserver(updateActiveLink, {
        root: null, // Use viewport as root
        threshold: 0.5, // Trigger when 50% of the section is visible
    });

    // Observe all sections
    sections.forEach((section) => observer.observe(section));
}


