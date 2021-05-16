const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
const port = process.env.PORT|| 5000;
var cors = require('cors')
const corsOptions ={
    origin:"*", 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    
}
app.use(cors(corsOptions))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.get("/", (req,res)=>{
    res.send("Up and running");
})

app.post("/submit",(req,res)=>{
    const smtpTrans = nodemailer.createTransport({
        host: '',
        port: 465,
        secure: false,
        auth: {
          user: '',  
          pass: ''
        }
      })
    
      // Specify what the email will look like
      const mailBody = {
        from: req.body.email, // This is ignored by Gmail
        to: 'admin@scizers.com',
        text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
      }
    
     // Attempt to send the email
      smtpTrans.sendMail(mailBody, (error, response) => {
        if (error) {
            res.send({message:"Failed"}); // Show a page indicating failure
        }
        else {
            res.send({message:"Success"}) // Show a page indicating success
        }
      })
   
})
app.listen(port, ()=>{
    console.log("Server up and running");
})