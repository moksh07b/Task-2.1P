const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");  // For parsing the file

app.use("/public", express.static(__dirname));  // For the name of the folder to be public in the file.
app.use(bodyParser.urlencoded({extended : false})); // For returning the output as a string


const api_key = "8761e7c0c54d86b1d007ebda1a71e713-911539ec-6991b8f4";   // The api-key from the mailgun site.
const domain = "sandbox996000ba9eab4779983a1ea6fde8333a.mailgun.org";
const Mailgun = require("mailgun-js");
const mg = Mailgun({apiKey : api_key, domain : domain});    // making the object while setting the api-key initially.


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"index.html"));
})

app.post("/", (req,res)=>{
    const emailOutput = req.body.email; // taking the email out of the object. {email : value}

   
   
    let data = {
        from : "Moksh Bansal <moksh@sandbox996000ba9eab4779983a1ea6fde8333a.mailgun.org>",
        to : emailOutput,
        subject : "SIT 313 - Task 2.1P",
        text : "Sending the mail as a task for the 2.1P requirements.\nRegards\nMoksh Bansal\n2310994794" 
    };

    mg.messages().send(data,(error, body)=>{
        if(error)
            console.log(error);
        else{
            console.log(body);
        }
    });

   
});

app.listen(3000);