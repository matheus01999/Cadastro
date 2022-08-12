var Pessoa = require('../models/pessoa')

var homeControllers = {

  index: function(request, response, next){

    if(request.cookies == undefined || request.cookies.autenticado == undefined){
      response.redirect('/login')
      return;
    }
    Pessoa.todos(function (pessoasCadastradas){
      response.render('index', {title: "Primeira", pessoasCadastradas:pessoasCadastradas})})
  },

    cadastrarPessoas: function(request, response, next) {
      var pessoa = new Pessoa();
    
      pessoa.cpf        = request.body.cpf
      pessoa.nome       = request.body.nome
      pessoa.sobrenome  = request.body.sobrenome
      pessoa.telefone   = request.body.telefone
      pessoa.endereco   = request.body.endereco
    
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

      login: function(request, response, next){
        Pessoa.todos(function (pessoasCadastradas){
          response.render('login', {title: "Primeira", pessoasCadastradas:pessoasCadastradas})})
      },


}



module.exports = homeControllers;
