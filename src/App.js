import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
// import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./backend/AuthContext";
import AuthForm from "./components/AuthForm";
import Dashboard from "./pages/Dashboard";
import AddInvoice from "./pages/AddInvoice";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="bghero">
                  <Hero />
                  <Features />
                </div>

                <div className="bgfooter">
                  <About />
                  <CTA />
                  <Footer />
                </div>
              </>
            }
          />

          <Route path="/login" element={<AuthForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/register" element={<AuthPage />} /> */}
          {/* <Route path="/add-invoice" element={<AddInvoice />} /> */}
          <Route path="/invoice/add" element={<AddInvoice mode="add" />} />
          <Route
            path="/invoice/:id/view"
            element={<AddInvoice mode="view" />}
          />
          <Route
            path="/invoice/:id/edit"
            element={<AddInvoice mode="edit" />}
          />
          <Route
            path="/invoice/:id/delete"
            element={<AddInvoice mode="delete" />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
