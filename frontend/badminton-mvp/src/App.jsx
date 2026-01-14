import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import Root from "./utils/Root";
import HomePage from "./pages/HomePage";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
