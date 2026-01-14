import { createContext, useState, useContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = Cookies.get("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData, token) => {
    setUser(userData);
    Cookies.set("user", JSON.stringify(userData), { expires: 1 });
    Cookies.set("token", token, { expires: 1 });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("user");
    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
