import { useEffect, useState } from "react";

import '../css/MedicineSearch.css';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// The YourComponent with navigation logic
const YourComponent = ({ role, id, medicine }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/search/${role}/${id}/details/medicine/${medicine.MedicineName}`);
  };

  return (
    <button onClick={handleNavigation} className="details-btn">
      View Details
    </button>
  );
};

const Medicinesearch = () => {
    const [medicines, setMedicines] = useState([]);
    const { role, id } = useParams();

    useEffect(() => {
        const fetchmedicines = async () => {
            console.log("fetchMedicine invoked");
            try {
                const response = await fetch(`http://localhost:3000/search/medicine`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
    
                const json = await response.json();
                console.log(json);
    
                if (response.ok) {
                    console.log("Medicine data fetched successfully:", json);
                    setMedicines(json);
                } else {
                    console.log("Error fetching Medicine data:", json);
                    setMedicines([]);
                }
            } catch (error) {
                console.error("Fetch error:", error);
                setMedicines([]);
            }
        };
    
        fetchmedicines();
    }, []); // Ensure the dependency array is empty if no variables are dynamic.
    
    console.log('-----',medicines)


    const [searchQuery, setSearchQuery] = useState('');

    

    const filteredMedicine = searchQuery.trim()
    ? medicines.filter(medicine => {
        const query = searchQuery.toLowerCase().trim();

        const nameMatch = medicine.MedicineName? medicine.MedicineName.toLowerCase().includes(query) : false;
        const brand_nameMatch = medicine.brand_name? medicine.brand_name.toLowerCase().includes(query) : false;
        const categoryMatch = medicine.category? medicine.category.toLowerCase().includes(query) : false;

        return nameMatch || brand_nameMatch || categoryMatch;
    })
    : medicines;


    return (
        <div className="employee-search-container">
            <h1>Search Medicine</h1>
            <input
                type="text"
                placeholder="Search by name, brand_name, or position..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value) }
                   
                className="search-input"
            />
            <div className="employee-card-container">
                {filteredMedicine.length > 0 ? (
                    filteredMedicine.map((medicine) => (
                        <div key={medicine.MedicineName} className="employee-card">
                            <div className="employee-info">
                                <h2>{medicine.MedicineName    || "No name Provided"}</h2>
                                <span className="employee-role">{medicine.brand_name || "No brand_name Provided"}</span><br/>
                                <span className="employee-role">{medicine.category || "No category Provided"}</span>
                                
                            </div>
                            <YourComponent role={role} id={id} medicine={medicine} />
                        </div>
                    ))
                ) : (
                    <p>No medicines found matching your search.</p>
                )}
            </div>
        </div>
    );
};

export default Medicinesearch;