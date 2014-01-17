/**
 * Created by mas_bk on 1/9/14.
 */
require.config({
    baseUrl: '/js/',
    paths:{
        backbone: 'frameworks/backbone',
        jquery: 'libs/jquery',
        underscore: 'libs/underscore',
        App: 'guest_app'
    },
    shim:{
        'backbone': {
            deps: ['underscore'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

define(['App'],function(App){
   App.initialize();
});

