const express = require('express');

const routes = express.Router();

const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

//Rota para listar as ONGs
routes.get('/ongs', OngController.index);
//Rota de criação das Ongs
routes.post('/ongs', OngController.create);
//Rota de Criação dos Casos
routes.post('/incidents', IncidentController.create);
//Rota para listar os casos
routes.get('/incidents', IncidentController.index);
//Rota para Deletar um caso
routes.delete('/incidents/:id', IncidentController.delete);
//Rota para listar os casos de uma ong 
routes.get('/profile', ProfileController.index);
//Rota para fazer login
routes.post('/Sessions', SessionController.create);
module.exports = routes;