import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { HomeRoute, ProtectedRoute, ProtectedRouteNoOrganizations, ProtectedRouteOrganizations, ProtectedRouteOrganizationsRequest } from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute"
import Home from "./pages/Home/HomePage";
import NotFound from "./pages/NotFound/NotFoundPage";

import UserProfile from "./pages/user/Profile/ProfilePage";
import UserLogin from "./pages/auth/Login/LoginPage";
import UserRegister from "./pages/auth/Register/RegisterPage";
import UserVerify from "./pages/auth/Register/VerifyPage";
import UserSelectService from "./pages/user/service/SelectService/SelectServicePage";
import UserSelectOrganization from "./pages/user/service/SelectOrganization/SelectOrganizationPage";
import UserSelectDetails from "./pages/user/service/SelectDetails/SelectDetailsPage";
import UserSelectTime from "./pages/user/service/SelectTime/SelectTimePage";
import UserConfirm from "./pages/user/service/Confirm/ConfirmPage";
import UserOrder from "./pages/user/Order/OrderPage";

import OrganizationProfile from "./pages/organization/profile/ProfilePage";
import OrganizationEditForm from "./pages/organization/EditForm/EditFormPage";
import OrganizationViewForm from "./pages/organization/ViewForm/ViewFormPage";
import OrganizationBranch from "./pages/organization/branch/Branch/BranchPage";
import ServiceFormPage from "./pages/organization/branch/ServiceForm/ServiceFormPage";
import ServiceDetailPage from "./pages/organization/branch/ServiceDetail/ServiceDetailPage";
import OrganizationBranchForm from "./pages/organization/branch/BranchForm/BranchFormPage";

import OrganizationBranches from "./pages/organization/OrganizationBranches/OrganizationBranchesPage";
import OrganizationOrders from "./pages/organization/OrganizationOrders/OrganizationOrdersPage";

import AdminFormView from "./pages/admin/FormView/FormViewPage";

import AdminDashboardPage from "./pages/admin/AdminDashboard/AdminDashboardPage";
import AdminRequestsPage from "./pages/admin/AdminRequests/AdminRequestsPage";
import AddAdmin from "./pages/admin/AddAdminPage/AddAdminPage";
import ForgotPasswordPage from "./pages/auth/ForgotPassword/ForgotPasswordPage";
import AddOrganizationUserPage from "./pages/organization/AddOrganizationUser/AddOrganizationUserPage";

const App = () => {
  
  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={ <Home /> } />

        <Route path="login" element={<HomeRoute> <UserLogin /> </HomeRoute>} />
        <Route path="register" element={<HomeRoute> <UserRegister /> </HomeRoute>} />

        <Route path="verify" element={<HomeRoute> <UserVerify /> </HomeRoute>} />
        <Route path="forgot-password" element={<HomeRoute> <ForgotPasswordPage /> </HomeRoute>}/>


        <Route path="/user">
        <Route index element={<ProtectedRoute> <UserProfile /> </ProtectedRoute>}/>
          <Route path="order/:id" element={<ProtectedRoute> <UserOrder /> </ProtectedRoute>} />

          <Route path="service"> 
            <Route index element={<ProtectedRoute> <UserSelectService /> </ProtectedRoute>}/>
            <Route path="select-organization" element={<ProtectedRoute> <UserSelectOrganization /> </ProtectedRoute>} />
            <Route path="details" element={<ProtectedRoute> <UserSelectDetails /> </ProtectedRoute>} />
            <Route path="select-time" element={<ProtectedRoute> <UserSelectTime /> </ProtectedRoute>} />
            <Route path="confirm" element={<ProtectedRoute> <UserConfirm /> </ProtectedRoute>} />
          </Route>

        </Route>

        <Route path="/organization">
        <Route index element={<ProtectedRoute> <OrganizationProfile /> </ProtectedRoute>}/>
          
          <Route path="create-form" element={<ProtectedRouteNoOrganizations> <OrganizationEditForm /> </ProtectedRouteNoOrganizations>} />
          <Route path="view-form" element={<ProtectedRouteOrganizationsRequest> <OrganizationViewForm /> </ProtectedRouteOrganizationsRequest>} />

          <Route path="orders" element={<ProtectedRouteOrganizations> <OrganizationOrders /> </ProtectedRouteOrganizations>} />

          <Route path="branches" element={<ProtectedRouteOrganizations> <OrganizationBranches /> </ProtectedRouteOrganizations>} />
          <Route path="branch/:id" element={<ProtectedRouteOrganizations> <OrganizationBranch /> </ProtectedRouteOrganizations>} />
          <Route path="branch/:id/service" element={<ProtectedRouteOrganizations> <ServiceFormPage /> </ProtectedRouteOrganizations>} />
          <Route path="branch/:id/service/:serviceId" element={<ProtectedRouteOrganizations> <ServiceDetailPage /> </ProtectedRouteOrganizations>} />
          <Route path="branch/form" element={<ProtectedRouteOrganizations> <OrganizationBranchForm /> </ProtectedRouteOrganizations>} />

          <Route path="add-user" element={<ProtectedRouteOrganizations> <AddOrganizationUserPage /> </ProtectedRouteOrganizations>} />
        </Route>


        <Route path="/admin">

        <Route index element={
            <ProtectedAdminRoute> 
            <AdminDashboardPage /> 
            </ProtectedAdminRoute>} />
            
          
          <Route path="form/:id" element={
            <ProtectedAdminRoute> 
            <AdminFormView /> 
            </ProtectedAdminRoute>} />


          <Route path="requests" element={
            <ProtectedAdminRoute> 
            <AdminRequestsPage /> 
            </ProtectedAdminRoute>} />
          
          <Route path="view-form" element={<ProtectedRouteOrganizations> <OrganizationViewForm /> </ProtectedRouteOrganizations>} />
          
          <Route path="add-admin" element={
            <ProtectedAdminRoute> 
            <AddAdmin /> 
            </ProtectedAdminRoute>} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
