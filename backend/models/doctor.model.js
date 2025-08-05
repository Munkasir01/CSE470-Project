const mongoose = require('mongoose');
const UserModel = require('../models/user.model');

const DoctorSchema = new mongoose.Schema({
  speciality: { type: String, required: false },
  affiliation: { type: String, required: false },
},
{ timestamps: true }
);

const Doctor = UserModel.discriminator('Doctor', DoctorSchema);

module.exports = Doctor;
