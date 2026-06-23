import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "client" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: "client" | "admin") => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulation d'une base de données en mémoire
const registeredUsers: User[] = [
  {
    id: "1",
    email: "client@test.fr",
    name: "Client Test",
    role: "client"
  }
];

const adminUsers: User[] = [
  {
    id: "admin-1",
    email: "admin@test.fr",
    name: "Admin Test",
    role: "admin"
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Vérifier si l'email existe déjà
    const emailExists = registeredUsers.some(u => u.email === email);
    if (emailExists) {
      return false;
    }

    // Créer le nouvel utilisateur
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      role: "client"
    };

    // L'ajouter à notre "base de données"
    registeredUsers.push(newUser);

    // Connecter automatiquement l'utilisateur
    setUser(newUser);

    return true;
  };

  const login = async (email: string, password: string, role: "client" | "admin"): Promise<boolean> => {
    // Simulation d'authentification
    // Dans une vraie application, vous appelleriez votre API ici

    if (role === "client") {
      // Chercher dans les utilisateurs enregistrés
      const foundUser = registeredUsers.find(u => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        return true;
      }
    } else if (role === "admin") {
      // Chercher dans les admins
      const foundAdmin = adminUsers.find(u => u.email === email);
      if (foundAdmin) {
        setUser(foundAdmin);
        return true;
      }
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
