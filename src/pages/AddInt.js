import React, { useState, useEffect } from "react";
import Select from "react-select";
import moment from "moment";
import "./AddInt.css";

const baseUrl = "http://localhost:5000/";

function AddInt() {
  const [init, setInit] = useState({
    name1: "",
    name2: "",
    start: "",
    end: "",
    selectedOption: null,
    options: [],
    selectedOption2: null,
  });

  let { selectedOption } = init;
  let { selectedOption2 } = init;

  useEffect(() => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    fetch(baseUrl + "api/users/getUsers", {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((result) => {
        const tempArray = [];
        result.data.forEach((element) => {
          tempArray.push({ label: `${element.email}`, value: element.name });
        });
        setInit({
          options: tempArray,
        });
        console.log(tempArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onInputchange3 = (event) => {
    setInit({
      ...init,
      start: event.target.value,
    });
  };

  const onInputchange4 = (event) => {
    setInit({
      ...init,
      end: event.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let { name1, name2, start, end } = init;
    if (name1 === "" || name2 === "" || start === "" || end === "") {
      alert("Please fill all fields");
      return;
    }
    if (name1 === name2) {
      alert("Interview and Interviewee cannot be same");
      return;
    }
    start = moment(start).local().format("MM/DD/YYYY hh:mm A");
    end = moment(end).local().format("MM/DD/YYYY hh:mm A");

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email1: name1,
        email2: name2,
        startTime: start,
        endTime: end,
      }),
    };
    fetch(baseUrl + "api/interviews/insertInterview", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.id);
        if (data.data.id === -1) {
          alert("Interview can't be scheduled!");
          console.log("Interview can't be scheduled!");
        //   alert("Interviewer Unavailable");
        // } else if (data.data.id === -2) {
        //   alert("Interviewee Unavailable");
        } else {
          alert("added successfully");
          window.location.assign(baseUrl + "/");
        }
      });
  };
  const handleChange = (selectedOption) => {
    setInit({ ...init, selectedOption: selectedOption });
    setInit({ ...init, name1: selectedOption.value });
    console.log(`Option selected:`, init["name1"]);
  };
  const handleChange2 = (selectedOption2) => {
    setInit({ ...init, selectedOption2: selectedOption2 });
    setInit({ ...init, name2: selectedOption2.value });
    console.log(`Option selected:`, init["name2"]);
  };

  return (
    <div className="addint">
      <div>
        <h2 className="section">Add Interview</h2>
        <form>
          <div className="section">
            <label>Interviewer Name</label>
            <Select
              className="dropdowns"
              value={selectedOption}
              // placeholder={init["selectedOption"]}
              onChange={handleChange}
              options={init["options"]}
            />
          </div>
          <div className="section">
            <label>Interviewee Name</label>
            <Select
              className="dropdowns"
              value={selectedOption2}
              // placeholder={init["selectedOption2"]}
              onChange={handleChange2}
              options={init["options"]}
            />
          </div>
          <div className="section">
            <label>Start Time </label>
            <input
              type="datetime-local"
              value={init["start"]}
              onChange={onInputchange3}
            />
          </div>
          <div className="section">
            <label>End Time </label>
            <input
              type="datetime-local"
              value={init["end"]}
              onChange={onInputchange4}
            />
          </div>
          <button className="section" onClick={submitHandler}>
            Add Interview
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddInt;
