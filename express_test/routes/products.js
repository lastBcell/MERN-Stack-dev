var express = require('express');
var router = express.Router();
const Product = require('../model/productsModel')

router.get('/', (req,res)=>{
    res.send('product routes')
});


router.get('/create_product', (req,res)=>{
    res.render('./product/create', {error: null})
});

// create product####
router.post('/create_product', (req, res) => {
    const { name, description, price } = req.body;
    const product = new Product({
        name,
        description,
        price
    });
    const validationError = product.validateSync();
    if (validationError) {
        res.render('./product/create', { error: validationError.errors});
    } else {
        product.save().then(() => {
                res.redirect('/');
            }).catch((error) => {
                console.error(error);
                
            });
   }
})

// read product#######
router.get('/retrieve_product', (req, res) => {

    Product.find().then(data => {
      res.render('./product/retrieve',{data:data})
  
    }).catch(error => {
  
      console.error(error);
      
    });
  
  });
//   #######update######
router.get('/update_product/:id',(req , res) =>{
    const productId = req.params.id;
   Product.findById(productId).lean().then(product =>{
        res.render('./product/update',{product:product,error: null
})
    }).catch(error => {
        console.error(error);
      });
})

router.post('/update_product/:id', (req, res) => {
    const productId = req.params.id;
    const { name, description, price } = req.body;
    const product = new Product({ name, description, price })
    const validationError = product.validateSync();
    if (validationError) {
        // If there are validation errors, re-render the form with error messages
    res.render('./product/update', {product:product, error: validationError.errors});


    } else {
    Product.findByIdAndUpdate(
        productId,
        { name, description, price }
      )
        .then(() => {
          res.redirect('/products/retrieve_product'); // Redirect to the product list after updating
        })
        .catch(error => {
          console.error(error);
        });
    }
})
// ######delete#####
router.get('/delete_product/:id',(req , res) =>{
    const productId = req.params.id;
   Product.findById(productId).then(product =>{
        res.render('./product/delete',{product:product})
    }).catch(error => {
        console.error(error);
      });
})

router.post('/delete_product/:id',(req, res) =>{
    const productId = req.params.id;
    Product.findByIdAndDelete(productId)
        .then(() => {
          res.redirect('/products/retrieve_product'); // Redirect to the product list after deleting
        })
        .catch(error => {
          console.error(error);
        });
})

module.exports = router;