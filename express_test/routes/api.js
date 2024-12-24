var express = require('express');
var router = express.Router();
const Productapi = require('../model/productApi')


router.get('/simpleapi', (req,res) => {
    res.status(200).send({'text': 'Hello world, This is your first api call'})
});


// #################api creae##################

// import the product model
// const Product = require('../models/productsModel')

//for product create api

 router.post('/create_product_api', (req, res) => {
   const { name, description, price } = req.body;
   const Product1 = new Productapi({ name, description, price });

   const validationError = Product1.validateSync();

   // If there are validation errors, return the error messages
   if (validationError) {
       const errors = {
           name: validationError.errors.name ? validationError.errors.name.properties.message : undefined,
           description: validationError.errors.description ? validationError.errors.description.properties.message : undefined,
           price: validationError.errors.price ? validationError.errors.price.properties.message : undefined,
       };
       return res.status(400).json({ errors });
   }
   
   // Save the product to the database using promises
   Product1.save()
   .then(() => {
           res.status(201).json({ message: 'Product created successfully' });
       })
       .catch((error) => {
           console.error(error);
           res.status(500).json({ message: 'Server Error' });
        });
    });

//###########for getting products#############


router.get('/retrieve_product_api', (req, res) => {
   
    
    Productapi.find()
        .then(data => {
            const serializedData = data.map(Product1 => ({
                id: Product1._id,
                name: Product1.name,
                description: Product1.description,
                price: Product1.price,
            }));
            res.status(200).json({ data: serializedData });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});



// for updating products


router.put('/update_product_api/:id', (req, res) => {
    const productId = req.params.id;
    const { name, description, price } = req.body;


    const Product1 = new Productapi({ name, description, price });
    const validationError = Product1.validateSync();


    // If there are validation errors, return the error messages
    if (validationError) {
        const errors = {
            name: validationError.errors.name ? validationError.errors.name.properties.message : undefined,
            description: validationError.errors.description ? validationError.errors.description.properties.message : undefined,
            price: validationError.errors.price ? validationError.errors.price.properties.message : undefined,
        };
        return res.status(400).json({ errors });
    }


    // Update the product in the database
    Productapi.findByIdAndUpdate(productId, { name, description, price })
        .then(() => {
            res.status(200).json({ message: 'Product updated successfully' });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});


    module.exports = router;