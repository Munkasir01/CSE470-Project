import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/MedicineDetails.css";

const MedicineDetails = () => {
  const [medicine, setMedicine] = useState(null);
  const [editableMedicine, setEditableMedicine] = useState(null); // State for editable fields
  const [isEditing, setIsEditing] = useState(false); // State for edit mode
  const { id, role, MedicineName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      console.log("Medicine ID is missing");
      return;
    }

    const fetchMedicineDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4001/details/medicine/${MedicineName}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const json = await response.json();

        if (response.ok) {
          setMedicine(json[0]);
          setEditableMedicine(json[0]); // Initialize editable state
        } else {
          console.log("Error fetching medicine data");
        }
      } catch (error) {
        console.error("Error while fetching medicine data:", error);
      }
    };

    fetchMedicineDetails();
  }, [id, MedicineName]);

  // Handle changes in editable fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableMedicine({ ...editableMedicine, [name]: value });
  };

  // Function to handle updating the medicine details
  const handleUpdateMedicine = async () => {
    try {
      const response = await fetch(
        `http://localhost:4001/details/medicine/${editableMedicine.MedicineName}`,
        {
          method: "PATCH",
          body: JSON.stringify(editableMedicine),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const updatedMedicine = await response.json();
        setMedicine(updatedMedicine); // Update the displayed details
        setIsEditing(false); // Exit edit mode
        alert("Medicine details updated successfully!");
      } else {
        console.error("Error updating medicine details");
      }
    } catch (error) {
      console.error("Error while updating medicine details:", error);
    }
  };

  // Function to handle Add to Cart
  const handleAddToCart = async () => {
    try {
      const cartItem = {
        medicine_name: medicine.MedicineName, // Ensure correct field name
        price: medicine.price,
        userId: id, // Pass the user ID from params
      };
  
      const response = await fetch(
        `http://localhost:3000/Cart/${role}/${id}/${medicine._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItem), // Include request body
        }
      );
  
      if (response.ok) {
        if (response.status === 280) {
          alert("This medicine is already in your cart.");
          return;
        }
        alert("Medicine added to cart successfully!");
        navigate(`/search/${role}/${id}/`); // Navigate to the cart page
      } else {
        const error = await response.json();
        console.error("Error adding to cart:", error.message);
        alert("Failed to add medicine to cart.");
      }
    } catch (error) {
      console.error("Error while adding to cart:", error);
      alert("An error occurred while adding the medicine to the cart.");
    }
  };
  
  return (
    <div className="medicine-details">
      <div className="medicine-details-container">
        {medicine ? (
          <div className="medicine-info">
            <h2>{medicine.MedicineName}</h2>
            {role === "Staff" ? (
              <>
                {isEditing ? (
                  <>
                    <label>
                      Medicine Name:
                      <input
                        type="text"
                        name="MedicineName"
                        value={editableMedicine.MedicineName}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      Price:
                      <input
                        type="number"
                        name="price"
                        value={editableMedicine.price}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      Dosage:
                      <input
                        type="text"
                        name="dosage"
                        value={editableMedicine.dosage}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      Brand Name:
                      <input
                        type="text"
                        name="brand_name"
                        value={editableMedicine.brand_name}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      Category:
                      <input
                        type="text"
                        name="category"
                        value={editableMedicine.category}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      Indication:
                      <textarea
                        name="indication"
                        value={editableMedicine.indication}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      Stock:
                      <input
                        type="number"
                        name="stock"
                        value={editableMedicine.stock}
                        onChange={handleInputChange}
                      />
                    </label>
                    <button className="update-btn" onClick={handleUpdateMedicine}>
                      Save
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <p><strong>Medicine Name:</strong> {medicine.MedicineName}</p>
                    <p><strong>Price:</strong> {medicine.price}</p>
                    <p><strong>Dosage:</strong> {medicine.dosage}</p>
                    <p><strong>Brand Name:</strong> {medicine.brand_name}</p>
                    <p><strong>Category:</strong> {medicine.category}</p>
                    <p><strong>Indication:</strong> {medicine.indication}</p>
                    <p><strong>Stock:</strong> {medicine.stock}</p>
                    <button
                      className="edit-btn"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                <p><strong>Medicine Name:</strong> {medicine.MedicineName}</p>
                <p><strong>Price:</strong> {medicine.price}</p>
                <p><strong>Dosage:</strong> {medicine.dosage}</p>
                <p><strong>Brand Name:</strong> {medicine.brand_name}</p>
                <p><strong>Category:</strong> {medicine.category}</p>
                <p><strong>Indication:</strong> {medicine.indication}</p>
              </>
            )}

            {role !== "Staff" && (
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            )}
          </div>
        ) : (
          <p>Loading medicine details...</p>
        )}
      </div>
    </div>
  );
};

export default MedicineDetails;
