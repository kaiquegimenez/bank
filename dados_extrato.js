function dadosExtrato() {
  let extratos = JSON.parse(localStorage.getItem("dadosExtrato"));
  if(!extratos) {
    return
  }
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



dadosExtrato();