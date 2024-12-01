const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'ThisIsMyWebSiteDamnIt';
const app = express();
const PORT = 3000;
const usersFilePath = path.join(__dirname, 'data.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, '../Public')));

/**
 *  Generic Route
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Public/Pages', 'index.html'));
});


/**
 *  Route for index (home) page
 */
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Pages', 'index.html'));
});


/**
 *  Route for sign in page, for now it is coded out so that the user can
 *  not navigate to this page, this ensures that I can go in if need be,
 *  uncomment this and create a new account if the old one is lost. 
 */
/** 
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../Public/Pages', 'signup.html'));
});
*/


/**
 * Route for logging user in
 */
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    const users = await getUsers(); 
    const foundUser = users.user.find((u) => u.username === username); 
    if (!foundUser) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
    } else {
        const token = jwt.sign({ username: username }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login successful', token });
    }
});



/**
 *  Route for signing user up
 */
/**
app.post('/signup', async (req, res) => {
    const { user, pass } = req.body;
    if (!user || !pass) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const hashedPassword = await bcrypt.hash(pass, 10);
    const newUser = { username: user, password: hashedPassword };
    try {
      const data = await fs.readFile('data.json', 'utf8');
      const jsonData = JSON.parse(data || '{}');
      jsonData.user.push(newUser); // Add user to the 'user' category
      await fs.writeFile('data.json', JSON.stringify(jsonData, null, 2));
      res.status(200).json({ message: 'User signed up successfully!' });
    } catch (err) {
      console.error('Error saving user data:', err);
      res.status(500).json({ message: 'Error saving user data.' });
    }
});
*/


/**
 *  The code below is used to get the content for the welcome 
 *  section on the home page for the site. It first grabs the 
 *  data from the 'data.json' file and then creates a json object
 *  before sending it back to the client. 
 */
app.get('/welcome', async (req, res) => {
  try {
    const wData = await fs.readFile(usersFilePath, 'utf-8');
    const wjsonData = JSON.parse(wData);
    const welcomeData = wjsonData.welcome;
    res.json({
      title: welcomeData.title,
      message: welcomeData.message,
      desktopImg: welcomeData.desktopImg,
      mobileImg: welcomeData.mobileImg
    });
  } catch (err) {
    console.error('Error reading data file:', err);
    res.status(500).json({ message: '' });
  }
});

/**
 *  Route for updating the welcome content
 */
app.post('/update-welcome', async (req, res) => {
  const { title, message, desktopImg, mobileImg } = req.body;
  try {
      const data = await fs.readFile(usersFilePath, 'utf-8');
      const jsonData = JSON.parse(data);
      jsonData.welcome = {
          title: title,
          message: message,
          desktopImg: desktopImg,
          mobileImg: mobileImg,
      };
      await fs.writeFile(usersFilePath, JSON.stringify(jsonData, null, 2));
      res.status(200).json({ message: 'Welcome data updated successfully.' });
  } catch (error) {
      console.error('Error updating welcome data:', error);
      res.status(500).json({ message: 'Error updating welcome data.' });
  }
});


/**
 *  The route below is used to get the project data from the 'data.json'
 *  file. From here it will set the projects to a new variable before
 *  setting it in a json object before sending it back to the client. If 
 *  there is an error it will then send back the error message and post 
 *  an error to the console. 
 */
app.get('/projects', async (req, res) => {
  try{
    const pData = await fs.readFile(usersFilePath, 'utf-8');
    const pjsonData = JSON.parse(pData);
    const projectData = pjsonData.projects;
    res.json({
      projects: projectData
    });
  } catch (err) {
    console.error('Error reading data file', err);
    res.status(500).json({ message: 'Error fetching project data. '});
  }
}); 


/** 
 *  This route is used to update a project item in the data file. It will take in the 
 *  data and the previous title. It will then read the data file and look for a project
 *  with a matching title to the previous one. From here it will set the variables to the 
 *  ones passed from the client before writting the data back to the file. 
 */
app.post('/update-project', async (req, res) => {
  const { oldTitle, title, url, github, thumbnail, date, description, languages, frameworks } = req.body;
  try {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    const jsonData = JSON.parse(data);
    const project = jsonData.projects.find(item => item.title === oldTitle);

    if (!project) {
        return res.status(404).json({ message: 'Project entry not found' });
    }
    project.title = title;
    project.url = url;
    project.github = github;
    project.thumbnail = thumbnail;
    project.date = date;
    project.description = description;
    project.languages = languages;
    project.framewors = frameworks;

    await fs.writeFile(usersFilePath, JSON.stringify(jsonData, null, 2));
    res.status(200).json({ message: 'Project data updated successfully.' });
} catch (error) {
    console.error('Error updating project data:', error);
    res.status(500).json({ message: 'Error updating Projecet data.' });
}
});


/** 
 *  The route below is used to add in a new project to the data file
 *  it will take in the data for the project the user wants to add and 
 *  create a new object to hold it. From there it reads the data from the 
 *  file and checks for the projects section before it pushes the new 
 *  project into the projects array, then writting the data back the the 
 *  file. 
 */
app.post('/add-project', async (req, res) => {
  const { title, url, github, thumbnail, date, description, languages, frameworks } = req.body;
  const newProject = {
      title,
      url,
      github,
      thumbnail: thumbnail || '/Resources/genericProject.png',
      date,
      description,
      languages,
      frameworks,
  };

  try {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    const jsonData = JSON.parse(data);
    const projects = jsonData.projects;
  
    projects.push(newProject);

    await fs.writeFile(usersFilePath, JSON.stringify(jsonData, null, 2));
    res.status(200).json({ message: 'Project added successfully.' });
  } catch (error) {
      console.error('Error adding Project:', error);
      res.status(500).json({ message: 'Error adding Project.' });
  }
});

/**
 *  The function below is used to delete a project from the data file
 *  it takes in the title of the project to delete, from there it will
 *  read the data file, make a copy finding the project that matches the 
 *  given title. If it can't find a match it will return 404. If there is 
 *  a match then it will remove it before writting the data back the file. 
 */
app.post('/delete-project', async (req, res) => {
  const { title } = req.body;

  try{
    const data = await fs.readFile(usersFilePath, 'utf-8');
    const jsonData = JSON.parse(data);
    const projectIndex = jsonData.projects.findIndex(item => item.title === title);
    if(projectIndex === -1){
      return res.status(404).json({ message: 'Project entry not found' });
    }

    jsonData.projects.splice(projectIndex, 1);

    await fs.writeFile(usersFilePath, JSON.stringify(jsonData, null, 2));

    res.status(200).json({ message: 'Project data deleted successfully' });
  } catch (error) {
      console.error('Error deleting project data:', error);
      res.status(500).json({ message: 'Error deleting project data.' });
  }
});


/**
 *  The route below is used to get the languages to the website. It will 
 *  get read the file that is specified and then it will get the language
 *  data and set it in a json object before it sends it back, if there is
 *  an error along the way it will instead send an error message back and 
 *  post an error in the console.
 */
app.get('/languages', async (req, res) => {
  try{
    const lData = await fs.readFile(usersFilePath, 'utf-8');
    const ljsonData = JSON.parse(lData);
    const languagetData = ljsonData.languages;
    console.log(languagetData);
    res.json({
      languages: languagetData
    });
  } catch (err) {
    console.error('Error reading data file', err);
    res.status(500).json({ message: 'Error fetching language data. '});
  }
}); 


/**
 *  The route below is used to get the framework data for the website. 
 *  It will read the data.json file and then get the framework data from it,
 *  from there it will place it in a json object before sending it back. If
 *  there is an error along the way, it will then send back an error message
 *  and post the error to the console. 
 */
app.get('/frameworks', async (req, res) => {
  try{
    const fData = await fs.readFile(usersFilePath, 'utf-8');
    const fjsonData = JSON.parse(fData);
    const frameworkData = fjsonData.frameworks;
    console.log(frameworkData);
    res.json({
      frameworks: frameworkData
    });
  } catch (err) {
    console.error('Error reading data file', err);
    res.status(500).json({ message: 'Error fetching framework data. '});
  }
}); 


/**
 *  This route gets the experience data for the client. It will 
 *  first get read the file 'data.json' and get the experience 
 *  data. From tehre it will set the data in a json file before
 *  sending it back. 
 */
app.get('/experience', async (req, res) => {
  try{
    const exData = await fs.readFile(usersFilePath, 'utf-8');
    const exjsonData = JSON.parse(exData);
    const experienceData = exjsonData.experience;
    res.json({
      experience: experienceData
    });
  } catch (err){
    console.error("Experience: Error reading data file:", err);
    res.status(500).json({ message: 'Error fetching experience data'});
  }  
});

/**
 *  The route below is used to update an experience item in the data
 *  file. It takes in all the experience data and the previous title. 
 *  It will then read the data file, parse data, and find the experience
 *  that matches the title to the old one given from the client, It will
 *  next set that experience data variables to the new ones, finishing by
 *  sending back if it was successful or not. 
 */
app.post('/update-experience', async (req, res) => {
  const { oldTitle, title, company, description, startDate, endDate, logo } = req.body;

  try {
      const data = await fs.readFile(usersFilePath, 'utf-8');
      const jsonData = JSON.parse(data);
      const experience = jsonData.experience.find(item => item.title === oldTitle);

      if (!experience) {
          return res.status(404).json({ message: 'Experience entry not found' });
      }
      experience.title = title;
      experience.company = company;
      experience.description = description;
      experience.startDate = startDate;
      experience.endDate = endDate;
      experience.logo = logo;

      await fs.writeFile(usersFilePath, JSON.stringify(jsonData, null, 2));
      res.status(200).json({ message: 'Experience data updated successfully.' });
  } catch (error) {
      console.error('Error updating experience data:', error);
      res.status(500).json({ message: 'Error updating experience data.' });
  }
});


/**
 *  The route below is used to add an experience to the data.json 
 *  file. It creates an object of the data that is sent from the 
 *  client. From here it will read the data file, parse the data, 
 *  find experience. It will then push the new experience into it. 
 *  Lastly it will then write the data back to the file, thus adding
 *  in the new experience, and then sending back if successful or not. 
 */
app.post('/add-experience', async (req, res) => {
  const { title, company, description, startDate, endDate, logo } = req.body;
  const newExperience = {
      company,
      title,
      startDate,
      endDate,
      logo: logo || '/Resources/genericExperience.png',
      description,
  };

  try {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    const jsonData = JSON.parse(data);
    const experience = jsonData.experience;
  
    experience.push(newExperience);

    await fs.writeFile(usersFilePath, JSON.stringify(jsonData, null, 2));
    res.status(200).json({ message: 'Experience added successfully.' });
  } catch (error) {
      console.error('Error adding experience:', error);
      res.status(500).json({ message: 'Error adding experience.' });
  }
});



/**
 *  This route is used to delete an experience. It will take
 *  in the experience title. It then reads the data file, parses
 *  the data, then finds that experience data, or return not found.
 *  If found it will splice it off the array, and write the data back
 *  to the server, removing that experience data. 
 */
app.post('/delete-experience', async (req, res) => {
  const { title } = req.body;

  try {
      const data = await fs.readFile(usersFilePath, 'utf-8');
      const jsonData = JSON.parse(data);
      const experienceIndex = jsonData.experience.findIndex(item => item.title === title);
      if (experienceIndex === -1) {
          return res.status(404).json({ message: 'Experience entry not found' });
      }

      jsonData.experience.splice(experienceIndex, 1);

      await fs.writeFile(usersFilePath, JSON.stringify(jsonData, null, 2));

      res.status(200).json({ message: 'Experience data deleted successfully.' });
  } catch (error) {
      console.error('Error deleting experience data:', error);
      res.status(500).json({ message: 'Error deleting experience data.' });
  }
});


/**
 *  The request below is used to get the about section data from the
 *  file 'data.json'. It will then parse the about data and set the
 *  new json data to a new object before passing the data back to
 *  the client. 
 */
app.get('/about', async (req, res) => {
  try {
    const aData = await fs.readFile(usersFilePath, 'utf-8');
    const ajsonData = JSON.parse(aData);
    const aboutData = ajsonData.about;
    res.json({
      texts: aboutData.texts,
      images: aboutData.images
    });
  } catch (err) {
    console.error('About: Error reading data file:', err);
    res.status(500).json({ message: 'Error fetching about data' });
  }
});


app.delete('/delete-about', async (req, res) => {
  const { heading } = req.body;
  try {
      console.log('Attempting to read file:', usersFilePath);
      const data = await fs.readFile(usersFilePath, 'utf-8');
      console.log('File read successfully');
      
      if (!data.trim()) {
          console.error('Error: File is empty');
          return res.status(400).json({ message: 'File is empty or corrupted.' });
      }

      let jsonData;
      try {
          jsonData = JSON.parse(data);
      } catch (parseError) {
          console.error('Error parsing JSON:', parseError.message);
          return res.status(400).json({ message: 'Invalid JSON format in file.' });
      }

      console.log('Current JSON data:', jsonData);
      const initialLength = jsonData.about.texts.length;
      jsonData.about.texts = jsonData.about.texts.filter(text => text.heading !== heading);

      // Log the resulting JSON data after deletion
      console.log('Updated JSON data after deletion:', jsonData);

      // Write the updated data back to the file
      await fs.writeFile(usersFilePath, JSON.stringify(jsonData, null, 2));
      
      // Check the file content after writing
      const updatedData = await fs.readFile(usersFilePath, 'utf-8');
      console.log('Updated file content after writing:', updatedData);

      res.status(200).json({ message: 'Section deleted successfully.' });
  } catch (error) {
      console.error('Detailed error information:', error.message, error.stack);
      res.status(500).json({ message: 'Error deleting about section.' });
  }
});


/**
 *  The request below is used to get the contact content from 
 *  'data.json'. It queries for the data in the file and then it 
 *  gets the object 'contact' from the data that is sent back. 
 *  it then sets the data in the object to the response data, 
 *  and then sends it. If it can't find it then it sends back an 
 *  error. 
 */
app.get('/contact', async (req, res) => {
  try{
    const cData = await fs.readFile(usersFilePath, 'utf-8');
    const cjsondata = JSON.parse(cData);
    const contactData = cjsondata.contact;
    res.json({
      phone: contactData.phone,
      email: contactData.email,
      linkedIn: contactData.linkedin,
      github: contactData.github,
      instagram: contactData.instagram,
      x: contactData.X
    });
  } catch (err){
    console.error('Contact: Error reading data file:', err);
    res.status(500).json({ message: 'Error fetching contact data.' });
  }
});


/**
 *  Helper function used in login route
 * 
 *  this queries for all users and does return 
 *  the json object that is returned. 
 *  @returns users
 */
async function getUsers() {
    try {
      const data = await fs.readFile(usersFilePath, 'utf-8');
      const jsonData = JSON.parse(data);
      return jsonData; // Returning the whole JSON object, which includes 'user' and 'welcome' categories
    } catch (err) {
      console.error('Error reading users file:', err);
      return {};
    }
}


/**
 *  Start Server
 */
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});