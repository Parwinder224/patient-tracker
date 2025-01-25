const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Patient = require('./models/patientModel')
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send("Welcome to the API");
});

app.post('/patient',async (req,res)=>{
    try{
     const patient = await Patient.create(req.body)
     res.status(200).json(patient);

    } catch (error) {

        console.log(error.message);
        res.status(500).json({message: error.message})

    }
})

app.get('/patient',async (req,res)=>{
    try{
    const patients = await Patient.find({});
    res.status(200).json(patients)}
    catch (error) {
       res.status(500).json({message:error.message})
    }

})

app.get('/patient/:id',async (req,res)=>{
    try{
    const {id}=req.params
    const patient = await Patient.findById(id);
    res.status(200).json(patient)}
    catch (error) {
       res.status(500).json({message:error.message})
    }
})

app.put('/patient/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const patient = await Patient.findByIdAndUpdate(id,req.body);
        if(!patient)
        {
            return res.status(404).json({message:`cannot find any product with id ${id}`})
        }
        const updated=await Patient.findById(id);
        res.status(200).json(updated)

    }

    catch(error){
        res.status(500).json({message:error.message})
    }
})


app.delete('/patient/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const patient = await Patient.findByIdAndDelete(id);
        if(!patient)
        {
            return res.status(404).json({message:`cannot find any product with id ${id}`})
        }
        res.status(200).json(patient)

    }

    catch(error){
        res.status(500).json({message:error.message})
    }
})


const PORT = process.env.PORT || 3000;
// scdcjs
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

mongoose.connect("mongodb+srv://sugamparnami:admin123@cluster0.egbeb.mongodb.net/Tracker?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Database connected")
}).catch(()=>{
    console.log("Database Error")
})
