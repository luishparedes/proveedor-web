document.getElementById('product-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const empresa = document.getElementById('empresa').value;
    const producto = document.getElementById('producto').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const unidad = parseFloat(document.getElementById('unidad').value);
    const vendedor = document.getElementById('vendedor').value;
    const contacto = document.getElementById('contacto').value;
    const fecha = document.getElementById('fecha').value;

    if (!empresa || !producto || isNaN(precio) || isNaN(unidad) || !vendedor || !contacto || !fecha) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const table = document.getElementById('product-list').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const precioUnitario = precio / unidad;

    newRow.innerHTML = `
        <td>${empresa}</td>
        <td>${producto}</td>
        <td>${precio.toFixed(2)}</td>
        <td>${precioUnitario.toFixed(2)}</td>
        <td>${unidad}</td>
        <td>${vendedor}</td>
        <td>${contacto}</td>
        <td>${fecha}</td>
        <td>
            <button onclick="deleteProduct(this)">Borrar</button>
            <button onclick="editProduct(this)">Editar</button>
        </td>
    `;

    updateLowestPrice();

    document.getElementById('product-form').reset();
});

function deleteProduct(button) {
    const row = button.parentElement.parentElement;
    row.parentElement.removeChild(row);
    updateLowestPrice();
}

function editProduct(button) {
    const row = button.parentElement.parentElement;
    document.getElementById('empresa').value = row.cells[0].innerText;
    document.getElementById('producto').value = row.cells[1].innerText;
    document.getElementById('precio').value = parseFloat(row.cells[2].innerText);
    document.getElementById('unidad').value = row.cells[4].innerText;
    document.getElementById('vendedor').value = row.cells[5].innerText;
    document.getElementById('contacto').value = row.cells[6].innerText;
    document.getElementById('fecha').value = row.cells[7].innerText;
    deleteProduct(button);
}

function updateLowestPrice() {
    const rows = document.getElementById('product-list').getElementsByTagName('tbody')[0].rows;
    const products = {};

    for (let i = 0; i < rows.length; i++) {
        const product = rows[i].cells[1].innerText;
        const price = parseFloat(rows[i].cells[3].innerText);

        if (!products[product]) {
            products[product] = price;
        } else if (price < products[product]) {
            products[product] = price;
        }
    }

    for (let i = 0; i < rows.length; i++) {
        const product = rows[i].cells[1].innerText;
        const price = parseFloat(rows[i].cells[3].innerText);

        if (price === products[product]) {
            rows[i].classList.add('lowest-price');
        } else {
            rows[i].classList.remove('lowest-price');
        }
    }
}

function printLowestPrices() {
    const rows = document.getElementById('product-list').getElementsByTagName('tbody')[0].rows;
    const products = {};

    for (let i = 0; i < rows.length; i++) {
        const product = rows[i].cells[1].innerText;
        const price = parseFloat(rows[i].cells[3].innerText);

        if (!products[product]) {
            products[product] = rows[i];
        } else if (price < parseFloat(products[product].cells[3].innerText)) {
            products[product] = rows[i];
        }
    }

    let printContent = '<h1>Productos Más Baratos</h1><table><thead><tr><th>Empresa</th><th>Producto</th><th>Precio Total</th><th>Precio Unitario</th><th>Unidad</th><th>Vendedor</th><th>Contacto</th><th>Fecha</th></tr></thead><tbody>';
    for (const product in products) {
        const cells = products[product].cells;
        printContent += `<tr>
            <td>${cells[0].innerText}</td>
            <td>${cells[1].innerText}</td>
            <td>${cells[2].innerText}</td>
            <td>${cells[3].innerText}</td>
            <td>${cells[4].innerText}</td>
            <td>${cells[5].innerText}</td>
            <td>${cells[6].innerText}</td>
        </tr>`;
    }
    printContent += '</tbody></table>';
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
}
