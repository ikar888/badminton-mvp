import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Outlet } from "react-router";
import Navbar from "../components/Navbar";

const Root = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
