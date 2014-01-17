/**
 * Created by mas_bk on 1/9/14.
 */
define(['underscore',
    'jquery',
    'backbone',
    'routes/AuthRouter',
    'widgets/SignInForm'],
    function (_, $, Backbone, AuthRouter, SignInForm) {
        var App = window.App || {
            initialize: function () {
                this.Widgets = {},
                    this.Views = {},
                    this.Models = {},
                    this.Collections = {},
                    this.Routers = {},
                    this.Routers.AuthRouter = new AuthRouter();
                    this.Widgets.SignInForm = new SignInForm({el: $('#signin-form')});

                Backbone.history.start();

            }
        };

        window.App = App;
        return App;
});