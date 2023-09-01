import LoginPage from "./containers/LoginPage";
import HomePage from "./containers/HomePage";
import ProfilePage from "./containers/ProfilePage";
import InvestPage from "./containers/InvestPage";
import AboutUsPage from "./containers/AboutUsPage";
import EditProfilePage from "./containers/EditProfile";
import EditCompanyPage from "./containers/EditCompany";
import { Route, Routes } from "react-router-dom";
import Route404 from "./containers/Route404";
import SignUpModal from "./containers/SignUpModal";
import SignupPage from "./containers/SignupPage";
import CompanyDetailPage from "./containers/CompanyDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/invest" element={<InvestPage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/edit-profile" element={<EditProfilePage />} />
      <Route path="/edit-company" element={<EditCompanyPage />} />
      <Route path="/company" element={<CompanyDetailPage />} />
      <Route path="/signup-modal" element={<SignUpModal />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Route404 />} />
    </Routes>
  );
}

export default App;
