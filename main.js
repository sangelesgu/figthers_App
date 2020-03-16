// Inport packages: 

const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/users.controller'); 
const specialistController = require('./controllers/specialist.controller');
const cookieParser = require('cookie-parser');
const authController = require('./controllers/auth.controller');
const helmet = require('helmet');




// Server: 
const server = express();


// Middlewares: 
server.use(helmet());
server.use(bodyParser.json());
server.use(cookieParser());


// Endpoints Users: 
server.post('/createUser', userController.createUser);
server.post('/login', authController.login);
server.get('/users', userController.listOfUsers);
server.get('/user/:id', userController.getOneUser);
server.put('/editProfile', userController.updateUser);
server.delete('/deleteProfile/:id', userController.deleteUser);

// Endpoints Specialists : 

server.post('/createSpecialist', specialistController.createSpecialist);



// Listen:
server.listen(3000, ()=>{
    console.log('Server listen at port 3000')
});



