import {BrowserRouter, Routes, Route} from 'react-router-dom'


//pages and components
import Home from './pages/Home.page'
import Signup from './pages/Signup.page'
import Navbar from './components/Navbar.component'
import Profile from './pages/Profile.page'
import Login from './pages/Login.Page'
import ForgotPassword from './pages/ForgotPass.page'
import OtpVerification from './pages/OTPverification.page'
// import Medicinesearch from './pages/SearchMedicine.page'
// import Doctorsearch from './pages/SearchDoctor.page'
import Search from './pages/Search.page'
import PostMedicine from './pages/PostMedicine.page'
import MedicineDetails from './pages/MedicineDetails.page'
import DoctorDetails from './pages/DoctorDetails.page'
import RegisterDonor from './pages/RegisterDonor.page'
import CartPage from './pages/Cart.page'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div className="pages">
          <Routes>
            <Route
              path="/home"
              element={<Home/>}
            />
            <Route
              path="/signup"
              element={<Signup/>}
            />
            <Route
              path="/forgot-password"
              element={<ForgotPassword/>}
            />
            <Route
              path="/otpverify"
              element={<OtpVerification/>}
            />
            <Route
              path="/profile/:role/:id"
              element={<Profile/>}
            />
            <Route
              path="/search/:role/:id"
              element={<Search/>}
            />
            <Route
              path="/Cart/:role/:id"
              element={<CartPage/>}
            />
            <Route
              path="/search/:role/:id/details/medicine/:MedicineName"
              element={<MedicineDetails/>}
            />
            <Route
              path="/search/:role/:id/details/doctor/:DoctorId"
              element={<DoctorDetails/>}
            />
            <Route
              path="/post-medicine/:role/:id"
              element={<PostMedicine/>}
            />
            <Route
              path="/RegisterDonor/:role/:id"
              element={<RegisterDonor/>}
            />
            
             <Route
              path="/login"
              element={<Login/>}
            />
            <Route
              path="/"
              element={<Login/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
