import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "http-status";
import axios from "axios";

export const AuthContext = React.createContext({});
const client = axios.create({
  baseURL: "https://video-conferencing-191z-14vv46puq-shivams-projects-58d8c9fe.vercel.app/api/v1/user",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AuthProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const router = useNavigate();

  const signupHandler = async (name, username, password) => {
    try {
      let response = await client.post("/register", {
        name,
        username,
        password,
      });
      return response;
    } catch (error) {
      return error;
    }
  };

  const loginHandler = async (username, password) => {
    try {
      let response = await client.post("/login", {
        username,
        password,
      });
      if (response.status === http.OK) {
        setUserData(response.data.user);
        localStorage.setItem("token", response.data.token);
        return response;
      }
    } catch (error) {
      return error;
    }
  };

  const getHistoryOfUser = async () => {
    try {
      let request = await client.get("/get_all_activity", {
        params: {
          token: localStorage.getItem("token"),
        },
      });

      return request.data;
    } catch (error) {
      throw error;
    }
  };

  const addToHistory = async (meetingCode) => {
    try {
      let request = await client.post("/add_to_activity", {
        token: localStorage.getItem("token"),
        meeting_code: meetingCode,
      });

      return request;
    } catch (error) {
      throw error;
    }
  };

  const data = {
    router,
    userData,
    setUserData,
    signupHandler,
    loginHandler,
    getHistoryOfUser,
    addToHistory,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
