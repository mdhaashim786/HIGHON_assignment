const mongoose = require('mongoose');
const express = require('express');
const Colors = require("./colors_schema");
const Cards = require('./cards_schema');
const { countDocuments } = require('./colors_schema');
const app = express();
app.use(express.json());

const url = "mongodb://localhost/cards_db";
run = async () => {

    await mongoose.connect(url)
        .then((msg) => {
            console.log("connected to db....");
        }).catch((err) => {
            console.log("error in connecting to db.....");
        })

    /*
        i have declared a variable "colors"
        and assigned the json data in the "colors_data.json" to the variable
        we can insert the data into mongodb database using the below statement
        Colors.insertMany(colors);
    */

    //save the card to database

    // const card = new Cards({ code: "dummycode", title: "dummyTitle", description: "dummyDescp" })
    // card.save();
}
run();
app.get("/api/card/colors", (req, res) => {

    Colors.find({}, (err, data) => {
        if (err) res.send(err);
        res.send(data);
    })
});

app.put("/api/card/save", (req, res) => {
    let mytitle = req.query.title;
    let mycode = req.query.colorCode;
    let mydescription = req.query.description;
    let tempCard = new Cards({ code: mycode, title: mytitle, description: mydescription });
    tempCard.save();
})

app.get("/api/card/fetch", (req, res) => {
    Cards.find({}, (err, data) => {
        if (err) res.send(err);
        res.send(data);
    })
})

app.get("/api/validatetitle/:title", (req, res) => {
    let mytitle = req.params.title;
    Cards.find({ title: mytitle }, (err, data) => {
        if (err) res.send(err);
        //console.log(data);
        else if (data.length == 0) {
            res.send("title is Valid");
        }
        else
            res.send("title is not valid");
    })
})

app.get("/api/filter/:name", (req, res) => {
    var myname = req.params.name;
    Cards.find({ $or: [{ title: { $regex: `${myname}`, $options: "i" } }, { description: { $regex: `${myname}`, $options: "i" } }] }, (err, data) => {
        if (err) res.send(err);
        //console.log(data);
        res.send(data);
    })
})
app.listen(8000, () => {
    console.log("listening to port 8080");
})
