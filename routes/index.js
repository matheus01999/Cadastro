var express = require('express')
var router = express.Router()
var fs = require('fs')
var pessoasCadastradas = []
var caminhoBanco = 'dados/banco.js'
var Pessoa = require('../modelos/pessoa')


router.get('/', function(request, response, next) {  
  Pessoa.todos(function read(err, data){
    pessoasCadastradas = []
    if(err){
      console.log(err)
    }
    else{
      pessoasCadastradas = JSON.parse(data)
    }
    response.render('index', {title:'Pagina 1' , pessoasCadastradas:pessoasCadastradas})
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
router.get('/excluir', function(request, response, next) {  
  dados = {title: 'Home'}
  carregarBase(function read(err, data){
    if (err) {
      console.log(err)
      dados['pessoas'] = []
    }else{
      var bancoDados = JSON.parse(data)
      var novosDados = []
      for(var i=0; i<bancoDados.length; i++){
        if(bancoDados[i].cpf != request.query.cpf ){
          novosDados.push(bancoDados[i])
        }
      }
      atualizarBase(novosDados)
      dados['pessoasCadastradas'] = novosDados
    }
    response.render('index', dados)
  })
});

// Rota de Pesquisa
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
      
      dados['pessoasCadastradas'] = dadosPesquisados
    }
    response.render('index', dados)
  })
});


router.get('/alterar', function(request, response, next) {  
  carregarBase(function read(err, data){
    if (err) {
      console.log(err)
    }else{
      var usuario = null;
      var bancoDados = JSON.parse(data)
      for(var i=0; i<bancoDados.length; i++){
        if(bancoDados[i].cpf == request.query.cpf ){
          usuario = bancoDados[i]
          break
        }
      }
      response.render('alterar',  {'usuario':usuario})

    }

  })
});

router.post('/alterar-pessoa', function(request, response, next){
  carregarBase(function read(err, data){
    if(err){
      console.log(err)
      dados['pessoasCadastradas'] = []
      response.redirect('/')
    }else{
      var bancoDados = JSON.parse(data)
      for(var i=0; i<bancoDados.length; i++){
        if(bancoDados[i].cpf == request.query.cpfAlterar){
          bancoDados[i].nome = request.body.nome
          bancoDados[i].sobrenome = request.body.sobrenome;
          bancoDados[i].cpf = request.body.cpf;
          bancoDados[i].telefone = request.body.telefone;
          bancoDados[i].endereco = request.body.endereco;

          atualizarBase(bancoDados)
          break
        }
      }
      response.redirect('/')
    }
  })
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





// // Rota de Pesquisa
// router.get('/pesquisar', function(request, response, next) {  
//   dados = {title: 'Pesquisar'}
//   carregarBase(function read(err, data){
//     if (err) {
//       console.log(err)
//       bancoDados['pessoas'] = []
//     }else{
//       var dadosPesquisados = []
//       if(request.query.nome == ""){
//         var dadosPesquisados = JSON.parse(data)
//       }
//       else{
//         var bancoDados = JSON.parse(data)

//         /* PESQUISA COM REGULAR EXPRE */
//         for(var i=0; i<bancoDados.length; i++){
//           var reg = new RegExp(request.query.nome, 'i')
//           if(bancoDados[i].nome.match(reg) != null){
//             dadosPesquisados.push(bancoDados[i])
//           }
//         }
//       }
      
//       dados['pessoas'] = dadosPesquisados
//     }
//     response.render('index', dados)
//   })
// });
