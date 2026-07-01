import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { AddPage } from "./pages/AddPage.jsx";
import { Home } from "./pages/Home.jsx";
import { ListPage } from "./pages/ListPage.jsx";
import { Login } from "./pages/Login.jsx";
import { ReportPage } from "./pages/ReportPage.jsx";
import { UpdatePage } from "./pages/UpdatePage.jsx";

function RequireLogin({ children }) {
  return sessionStorage.getItem("tourismLoggedIn") === "true" ? children : <Navigate to="/login" replace />;
}

export function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<RequireLogin><Home /></RequireLogin>} />
          <Route path="/login" element={<Login />} />
          <Route path="/list" element={<RequireLogin><ListPage /></RequireLogin>} />
          <Route path="/add" element={<RequireLogin><AddPage /></RequireLogin>} />
          <Route path="/update" element={<RequireLogin><UpdatePage /></RequireLogin>} />
          <Route path="/report" element={<RequireLogin><ReportPage /></RequireLogin>} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
