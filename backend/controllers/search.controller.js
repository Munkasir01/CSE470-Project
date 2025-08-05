const UserModel = require('../models/user.model')
const PatientModel = require('../models/patient.model');
const DoctorModel = require('../models/doctor.model');
const StaffModel = require('../models/staff.model')
const MedicineModel = require('../models/medicine.model')

const mongoose = require('mongoose')


const get_all_patients= async (req, res)=>{
    const Patient= await PatientModel.find({}).sort({createdAt: -1})
    
    res.status(200).json(Patient)
}


const get_all_medicine= async (req, res)=>{
    const Medicines= await MedicineModel.find({}).sort({createdAt: -1})
    res.status(200).json(Medicines)
}


const get_all_Doctors= async (req, res)=>{
    const Doctors= await UserModel.find({role:"Doctor"}).sort({createdAt: -1})
    res.status(200).json(Doctors)
}

const get_GigDetails= async (req, res)=>{
    console.log('get GigDetails invoked')
    const { title } = req.params
    console.log(title)

    const gig= await GigModel.findOne({
        title: title
    });
    if (!gig){
        return  res.status(400).json({error: 'No such Gig'})
    }
    res.status(200).json(gig)
}

module.exports= { get_all_patients, get_all_medicine, get_all_Doctors }

