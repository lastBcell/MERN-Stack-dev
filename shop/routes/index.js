var express = require('express');
var router = express.Router();
const user = require('../models/userModel')
const Product = require('../models/productModel');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const ejs = require('ejs');
const fs = require('fs').promises;
const pdf = require('html-pdf-node');
const nodemailer = require('nodemailer');





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
const isAuthenticated = (req, res, next) => {
  // Check if the user is authenticated
  if (req.session && req.session.userEmail) {
    // User is authenticated, proceed to the next middleware
    return next();
  }

  // User is not authenticated, redirect to the login page
  res.redirect('/');
};
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { Product });
// });
router.get('/main',isAuthenticated, async (req, res) => {

  try {
      const products = await Product.find(); 
      // const count = products.countDocuments()// Fetch all products from the database
      res.render('index', { products }); // Render the 'products.ejs' template
  } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching products.');
  }
});





router.get('/send_email/:id', async (req, res) => {
  try {
    // Assuming you have a Product model or equivalent
    const product = await Product.findById(req.params.id);


    // Create a nodemailer transport object
    // replace this with your copied code
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "8b402c0bba7c31dsc", 
        pass: "8d0223cdb4f536"
      }
    });
    // Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a5fa2c743a8384",
    pass: "d74b9f511875cb"
  }
});

    const template = await fs.readFile('./views/product/product_email.ejs', 'utf8');
    // Email content
    const mailOptions = {
      from: 'user123@gmail.com', // Sender email address
      to: 'your_mailtrap_inbox@mailtrap.io', // Receiver email address
      subject: `New Product: ${product.name}`, // Email subject
      html: ejs.render(template, { product }) // Render HTML using EJS
    };


    // Send the email
    const info = await transport.sendMail(mailOptions);
    console.log('Email sent:', info.response);


    // Close the transport after sending the email
    transport.close();


    res.send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Internal Server Error');
  }
});
// ##############login#################
router.get('/signup', function(req, res, next) {
  res.render('signup');
});


router.get('/',(req,res) =>{

  res.render('login');
});

router.post('/login',
  // Add custom validation that required/imported
    // validateEmail,
    // validatePassword
   function (req, res) {
    // Access the validation errors from the request object
    // const errors = req.validationErrors || [];
 
    // // Validate the request
    // const validationResultErrors = validationResult(req);
    // if (!validationResultErrors.isEmpty()) {
    //   // Merge the errors from validation result into the existing errors
    //   errors.push(...validationResultErrors.array());
    // }
 
    // if (errors.length > 0) {
    //   // There are validation errors, render the form with errors
    //   res.render('login', { errors, message:null });
     
      const { email, password } = req.body;
      let foundUser; // Declare foundUser here
 
      user.findOne({ email })
      .then(user => {
        console.log(user);
        if (!user) {
          return res.render('login');
          console.log('no user found')
        }
        foundUser = user; // Assign user to foundUser
        // return bcrypt.compare(password, user.password);
      })
      .then(isPasswordValid => {
        if (password !== foundUser.password) {
          return res.render('login');
        }
 
        // Set user's ID and email in the session
        req.session.userId = foundUser._id;
        req.session.userEmail = foundUser.email;
        res.redirect('/main');
      })
      .catch(error => {
        console.error(error);
        res.status(500).send('Internal Server Error');
      });
    
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
                res.redirect('/');
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

//route for logout


router.get('/logout' ,(req,res)=>{
  req.session.destroy((err) =>{
    if (err){
      console.log(err);
      res.send('Error')
    }else{
      res.redirect('/')
    }
  });
  });






  router.get('/generate-pdf/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        
        // Fetch product data from your database
        const product = await Product.findById(productId);
        
        // Read and render the EJS template with product data
        const template = await fs.readFile('./views/product/product_pdf_template.ejs', 'utf8');
        const html = ejs.render(template, { product });
        
        // Create PDF options
        const options = { format: 'A4' };

        // Generate PDF buffer
        const pdfBuffer = await pdf.generatePdf({ content: html }, options);

        // Set the response headers and send the PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${product.productName}.pdf"`);
        res.send(pdfBuffer);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;
