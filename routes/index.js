var express = require('express')
var router = express.Router()
const homeControllers = require('../app/controllers/home')
var Pessoa = require('../app/models/pessoa')


router.get('/',  homeControllers.index); // ROTA HOME
router.post('/cadastrar-pessoas', homeControllers.cadastrarPessoas); //  ROTA DE CADASTRO 
router.get('/excluir', homeControllers.excluir); // ROTA DE EXCLUSÃO
router.get('/pesquisar', homeControllers.pesquisar); // ROTA DE PESQUISA
router.get('/alterar', homeControllers.alterar); //ROTA ALTERAR
router.post('/alterar-pessoa', homeControllers.alterarPessoa); // ROTA DE ALTERAÇÃO DE PESSOA
router.get('/login', homeControllers.login); // ROTA DE LOGIN




module.exports = router;

