const User = require('../models/User');

// Request      get     /signup
module.exports.signup_get = (req, res) => {
    res.render('signup');
}

// Handle Errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    const errors = {email: '', password: ''};

    // duplicate error code
    if(err.code === 11000) {
        errors.email = "Email already exist enter new one or login with the same";
        return errors;
    }

    // validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors
}

// Request      post     /signup
module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        res.status(201).json(user);
    } catch (err) {
        const error = handleErrors(err);
        res.status(404).json({ error });
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