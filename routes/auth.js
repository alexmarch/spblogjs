var mongoose = require('mongoose'),
    crypto = require('crypto');

mongoose.connect('mongodb://***:***@ds061258.mongolab.com:61258/spblogjs');

mongoose.connection.on('error', function (err) {
    console.error('Mongoose connection error %s', err);
});

var len = 128;

var iterations = 12000;

function pass(passwd, salt, cb) {

    if (arguments.length != 3) {
        cb = salt;
        crypto.randomBytes(len, function (err, salt) {
            if (err) return cb(err);
            salt = salt.toString('base64');
            crypto.pbkdf2(passwd, salt, iterations, len, function (err, pwdHash) {
                if (err) return cb(err);
                cb(null, salt, pwdHash.toString('base64'));
            });
        });
    } else {
        crypto.pbkdf2(passwd, salt, iterations, len, function (err, pwdHash) {
            if (err) return cb(err);
            cb(null, salt, pwdHash.toString('base64'));
        });
    }


};

var UserSchema = mongoose.Schema({
    email: String,
    password: String
}, {collectin: 'users'});

var UserModel = mongoose.model('User', UserSchema);

var router = {

    base: '/',

    routes: {
        'get': {
            'auth': 'auth',
            'signin': 'signin',
            'singup': 'signup',
            'logout': 'logout'
        },
        'post': {
            'signin': 'signin',
            'singup': 'signup'
        }
    },

    auth: function (req, res) {
        if (req.session.auth)
            res.redirect('/blogs');
        else {
            if (req.session.err) {
                var email = req.session.err.email;
                if (email) {
                    res.render('auth', {email: email});
                    delete req.session.err;
                    return;
                }
            }
            res.render('auth');
        }
    },

    signin: function (req, res) {
        //@todo - auth signin
        var email = req.body.email,
            password = req.body.password;

        if (email && password) {
            pass(password, "dasdas34234sfsQWWASfafa341", function (err, salt, hash) {
                if (!err && hash) {
                    UserModel.findOne({email: email, password: hash}, function (err, user) {
                        if (err || user == null) {
                            res.redirect('auth#error');
                        } else {
                            req.session.regenerate(function () {
                                req.session.user = user;
                                res.redirect('blogs');
                            });
                        }
                    });
                }
            });
        } else {
            res.redirect('auth#error');
        }

    },

    signup: function (reg, res) {
        //@todo - auth signup
    },

    logout: function (reg, res) {
        //@todo - auth logout
    }

};

module.exports = router;
