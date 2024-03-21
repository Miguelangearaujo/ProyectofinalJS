let cart = [];
document.addEventListener('DOMContentLoaded', function () {
    const products = document.querySelectorAll('.product');
    const cartList = document.querySelector('.cart-list');
    const totalElement = document.querySelector('.total span');
    const clearCartButton = document.querySelector('.clear-cart');

    

    products.forEach(product => {
        const addToCartButton = product.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', () => addToCart(product));
    });

    clearCartButton.addEventListener('click', clearCart);

    function addToCart(product) {
        const productId = product.dataset.id;
        const productName = product.dataset.name;
        const productPrice = parseFloat(product.querySelector('.price').textContent.replace('$', ''));

        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        updateCartUI();
    }

    function updateCartUI() {
        cartList.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${item.name} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`;
            cartList.appendChild(listItem);
            total += item.price * item.quantity;
        });

        totalElement.textContent = `$${total.toFixed(2)}`;

        // Aquí necesitarías definir una lógica para remover ítems del carrito, la cual no está presente en el fragmento original.
    }

    function clearCart() {
        cart = []; // Vacía el array del carrito
        updateCartUI(); // Actualiza la UI para reflejar el carrito vacío
    }
    
    // Añade el evento click al botón de limpiar carrito
    clearCartButton.addEventListener('click', clearCart);


    document.querySelector(".pay-cart").addEventListener("click",()=>{
        
        let response = ""
        let totalpagar = 0
        response+= "**** CARRITO ****\n"
        
        cart.forEach(product => {
            response+= `*Producto:* ${product.name}\n*Precio:* $${product.price}\n*Total:* $${product.price * product.quantity}\n*Cantidad:* ${product.quantity}`
            response+="\n\n"
            totalpagar += product.price * product.quantity
            
            
        })
        response+= `\n\n`
        response+= `*Total a pagar:* $${totalpagar}`

        location.href = `https://wa.me/51906293157?text=${encodeURI(response)}`
    })
});