const pintarCarrito= ()=> { 
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const headModal = document.createElement("div");
    headModal.className = "modal-header";
    headModal.innerHTML = `
        <h1 class = "modal-header-title">Cart.</h1>
    `;
    modalContainer.append(headModal);

    const buttonModal = document.createElement("h1");
    buttonModal.innerText = "x";
    buttonModal.className = "modal-header-button";

    buttonModal.addEventListener("click", ()=>{
        modalContainer.style.display = "none";
    });

    headModal.append(buttonModal);

    carrito.forEach((product) =>{   
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
            <img src = "${product.img}">
            <h3>${product.nombre}</h3>
            <p>${product.precio} $</p>
            <span class = "restar"> - </span>
            <p>${product.cantidad}</p>
            <span class = "sumar"> + </span>
            <p>TOTAL : ${product.cantidad * product.precio}</p>
            <span class = "delete-product"> ✖ </span>
        `;

        modalContainer.append(carritoContent);
        
        let restar = carritoContent.querySelector(".restar");

        restar.addEventListener("click", ()=> {
            if(product.cantidad !== 1){
            product.cantidad--;
            }
            saveLocal();
            pintarCarrito();
       
        });

        let sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener("click", () =>{
            product.cantidad++;
            pintarCarrito();
            saveLocal();
        })



        let erase = carritoContent.querySelector(".delete-product");
        erase.addEventListener("click", () => {
            eraseProduct(product.id);
        });

        
        // erase.innerText = "✖";
        // erase.className = "delete-product";
        // carritoContent.append(erase);

        // erase.addEventListener("click", eraseProduct);

    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalBuy = document.createElement("div");
    totalBuy.className = "total-content";
    totalBuy.innerHTML = `
    TOTAL : ${total} $`;
    modalContainer.append(totalBuy);
};

verCarrito.addEventListener("click", pintarCarrito);

const eraseProduct = (id) =>{
    const foundId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    carritoCounter();
    saveLocal();
    pintarCarrito();

};

const carritoCounter = () =>{
    cantidadCarrito.style.display = "block";

    const carritoLength =  carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));

};

carritoCounter();