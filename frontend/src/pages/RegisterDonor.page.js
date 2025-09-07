import { useState } from "react";
import { useParams } from "react-router-dom";
import "../css/RegisterDonor.css";

const RegisterDonor = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { role, id } = useParams();


  const handleAgreementChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  const handleRegister = async () => {
    if (!isAgreed) {
      alert("You must agree to the terms and conditions before registering.");
      return;
    }

    setIsLoading(true); // Indicate loading
    try {
      const response = await fetch("/register-donor/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, role }),
      });

      if (response.ok) {
        alert("Thank you for registering as a blood donor!");
      } else {
        const errorData = await response.json();
        alert(`Failed to register: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error registering donor:", error);
      alert("An error occurred while registering. Please try again later.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="register-donor">
      <h1 className="heading">Register as a Blood Donor</h1>

      <section className="info-section">
        <h2>Why Donate Blood?</h2>
        <ul>
          <li><strong>Pros:</strong></li>
          <ul>
            <li>Save lives by providing critical support during emergencies.</li>
            <li>Improve cardiovascular health and lower iron levels.</li>
            <li>Boost your sense of purpose and contribute to the community.</li>
          </ul>
          <li><strong>Cons:</strong></li>
          <ul>
            <li>Temporary fatigue or dizziness after donation.</li>
            <li>Minor pain or bruising at the needle site.</li>
            <li>May not be suitable for individuals with certain medical conditions.</li>
          </ul>
        </ul>
      </section>

      <section className="agreement-section">
        <input
          type="checkbox"
          id="agreement"
          checked={isAgreed}
          onChange={handleAgreementChange}
        />
        <label htmlFor="agreement">
          I have read and understood the pros and cons and agree to the terms and conditions.
        </label>
      </section>

      <button
        className={`register-btn ${!isAgreed || isLoading ? "disabled" : ""}`}
        onClick={handleRegister}
        disabled={!isAgreed || isLoading}
      >
        {isLoading ? "Registering..." : "Register as Donor"}
      </button>
    </div>
  );
};

export default RegisterDonor;
