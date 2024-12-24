 // Function to show the create form
 const showCreateForm = () => {
    const contentBox = document.getElementById('content-box');
    contentBox.innerHTML = `
        <div class="container">
            <h1>Create Products</h1>
            Product Name: <input type="text" id="name" name="name" required><br><br>
            Description: <textarea id="description" name="description" required></textarea><br><br>
            Price: <input type="number" id="price" name="price" min="0" required><br><br>
            <button type="button" onclick="createProduct()">Create Product</button>
        </div>
    `;


    // Hide the product list
    const productList = document.getElementById('product-table');
    productList.style.display = 'none';
};


// Function to handle form submission (create product)
const createProduct = () => {
    // Get form data
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;


    // Make an AJAX request to create a new product
    axios.post('/api/create_product_api', {
        name,
        description,
        price
    })
    .then(response => {
        // Handle the response as needed (e.g., show success message)
        console.log('Product created successfully:', response.data);


        // Show the product list after successful creation
        getProductList();
    })
    .catch(error => {
        // Handle errors (e.g., display error message)
        console.error('Error creating product:', error.response.data);
    });
};


 // Function to get product list
 const getProductList = () => {
    axios.get('/productAjax/retrieve_products')
        .then(response => {
            // Handle the response
            const productList = document.getElementById('product-table');
            productList.innerHTML = '<tr><th>Name</th><th>Price</th><th>Description</th><th colspan="2" style="text-align:center;">Actions</th></tr>';
            response.data.forEach(product => {
                const row = `<tr><td>${product.name}</td><td>${product.price}</td><td>${product.description}</td><td><button onclick="showUpdateForm('${product._id}', '${product.name}', '${product.description}', ${product.price})">Update</button></td><td><button onclick="showDeleteConfirmation('${product._id}', '${product.name}')">Delete</button></td></tr>`;
                productList.innerHTML += row;
            });
            // Show the product list
            productList.style.display = 'block';
          // Hide the create and update forms
            const contentBox = document.getElementById('content-box');
            contentBox.innerHTML = `<form id="create-form" action="" method="post"></form><form id="update-form" action="" method="post"></form>`;
        })
        .catch(error => {
            // Handle errors (e.g., display error message)
            console.error('Error getting product list:', error.response.data);
        });
};
// Call getProductList on page load
document.addEventListener('DOMContentLoaded', getProductList);