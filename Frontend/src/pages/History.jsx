import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

import "../History.css";

function History() {
  const { getHistoryOfUser } = useContext(AuthContext);

  const [meetings, setMeetings] = useState([]);

  const route = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistory();
  }, []);

  console.log(meetings);
  let formatDate = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate().toString().padStart(2, "0");
    let month = date.getMonth().toString().padStart(2, "0");
    let year = date.getFullYear().toString().padStart(2, "0");

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="historyBigContainer">
      <div className="historyNav">
        <h1>History</h1>
        <h3 onClick={() => route("/home")} className="homeBtn">
          <span class="material-symbols-outlined">home</span>Home
        </h3>
      </div>
      <div className="historyContainer">
        {meetings.map((item, index) => {
          return (
            <div key={index} className="historyInfo">
              <p>Meeting Code: {item.meetingCode}</p>
              <p>Username: {item.userId}</p>
              <p>Date: {formatDate(item.date)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default History;
