// const target = document.getElementById('title');
// target.style.color = 'red';
// const target = document.getElementsByClassName("box");
// for(let i=0; i<target.length; i++)
// {
//     const element = target[i];
//     element.style.backgroundColor = "green";
//     if(element.innerText == "Box-3"){
//         element.style.backgroundColor = 'red';
//     }
// }

// document.getElementById('')
// document.getElementById('add_cmnt').addEventListener('click', (event)=>{
//     console.log('clicked');
// })

// const handleAdd =(event)=>{
//     const inputVal = document.getElementById('search_box').value;
//     const target_div = document.getElementById('comment_container');
//     const p = document.createElement('p');
//     p.classList.add('child');
//     p.innerText = inputVal;
//     target_div.appendChild(p);
//     document.getElementById('search_box').value='';
//     const allComments = document.getElementsByClassName('child');
//     for(const element of allComments){
//         element.addEventListener('click', (e)=>{
//             e.target.parentNode.removeChild(element);
//         })
//     }


// }

// fetch('https://jsonplaceholder.typicode.com/users')
//     .then(res=> res.json())
//     .then(data=>{
//         console.log(data);
//     })

// data fetching
let allProducts = [];
const loadData = ()=>{
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>{
                allProducts=data;
              displayCard(allProducts); 
            })
            .catch((error)=>console.error('Error fetching data: ',error));
};
const searchProduct = ()=>{
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const filteredProducts = allProducts.filter((product)=>product.title.toLowerCase().includes(searchInput));
    displayCard(filteredProducts);
    searchInput.innerText="";
};
const displayCard = (products) => {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ''; // Clear previous content

    products.forEach((product) => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-img" />
            <h5 class="product-title">${product.title}</h5>
            <p class="product-description">${product.description.slice(0, 80)}...</p> <!-- Truncated -->
            <p class="product-price">Price: $${product.price}</p>
            <div class="button-group">
                <button onclick ="load_details('${product.id}')" class="details-btn">Details</button>
                <button onclick ="handleAddToCart('${product.title}', ${product.price})" class="add-to-cart-btn">Add To Cart</button>
            </div>
        `;

        productContainer.appendChild(div);
    });
};
const handleAddToCart=(title,price)=>{
let items_number = parseInt(document.getElementById("count").innerText);
items_number+=1;
document.getElementById("count").innerText=items_number;

const cart_container = document.getElementById("cart-main-container");
const div = document.createElement('div');
div.classList.add('cart_info');
div.innerHTML = `
    <p>${title.slice(0,10)}</p>
    <h3 class="price">${price}</h3>
`
cart_container.appendChild(div);
count_total_price();
}
const count_total_price = ()=>{
    const total_price = document.getElementsByClassName('price');
    let count =0;
    for(const price of total_price)
    {
        count+=parseFloat(price.innerText);
    }
    document.getElementById("total-price").innerText = count.toFixed(2);
}
const load_details = (id)=>{
    fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(product=>{
                const details_container = document.getElementById("details-container");
                details_container.innerHTML="";
                const div = document.createElement("div");
                div.classList.add("card");
        
                div.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" class="product-img" />
                    <h5 class="product-title">${product.title}</h5>
                    <p class="product-description">${product.description.slice(0, 80)}...</p> <!-- Truncated -->
                    <p class="product-price">Price: $${product.price}</p>
                `;
        
                details_container.appendChild(div);
            })
}
loadData();



