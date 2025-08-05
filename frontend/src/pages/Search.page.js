import { useState } from "react";
import MedicineSearch from "./SearchMedicine.page";
import DoctorSearch  from "./SearchDoctor.page.js";
import "../css/Search.css";


const CombinedSearchPage = () => {
  const [isMedicineView, setIsMedicineView] = useState(true);

  return (
    <div className="combined-search-page-container">
      <div className="toggle-buttons">
        <button
          className={`toggle-btn ${isMedicineView ? "active" : ""}`}
          onClick={() => setIsMedicineView(true)}
        >
          Medicines
        </button>
        <button
          className={`toggle-btn ${!isMedicineView ? "active" : ""}`}
          onClick={() => setIsMedicineView(false)}
        >
          Doctors
        </button>
      </div>
      <div className="search-content">
        {isMedicineView ? <MedicineSearch /> : <DoctorSearch/>}
      </div>
    </div>
  );
};

export default CombinedSearchPage;
