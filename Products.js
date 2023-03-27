let addCartButton = document.getElementsByClassName('addCart-btn')
for (let i = 0; i < addCartButton.length; i++) {
    let button = addCartButton[i]
    button.addEventListener('click', addCart)
}

let removeItemButton = document.getElementsByClassName("remove-btn")
for (let i = 0; i < removeItemButton.length; i++) {
    let button = removeItemButton[i]
    button.addEventListener('click', removeItems)
}

let inputQuantity = document.getElementsByClassName("quantity")
for (let i = 0; i < inputQuantity.length; i++) {
    let input = inputQuantity[i]
    input.addEventListener("change", changeQuantity)
}

function purchase(formRef) {
    let formName = formRef.name.value;
    let formEmail = formRef.email.value;
    if(formName=="") {
        alert("Name must be filled out")
    } else if(formEmail=="") {
        alert("Email must be filled out")
    }
    else {
        invoice()
    }
        
}



// ADD TO CART BUTTON
function addCart(event) {
    let addButton = event.target
    let addItem = addButton.parentElement.parentElement
    let itemImg = addItem.getElementsByClassName("product-image")[0].src
    let itemName = addItem.getElementsByClassName("product-name")[0].innerText
    let itemPrice = addItem.getElementsByClassName("price")[0].innerText
    addItemToCart(itemImg,itemName, itemPrice)
}


// ADD TO CART
function addItemToCart(itemImg, itemName, itemPrice) {
    let newRow = document.createElement("tr")
    let cartTable = document.getElementsByClassName("table-body")[0]
    let cartItemName = cartTable.getElementsByClassName("product-name")
    for (let i = 0; i < cartItemName.length; i++) {
        if (cartItemName[i].innerText == itemName) {
            alert('This item has already added')
            return
        } 
    }
    let newTableRows = `
    <tr class="table-row">
        <td><img src="${itemImg}" alt=""></td>
        <td class="product-name">${itemName}</td>
        <td class="price">${itemPrice}</td>
        <td><input type="number" value="1" class="quantity"></td>
        <td>$0</td>
        <td><button type="button" class="remove-btn">Remove</button></td>
        </tr>`
        newRow.innerHTML = newTableRows
    cartTable.append(newRow)
    newRow.getElementsByClassName("remove-btn")[0].addEventListener('click', removeItems)
    newRow.getElementsByClassName("quantity")[0].addEventListener("change", changeQuantity)
    updateSubtotal()
}


// REMOVE ITEMS FROM CART
function removeItems(event) {
    let clickedButton = event.target
    clickedButton.parentElement.parentElement.remove()
    updateSubtotal()
}


// CHANGE QUANTITY
function changeQuantity(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
    }
    updateSubtotal()
}


//CALCULATE SUBTOTALS
function updateSubtotal() {
    let cartTable = document.getElementsByClassName("table-body")[0]
    for (let i = 0; i < cartTable.rows.length; i++) {
        let cartRow = cartTable.rows[i]
        let priceElement = cartRow.cells[2];
        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantityElement = document.getElementsByClassName("quantity")[i];
        let quantity = quantityElement.value;
        let subTotal = 0;
        subTotal = subTotal + (price * quantity)
        cartRow.cells[4].innerText = "$" + subTotal
    }   
    updateTotal();
}


//CALCULATE TOTALS
function updateTotal() {

    let cartTable = document.getElementsByClassName("table-body")[0]
    let total = 0
    for (let i = 0; i < cartTable.rows.length; i++) {
        let cartRow = cartTable.rows[i]
        let subTotalElement = cartRow.cells[4];
        let subtotals = parseFloat(subTotalElement.innerText.replace("$", ""))
        total = total + subtotals
    }   
    
    document.getElementsByClassName("total-bill")[0].innerText = "$" + total;
}


//INVOICE
function invoice() {
    const name = document.getElementById('customerName').value
    const email = document.getElementById('customerEmail').value

    let note = "Thank you for shopping with us!\n" + 
        "Name: " + name + "\n"+ 
        "Email: " + email + "\n\n"+
        "Purchased Details\n\n";
    let cartTable = document.getElementsByClassName("table-body")[0]
    for (let i = 0; i < cartTable.rows.length; i++) {
        let cartRow = cartTable.rows[i]
        note += "Product name: " + cartRow.cells[1].innerText + "\n" +
            "Price: " + cartRow.cells[2].innerText + "\n" +
            "Quantity: " + document.getElementsByClassName("quantity")[i].value + "\n\n";
    }

    note += "Total: " + document.getElementsByClassName("total-bill")[0].innerText;

    alert(note);
}