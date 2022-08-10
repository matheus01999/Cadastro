const { request } = require('http')
var App = require('../config/app')

var Pessoa = function(){
    this.nome = ""
    this.sobrenome = ""
    this.cpf = ""
    this.telefone =""
    this.endereço = ""

    this.salvar = function(callback, cpfAlteracao){
        var nomeI      = this.nome;
        var sobrenomeI = this.sobrenome;
        var cpfI       = this.cpf;
        var telefoneI  = this.telefone;
        var enderecoI  = this.endereço;

        Pessoa.todos(function (pessoasCadastradas){
            if(pessoasCadastradas == []){
                console.log('Erro function P.todos')
                callback.call()
            }else{
                for(var i=0; i<pessoasCadastradas.length; i++){
                    if(pessoasCadastradas[i].cpf == cpfAlteracao){

                        pessoasCadastradas[i].npme = nomeI
                        pessoasCadastradas[i].sobrenome = sobrenomeI
                        pessoasCadastradas[i].cpf = cpfI
                        pessoasCadastradas[i].telefone = telefoneI
                        pessoasCadastradas[i].endereço = enderecoI

                        Pessoa.salvarTodos(pessoasCadastradas)
                        break
                    }
                }

                callback.call()
            }
        })
    }


    this.excluir = function(callback){
        var cpfI = this.cpf
        Pessoa.todos(function (pessoasCadastradas){
            if (pessoasCadastradas == []) {
              console.log('Erro function xcluir')
            }else{
              var pessoasRestantes = []
              for(var i=0; i<pessoasCadastradas.length; i++){
                if(pessoasCadastradas[i].cpf != cpfI ){
                  pessoasRestantes.push(pessoasCadastradas[i])
                }
              }
              Pessoa.salvarTodos(pessoasRestantes)
              pessoasCadastradas = pessoasRestantes
            }
            callback.call(null, pessoasCadastradas)
          })
    }

}


Pessoa.buscar = function(cpf, callback){
    Pessoa.todos(function (pessoasCadastradas){
        if(pessoasCadastradas == []){
            console.log('Erro function buscar')
            callback.call()
        }else{
            var pessoa = null
            for(var i=0; i<pessoasCadastradas.length; i++){
                if(pessoasCadastradas[i].cpf == cpf){
                    pessoa = pessoasCadastradas[i];
                    break 
                }
            }

            callback.call(null, pessoa)

        }
    })
}

Pessoa.buscarPorNome = function(nome, callback){
    Pessoa.todos(function(pessoasCadastradas){
        if(pessoasCadastradas == []){
            console.log("Pessoas não encontradas")
            callback.call(null, pessoasCadastradas)
        }
        else{
            var dadosPesquisados = []
            if(nome == ""){
                dadosPesquisados = pessoasCadastradas
            }
            else{
                for(var i=0; i<pessoasCadastradas.length; i++){
                    var reg = new RegExp(nome, "i")
                    if(pessoasCadastradas[i].nome.match(reg) != null){
                        dadosPesquisados.push(pessoasCadastradas[i])
                    }
                }

                callback.call(null, dadosPesquisados)
            }
        }
    })
}

Pessoa.salvarTodos = function(pessoasCadastradas, callback){
    var fs = require('fs')
    fs.writeFile(App.Arquivo, JSON.stringify(pessoasCadastradas), function(err){
        if(err){
            console.log(err, "erro no salvar todos")
        }
    })
}

Pessoa.todos = function(callback){
    var fs=require('fs')
    fs.readFile(App.Arquivo, function(err, data){
        pessoasCadastradas = []
        if(err){
            console.log(err)
        }else{
            pessoasCadastradas = JSON.parse(data)
        }

        callback.call(null, pessoasCadastradas)
    })
}
module.exports = Pessoa;