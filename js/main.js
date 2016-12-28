var list = [
	{"desc": "leite", "amount": "1", "value": "5.40"}
];

function getTotal(lista) {
	var total = 0;
	for(var key in lisa) {
		total += lista[key].amount * lista[key].value;
	}

	return total;
}

function setList(lista) {
	var table = '<thead><tr><th>Description</th><th>Amount</th><th>Value</th><th>Action</th></tr></thead><tbody>';
	for(var key in lista) {
		table += '<tr>';
		table += '<td>'+ formatDesc(lista[key].desc) + '</td>';
		table += '<td>' + formatAmount(lista[key].amount) + '</td>';
		table += '<td>'+ formatValue(lista[key].value) +'</td>';
		table += '<td><button class="btn btn-default" onClick="setUpdate('+ key +')">Edit</button> | <button class="btn btn-default" onClick="setDelete('+ key +')">Delete</button></td>';
		table += '</tr>';
	}
	table += '</tbody>'

	document.getElementById("listTable").innerHTML = table;
	getTotal();
	saveListStorage();
}

function formatDesc(desc) {
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
}

function formatValue(value) {
	var str = parseFloat(value).toFixed(2) + "";
	str = str.replace(".", ",");
	str = "R$ "+ str;
	return str;
}

function formatAmount(amount) {
	return parseInt(amount);
}

function addData() {
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;

	if(validation()) {
		list.unshift({"desc": desc, "amount": amount, "value": value});
		setList(list);
		resetForm();
	}
}

function setUpdate(id) {
	var obj = list[id];
	document.getElementById("desc").value = obj.desc;
	document.getElementById("amount").value = obj.amount;
	document.getElementById("value").value = obj.value;

	document.getElementById("btnUpdate").style.display = "inline-block";
	document.getElementById("btnAdd").style.display = "none";	

	document.getElementById("inputIdUpdate").innerHTML = '<input id="idReg" type="hidden" value="'+ id +'" />';
}

function resetForm() {
	document.getElementById("desc").value = "";
	document.getElementById("amount").value = "";
	document.getElementById("value").value = "";

	document.getElementById("btnUpdate").style.display = "none";
	document.getElementById("btnAdd").style.display = "inline-block";
	document.getElementById("inputIdUpdate").innerHTML = "";
}

function updateData() {
	var id = document.getElementById("idReg").value;
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;

	list[id] = {"desc": desc,"amount": amount,"value": value};

	resetForm();
	setList(list);
}

function setDelete(id) {
	if(confirm("Confirma excluir o registro "+ id +" ?")) {
		if(id === list.length -1) {
			list.pop();
		}else if(id == 0) {
			list.shift();
		} else {
			var arrAuxIni = list.slice(0,id);
			var arrAuxFim = list.slice(id +1);
			list = arrAuxIni.concat(arrAuxFim);
		}

		setList(list);
	}

}

function validation() {
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;
	var errors = "";

	if(desc === "") {
		errors += '<p>A descrição não pode ser vazia !</p>';
	}
	if(amount != parseInt(amount)) {
		errors += '<p>A quantidade deve ser um numero inteiro valido maior que 0 !</p>'
	}
	if(value != parseFloat(value)) {
		errors += '<p>O valor do produto não é valido !</p>';
	}

	if(errors != "") {
		document.getElementById("errors").innerHTML = errors;
		document.getElementById("errors").style.display = "block";
		return false;
	}else{
		document.getElementById("errors").style.display = "none";
		return true;
	}
}

function getTotal() {
	var total = 0;
	for(var i in list) {
		total += parseInt(list[i].amount) * parseFloat(list[i].value);
	}
	console.log(total);
	document.getElementById("totalValue").innerHTML = formatValue(total);
}

function resetList() {
	if(confirm("Confirma limpar lista de compras ?")) {
		list = [];
		setList(list);
	}
}

function saveListStorage() {
	var jsonStr = JSON.stringify(list);
	localStorage.setItem("list", jsonStr);
}

function initListStorage() {
	var testList = localStorage.getItem("list");
	if(testList) {
		list = JSON.parse(testList);
	}
	setList(list);
}

initListStorage();