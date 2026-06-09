import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import AccessData from "./pages/AccessData";
import DatabaseDashboard from "./pages/DatabaseDashboard";

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;