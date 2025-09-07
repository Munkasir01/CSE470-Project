const UserModel = require('../models/user.model')
const PatientModel = require('../models/patient.model');
const DoctorModel = require('../models/doctor.model');
const StaffModel = require('../models/staff.model')
const MedicineModel = require('../models/medicine.model')
const AppointementModel = require('../models/appointment.model');
const mongoose = require('mongoose');
const NotificationModel = require('../models/notification.model');

const create_new_medicine = async (req, res) => {
  try {
    console.log(req.body);
    const { ...medicineData } = req.body;

    // Create new medicine
    const medicine = new MedicineModel({ ...medicineData });
    await medicine.save();

    // Create a notification for Patients & Doctors
    const notification = new NotificationModel({
      Type: "Medicine",
      notification: `New medicine "${medicine.MedicineName}" has been enlisted.`,
      Whom: ["Patient", "Doctor"],
    });
    await notification.save();

    res.status(201).json({
      message: "Medicine created successfully",
      medicine,
      notification,
    });
  } catch (error) {
    console.error("Error creating medicine:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { create_new_medicine };


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

const update_Medicine = async (req, res) => {
  console.log("update_Medicine invoked");
  const { MedicineName } = req.params;

  try {
    // Find the medicine before update (to compare stock)
    const existingMedicine = await MedicineModel.findOne({ MedicineName });
    if (!existingMedicine) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    const oldStock = existingMedicine.stock;

    // Update medicine
    const medicine = await MedicineModel.findOneAndUpdate(
      { MedicineName },
      { ...req.body },
      { new: true }
    );
    
    // Check if stock changed
   if (req.body.stock !== undefined && Number(req.body.stock) !== oldStock){
   
      const notification = new NotificationModel({
        Type: "Medicine",
        notification: `Medicine "${medicine.MedicineName}" stock has been updated from ${oldStock} to ${req.body.stock}.`,
        Whom: ["Patient", "Doctor"],
      });

      await notification.save();
    }

    res.status(200).json(medicine);
  } catch (error) {
    console.error("Error updating medicine:", error);
    res.status(500).json({ error: error.message });
  }
};






module.exports= {
    create_new_medicine,
    get_Medicine,
    update_Medicine,
    // get_all_Applicants_by_medicine_title
}

