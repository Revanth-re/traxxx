
const express = require("express");
const { ConnectDB } = require("./config/db.js");
const { router } = require("./routes/router.js");
const {todosModel}=require("./models/TodoModels.js")
// const {Port}=require("./controllers/todoControl.js")
// const {router}=require("./routes/router.js")
const cors=require("cors");
// const { expiryDateHandler,getAllProducts, getOne, addProducts, updateTodos ,updateDecrease, deletetodos,MoreDetails} = require("./controllers/todoControl.js");
console.log(cors());

const app = express();

app.use(express.json({ limit: "10mb" })); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration for production
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend-domain.onrender.com", // Replace with your actual frontend URL
  process.env.FRONTEND_URL // Allow environment variable for frontend URL
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

ConnectDB();
// Port()

app.use("/",router)
// app.get("/api/getAll",getAllProducts)

// app.post("/api/products", addProducts)

//     app.put("/api/update/:id", updateTodos)

//     app.put("/api/updateDec/:id",updateDecrease)

//     app.delete(`/api/delete/:id`,deletetodos)

//     app.get("/api/MoreDetails/:id",MoreDetails)

// app.get("/api/MoreDetails/:id",getOne)

// app.put("/api/expiryItems",expiryDateHandler)

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
