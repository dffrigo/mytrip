const routes = require("express").Router();//nativo do express, caminho que ele será executado em routes
const TripController = require("../controllers/TripControllers");//acessa o controllers

routes.get("/", TripController.getAll);//listar tudo que tem na rota (cadastrado no banco)
routes.get("/trips/:id", TripController.getById);//rota para pegar a viagem por id e estou chamando a rota detalhes
routes.get("/criar", TripController.criar);//rota de exibição da criação 
routes.post("/criacao", TripController.criacao);//rota de criacao 
routes.get("/editar/:id", TripController.editar1);//rota de validação se existe a viagem para eu editar
routes.post("/editar/:id", TripController.editar);//rota de edição
routes.get("/deletar/:id", TripController.deletar);//rota para deletar 
routes.post("/deletar/:id", TripController.deletar1);//rota para deletar 
routes.post("/pesquisa", TripController.pesquisaCity);//rota para pesquisar 
module.exports = routes;//exporto ela para qualquer caminho