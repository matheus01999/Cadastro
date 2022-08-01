var validacao = function(){
	var nome = $("#nome").val()
	var cpf = $("#cpf").val()
	// primeiro tipo de validação
	if(nome == ""){
		alert("Por favor digite seu nome")
		document.getElementById("nome").focus();
		return;
	}

	if(cpf == ""){
		alert("Por favor digite seu cpf")
		document.getElementById("cpf").focus();
		return;
	}

}

var excluirDados = function(cpf){
	if(confirm("Deseja realmente excluir ?")){
		window.location.href = '/excluir?cpf' + cpf;
	}
}