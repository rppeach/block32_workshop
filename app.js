import express from "express";
const app = express();
export default app;
import { getEmployees, addEmployee } from "./db/employees.js";
import employeeRouter from "./api/emp.js"

app.use(express.json())

app.route("/").get((req, res) => {
  res.send("Hello employees");
});

app.use((req,res,next) => {
  console.log(req.method, req.originalUrl);
  next();
})

app.use("/employees", employeeRouter)


app.use((err,req,res,next)=>{
  res.status(500).send("uncaught error: " + err)
})
