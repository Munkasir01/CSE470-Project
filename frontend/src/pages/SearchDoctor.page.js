import { useEffect, useState } from "react";

// import '../css/doctorSearch.css';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// The YourComponent with navigation logic
const YourComponent = ({ role, id, doctor }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/search/${role}/${id}/details/doctor/${doctor._id}`);
  };

  return (
    <button onClick={handleNavigation} className="details-btn">
      View Details
    </button>
  );
};

const DoctorSearch  = () => {
    const [doctors, setDoctors] = useState([]);
    const { role, id } = useParams();

    useEffect(() => {
        const fetchDoctors = async () => {
            console.log("fetchdoctor invoked");
            try {
                const response = await fetch(`http://localhost:3000/search/doctors`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
    
                const json = await response.json();
                console.log(json);
    
                if (response.ok) {
                    console.log("Doctor data fetched successfully:", json);
                    setDoctors(json); // Ensure this matches the structure, e.g., json.doctors if necessary
                } else {
                    console.log("Error fetching Doctor data:", json);
                    setDoctors([]); // Set to an empty array or appropriate error handling state
                }
            } catch (error) {
                console.error("Fetch error:", error);
                setDoctors([]); // Handle errors more gracefully
            }
        };
    
        fetchDoctors();
    }, []);
    console.log('-----',doctors)


    const [searchQuery, setSearchQuery] = useState('');

    

    const filtereDoctor = searchQuery.trim()
    ? doctors.filter(doctor => {
        const query = searchQuery.toLowerCase().trim();

        const nameMatch = doctor.firstName.concat(' ').concat(doctor.lastName)? doctor.firstName.concat(' ').concat(doctor.lastName).toLowerCase().includes(query) : false;
        const affiliationMatch = doctor.affiliation? doctor.affiliation.toLowerCase().includes(query) : false;
        const specialityMatch = doctor.speciality? doctor.speciality.toLowerCase().includes(query) : false;

        return nameMatch || affiliationMatch || specialityMatch;
    })
    : doctors;


    return (
        <div className="employee-search-container">
            <h1>Search doctor</h1>
            <input
                type="text"
                placeholder="Search by name, affiliation, or position..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value) }
                   
                className="search-input"
            />
            <div className="employee-card-container">
                {filtereDoctor.length > 0 ? (
                    filtereDoctor.map((doctor) => (
                        <div key={doctor.firstName.concat(' ').concat(doctor.lastName)} className="employee-card">
                            <div className="employee-info">
                                <h2>{doctor.firstName.concat(' ').concat(doctor.lastName)    || "No name Provided"}</h2>
                                <span className="employee-role">{doctor.affiliation || "No affiliation Provided"}</span><br/>
                                <span className="employee-role">{doctor.speciality || "No speciality Provided"}</span>
                                
                            </div>
                            <YourComponent role={role} id={id} doctor={doctor} />
                        </div>
                    ))
                ) : (
                    <p>No doctors found matching your search.</p>
                )}
            </div>
        </div>
    );
};

export default DoctorSearch ;