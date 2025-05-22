import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
// import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./backend/AuthContext";
import AuthForm from "./components/AuthForm";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Hero />
                <Features />
                <About />
                <CTA />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/register" element={<AuthPage />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
