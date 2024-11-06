const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const usersFilePath = path.join(__dirname, 'users.json'); // Assumes you have a users.json file

app.use(express.json());


/** 
*  Route for handling user login. 
*/
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = await getUsers();
  const user = users.find((u) => u.username === username);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }else{
    res.sendFile(path.join(__dirname, '../Public', 'dashboard.html'));
  }

  res.json({ message: 'Login successful' });
});



/**
 *  Route for signging up 
 */
app.post('/signup', async (req, res) => {
    const { user, pass } = req.body;
    console.log(user, pass);
    if (!user || !pass) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const hashedPassword = await bcrypt.hash(pass, 10);
    const newUser = {
      username, user,
      password: hashedPassword
    };
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ message: 'Error reading data file.' });
      }
      const users = JSON.parse(data || '[]');
      users.push(newUser);
      fs.writeFile('data.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error saving user data.' });
        }
        return res.status(200).json({ message: 'User signed up successfully!' });
      });
    });
  });



/**
 *  Route to navigate main page
 */
app.get('/', (req, res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, '../Public/Pages', 'index.html'));
});

/**
 *  Routes to get index page
 */
app.get('/index' || '/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Pages', 'index.html'));
});
app.get('/index.html' || '/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Pages', 'index.html'));
});

/**
 *  Routes to get signup page
 */
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Pages', '/signup.html'));
});
app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Pages', '/signup.html'));
});

/**
 *  Routes to get login page
 */
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Pages', 'login.html'));
});
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Pages', 'login.html'));
});

/**
 *  Routes to get dashboard page
 */
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Pages', 'dashboard.html'));
});
app.get('/dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Pages', 'dashboard.html'));
});






/**
 *  Route to get the home css file
 */
app.get('/home.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Styles', 'home.css'));
})

/**
 *  Route to get the login css file
 */
app.get('/login.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Styles', 'login.css'));
})

/**
 *  Route to get the dashboard css file
 */
app.get('/dashboard.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Styles', 'dashboard.css'));
})





/**
 * Route to get login javascript file (login.js)
 */
app.get('/login.js', (req, res) => {
    res.sendFile(path.join(__dirname,'../Public/Javascript', 'login.js'));
});

/**
 * Route to get sign up javascript file (signup.js)
 */
app.get('/signup.js', (req, res) => {
    res.sendFile(path.join(__dirname,'../Public/Javascript', 'signup.js'));
});

/**
 * Route to get home javascript file (home.js)
 */
app.get('/home.js', (req, res) => {
    res.sendFile(path.join(__dirname,'../Public/Javascript', 'home.js'));
});

/**
 * Route to get dashboard javascript file (dashboard.js)
 */
app.get('/dashboard.js', (req, res) => {
    res.sendFile(path.join(__dirname,'../Public/Javascript', 'dashboard.js'));
});








/**
 *  Helper function that gets all the users from the file "data.json"
 */
async function getUsers() {
    try {
      const data = await fs.readFile(usersFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Error reading users file:', err);
      return [];
    }
}


/**
 *  Code letting console know server is running
 */
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });