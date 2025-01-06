var express = require('express');
var router = express.Router();
const user = require('../models/userModel')
const Product = require('../models/productModel');
const multer = require('multer');
const path = require('path');





// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/', // Directory to store images
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
      // Allow only image files
      const fileTypes = /jpeg|jpg|png|gif/;
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = fileTypes.test(file.mimetype);

      if (extname && mimetype) {
          return cb(null, true);
      } else {
          cb(new Error('Only image files are allowed!'));
      }
  }
});

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { Product });
// });
router.get('/', async (req, res) => {
  try {
      const products = await Product.find(); 
      // const count = products.countDocuments()// Fetch all products from the database
      res.render('index', { products }); // Render the 'products.ejs' template
  } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching products.');
  }
});


// ##############login#################
router.get('/signup', function(req, res, next) {
  res.render('signup');
});


router.get('/login',(req,res) =>{

  res.render('login');
});

router.post('/login',(req,res)=>{
  const {email,password} = req.body;
  console.log(email,password)
});

router.post('/signup', (req, res) => {
    const { name,email,password } = req.body;
    console.log(name,email,password)
    const newuser = new user({
        name,
        email,
        password
    });
    const validationError = newuser.validateSync();
    if (validationError) {
      // console.log(validationError)
        res.render('signup', { error: validationError.errors});
    } else {
        newuser.save().then(() => {
                res.redirect('/login');
            }).catch((error) => {
                console.error(error);
                
            });
   }
})
// ############create product##########
router.get('/createproduct', function(req, res, next) {
  res.render('addproduct', { title: 'Express' });
});



router.post('/add-product', upload.single('productImage'), (req, res) => {
    const { productName, productDescription, productPrice } = req.body;

    // Check if a file was uploaded
    // if (!req.file) {
    //     return res.status(400).send('No file uploaded.');
    // }

    // Access uploaded file details
    
    const productImage = req.file.path; // File's storage path

        // Create a new product instance
        const product = new Product({
            productName,
            productDescription,
            productPrice,
            productImage,
        });
        product.save().then(() => {
          res.redirect('/');
      }).catch((error) => {
          console.error(error);
          
      });

    // Log details (you can save these to your database)
    // console.log({
    //     productName,
    //     productDescription,
    //     productPrice,
    //     productImage: productImage.path, // File's storage path
    // });

    // res.send('Product added successfully!');
});

// ####update####
router.get('/updateproduct/:id',(req , res) =>{
  const productId = req.params.id;
 Product.findById(productId).lean().then(product =>{
      res.render('update',{product:product,error: null
})
  }).catch(error => {
      console.error(error);
    });
})

router.post('/updateproduct/:id', upload.single('productImage'), (req, res) => {
  const productId = req.params.id;
  const { productName, productDescription, productPrice } = req.body;


  const productImage = req.file.path; // File's storage path

  // Create a new product instance
  const product = new Product({
      productName,
      productDescription,
      productPrice,
      productImage,
  });

  const validationError = product.validateSync();
  if (validationError) {
      // If there are validation errors, re-render the form with error messages
  res.render('update', {product:product, error: validationError.errors});


  } else {
  Product.findByIdAndUpdate(
      productId,
      {  productName, productDescription, productPrice,productImage}
    )
      .then(() => {
        res.redirect('/'); // Redirect to the product list after updating
      })
      .catch(error => {
        console.error(error);
      });
  }
})
// router.get('/updateproduct/:id', async (req, res) => {
//   try {
//       const product = await Product.find(); // Fetch all products from the database
//       res.render('update', { product }); // Render the 'products.ejs' template
//   } catch (error) {
//       console.error(error);
//       res.status(500).send('Error fetching products.');
//   }
// });####delete######
router.get('/deleteproduct/:id',(req , res) =>{
  const productId = req.params.id;
 Product.findById(productId).then(product =>{
      res.render('delete',{product:product})
  }).catch(error => {
      console.error(error);
    });
})

router.post('/delete/:id',(req, res) =>{
  const productId = req.params.id;
  Product.findByIdAndDelete(productId)
      .then(() => {
        res.redirect('/'); // Redirect to the product list after deleting
      })
      .catch(error => {
        console.error(error);
      });
})

module.exports = router;
