function addToInvoice(product, unitPrice) {
    let invoiceItems = JSON.parse(localStorage.getItem('invoiceItems')) || [];
    invoiceItems.push({ product, unitPrice });
    localStorage.setItem('invoiceItems', JSON.stringify(invoiceItems));
    console.log('Item added:', { product, unitPrice });
    console.log('Current invoice items:', invoiceItems);
    alert('Item added to invoice!');
}


function displayInvoice() {
    let invoiceItems = JSON.parse(localStorage.getItem('invoiceItems')) || [];
    console.log('Retrieved invoice items:', invoiceItems);
    let invoiceList = document.getElementById('invoice-list');
    invoiceList.innerHTML = ''; 

    invoiceItems.forEach(item => {
        if (typeof item.unitPrice !== 'undefined' && !isNaN(item.unitPrice)) {
			//debuging
            let tax = item.unitPrice * 0.10; 
            let amount = item.unitPrice + tax; 

            let listItem = document.createElement('p');
            listItem.textContent = `${item.product}: Unit Price: $${item.unitPrice.toFixed(2)}, Tax: $${tax.toFixed(2)}, Amount: $${amount.toFixed(2)}`;
            invoiceList.appendChild(listItem);
        } else {
            console.error('Invalid unitPrice:', item.unitPrice, 'Product:', item.product);
        }
    });

    calculateTotalAmount(invoiceItems); 
}

function calculateTotalAmount(invoiceItems) {
    let total = invoiceItems.reduce((acc, item) => {
        let tax = item.unitPrice * 0.10;
        let amount = item.unitPrice + tax;
        return acc + amount;
    }, 0);

    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}
function checkout() {
    window.location.href = 'invoice.html';
}

function clearCart() {
    localStorage.removeItem('invoiceItems');//the local storage was holding on to all the items and displaying them when it was time to check out so i added this, sometime the cart needs to be emptied

}
let tries = 3;
function validateLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'customer' && password === 'pinknotblue') {
        alert('Login successful!');
		window.location.href='home.html';
    } else {
		tries--;
        alert('Invalid username or password');
        if(tries===0){
			window.location.href='errorPage.html';
		}
    }
}


function printDate() {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; 
    let date = currentDate.getDate();
    let date2 = currentDate.getDate() +5;
    let hours = currentDate.getHours();
    let fDate = `${year}-${month}-${date}`;
    let futDate = `${year}-${month}-${date2}`;

    document.getElementById('printDate').innerText = fDate; 
    document.getElementById('dueDate').innerText = futDate; 
}

  