// Import packages: 

const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/users.controller'); 
const specialistController = require('./controllers/specialist.controller');
const authController = require('./controllers/auth.controller');
const groupsController = require('./controllers/groups.controller');
const articlesController = require('./controllers/article.controller');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');


// Server: 
const server = express();


// Middlewares: 
server.use(cors());
server.use(helmet());
server.use(bodyParser.json());
server.use(cookieParser());


// Endpoints Users: 
server.post('/register/createUser', userController.createUser);
server.post('/login/:type', authController.login);
server.get('/users', userController.listOfUsers);
server.get('/user/:id', userController.getOneUser);
server.put('/editProfile/:id', userController.updateUser);
server.delete('/deleteProfile/:id', userController.deleteUser);
        
// Endpoints Specialists : 

server.post('/register/createSpecialist', specialistController.createSpecialist);
server.get('/specialists', specialistController.listOfSpecialists);
server.get('/specialist/:id', specialistController.getOneSpecialist);
server.put('/editSpecialist/:id', specialistController.editSpecialist);
server.delete('/deleteSpecialist/:id', specialistController.deleteSpecialist);

// Endpoints groups : 

server.post('/createGroup', groupsController.createGroup);
server.put('/editGroup', groupsController.updateGroup);
server.get('/groups', groupsController.listOfGroups);
server.get('/group/:id', groupsController.getOneGroup);
server.delete('/deleteGroup/:id', groupsController.deleteGroup);

// Endpoints articles: 

server.get('/articles', articlesController.getArticles);




// Listen:
server.listen(3000, ()=>{console.log('Server listen at port 3000')});



