var App = require('../../config/app')

var Pessoa = function(){
    this.nome = ""
    this.sobrenome = ""
    this.cpf = ""
    this.telefone =""
    this.endereco = ""
    this.senha = ""

    this.salvar = function(callback, cpfAlteracao){
        var query = ""
        if(cpfAlteracao == undefined){
            query = "insert into cadast.pessoas(cpf, nome, sobrenome, telefone, endereco,  senha)values('" + this.cpf +"','" + this.nome +"','" + this.sobrenome +"','" + this.telefone +"','" + this.endereco +"','"+ this.senha +"')"
        }
        else{
            query = "update cadast.pessoas set nome='" + this.nome +"', sobrenome='" + this.sobrenome +"', telefone='" + this.telefone +"', endereco='" + this.endereco +"', senha='"+ this.senha +"'"
        }

        console.log(query)

        App.db.cnn.exec(query, function(dadosRetornadosDaTabela, erro){
            if(erro){
                console.log('Erro ao executar a query' + query + ")");
                callback.call()
            }else{
                callback.call()
            }
        })


    }

    this.excluir = function(callback){
        var query = "delete from cadast.pessoas where cpf='" + this.cpf + "' ";
        console.log(query);

        App.db.cnn.exec(query, function(dadosRetornadosDaTabela ,erro) { 
        if(erro){
            console.log("Erro ao executar a query (" + query + ")");
            callback.call();
        }
        else{
            callback.call();
        }
        });
    }

}

    


Pessoa.buscar = function(cpf, callback){
    var query = "SELECT * FROM cadast.pessoas where cpf='" + cpf + "'"
    App.db.cnn.exec(query, function(dadosRetornadosDaTabela, erro){
        if(erro){
            console.log('Erro ao executar a query (' + query + ')')
            callback.call(null, null)
        }else{
            if(dadosRetornadosDaTabela.length > 0){
                callback.call(null, dadosRetornadosDaTabela[0])
            }else{
                callback.call(null, null)
            }
        }
    })

}

Pessoa.buscarPorNome = function(nome, callback){
    var query = "SELECT * FROM cadast.pessoas where nome like  '%" + nome + "%'  "
    App.db.cnn.exec(query, function(dadosRetornadosDaTabela, erro){
        if(erro){
            console.log('Erro ao executar a query' + query + ")");
            callback.call(null, [])
        }else{
            callback.call(null, dadosRetornadosDaTabela)
        }
    })

}
 

Pessoa.todos = function(callback){

    var query = "SELECT * FROM cadast.pessoas "
    App.db.cnn.exec(query, function(dadosRetornadosDaTabela, erro){
        if(erro){
            console.log('Erro ao executar a query' + query + ")");
            callback.call(null, [])

        }else{
            callback.call(null, dadosRetornadosDaTabela)
        }
    })

}

module.exports = Pessoa;