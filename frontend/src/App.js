// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// import Login from "./pages/Login";
// import AccessData from "./pages/AccessData";
// import DatabaseDashboard from "./pages/DatabaseDashboard";
// import InwardReport from "./pages/InwardReport";
// import HistoryCard from "./pages/HistoryCard";
// import CustomerDashboard from "./pages/CustomerDashboard";
// import CreatePassword from "./pages/CreatePassword";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* Login Page */}
//         <Route
//           path="/"
//           element={<Login />}
//         />

//         {/* MDB Password Page */}
//         <Route
//           path="/access"
//           element={<AccessData />}
//         />

//         {/* Dashboard */}
//         <Route
//           path="/dashboard"
//           element={<DatabaseDashboard />}
//         />

//         {/* Invalid URL Redirect */}
//         <Route
//           path="*"
//           element={<Navigate to="/" />}
//         />


//         <Route
//   path="/inward-report"
//   element={<InwardReport />}
// />



// <Route
//  path="/history-card"
//  element={<HistoryCard />}
// />

// <Route
//   path="/dashboard"
//   element={<CustomerDashboard />}
// />

// <Route
//   path="/create-password"
//   element={<CreatePassword />}
// />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;










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

      </Routes>
    </BrowserRouter>
  );
}

export default App;