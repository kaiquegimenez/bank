var codigoAlterar = ''
dadosExtrato();
function dadosExtrato() {
  let extratos = JSON.parse(localStorage.getItem("dadosExtrato"));
  const tableData = extratos.map(function (extrato) {
    return (
      `
        <tr>
          <td>${extrato.data}</td>
          <td>${extrato.codigo}</td>
          <td>${extrato.descrição}</td>
          <td style="${extrato.valor < 0 ? 'color:red' : ''}">${extrato.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
          <td style="${extrato.saldo < 0 ? 'color:red' : ''}">${extrato.saldo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
          <td>
          <button class="btn btn-dark" onclick="openModal(${extrato.codigo})">Editar</button>
          <button class="btn btn-dark" onclick="deletar(${extrato.codigo})">Excluir</button>
          </td>
        </tr>
      `
    )
  }).join('')
  const tableBody = document.getElementsByName("tableBody");
  if(tableBody[0]) {
    tableBody[0].innerHTML = tableData;
  }
}
function calcular(value, extratos) {
  return extratos.length > 0 ? extratos[extratos.length - 1].saldo + value : value
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
    descrição: '',
    data: dataAtualFormatada(),
    saldo: 0,
    codigo: extratos.length > 0 ? extratos[extratos.length - 1].codigo + 1 : 1
  }
  dados.valor = document.getElementById("valor").valueAsNumber || 0;
  dados.descrição = document.getElementById("descrição").value || '';
  dados.saldo = this.calcular(dados.valor, extratos)
  extratos.push(dados);
  localStorage.setItem("dadosExtrato", JSON.stringify(extratos));
  dadosExtrato();
}

function deletar(codigo) {
  let extratos = JSON.parse(localStorage.getItem("dadosExtrato"));
  extratos.forEach((extrato, index) => {
    if (extrato.codigo === codigo) {
      extratos.splice(index, 1);
    }
  });
  localStorage.setItem("dadosExtrato", JSON.stringify(extratos));
  dadosExtrato();
}

function openModal(codigo) {
  codigoAlterar = codigo
  let extratos = JSON.parse(localStorage.getItem("dadosExtrato"));
  extratos.forEach(extrato => {
    if (extrato.codigo === codigo) {
      document.getElementById("#valorEditar").value = extrato.valor;
      document.getElementById("#descriçãoEditar").value = extrato.descrição;
    }
  });
  document.getElementById("#editar").style.display = 'block';
}

function alterar(codigo) {
  let extratos = JSON.parse(localStorage.getItem("dadosExtrato"));
  extratos.forEach((extrato, index) => {
    if (extrato.codigo === codigo) {
      extrato.valor = parseFloat(document.getElementById("#valorEditar").value);
      extrato.descrição = document.getElementById("#descriçãoEditar").value;
      extratos.splice(index, 1, extrato);
    }
  });
  extratos.forEach((extrato, index) => {
    extrato.saldo = extrato.valor + (extratos[index-1]?.saldo || 0)
  })
  localStorage.setItem("dadosExtrato", JSON.stringify(extratos));
  dadosExtrato();
  closeModal();
}

function closeModal() {
  document.getElementById("#editar").style.display = 'none';
}

function ordenarCodigo() {
  let extratos = JSON.parse(localStorage.getItem("dadosExtrato"));
  extratos.sort((a, b) => a.codigo - b.codigo);
  localStorage.setItem("dadosExtrato", JSON.stringify(extratos));
  dadosExtrato();
}

function ordenarData() {
  let extratos = JSON.parse(localStorage.getItem("dadosExtrato"));
  extratos.sort((a, b) => new Date(b.data) - new Date(a.data));
  localStorage.setItem("dadosExtrato", JSON.stringify(extratos));
  dadosExtrato();
}
