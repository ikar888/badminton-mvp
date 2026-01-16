import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Root from "./utils/Root";
import HomePage from "./pages/HomePage";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import AboutPage from "./pages/AboutPage";
import CreateSession from "./pages/CreateSession";
import JoinSession from "./pages/JoinSession";

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
         /></Routes>
    </Router>
  );
}

export default App;
