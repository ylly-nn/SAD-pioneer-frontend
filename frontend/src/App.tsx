import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ProtectedRoute, ProtectedRouteUsers, ProtectedRouteOrganizations, HomeRouteUsers, HomeRouteOrganizations } from "./components/ProtectedRoute";

import Home from "./pages/Home/HomePage";
import NotFound from "./pages/NotFound/NotFoundPage";

import UserProfile from "./pages/user/Profile/ProfilePage";
import UserLogin from "./pages/user/Login/LoginPage";
import UserRegister from "./pages/user/Register/RegisterPage";
import UserVerify from "./pages/user/Register/VerifyPage";
import UserSelectService from "./pages/user/service/SelectService/SelectServicePage";
import UserSelectOrganization from "./pages/user/service/SelectOrganization/SelectOrganizationPage";
import UserSelectDetails from "./pages/user/service/SelectDetails/SelectDetailsPage";
import UserSelectTime from "./pages/user/service/SelectTime/SelectTimePage";
import UserConfirm from "./pages/user/service/Confirm/ConfirmPage";

import OrganizationProfile from "./pages/organization/profile/ProfilePage";
import OrganizationLogin from "./pages/organization/Login/LoginPage";
import OrganizationRegister from "./pages/organization/Register/RegisterPage";
import OrganizationEditForm from "./pages/organization/EditForm/EditFormPage";
import OrganizationViewForm from "./pages/organization/ViewForm/ViewFormPage";
import OrganizationBranch from "./pages/organization/brabch/Branch/BranchPage";
import OrganizationBranchForm from "./pages/organization/brabch/BranchForm/BranchFormPage";

import AdminFormsList from "./pages/admin/FormsList/FormsListPage";
import AdminFormView from "./pages/admin/FormView/FormViewPage";

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Home /> } />

        <Route path="/user">
        <Route index element={<ProtectedRoute> <UserProfile /> </ProtectedRoute>}/>
          <Route path="login" element={<HomeRouteUsers> <UserLogin /> </HomeRouteUsers>} />
          <Route path="register" element={<HomeRouteUsers> <UserRegister /> </HomeRouteUsers>} />
          <Route path="verify" element={<HomeRouteUsers> <UserVerify /> </HomeRouteUsers>} />
          <Route path="service"> 
            <Route index element={<ProtectedRouteUsers> <UserSelectService /> </ProtectedRouteUsers>}/>
            <Route path="select-organization" element={<ProtectedRouteUsers> <UserSelectOrganization /> </ProtectedRouteUsers>} />
            <Route path="details" element={<ProtectedRouteUsers> <UserSelectDetails /> </ProtectedRouteUsers>} />
            <Route path="select-time" element={<ProtectedRouteUsers> <UserSelectTime /> </ProtectedRouteUsers>} />
            <Route path="confirm" element={<ProtectedRouteUsers> <UserConfirm /> </ProtectedRouteUsers>} />
          </Route>
        </Route>

        <Route path="/organization">
        <Route index element={<ProtectedRoute> <OrganizationProfile /> </ProtectedRoute>}/>
          <Route path="login" element={<HomeRouteOrganizations> <OrganizationLogin /> </HomeRouteOrganizations>} />
          <Route path="register" element={<HomeRouteOrganizations> <OrganizationRegister /> </HomeRouteOrganizations>} />
          <Route path="create-form" element={<ProtectedRouteOrganizations> <OrganizationEditForm /> </ProtectedRouteOrganizations>} />
          <Route path="view-form" element={<ProtectedRouteOrganizations> <OrganizationViewForm /> </ProtectedRouteOrganizations>} />
          <Route path="branch" element={<ProtectedRouteOrganizations> <OrganizationBranch /> </ProtectedRouteOrganizations>} />
          <Route path="branch-form" element={<ProtectedRouteOrganizations> <OrganizationBranchForm /> </ProtectedRouteOrganizations>} />
        </Route>

        <Route path="/admin">
          <Route path="forms" element={<ProtectedRoute> <AdminFormsList /> </ProtectedRoute>} />
          <Route path="form/:id" element={<ProtectedRoute> <AdminFormView /> </ProtectedRoute>} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
