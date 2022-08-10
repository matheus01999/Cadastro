var express = require('express')
var router = express.Router()
var fs = require('fs')
var pessoasCadastradas = []
var caminhoBanco = 'dados/banco.js'
var Pessoa = require('../modelos/pessoa')


router.get('/', function(request, response, next) {  
  Pessoa.todos(function (pessoasCadastradas){
    response.render('index', {title: "Primeira", pessoasCadastradas:pessoasCadastradas})

  })
    
  })



// Rota de cadastro

router.post('/cadastrar-pessoas', function(request, response, next) {
  carregarBase(function read(err, data){
    if(err){
      console.log(err)
      return
    }

    pessoasCadastradas = JSON.parse(data)

    hash = {
      nome: request.body.nome,
      sobrenome: request.body.sobrenome,
      cpf: request.body.cpf,
      telefone: request.body.telefone,
      endereco: request.body.endereco
    }
    
    salvarBase(hash)
    response.render('index', { title: 'Finalizado', pessoasCadastradas:pessoasCadastradas });


  })


});

//Rota de exclusão
router.get('/excluir', function(request, response, next){
  var pessoa = new Pessoa()
  pessoa.cpf = request.query.cpf
  pessoa.excluir(function(pessoasCadastradas){
    response.render('index', {title: 'exluir', pessoasCadastradas:pessoasCadastradas})
  })
})

// Rota de Pesquisa
router.get('/pesquisar', function(request, response, next) {  
  Pessoa.buscarPorNome(request.query.nome, function(pessoasCadastradas){
    response.render('index', {title: 'pesquisa', pessoasCadastradas:pessoasCadastradas})
  })
 });


router.get('/alterar', function(request, response, next) {  
  Pessoa.buscar(request.query.cpf, function (pessoa){
    if (pessoa == null) {
      console.log("Erro rota alterar")
      response.render('alterar',  {'pessoa':{}})
    }else{
      
      response.render('alterar',  {'pessoa':pessoa})

    }

  })
});

router.post('/alterar-pessoa', function(request, response, next){
  var pessoa = new Pessoa();

  pessoa.cpf        = request.body.cpf
  pessoa.nome       = request.body.nome
  pessoa.sobrenome  = request.body.sobrenome
  pessoa.telefone   = request.body.telefone
  pessoa.endereco   = request.body.cpf

  pessoa.salvar(function(){
    response.redirect("/")
  }, request.query.cpfAlterar)

  

 
})


//Funçoes Auxiliares
var carregarBase = function(callback){
  fs.readFile(caminhoBanco, callback)
}

var salvarBase = function(hash){
  pessoasCadastradas.push(hash)
  atualizarBase(pessoasCadastradas)
}



var atualizarBase = function(array){
  var fs = require('fs');
  fs.writeFile(caminhoBanco, JSON.stringify(array), function(err){
    if(err){
      console.log(err)
    }
  })
}



module.exports = router;
