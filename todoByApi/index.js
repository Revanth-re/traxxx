
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
const envOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map(o => o.trim())
  .filter(Boolean);
const allowedOrigins = [
  "http://localhost:5173",
  ...envOrigins
];
// Allow common host patterns in addition to explicit list
const allowedOriginPatterns = [
  /^https:\/\/.+\.vercel\.app$/
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || allowedOriginPatterns.some(rx => rx.test(origin))) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
}));
// Ensure preflight requests are handled
app.options('*', cors());

ConnectDB();

// Health and root endpoints
app.get("/", (req, res) => {
  res.json({ status: "ok", service: "dhukaanTracker API" });
});
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

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
