const express = require("express")
const server = express();
const testRouter = require("./routes/testRoute")
const cors = require("cors");
const dotenv = require("dotenv")
const morgan = require("morgan");
const { connectDb } = require("./config/mongoose");
const authRouter = require("./routes/authRoute")
const inventoryRouter = require("./routes/inventoryRoute")
const analyticsRouter = require("./routes/analyticsRoutes")
const adminRouter = require("./routes/adminRoutes")
const path = require("path")

server.use(express.static(path.join(__dirname, "public")))


dotenv.config();

//Mongoose Connection
connectDb()

//mddlewares

server.use(express.json())
server.use(cors())
server.use(morgan("dev"))
server.use("/api/v1/test",testRouter.router)
server.use("/api/v1/auth",authRouter.router)
server.use("/api/v1/inventory",inventoryRouter.router)
server.use("/api/v1/analytics",analyticsRouter.router)
server.use("/api/v1/admin",adminRouter.router)


// server.use(express.static(path.join(__dirname,"./client/build")))

// server.get("*",(req,res)=>{
//     res.sendFile(path.join(__dirname,"./client/build/index.html"))
// })

//PORT

const PORT = process.env.PORT;
server.listen(PORT,()=>{
    console.log("Server Started")
})