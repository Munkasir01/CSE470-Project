const UserModel = require('../models/user.model')
const PatientModel = require('../models/patient.model');
const DoctorModel = require('../models/doctor.model');
const StaffModel = require('../models/staff.model')
const MedicineModel = require('../models/medicine.model')
const BloodDonorModel = require('../models/blood.donor.model')

const mongoose = require('mongoose')


const Register_as_Donor= async (req, res) => {
    console.log('Register_as_Donor invoked')
    console.log('req.body:', req.body)
    const { role, id } = req.body;

    try {
        const user = await UserModel.findById(id)
        console.log('user:', user)
        const blood_donor = new BloodDonorModel({ userId: user.userId,
        age: user.age,
            gender: user.gender,
        blood_type: user.blood_Group,
        contact_info: user.phone, });
        await blood_donor.save();
        res.status(201).json(blood_donor);
        
    } catch (error) {
        console.error('Error registering as donor:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports= { Register_as_Donor }

