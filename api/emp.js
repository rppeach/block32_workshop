import express from "express";
const router = express.Router();
import { getEmployees, addEmployee } from "../db/employees.js"
export default router;


router
.route("/")
.get((req, res) => {
    res.send(getEmployees());
  })
  .post((req,res,next)=>{
    const employee = req.body
      //ToDo - Check Format
    if (!employee){
      res.status(400).send("Incorrect Format - Please Try Again")
    }
    if (!employee.name){
      res.status(400).send("No Name Provided - Please Try Again")
    }
  
    addEmployee(employee)
    res.status(201).send(employee)
    next()
  })
  // Note: this middleware has to come first! Otherwise, Express will treat
  // "random" as the argument to the `id` parameter of /employees/:id.
  router.route("/employees/random")
  .get((req, res) => {
    const randomIndex = Math.floor(Math.random() * employees.length);
    res.send(employees[randomIndex]);
  })
  
  
  router.route("/employees/:id").get((req, res) => {
    const { id } = req.params;
  
    // req.params are always strings, so we need to convert `id` into a number
    // before we can use it to find the employee
    const employee = employees.find((e) => e.id === +id);
  
    if (!employee) {
      return res.status(404).send("Employee not found");
    }
  
    res.send(employee);
  });