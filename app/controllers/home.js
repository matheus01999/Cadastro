const { response } = require('express');
var Pessoa = require('../models/pessoa')

var homeControllers = {



  index: function(request, response, next){

    if(response.cookie == undefined || response.cookie.autenticado == undefined){
      response.send('/')
      console.log(request.cookie)
    }

      Pessoa.todos(function (pessoasCadastradas){
        response.render('index', {title: "Primeira", pessoasCadastradas:pessoasCadastradas})})
    
    
  },

  login: function(request, response, next){
    Pessoa.todos(function (pessoasCadastradas){
      response.render('login', {title: "Login", pessoasCadastradas:pessoasCadastradas})})
  },

  fazerLogin: function(request, response, next){
    var user = request.body.endereco
    var pass = request.body.senha
    if(user !=  undefined && user != "" || pass != undefined && pass != ""){
      if(request.body.endereco == 'matheus' && request.body.senha == '60265146'){
        response.cookie('autenticado', '1', {httpOnly: true})
        response.redirect('/')
      }
    }else{
      response.send('indefinido ou em branco')
    }

        
      },

    cadastrarPessoas: function(request, response, next) {
      var pessoa = new Pessoa();
    
      pessoa.cpf        = request.body.cpf
      pessoa.nome       = request.body.nome
      pessoa.sobrenome  = request.body.sobrenome
      pessoa.telefone   = request.body.telefone
      pessoa.endereco   = request.body.endereco
      pessoa.senha   = request.body.senha
    
      pessoa.salvar(function(){
        response.redirect('/')
      })
    
      },

      excluir: function(request, response, next){
        var pessoa = new Pessoa();
        pessoa.cpf = request.query.cpf
        pessoa.excluir(function(){
          response.redirect("/")
        })
      },

      pesquisar: function(request, response, next) {  
        Pessoa.buscarPorNome(request.query.nome, function(pessoasCadastradas){
          response.render('index', {title: 'pesquisa', pessoasCadastradas:pessoasCadastradas})
        })
       },

       alterar: function(request, response, next) {  
        Pessoa.buscar(request.query.cpf, function (pessoa){
          if (pessoa == null) {
            console.log("Erro rota alterar")
            response.render('alterar',  {'pessoa':{}})
          }else{
            
            response.render('alterar',  {'pessoa':pessoa})
      
          }
      
        })
      },

      alterarPessoa: function(request, response, next){
        var pessoa = new Pessoa();
      
        pessoa.cpf        = request.body.cpf
        pessoa.nome       = request.body.nome
        pessoa.sobrenome  = request.body.sobrenome
        pessoa.telefone   = request.body.telefone
        pessoa.endereco   = request.body.endereco
      
        pessoa.salvar(function(){
          response.redirect("/")
        }, request.query.cpfAlterar)
      },

      
   
}



module.exports = homeControllers;
