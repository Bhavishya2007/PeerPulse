import {
  createContext,
  useContext,
  useState
} from "react";

import {
  login as loginApi
} from "../services/authApi";


const AuthContext =
  createContext(null);


export function AuthProvider({
  children
}) {

  const [user, setUser] = useState(
    () => {

      const stored =
        localStorage.getItem(
          "peerpulse_user"
        );

      return stored
        ? JSON.parse(stored)
        : null;

    }
  );


  const [loading, setLoading] =
    useState(false);


  async function login(
    email,
    password
  ) {

    setLoading(true);


    try {

      const data =
        await loginApi(
          email,
          password
        );


      localStorage.setItem(
        "peerpulse_token",
        data.access_token
      );


      localStorage.setItem(
        "peerpulse_user",
        JSON.stringify(
          data.user
        )
      );


      setUser(data.user);


      return data;

    }

    finally {

      setLoading(false);

    }

  }


  function logout() {

    localStorage.removeItem(
      "peerpulse_token"
    );

    localStorage.removeItem(
      "peerpulse_user"
    );


    setUser(null);

  }


  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}


export function useAuth() {

  return useContext(
    AuthContext
  );

}