import React from "react";
import AboutUsPage from "./pages/AboutUsPage";
// import "./assets/css/style.css";
import "./assets/css/main.css";
import Header from "./components/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserPage from "./pages/UserPage";
import UserDetailsPage from "./components/UserDetailsPage";
import HobbiesPage from "./pages/HobbiesPage";
import AddSubscriptionPage from "./pages/AddSubscriptionPage";
import CmsManagePage from "./pages/CmsManagePage";
import DataEntryPage from "./pages/DataEntryPage";
import PaymentManagementPage from "./pages/PaymentManagementPage";
import AccountSettingsPage from "./pages/AccountSettingsPage";
import SupportPage from "./pages/SupportPage";
import FAQPage from "./pages/FAQPage";
import LoginPage from "./pages/LoginPage";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const location = useLocation();

  return (
    <div className="app">
      {location.pathname !== "/login" && <Header />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/user-details/:userId" element={<UserDetailsPage />} />
        <Route path="/hobbies" element={<HobbiesPage />} />
        <Route path="/subscription" element={<AddSubscriptionPage />} />
        <Route path="/cms-manage" element={<CmsManagePage />} />
        <Route path="/data-entry" element={<DataEntryPage />} />
        <Route path="/payment-management" element={<PaymentManagementPage />} />
        <Route path="/account-settings" element={<AccountSettingsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
