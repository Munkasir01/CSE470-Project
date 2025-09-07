const mongoose=require('mongoose');

const MedicineSchema = mongoose.Schema(
    {  
        MedicineName: {
            type: String,
            required: true,},

        prescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' },
        price: {
            type: Number,
            required: true,
        },
        dosage: {
            type: String,
            required: true,
        },
        indication: {
            type: String,
            required: true,
        },
        brand_name: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const MedicineModel = mongoose.model('Medicine', MedicineSchema);

module.exports = MedicineModel;