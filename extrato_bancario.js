var extratos = [{
  data: '10/08/2021',
  codigo: '1',
  descrição: 'Depósito',
  valor: 200.00,
  saldo: 200.00
}]
// dadosExtrato();
function dadosExtrato() {
  const tableData = this.extratos.map(function(extrato){
    return(
      `
        <tr>
          <td>${extrato.data}</td>
          <td>${extrato.codigo}</td>
          <td>${extrato.descrição}</td>
          <td>${extrato.valor}</td>
          <td>${extrato.saldo}</td>
        </tr>
        `
    )
  }).join('')
  debugger
  const tableBody = document.getElementsByName("tableBody");
  tableBody[0].innerHTML = tableData;
}
function depositar(value) {
  debugger
  return extratos[extratos.length - 1].saldo + value
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

function novoLancamento() {
  debugger
  let dados = {
    valor: 0,
    description: '',
    data: dataAtualFormatada(),
    saldo: 0,
    codigo: extratos[extratos.length - 1].codigo + 1
  }
  dados.valor = document.getElementById("valor").valueAsNumber;
  dados.descrição = document.getElementById("descrição").value;
  if(document.getElementById("tipo").value === 'depositar') {
    dados.saldo = this.depositar(dados.valor)
  } else {
    dados.saldo = this.sacar(dados.valor)
  }
  extratos.push(dados);
  dadosExtrato()
}