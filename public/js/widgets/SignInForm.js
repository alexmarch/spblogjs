define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {

    var SignInForm = Backbone.View.extend({

        events: {
            'focusout #email': 'emailFocusOut',
            'focusin #email': 'emailFocusIn',
            'focusout #password': 'passwordFocusOut',
            'focusin #password': 'passwordFocusIn',
            'click #alert-close': 'alertCloseClick'
        },

        render: function(event,info){
            if (event == "error") {
                if (info == "email") {
                    this.$el.find('#alert')
                        .show()
                        .find('#msg').html('<string>Email:</strong> invalid email address.');

                } else if (info == "password") {
                    this.$el.find('#alert')
                        .show()
                        .find('#msg').html('<string>Password:</strong> invalid password.');

                } else {
                    this.$el.find('#alert')
                        .show()
                        .find('#msg').html('<string>Auth:</strong> authentification error.');
                }
            }

            return this;
        },

        emailFocusOut: function (event) {
            var $input = $(event.currentTarget);
            var $group = this.$el.find('#email-group');
            if ($.trim($input.val()) == '')
                $group.addClass('error');
        },

        emailFocusIn: function (event) {
            this.$el.find('#email-group')
                .removeClass('error');
        },

        passwordFocusOut: function (event) {
            var $input = $(event.currentTarget);
            var $group = this.$el.find('#password-group');
            if ($.trim($input.val()) == '')
                $group.addClass('error');
        },

        passwordFocusIn: function (event) {
            this.$el.find('#password-group')
                .removeClass('error');
        },

        alertCloseClick: function(){
            this.$el.find('#alert').fadeOut(200);
        }
    });

    return SignInForm;
});
