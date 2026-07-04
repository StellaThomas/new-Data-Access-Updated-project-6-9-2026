// const express = require("express");
// const router = express.Router();

// const connectDB = require("../config/db");

// // ======================================
// // GET ALL CUSTOMERS
// // ======================================
// router.get("/customers", async (req, res) => {

//   try {

//     const db = await connectDB();

//     const customers = await db
//       .collection("mCustomer")
//       .find(
//         {},
//         {
//           projection: {
//             _id: 0,
//             CustomerID: 1,
//             Customer: 1
//           }
//         }
//       )
//       .sort({ Customer: 1 })
//       .toArray();

//     res.status(200).json({
//       success: true,
//       data: customers
//     });

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message
//     });

//   }

// });

// // ======================================
// // CUSTOMER LOGIN
// // ======================================
// router.post("/login", async (req, res) => {

//   try {

//     const { customerName, password } = req.body;

//     if (!customerName || !password) {

//       return res.status(400).json({
//         success: false,
//         message: "Customer Name and Password are required"
//       });

//     }

//     const db = await connectDB();

//     const user = await db.collection("users").findOne({
//       customerName: customerName.trim(),
//       password: password.trim()
//     });

//     if (!user) {

//       return res.status(401).json({
//         success: false,
//         message: "Invalid Customer Name or Password"
//       });

//     }

//     res.status(200).json({

//       success: true,

//       message: "Login Successful",

//       user: {

//         customerId: user.customerId,

//         customerName: user.customerName,

//         role: user.role

//       }

//     });

//   } catch (error) {

//     console.log("LOGIN ERROR :", error);

//     res.status(500).json({

//       success: false,

//       message: error.message

//     });

//   }

// });

// module.exports = router;









// const express = require("express");
// const router = express.Router();

// const connectDB = require("../config/db");

// // ======================================
// // GET ALL CUSTOMERS
// // ======================================
// router.get("/customers", async (req, res) => {

//   try {

//     const db = await connectDB();

//     const customers = await db
//       .collection("mCustomer")
//       .find(
//         {},
//         {
//           projection: {
//             _id: 0,
//             CustomerID: 1,
//             Customer: 1
//           }
//         }
//       )
//       .sort({ Customer: 1 })
//       .toArray();

//     res.status(200).json({
//       success: true,
//       data: customers
//     });

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message
//     });

//   }

// });

// // ======================================
// // CUSTOMER LOGIN
// // ======================================
// router.post("/login", async (req, res) => {

//   try {

//     const { customerName, password } = req.body;

//     if (!customerName || !password) {

//       return res.status(400).json({
//         success: false,
//         message: "Customer Name and Password are required"
//       });

//     }

//     const db = await connectDB();

//     // Check login
//     const user = await db.collection("users").findOne({
//       customerName: customerName.trim(),
//       password: password.trim()
//     });

//     if (!user) {

//       return res.status(401).json({
//         success: false,
//         message: "Invalid Customer Name or Password"
//       });

//     }

//     // Load customer profile
//     const customer = await db.collection("mCustomer").findOne({
//       CustomerID: user.customerId
//     });

//     res.status(200).json({

//       success: true,

//       message: "Login Successful",

//       user: {
//         customerId: user.customerId,
//         customerName: user.customerName,
//         role: user.role
//       },

//       customer

//     });

//   } catch (error) {

//     console.log("LOGIN ERROR :", error);

//     res.status(500).json({

//       success: false,

//       message: error.message

//     });

//   }

// });

// module.exports = router;














// const express = require("express");
// const router = express.Router();

// const connectDB = require("../config/db");

// // ======================================
// // GET ALL CUSTOMERS
// // ======================================
// router.get("/customers", async (req, res) => {
//   try {
//     const db = await connectDB();

//     const customers = await db
//       .collection("mCustomer")
//       .find(
//         {},
//         {
//           projection: {
//             _id: 0,
//             CustomerID: 1,
//             Customer: 1,
//           },
//         }
//       )
//       .sort({ Customer: 1 })
//       .toArray();

//     res.status(200).json({
//       success: true,
//       data: customers,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// // ======================================
// // CUSTOMER LOGIN
// // ======================================
// router.post("/login", async (req, res) => {
//   try {
//     const { customerName, password } = req.body;

//     if (!customerName || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Customer Name and Password are required",
//       });
//     }

//     const db = await connectDB();

//     // Login directly from mCustomer collection
//     const customer = await db.collection("mCustomer").findOne({
//       Customer: customerName.trim(),
//       Password: password.trim(),
//     });

//     if (!customer) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid Customer Name or Password",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Login Successful",

//       customer: {
//         CustomerID: customer.CustomerID,
//         Customer: customer.Customer,
//         Address: customer.Address,
//         City: customer.City,
//         Phone: customer.Phone,
//         Email: customer.Email,
//         Zone: customer.Zone,
//         GSTNo: customer.GSTNo,
//         CompanyID: customer.CompanyID,
//       },
//     });
//   } catch (error) {
//     console.log("LOGIN ERROR :", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });



// // ======================================
// // CHECK CUSTOMER PASSWORD
// // ======================================
// router.post("/check-customer", async (req, res) => {

//   try {

//     const { customerName } = req.body;

//     if (!customerName) {
//       return res.status(400).json({
//         success: false,
//         message: "Customer Name is required"
//       });
//     }

//     const db = await connectDB();

//     const customer = await db.collection("mCustomer").findOne(
//       {
//         Customer: customerName.trim()
//       },
//       {
//         projection: {
//           CustomerID: 1,
//           Customer: 1,
//           Password: 1
//         }
//       }
//     );

//     if (!customer) {
//       return res.status(404).json({
//         success: false,
//         message: "Customer Not Found"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       customerId: customer.CustomerID,
//       customerName: customer.Customer,
//       hasPassword: !!customer.Password
//     });

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message
//     });

//   }

// });

// module.exports = router;

































































// const express = require("express");
// const router = express.Router();

// const connectDB = require("../config/db");

// // ======================================
// // GET ALL CUSTOMERS
// // ======================================
// router.get("/customers", async (req, res) => {
//   try {
//     const db = await connectDB();

//     const customers = await db
//       .collection("mCustomer")
//       .find(
//         {},
//         {
//           projection: {
//             _id: 0,
//             CustomerID: 1,
//             Customer: 1,
//           },
//         }
//       )
//       .sort({ Customer: 1 })
//       .toArray();

//     res.status(200).json({
//       success: true,
//       data: customers,
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// // ======================================
// // CHECK CUSTOMER
// // ======================================
// router.post("/check-customer", async (req, res) => {
//   try {
//     const { customerName } = req.body;

//     if (!customerName) {
//       return res.status(400).json({
//         success: false,
//         message: "Customer Name is required",
//       });
//     }

//     const db = await connectDB();

//    // Find customer from mCustomer
// const customer = await db.collection("mCustomer").findOne(
//   {
//     Customer: customerName.trim(),
//   },
//   {
//     projection: {
//       _id: 0,
//       CustomerID: 1,
//       Customer: 1,
//     },
//   }
// );

// if (!customer) {
//   return res.status(404).json({
//     success: false,
//     message: "Customer Not Found",
//   });
// }

// // Check if customer already has login
// const user = await db.collection("users").findOne({
//   CustomerID: customer.CustomerID,
// });

// res.status(200).json({
//   success: true,
//   customerId: customer.CustomerID,
//   customerName: customer.Customer,
//   hasPassword: !!user,
// });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });


// // ======================================
// // CUSTOMER LOGIN
// // ======================================
// router.post("/login", async (req, res) => {
//   try {
//     const { customerName, password } = req.body;

//     if (!customerName || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Customer Name and Password are required",
//       });
//     }

//     const db = await connectDB();

//     const customer = await db.collection("mCustomer").findOne({
//       Customer: customerName.trim(),
//       Password: password.trim(),
//     });

//     if (!customer) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid Customer Name or Password",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Login Successful",

//       customer: {
//         CustomerID: customer.CustomerID,
//         Customer: customer.Customer,
//         Address: customer.Address,
//         City: customer.City,
//         Phone: customer.Phone,
//         Email: customer.Email,
//         Zone: customer.Zone,
//         GSTNo: customer.GSTNo,
//         CompanyID: customer.CompanyID,
//       },
//     });
//   } catch (error) {
//     console.log("LOGIN ERROR :", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });


// // ======================================
// // CREATE PASSWORD
// // ======================================
// router.post("/create-password", async (req, res) => {
//   try {
//     const { customerName, password } = req.body;

//     if (!customerName || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Customer Name and Password are required",
//       });
//     }

//     const db = await connectDB();

//     const customer = await db.collection("mCustomer").findOne({
//       Customer: customerName.trim(),
//     });

//     if (!customer) {
//       return res.status(404).json({
//         success: false,
//         message: "Customer Not Found",
//       });
//     }

//     if (customer.Password) {
//       return res.status(400).json({
//         success: false,
//         message: "Password already created",
//       });
//     }

//     await db.collection("mCustomer").updateOne(
//       {
//         Customer: customerName.trim(),
//       },
//       {
//         $set: {
//           Password: password.trim(),
//         },
//       }
//     );

//     res.json({
//       success: true,
//       message: "Password Created Successfully",
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// module.exports = router;




















































const express = require("express");
const router = express.Router();

const connectDB = require("../config/db");


// // ======================================
// // GET ALL CUSTOMERS
// // ======================================
// router.get("/customers", async (req, res) => {
//   try {
//     const db = await connectDB();

//     const customers = await db
//       .collection("mCustomer")
//       .find(
//         {},
//         {
//           projection: {
//             _id: 0,
//             CustomerID: 1,
//             Customer: 1,
//           },
//         }
//       )
//       .sort({ Customer: 1 })
//       .toArray();

//     res.json({
//       success: true,
//       data: customers,
//     });
//   } catch (error) {
//     console.log("LOGIN ERROR :", error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });





// // ======================================
// // CHECK CUSTOMER
// // ======================================
// router.post("/check-customer", async (req, res) => {
//   try {

//     const { customerName } = req.body;

//     console.log("\n========== CHECK CUSTOMER ==========");
//     console.log("Received Customer :", customerName);

//     if (!customerName) {
//       return res.status(400).json({
//         success: false,
//         message: "Customer Name is required",
//       });
//     }

//     const searchName = customerName.trim();

//     console.log("Search Name :", searchName);

//     const db = await connectDB();

//     // Find customer by trimming spaces in MongoDB
//     const allCustomers = await db.collection("mCustomer").find().toArray();

// console.log("Total Customers :", allCustomers.length);

// const customer = allCustomers.find((c) => {
//   if (!c.Customer) return false;

//   console.log(
//     "DB:",
//     JSON.stringify(c.Customer),
//     "=>",
//     JSON.stringify(c.Customer.trim())
//   );

//   return c.Customer.trim() === searchName;
// });

// console.log("Customer Found :", customer);
//     console.log("Customer Found :", customer);

//     if (!customer) {
//       return res.status(404).json({
//         success: false,
//         message: "Customer Not Found",
//       });
//     }

//     // Check if login already exists
//     const user = await db.collection("users").findOne({
//       CustomerID: customer.CustomerID,
//     });

//     console.log("User Found :", user);

//     return res.status(200).json({
//       success: true,
//       customerId: customer.CustomerID,
//       customerName: customer.Customer,
//       hasPassword: !!user,
//     });

//   } catch (error) {

//     console.log("CHECK CUSTOMER ERROR :", error);

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }
// });



// ======================================
// CREATE PASSWORD
// ======================================
router.post("/create-password", async (req, res) => {
  try {

    const { customerId, username, password } = req.body;

    console.log("\n========== CREATE PASSWORD ==========");
    console.log("Customer ID :", customerId);
    console.log("Username :", username);
    console.log("Password :", password);

    if (!customerId || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "Customer ID, Username and Password are required",
      });
    }

    const db = await connectDB();

    // Find customer using CustomerID
    const customer = await db.collection("mCustomer").findOne(
      {
        CustomerID: Number(customerId), // If CustomerID is string then remove Number()
      },
      {
        projection: {
          _id: 0,
          CustomerID: 1,
          Customer: 1,
          Address: 1,
          City: 1,
          Phone: 1,
          Email: 1,
          Zone: 1,
          GSTNo: 1,
          CompanyID: 1,
        },
      }
    );

    console.log("Customer Found :", customer);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Invalid Customer ID",
      });
    }

    // Check if account already exists
    const existingUser = await db.collection("users").findOne({
      CustomerID: customer.CustomerID,
    });

    console.log("Existing User :", existingUser);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Account already created for this Customer",
      });
    }

    // Check Username
   const usernameExists = await db.collection("users").findOne({
  Username: username,
});

    if (usernameExists) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    // Save User
const result = await db.collection("users").insertOne({
  CustomerID: customer.CustomerID,
  Customer: customer.Customer,
  Username: username,
  Password: password,
  CreatedAt: new Date(),
});

    console.log("Inserted ID :", result.insertedId);

    return res.status(200).json({
      success: true,
      message: "Account Created Successfully",
    });

  } catch (error) {

    console.log("CREATE PASSWORD ERROR :", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});



// ======================================
// LOGIN
// ======================================
router.post("/login", async (req, res) => {
  try {

    const { username, password } = req.body;

    console.log("========== LOGIN ==========");
    console.log("Username :", username);
    console.log("Password :", password);

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and Password are required",
      });
    }

    const db = await connectDB();

    // Find user using Username + Password
   const user = await db.collection("users").findOne({
  Username: username,
  Password: password,
});

    console.log("User Found :", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Username or Password",
      });
    }

    // Get customer using CustomerID
    const customer = await db.collection("mCustomer").findOne({
      CustomerID: user.CustomerID,
    });

    console.log("Customer Found :", customer);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      customer: {
        CustomerID: customer.CustomerID,
        Customer: customer.Customer,
        Address: customer.Address,
        City: customer.City,
        Phone: customer.Phone,
        Email: customer.Email,
        Zone: customer.Zone,
        GSTNo: customer.GSTNo,
        CompanyID: customer.CompanyID,
      },
    });

  } catch (error) {

    console.log("LOGIN ERROR :", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

module.exports = router;