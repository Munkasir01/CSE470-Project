import { useState } from 'react';
import '../css/MedicinePosting.css';

const PostMedicine = () => {
    const [MedicineName, setName] = useState('');
    const [price, setPrice] = useState('');
    const [dosage, setDosage] = useState('');
    const [brandName, setBrandName] = useState('');
    const [category, setCategory] = useState('');
    const [medicines, setMedicines] = useState([]);
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const newMedicine = { MedicineName, price, dosage, description, brand_name: brandName, category };
    
        try {
            const response = await fetch('http://localhost:3000/post-medicine/post', {
                method: 'POST',
                body: JSON.stringify(newMedicine),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add medicine');
            }
    
            const savedMedicine = await response.json();
            setMedicines([...medicines, savedMedicine]);
    
            // Reset form fields
            setName('');
            setPrice('');
            setDosage('');
            setBrandName('');
            setCategory('');
            setDescription('');
            alert('Medicine added successfully!');
        } catch (error) {
            console.error('Error:', error.message);
            alert(`Failed to add medicine: ${error.message}`);
        }
    };
    

    return (
        <div className="medicine-posting-container">
            <h1>Add Medicine</h1>
            <form onSubmit={handleSubmit} className="medicine-posting-form">
                <label htmlFor="medicine-name">Medicine Name</label>
                <input
                    type="text"
                    id="medicine-name"
                    value={MedicineName}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Medicine Name"
                    required
                />

                <label htmlFor="medicine-price">Price</label>
                <input
                    type="number"
                    id="medicine-price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter Price"
                    required
                />

                <label htmlFor="medicine-dosage">Dosage</label>
                <input
                    type="text"
                    id="medicine-dosage"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    placeholder="Enter Dosage (e.g., 500mg)"
                    required
                />

                <label htmlFor="medicine-brand">Brand Name</label>
                <input
                    type="text"
                    id="medicine-brand"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Enter Brand Name"
                    required
                />

                <label htmlFor="medicine-category">Category</label>
                <input
                    type="text"
                    id="medicine-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Enter Category (e.g., Painkiller, Antibiotic)"
                    required
                />
                
                <label htmlFor="medicine-description">Description</label>
                <textarea
                    id="medicine-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the medicine"
                    rows="4"
                    required
                ></textarea>

                <button type="submit" className="submit-btn">
                    Add Medicine
                </button>
            </form>

            <div className="medicine-list">
                <h2>Medicine List</h2>
                <ul>
                    {medicines.map((medicine, index) => (
                        <li key={index}>
                            {medicine.MedicineName} - ${medicine.price} - {medicine.dosage} - {medicine.category} -{' '}
                            {medicine.brand_name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PostMedicine;
