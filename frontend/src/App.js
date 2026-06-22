import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import AccessData from "./pages/AccessData";
import DatabaseDashboard from "./pages/DatabaseDashboard";
import InwardReport from "./pages/InwardReport";
import HistoryCard from "./pages/HistoryCard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Page */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* MDB Password Page */}
        <Route
          path="/access"
          element={<AccessData />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<DatabaseDashboard />}
        />

        {/* Invalid URL Redirect */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />


        <Route
  path="/inward-report"
  element={<InwardReport />}
/>



<Route
 path="/history-card"
 element={<HistoryCard />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;