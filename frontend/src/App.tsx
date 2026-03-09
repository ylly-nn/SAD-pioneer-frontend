import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/HomePage";
import NotFound from "./pages/NotFound/NotFoundPage";

import UserLogin from "./pages/user/Login/LoginPage";
import UserRegister from "./pages/user/Register/RegisterPage";
import UserSelectService from "./pages/user/service/SelectService/SelectServicePage";
import UserSelectOrganization from "./pages/user/service/SelectOrganization/SelectOrganizationPage";
import UserSelectDetails from "./pages/user/service/SelectDetails/SelectDetailsPage";
import UserSelectTime from "./pages/user/service/SelectTime/SelectTimePage";
import UserConfirm from "./pages/user/service/Confirm/ConfirmPage";

import OrganizationLogin from "./pages/organization/Login/LoginPage";
import OrganizationRegister from "./pages/organization/Register/RegisterPage";
import OrganizationViewForm from "./pages/organization/ViewForm/ViewFormPage";

import AdminFormsList from "./pages/admin/FormsList/FormsListPage";
import AdminFormView from "./pages/admin/FormView/FormViewPage";

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/user">
          <Route path="login" element={<UserLogin />} />
          <Route path="register" element={<UserRegister />} />
          <Route path="service">
            <Route index element={<UserSelectService />}/>
            <Route path="select-organization" element={<UserSelectOrganization />} />
            <Route path="details" element={<UserSelectDetails />} />
            <Route path="select-time" element={<UserSelectTime />} />
            <Route path="confirm" element={<UserConfirm />} />
          </Route>
        </Route>

        <Route path="/organization">
          <Route path="login" element={<OrganizationLogin />} />
          <Route path="register" element={<OrganizationRegister />} />
          <Route path="view-form" element={<OrganizationViewForm />} />
        </Route>

        <Route path="/admin">
          <Route path="forms" element={<AdminFormsList />} />
          <Route path="form/:id" element={<AdminFormView />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
