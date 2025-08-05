const UserModel = require('../models/user.model')
const PatientModel = require('../models/patient.model');
const DoctorModel = require('../models/doctor.model');
const StaffModel = require('../models/staff.model')
const MedicineModel = require('../models/medicine.model')
const AppointementModel = require('../models/appointment.model');
const mongoose = require('mongoose');



const create_new_medicine= async (req, res) => {
    try {
        console.log(req.body)
        const {...medicineData } = req.body;

        const medicine = new MedicineModel({ ...medicineData });
        
        console.log(medicine)
        
        await medicine.save();

        res.status(201).json(medicine); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const get_Medicine= async (req, res) => {
    console.log("get_Medicine invoked");
    const { MedicineName}= req.params;
    // console.log("MedicineName:", MedicineName);
    try {
        const medicine = await MedicineModel.find({MedicineName})
        // console.log("Medicine:", medicine);

        res.status(200).json(medicine);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const update_Medicine= async (req, res) => {
    console.log("update_Medicine invoked");
    const { MedicineName } = req.params;
    // console.log("MedicineName:", MedicineName);
    try {
        const medicine = await MedicineModel.findOneAndUpdate({ MedicineName }, { ...req.body }, { new: true });
        // console.log("Medicine:", medicine);

        res.status(200).json(medicine);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}






module.exports= {
    create_new_medicine,
    get_Medicine,
    update_Medicine,
    // get_all_Applicants_by_medicine_title
}

