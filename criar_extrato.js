export function dadosExtrato() {
  debugger
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