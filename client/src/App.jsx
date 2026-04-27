import {Routes,Route} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import AdminLogin from "./pages/admin/Login.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ProjectForm from "./pages/admin/ProjectForm.jsx";

function App() {
  return (
    <AuthProvider>
       <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/project/new" element={<ProjectForm />} />
        <Route path="/admin/project/edit/:id" element={<ProjectForm />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
