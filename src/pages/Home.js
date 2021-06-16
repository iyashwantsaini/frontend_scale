import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";

const baseUrl = "http://localhost:5000/";

function Home() {
  const [users, setUsers] = useState([]);

  const fetchAllRecords = () => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch(baseUrl + "api/interviews/allInterviews", {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.data);
        setUsers(result.data);
        localStorage.setItem("users", JSON.stringify(result.data));
        console.log(result.data);
      })
      .catch((error) => {
        let collection = localStorage.getItem("users");
        setUsers(JSON.parse(collection));
      });
  };

  useEffect(() => {
    fetchAllRecords();
  }, []);

  const deleteRecord = (id) => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch(baseUrl + "api/interviews/deleteInterview/" + id, {
      method: "DELETE",
      headers: headers,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        fetchAllRecords();
      })
      .catch((error) => console.log(error));
  };

  const sort_by_key = (array, key) => {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  };

  useEffect(() => {
    // fetchAllRecords();
  }, [users]);

  const sortFn = (typesort) => {
    if (typesort === "interviewer") {
      //sorting here
      let newusers = sort_by_key(users, "email1");
      setUsers(newusers);
      console.log("users=>",users);
    } else if (typesort === "interviewee") {
      //sorting here
      let newusers = sort_by_key(users, "email2");
      console.log(newusers);
      setUsers(newusers);
    }
  };

  return (
    <div className="home">
      <div>
        <h1>All Interviews</h1>
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col" onClick={() => sortFn("interviewer")}>
                Interviewer Email
              </th>
              <th scope="col" onClick={() => sortFn("interviewee")}>
                Interviewee Email
              </th>
              <th scope="col">Start Time</th>
              <th>End Time</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <th scope="row">{user.email1.split("(")[0]}</th>
                <th scope="row">{user.email2.split("(")[0]}</th>
                <th scope="row">{new Date(user.startTime).toLocaleString()}</th>
                <th scope="row">{new Date(user.endTime).toLocaleString()}</th>
                <th>
                  <Link
                    to={
                      "/editinterview/" +
                      user.id +
                      "/" +
                      user.email1.split("(")[0] +
                      "/" +
                      user.email2.split("(")[0] +
                      "/" +
                      new Date(user.startTime)
                        .toLocaleString()
                        .replaceAll("/", "-")
                        .split(",") +
                      "/" +
                      new Date(user.endTime)
                        .toLocaleString()
                        .replaceAll("/", "-")
                        .split(",")
                    }
                  >
                    {" "}
                    <Button variant="info">Edit</Button>
                  </Link>
                </th>
                <th>
                  <Button
                    variant="danger"
                    onClick={() => deleteRecord(user.id)}
                  >
                    Delete
                  </Button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Home;
