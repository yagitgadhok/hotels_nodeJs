const _ = require("lodash");
const express = require("express");
const db = require("./db.js");
const Person = require("./models/person.js");
const MenuItem = require("./models/MenuItem.js");

const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json()); // req.body

console.log("Starting server...");

// var add = (a,b) => {return a+b};

// const result = add(4,4);

// console.log(result)

// var data = ['a','a','b',1,1,5,5,5,4,'c'];
// var filter = _.uniq(data);

// console.log(filter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/admin", (req, res) => {
  res.send("This is admin page");
});

app.post("/item", (req, res) => {
  res.send("item post is working");
});

app.post("/menu_item", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    res.status(200).json(response);
  } catch (err) {
    console.log("we got an error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/menu_item", async (req, res) => {
  try {
    const menuItems = await MenuItem.find({});
    res.status(200).json(menuItems);
  } catch (err) {
    console.log("we got an error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/person", async (req, res) => {
  try {
    const data = req.body; //request body contains person data

    // create new person document using mongoose model
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log("we got an error", err);
    res.status(500).json({ error: "Internal server error" });
  }

  /* create new person document using mongoose model
    const newPerson = new Person(data);

    save the new person to db
    newPerson.save((error,savedPerson)=>{
        if(error){
            console.log("we got an error");
            res.status(500).json({error:"Internal server error"});
        }else{
            console.log("person saved successfully");
            res.status(200).json(savedPerson);
        }
    }); */
});

app.get("/person", async (req, res) => {
  try {
    const persons = await Person.find({});
    res.status(200).json(persons);
  } catch (err) {
    console.log("we got an error", err);
    res.status(500).json({ error: "Internal server error" });
  }
  /* Person.find({}, (error, persons)=>{
        if(error){
            console.log("we got an error");
            res.status(500).json({error:"Internal server error"});
        }else{
            console.log("person saved successfully");
            res.status(200).json(persons);
        }
    }); */
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
