const mongoose=require('mongoose')

const patientSchema = mongoose.Schema(
    {
        name:
        {
            type:String,
            required:[true, "Patient Name is Required"]
        },

        age:
        {
            type:Number,
            required:false
        },

        gender:{
            type:Number,
            required:true
        },

        address:
        {
            type:String,
            required:false
        },

        complaint:
        {
            type:String,
            required:false
        },

        medical_history:
        {
            type:String,
            required:false
        },

        Investigations:
        {
            type:String,
            required:false
        },

        diagnosis:
        {
            type:String,
            required:false
        },

        treatment_plan:{
            type:String,
            required:false
        },

        remarks:{
            type:String,
            required:false
        },

        old_patient:{
            type:Boolean,
            required:true
        },
    },

    {
        timestamps:true
    }
)

const Patient = mongoose.model('Patient',patientSchema);
module.exports=Patient