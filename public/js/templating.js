function makeResultRow(title, value, id) {
  return `
<tr>
  <th class="row pl-4">${title}:</td>
  <td id="${id}" style="letter-spacing:0.1vw">${value}</td>
</tr>`;
}
