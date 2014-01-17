define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    var AuthRouter = Backbone.Router.extend({
        routes: {
            'error': 'error',
            'error/:info': 'error'
        },
        error: function (info) {
            App.Widgets.SignInForm.render("error",info);
        }
    });
    return AuthRouter;
});
