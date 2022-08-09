var App = require('../config/app')

var Pessoa = function(){
    this.nome = ""
    this.sobrenome = ""
    this.cpf = ""
    this.telefone =""
    this.endereço = ""

    this.salvar = function(callback){
        var nomeI      = this.nome;
        var sobrenomeI = this.sobrenome;
        var cpfI       = this.cpf;
        var telefoneI  = this.telefone;
        var enderecoI  = this.endereço;

        Pessoa.todos(function read(err, data){
            if(err){
                console.log(err)
                callback.call()
            }else{
                var bancoDados = JSON.parse(data)
                for(var i=0; i<bancoDados.length; i++){
                    if(bancoDados[i].cpf == cpfI){
                        bancoDados[i].npme = nomeI
                        bancoDados[i].sobrenome = sobrenomeI
                        bancoDados[i].cpf = cpfI
                        bancoDados[i].telefone = telefoneI
                        bancoDados[i].endereço = enderecoI

                        Pessoa.salvarTodos(bancoDados)
                        break
                    }
                }

                callback.call()
            }
        })
    }


    this.excluir = function(callback){
        var cpfI = this.cpf
        Pessoa.todos(function read(err, data){
            var pessoasCadastradas = []
            if (err) {
              console.log(err)
            }else{
              var bancoDados = JSON.parse(data)
              var novosDados = []
              for(var i=0; i<bancoDados.length; i++){
                if(bancoDados[i].cpf != cpfI ){
                  novosDados.push(bancoDados[i])
                }
              }
              atualizarBase(novosDados)
              pessoasCadastradas = novosDados
            }
            callback.call(pessoasCadastradas)
          })
    }

}


Pessoa.buscar = function(cpf, callback){
    Pessoa.todos(function read(err, data){
        if(err){
            console.log(err)
            callback.call(null)
        }else{
            var usuario = null
            var bancoDados = JSON.parse(data)
            for(var i=0; i<bancoDados.length; i++){
                if(bancoDados[i].cpf == cpf){
                    usuario = bancoDados[i];
                    break 
                }
            }

            callback.call(usuario)

        }
    })
}

Pessoa.salvarTodos = function(pessoas, callback){
    var fs = require('fs')
    fs.writeFile(Arquivo, JSON.stringify(pessoasCadastradas), function(err){
        if(err){
            console.log(err)
        }
    })
}

Pessoa.todos = function(callback){
    var fs = require('fs')
    fs.readFile(App.Arquivo, callback)
}


module.exports = Pessoa;