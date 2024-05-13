const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const User = require('./models/user');


const app = express();
const port =8000;

mongoose.connect('mongodb+srv://saravanan:<saravanan@101123>@saravanan.uh23wjj.mongodb.net/?retryWrites=true&w=majority&appName=saravanan', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});



app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/incorrect', (req, res) => {
    res.render('incorrect');
});
app.get('/', (req, res) => {
    res.render('index');
});
// app.get('/incorrect', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'incorrect.ejs'));
// });

app.post('/', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            if (user.password === req.body.password) {
                // res.send('User logged in successfully!');
                res.redirect('http://localhost:3000/');
            } else {
                res.send('Incorrect password!');
            }
        } else {
            res.redirect('http://localhost:8000/incorrect')
        }
    } catch (err) {
        console.error('Error finding user:', err);
        res.status(500).send('Error finding user');
    }
});

app.get('/userexist', function (req, res) {
    res.render('userexist');
});
app.get('/signup', function (req, res) {
    res.render('signup');
});
app.post('/signup', async(req, res) => {
    try{
        const user = await User.findOne({ username: req.body.username });
        if(user){
            res.redirect('http://localhost:8000/userexist');
        }
        else{const newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
        const savedUser = await newUser.save();
        console.log('User saved:', savedUser);
        res.redirect('http://localhost:8000/')}
    }catch(error){
        console.error('Error saving user:', error);
        res.status(500).send('Error registering user');
    }
});



app.listen(port, () => {
    console.log(`Server is running on port :${port}`);
});