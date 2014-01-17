var router = {
    base: '/',

    routes:{
        'get':{
            '': 'index',
            'index': 'index'
        }
    },

    index: function(reg,res){
        res.send('Hello !');
    }
};

module.exports = router;