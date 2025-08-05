const UserModel = require('../models/user.model')
const PatientModel = require('../models/patient.model');
const DoctorModel = require('../models/doctor.model');
const StaffModel = require('../models/staff.model')
const MedicineModel = require('../models/medicine.model')
const BloodDonorModel = require('../models/blood.donor.model')

const mongoose = require('mongoose')


const get_Doctor= async (req, res) => {
    console.log("get_Doctor invoked");
    const { DoctorId}= req.params;
    // console.log("DoctorName:", DoctorName);
    try {
        const doctor = await UserModel.find({_id:DoctorId})
        console.log("Doctor:", doctor);


        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports= { get_Doctor }

