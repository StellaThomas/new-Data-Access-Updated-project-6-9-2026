     

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import AccessData from "./pages/AccessData";
import CustomerDashboard from "./pages/CustomerDashboard";
import InwardReport from "./pages/InwardReport";
import HistoryCard from "./pages/HistoryCard";
import CreatePassword from "./pages/CreatePassword";
import MasterList from "./pages/MasterList";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Access */}
        <Route
          path="/access"
          element={<AccessData />}
        />

        {/* Customer Dashboard */}
        <Route
          path="/dashboard"
          element={<CustomerDashboard />}
        />

        {/* Inward Report */}
        <Route
          path="/inward-report"
          element={<InwardReport />}
        />

        {/* History Card */}
        <Route
          path="/history-card"
          element={<HistoryCard />}
        />

        {/* Create Password */}
        <Route
          path="/create-password"
          element={<CreatePassword />}
        />

        {/* Invalid URL */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />


        <Route
  path="/master-list"
  element={<MasterList />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;