const User = require('../models/User');

// Request      get     /signup
module.exports.signup_get = (req, res) => {
    res.render('signup');
}

// Request      post     /signup
module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).send("User not created");
    }
}

// Request      get     /login
module.exports.login_get = (req, res) => {
    res.render('login');
}

// Request      post     /login
module.exports.login_post = (req, res) => {
    console.log(req.body);
    res.send('user login');
}