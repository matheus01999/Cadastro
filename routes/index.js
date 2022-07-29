const { FORMERR } = require('dns');
const { json } = require('express');
var express = require('express');
var fs = require('fs');
const { response } = require('../app');
var router = express.Router();
var pessoas = []
const caminhoBanco = 'dados/banco.js'



router.get('/', function(request, response, next) {  
  dados = {title: 'Home'}
  carregarBase(function read(err, data){
    if (err) {
      console.log(err)
      dados['pessoas'] = []
    }else{
      dados['pessoas'] = JSON.parse(data)
    }
    response.render('index', dados)
  })
});

router.get('/pesquisar', function(request, response, next) {  
  dados = {title: 'Pesquisar'}
  carregarBase(function read(err, data){
    if (err) {
      console.log(err)
      bancoDados['pessoas'] = []
    }else{
      var dadosPesquisados = []
      if(request.query.nome == ""){
        var dadosPesquisados = JSON.parse(data)
      }
      else{
        var bancoDados = JSON.parse(data)

        /* PESQUISA COM REGULAR EXPRE */
        for(var i=0; i<bancoDados.length; i++){
          var reg = new RegExp(request.query.nome, 'i')
          if(bancoDados[i].nome.match(reg) != null){
            dadosPesquisados.push(bancoDados[i])
          }
        }

        /* PESQUISA SEM UTILIZAR REGULAR EXPRESION
        for(var i=0; i<bancoDados.length; i++){
          var nomeMinusculo = request.query.nome.toLocaleLowerCase();
          var nomeBancoMinusculo = bancoDados[i].nome.toLocaleLowerCase();
          if(nomeBancoMinusculo.indexOf(nomeMinusculo) != -1){
            dadosPesquisados.push(bancoDados[i])
          }
        }
        */
      }
      
      dados['pessoas'] = dadosPesquisados
    }
    response.render('index', dados)
  })
});



router.post('/cadastrar-pessoas', function(request, response, next) {
  carregarBase(function read(err, data){
    if(err){
      console.log(err)
      return
    }

    pessoas = JSON.parse(data)

    hash = {
      nome: request.body.nome,
      sobrenome: request.body.sobrenome,
      cpf: request.body.cpf,
      telefone: request.body.telefone,
      endereco: request.body.endereco
    }
    
    salvarBase(hash)
    response.render('index', { title: 'Finalizado', pessoas:pessoas });


  })


});


//Funçoes Auxiliares
var carregarBase = function(callback){
  fs.readFile(caminhoBanco, callback)
}

var salvarBase = function(hash){
  pessoas.push(hash)
  fs.writeFile(caminhoBanco, JSON.stringify(pessoas), function(err){
    if (err){
      console.log(err)
    }
  })
}


module.exports = router;
