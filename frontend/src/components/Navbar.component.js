import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell, faUser, faSignOutAlt, faHandHoldingWater, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "../css/Navbar.css"
import logo from "../static/Hospify.png"



const Navbar = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const role = pathSegments[2]; // Extract role from the URL
    const id = pathSegments[3]; // Extract ID from the URL

    const handleLogout = () => {
        console.log("Logged out");
        window.location.href = '/login'; // Redirect to login page
    };

    const renderNavbarContent = () => {
    const common = () => {
        return (
            <>
                <Link to={`/search/${role}/${id}`}>
                    <FontAwesomeIcon icon={faSearch} size="lg" />
                </Link>

                {/* Notification Link */}
                <Link to={`/notifications/${role}/${id}`}>
                    <FontAwesomeIcon icon={faBell} size="lg" />
                </Link>

                <Link to={`/profile/${role}/${id}`}>
                    <FontAwesomeIcon icon={faUser} size="lg" />
                </Link>

                <button onClick={handleLogout} className="logout-button">
                    <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                </button>
            </>
        );
    };

    if (role === 'Patient') {
        return (
            <>
                <Link to={`/RegisterDonor/${role}/${id}`}>
                    <FontAwesomeIcon icon={faHandHoldingWater} size="lg" />
                </Link>
                <Link to={`/Cart/${role}/${id}`}>
                    <FontAwesomeIcon icon={faCartShopping} size="lg" />
                </Link>
                {common()}
            </>
        );
    } else if (role === 'Doctor') {
        return <>{common()}</>;
    } else if (role === 'Staff') {
        return (
            <>
                <Link to={`/post-medicine/${role}/${id}`}>Post Medicine</Link>
                {common()}
            </>
        );
    } else {
        return null;
    }
};


    return (
        <header className="navbar-container">
            <div className="navbar">
                <Link to="/login" className="logo">
                <img src={logo} alt="GigStream Logo" style={{ height: "50px" }} />
                </Link>
                <nav>
                    {renderNavbarContent()}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
