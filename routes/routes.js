'use strict'


module.exports = function(app) {
    var todoList = require('../controller/controller');

    app.route('/login').get(todoList.formlogin);
    app.route('/login/:user/:password').get(todoList.ceklogin);
    app.route('/logout').get(todoList.Logout);
    app.route('/').get(todoList.index);

    /* Setup Users */
    app.route('/users').get(todoList.users);
    app.route('/users/:iduser').get(todoList.FindUser);
    app.route('/users').post(todoList.SaveUser);
    app.route('/users').put(todoList.UpdateUser);
    app.route('/users').delete(todoList.DeleteUser);  
    
    /* Setup Users */
};

