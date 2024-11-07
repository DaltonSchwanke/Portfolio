const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');

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
 *  Route for logging user in
 */
app.post('/login', async (req, res) => {
    const { user, pass } = req.body;
    console.log(req.body);
    console.log({ user, pass });
    const users = await getUsers();
    const foundUser = users.find((u) => u.username === user);
    if (!foundUser) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    const isPasswordMatch = await bcrypt.compare(pass, foundUser.password);
    if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
    } else {
        return res.status(200).json({ message: 'Login successful' });
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
      const users = JSON.parse(data || '[]');
      users.push(newUser);
      await fs.writeFile('data.json', JSON.stringify(users, null, 2));
      res.status(200).json({ message: 'User signed up successfully!' });
    } catch (err) {
      console.error('Error saving user data:', err);
      res.status(500).json({ message: 'Error saving user data.' });
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
      return JSON.parse(data);
    } catch (err) {
      console.error('Error reading users file:', err);
      return [];
    }
}





/**
 *  Start Server
 */
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});