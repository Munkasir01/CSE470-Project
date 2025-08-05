import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/DoctorDetails.css"; // Styling for the component

const DoctorDetails = () => {
  console.log("DoctorDetails component invoked");

  const [doctor, setDoctor] = useState(null);
  const { role, id, DoctorId } = useParams();
  console.log(`Role: ${role}, ID: ${id}, DoctorId: ${DoctorId}`);

  useEffect(() => {
    if (!role || !id || !DoctorId) {
      console.log("Role, ID, or DoctorId is missing");
      return;
    }

    console.log(`Fetching doctor data for role: ${role}, id: ${id}, and DoctorId: ${DoctorId}`);

    const fetchDoctorDetails = async () => {
      console.log("fetchDoctorDetails invoked");
      try {
        const response = await fetch(`http://localhost:3000/details/doctor/${DoctorId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const json = await response.json();
        console.log(json);

        if (response.ok) {
          console.log("Doctor data fetched successfully:", json);
          setDoctor(json[0]);
        } else {
          console.log("Error fetching doctor data");
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorDetails();
  }, [role, id, DoctorId]);

  console.log("Doctor:", doctor);

  return (
    <div className="doctor-details">
      <div className="doctor-details-container">
        {doctor ? (
          <div className="doctor-info">
            <h2>{doctor.firstName} {doctor.lastName}</h2>
            <p>
              <strong>Speciality:</strong> {doctor.speciality || "N/A"}
            </p>
            <p>
              <strong>Affiliation:</strong> {doctor.affiliation || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {doctor.mail}
            </p>
            <p>
              <strong>Phone:</strong> {doctor.phone}
            </p>
          </div>
        ) : (
          <p>Loading doctor data...</p>
        )}
      </div>
    </div>
  );
};

export default DoctorDetails;
