function dadosExtrato1() {
  let extratos = JSON.parse(localStorage.getItem("dadosExtrato"));
  const tableData = extratos.map(function(extrato){
    return(
      `
        <tr>
          <td>${extrato.data}</td>
          <td>${extrato.codigo}</td>
          <td>${extrato.descrição}</td>
          <td>${extrato.valor}</td>
          <td>${extrato.saldo}</td>
          <td>
            <button onclick="deletar(${extrato.codigo})">Excluir</button>
            <button onclick="editar(${extrato.codigo})">Editar</button>
          </td>
        </tr>
        `
    )
  }).join('')
  const tableBody = document.getElementsByName("tableBody");
  tableBody[0].innerHTML = tableData;
}
function depositar(value, extratos) {
  return extratos.length > 0 ? extratos[extratos.length - 1].saldo + value : value
}
function sacar(value){
  return extratos[extratos.length - 1].saldo - value
}

function dataAtualFormatada() {
  data = new Date(); 
  dia = data.getDate();
  mes = data.getMonth();
  ano = data.getFullYear();
  hora = data.getHours();
  minutos = data.getMinutes();
  return dia + '/' + mes + '/' + ano + ' ' + hora + ':' + minutos;
}

function getDadosExtrato() {
  let dadosExtrato = JSON.parse(localStorage.getItem("dadosExtrato"));
  if (dadosExtrato === null) {
    localStorage.setItem("dadosExtrato", "[]");
    dadosExtrato = [];
  }
  return dadosExtrato;
}


function novoLancamento() {
  let extratos = getDadosExtrato();
  let dados = {
    valor: 0,
    description: '',
    data: dataAtualFormatada(),
    saldo: 0,
    codigo: extratos.length > 0 ? extratos[extratos.length - 1].codigo + 1 : 1
  }
  dados.valor = document.getElementById("valor").valueAsNumber || 0;
  dados.descrição = document.getElementById("descrição").value || '';
  if(document.querySelector('input[name="tipo"]:checked').value) {
    dados.saldo = this.depositar(dados.valor, extratos)
  } else {
    dados.saldo = this.sacar(dados.valor)
  }
  extratos.push(dados);
  localStorage.setItem("dadosExtrato" , JSON.stringify(extratos));
  dadosExtrato1();
}

function deletar(codigo) {
  let extratos = JSON.parse(localStorage.getItem("dadosExtrato"));
  extratos.forEach((extrato, index) => {
      if(extrato.codigo === codigo) {
      extratos.splice(index, 1);
    }
  });
  localStorage.setItem("dadosExtrato" , JSON.stringify(extratos));
  dadosExtrato1();
}

function ordenarCodigo() {
  let extratos = JSON.parse(localStorage.getItem("dadosExtrato"));
  extratos.sort((a, b) => a.codigo - b.codigo);
  localStorage.setItem("dadosExtrato" , JSON.stringify(extratos));
  dadosExtrato1();
}

function ordenarData() {
  let extratos = JSON.parse(localStorage.getItem("dadosExtrato"));
  extratos.sort((a,b) =>  new Date(b.data) - new Date(a.data));
  localStorage.setItem("dadosExtrato" , JSON.stringify(extratos));
  dadosExtrato1();
}
