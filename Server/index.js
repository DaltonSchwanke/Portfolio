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
 *  Route for sign in page 
 */
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../Public/Pages', 'signup.html'));
});

/**
 *  Route for login page
 */
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../Public/Pages', 'login.html'));
});

/**
 *  Route for dashboard page
 */
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../Public/Pages', 'dashboard.html'));
});

/**
 * Route for logging user in
 */
app.post('/login', async (req, res) => {
    const { user, pass } = req.body;
    const users = await getUsers(); // getUsers now handles the updated JSON structure
    const foundUser = users.user.find((u) => u.username === user); // Access user data under 'user' category
    if (!foundUser) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isPasswordMatch = await bcrypt.compare(pass, foundUser.password);
    if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
    } else {
        const token = jwt.sign({ username: user }, JWT_SECRET, { expiresIn: '3h' });
        return res.status(200).json({ message: 'Login successful', token });
    }
});

/**
 *  Route for signing user up
 */
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

/**
 *  The code below is used to get the content for the welcome 
 *  section on the home page for the site. It first grab the 
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
      message: welcomeData.message
    });
  } catch (err) {
    console.error('Error reading data file:', err);
    res.status(500).json({ message: 'Error fetching welcome data.' });
  }
});


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
 *  This route is used to get education data from the 
 *  file 'user.json'. It will read the file and get the 
 *  education data. It will then put it in a json object before
 *  it sends it to the client. 
 */
app.get('/education', async (req, res) => {
  try{
    const eData = await fs.readFile(usersFilePath, 'utf-8');
    const ejsonData = JSON.parse(eData);
    const educationData = ejsonData.education;
    res.json({
      educations: educationData
    });
  } catch (err){
    console.error("Education: Error reading data file:", err);
    res.status(500).json({ message: 'Error fetching education data'});
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

    console.log('About Data:', aboutData); // Debugging: Inspect content
    res.json({
      texts: aboutData.texts,
      images: aboutData.images
    });
  } catch (err) {
    console.error('About: Error reading data file:', err);
    res.status(500).json({ message: 'Error fetching about data' });
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
      github: contactData.github
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