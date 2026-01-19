import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import Root from "./utils/Root";
import HomePage from "./pages/HomePage";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import AboutPage from "./pages/AboutPage";
import CreateSession from "./pages/CreateSession";
import ProfilePage from "./pages/ProfilePage";
import JoinSession from "./pages/JoinSession";
import PaymentPage from "./pages/PaymentPage";

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
        <Route
          path="/create-session"
          element={
            <ProtectedRoutes>
              <CreateSession />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/join-session"
          element={
            <ProtectedRoutes>
              <JoinSession />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <ProfilePage />
            </ProtectedRoutes>
          }
        ></Route>
                <Route
          path="/payment"
          element={
            <ProtectedRoutes>
              <PaymentPage />
            </ProtectedRoutes>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
