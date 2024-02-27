// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser=require("body-parser")
// Create an Express application
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static("public"));

// Connect to MongoDB database using Mongoose
mongoose.connect('mongodb+srv://pravinpawar5635:dUWf7u3ERCy5pfP6@clusterfintech.c2girqu.mongodb.net/ram', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a Mongoose schema for the contact form data
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  message: String,
});

// Create a Mongoose model based on the schema
const Contact = mongoose.model('Contact', contactSchema);
app.get("/",async function(req,res)
{
    try
    {
        res.sendFile(__dirname+"/home.html");
    }
    catch(err)
    {
        console.log("error occurs"+err);
    }
})
app.get("/contact",async function(req,res)
{
    res.sendFile(__dirname+"/contactUs.html")
})
// Define a route to handle form submissions
app.post('/submit-form.html', async (req, res) => {
  try {
    // Extract form data from request body
    const { name, email, mobile, message } = req.body;

    // Create a new instance of the Contact model with the form data
    const newContact = new Contact({ name, email, mobile, message });

    // Save the new contact to the database
    await newContact.save();
    var contactinfo=await Contact.find({});
    console.log(contactinfo);
    // Respond with a success message
    res.send("message send successfully");
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error(error);
    res.status(500).json({ message: 'An error occurred while processing your request' });
  }
});
app.get("/About",async function(req,res)
{
    try{
        res.sendFile(__dirname+"/About.html")
    }
    catch(err)
    {
        console.log("error occurs in about us page"+err);
    }
})
app.get("/services",async function(req,res)
{
    try{
        res.sendFile(__dirname+"/services.html")
    }
    catch(err)
    {
        console.log("error occurs in services us page"+err);

    }
})
app.get("/testimonials",async function(req,res)
{
    try{
        res.sendFile(__dirname+"/testimonial.html")
    }
    catch(err)
    {
        console.log("error occurs in testimonial us page"+err);

    }
})
// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
