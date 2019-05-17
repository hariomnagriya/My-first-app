const express = require("express");
const app = express();
const multer = require('multer');
var path = require('path')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/vender", { useNewUrlParser: true });
var nodemailer = require('nodemailer');
var bcrypt = require("bcrypt");
const { check, validationResult,body } = require('express-validator/check');
const localStorage = require("node-localstorage");
const User = require("./model/users");
const cat = require("./model/category");
const product = require("./model/product");
const cors = require("cors");
var upload = multer({ dest: './uploads/',
fileFilter: function (req, file, cb) {
   var filetypes = /jpeg|jpg|png/;
   var mimetype = filetypes.test(file.mimetype);
   var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
   if (mimetype && extname) {
   return cb(null, true);
   }
   cb("Error: File upload only supports the following filetypes - " + filetypes);
   }
   });
   var jwt = require("jsonwebtoken");


   const verifytoken = (req, res, next) => {
//console.log(req.headers["authorization"]);
     if (!req.headers["authorization"]) {
       return res.status(401).json({
         message: "unauthorize access"
       });
     }
     const token = req.headers["authorization"].replace("Bearer ", "");
     jwt.verify(token, "nikita", function (err, decoded) {
       if (err) {
         return res.status(401).json({
           message: "Invalid token"
         });
       }
       req.currentUser = decoded;
       next();
     });
   };
app.use(express.static(__dirname));
console.log('hello',__dirname);
app.use(cors());
app.use(bodyParser.json());
app.post("/addUser", upload.single('file'), [
    //name validation
    check("name")
      .not().isEmpty().withMessage('Name is cant be empty.')
      .not().isNumeric().withMessage('You cant use digit or Special symbol here.'),
    //Email validation 
    check("email")
      .not().isEmpty().withMessage('Email cant be empty.')
      .isEmail().withMessage('Enter the valid email.')
  
      // .custom(async (email, { req, res }) => {
      //   const userData = await User.findOne({ email })
      //   if (userData) {
      //     throw new Error("User already exists.");
      //   }
      // }).withMessage('User already existss '),
      ,
    check("password")
      .not().isEmpty().withMessage('Password cant be empty.')
      .isLength({ min: 8 }).withMessage('Must be at least 8 chars long.')
      //.isLength({ max: 13 }).withMessage('Max length of password is 13.')
      .custom((value, { req }) => {
        if (value !== req.body.cpassword) {
          throw new Error('Password confirmation is incorrect.');
        }
        return true;
      })
      .withMessage("Password did't match."),
    check("mobile")
      .not().isEmpty().withMessage('Mobile no. cant be empty.')
      .isInt().withMessage('Character not allowed.')
      .isLength({ min: 7 }).withMessage('Mobile no. max length is 10.')
      .isLength({ max: 14 }).withMessage('Mobile no. max length is 10.'),
  ]
    , async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array()
        });
      }
      // First read existing users.
      try {
        const { body, file } = req;
        const Password = req.body.password;
        const Email = req.body.email;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(Password, salt);
        const result1 = await User.findOne({ email: Email });
        if(!result1){
        const user = new User({ ...body, file: `${file.destination}${file.filename}`, password: hash });
        const result = await user.save();
        if (!result) {
          res.status(400).json({
            result,
            message: "Data not get.",
          });
        } else if (result) {
          res.status(200).json({
            files: req.file,
            body: req.body
        
          })
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: 'hariom.chapter247@gmail.com',
              pass: 'hariom@247'
            }
          });
          var mailOptions = {
            from: 'hariom.chapter247@gmail.com',
            to: req.body.email,
            subject: 'SignUp successful',
            text: 'Welcome  ' + req.body.name + ', you are sucessfully SignUp '
          };
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.status(200).json({
                result,
                message: "Mail sent sucessfully",
              });
            }
          });
          res.status(200).json({
            result,
            message: "Data get.",
            sucess: true
          });
        }}
        else{
          res.status(400).json({
            message: "User already exsist",
            success: false
            });
        }
      } catch (error) {
        res.status(500).json({
          message:
            error.message ||
            "An unexpected error occure while processing your request.",
        });
      }
    });

//Add the Product 
app.post('/addProduct',verifytoken,upload.single('file'),[
    //Product-title validation
    check('productTitle')
    .not().isEmpty().withMessage('Product-title cant be empty.'),
    check('productDetail')
    .not().isEmpty().withMessage('Product Detail cant be empty.'),
    check('productPrice')
    .not().isEmpty().withMessage('Product price cant be empty.')
    .isNumeric().withMessage('Only contain a numeric value.'),
    check('productSelling')
    .not().isEmpty().withMessage('Product selling price cant be empty.')
    .isNumeric().withMessage('only contain a numeric value.')
],async (req, res) => {
    const errors = validationResult(req);
    // If error not occure    
        if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() 
        });
    }
    try {
        const { body,file } = req;
        const product1 = new product({...body,file: `${file.destination}${file.filename}`});
        const result = await product1.save();
        if(!result){
            res.status(500).json({
                result,
                message: " Product  not add  sucessfull try again later",
                sucess:false
                });
        }else if(result){
            res.status(200).json({
                files: req.file,
                body: req.body,
                result,
                message:"Add-Product Sucessfully",
                sucess:true
            })
        } 
    
    } catch (error) {
        res.status(500).json({
        message:error.message || "An unexpected error occure while processing your request.",
        sucess:false
        });
        }
    });  
 
//Product List
app.post("/showproduct",async (req, res) => {
  // First read existing users.
  try {
    const { body } = req;
    const C_id =req.body.Cid;
   // console.log(C_id);
  const result = await product.find({cid: C_id});
  res.status(200).json({
  result,
  message: "Data get.",
  });
  } catch (error) {
  res.status(500).json({
  message:
  error.message ||
  "An unexpected error occure while processing your request.",
  });
  }
  });

//User Profile
app.post("/profile",async (req, res) => {
  // First read existing users.
  try {
    const { body } = req;
    const C_id =req.body.Cid;
  const result = await User.findOne({_id: C_id});
  res.status(200).json({
  result,
  message: "Data get.",
  });
  } catch (error) {
  res.status(500).json({
  message:
  error.message ||
  "An unexpected error occure while processing your request.",
  });
  }
  });
  app.post("/profileUpdate",upload.single('file'),async (req, res) => {
    try {
    const { body,file } = req;
    let obj = body;
    if (body.imageUpdated === "true") {
    obj = {
    ...obj,
    file: `${file.destination}${file.filename}`
    };
    }
    const result = await User.findOneAndUpdate({ _id: req.body.Cid},{$set: obj});
    
      res.status(200).json({
        files: req.file,
        body: req.body,
    result,
    message: "data updated"
    })
    } catch (error) {
    res.status(500).json({
    message: error.message
    });
    }
    });

app.get("/getItem/:_id",async (req, res) => {
    try {
    const result = await product.findById({ _id: req.params._id });
    if(result){
    res.status(200).json({
    result,
    message: "Data found."
    });}
    } catch (error) {
    res.status(500).json({
    message: error.message || "unwanted error occured"
    });
    }
    });
    app.delete("/deleteItem/:_id", async (req, res) => {
    try {
    const { params } = req;
    const result = await product.findByIdAndDelete({ _id: req.params._id });
    res.status(200).json({
      result,
    message: "item Deleted."
    });
    } catch (error) {
    res.status(500).json({
    message:
    error.message ||
    "An unexpected error occure while processing your request."
    });
    }
    });
    app.post("/editItem/:_id",upload.single('file'),async (req, res) => {
    try {
    const { body,file } = req;
    let obj = body;
    if (body.imageUpdated === "true") {
    obj = {
    ...obj,
    file: `${file.destination}${file.filename}`
    };
    }
    const result = await product.findByIdAndUpdate({ _id: req.params._id},{$set:obj });
    if(result){
      res.status(200).json({
        files: req.file,
        body: req.body,
    result,
    message: "data updated"
    });}
    } catch (error) {
    res.status(500).json({
    message: error.message
    });
    }
    });  
      
//category check
app.get("/users", async (req, res) => {
// First read existing users.
try {
const result = await User.find();
const result1 = await cat.find();
res.status(200).json({
result1,result,
message: "Data get.",
});
} catch (error) {
res.status(500).json({
message:
error.message ||
"An unexpected error occure while processing your request.",
});
}
});

app.delete("/user/:userId", async (req, res) => {
// First read existing users.
try {
const { params } = req;
const result = await User.findByIdAndDelete(params.userId);
res.status(200).json({
result,
message: "Data get.",
});
} catch (error) {
res.status(500).json({
message:
error.message ||
"An unexpected error occure while processing your request.",
});
}
});
// Login user through email and password then it see full detail
app.post('/login', [

    //Email validation    
    check('email')
    .not().isEmpty().withMessage('Email cant be empty')
    .isEmail().withMessage('Enter the valid email')
    // .custom(async (email, {req}) => {
    //     console.log(email);
        
    //     const userData = await User.findOne({ email })
    //     console.log(userData);
        
    //     if (!userData) {
    //       throw new Error("Email not registered.");
    //     }
    //     req.userData = userData;
    //     return true;
    //   }).withMessage('Your email not register 1st sign up. '),
    // Password Valdidation   
   , check('password')
    .not().isEmpty().withMessage('Password cant be empty')
    .isLength({ min: 8 }).withMessage('must be at least 8 chars long')
    

],async(req,res)=>{
     // Finds the validation errors in this request and wraps them in an object with handy functions
     const errors = validationResult(req);
     // If error not occure    
         if (!errors.isEmpty()) {
         return res.status(422).json({ errors: errors.array() });}
         try {
          const { body } = req;
          const Email = body.email;
          const Password = body.password;
          const result = await User.findOne({ email: Email });
          console.log(result);
          if (!result) {
          res.status(400).json({
          message: "Email is not found",
          success: false
          });
          }
          const check = bcrypt.compareSync(Password, result.password);
          if (!check) {
          res.status(400).json({
          message: "password does not match",
          success: false
          });
          } else {
          const object = { ...result._doc };
          var token = jwt.sign(object, "nikita", { expiresIn: "1h" });
        
          res.status(200).json({
          result,
          token,
          message: "Logged in successfully !",
          success: true
          });
          }
          } catch (error) {
          console.log(error);
          
          res.status(500).json({
          message: error.message || "unwanted error occurred."
          });
          }
          }
          );
          
//          try {
//             const { body, userData } = req;
            
//             let password = body.password;
//             const check = bcrypt.compareSync(password, userData.password);
//             if (!check) {
//               throw new Error('Password was incorect.')
//               return res.status(400).json({
//                 message: "Email and password did not match.",
//               });
//             }
//             else {
//               const object = { ...userData._doc };
//               var token = jwt.sign(object, "nikita", { expiresIn: "8hr" });
//               res.status(200).json({
//                 token,
//                 message: "Loggedin successfully!!",
//                 success: true
//               });
//             }
//           }     
//         catch(error){
//         res.status(400).json({
//             message:error.message ||"An unexpected error occur while processing yor request",
//             sucess:false,
//         })
//     }
// });

app.get('/logout',function(req, res) {
  res.status(200).send({ auth: false, token: null });
});
var server = app.listen(8000, function() {
var host = server.address().address;
var port = server.address().port;
console.log("Example app listening at http://%s:%s", host, port);
});
