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
            if (email == "mas_bk@mail.ru" && password == "demo") {
                delete req.session.err;
                res.render('blog');
            } else {
                req.session.err = {"email": email};
                res.redirect('auth#error/email');
            }
        } else {
            delete req.session.err;
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