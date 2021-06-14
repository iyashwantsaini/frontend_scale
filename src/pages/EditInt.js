import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./EditInt.css";

const baseUrl = "http://localhost:5000/";

function EditInt(props) {
  const history = useHistory();

  const [comp, setComp] = useState({
    id: props.match.params.id,
    name1: props.match.params.name1,
    name2: props.match.params.name2,
    start: props.match.params.start.replaceAll(",", "").replaceAll("-", "/"),
    end: props.match.params.end.replaceAll(",", "").replaceAll("-", "/"),
  });

  const onInputchange3 = (event) => {
    setComp({
      ...comp,
      start: event.target.value,
    });
  };

  const onInputchange4 = (event) => {
    setComp({
      ...comp,
      end: event.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { id, name2, name1, start, end } = comp;
    if (start === "" || end === "") {
      alert("Please fill all fields");
      return;
    }
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        email1: name1,
        email2: name2,
        startTime: start,
        endTime: end,
      }),
    };
    fetch(baseUrl + "api/interviews/updateInterview", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.id);
        if (data.data.id === -1) {
          alert("Interviewer Unavailable");
        } else if (data.data.id === -2) {
          alert("Interviewee Unavailable");
        } else {
          alert("Updated successfully");
          window.location.assign(baseUrl + "/");
        }
      });
    // history.goBack();
  };

  return (
    <div className="editint">
      <div>
        <h2 className="section">Edit Interview</h2>
        <form>
          <div className="section">
            <label>Start Time Format: MM/DD/YYYY HH:MM AM/PM</label>
            <input
              type="text"
              value={comp["start"]}
              onChange={onInputchange3}
            />
          </div>
          <div className="section">
            <label>End Time Format: MM/DD/YYYY HH:MM AM/PM</label>
            <input type="text" value={comp["end"]} onChange={onInputchange4} />
          </div>
          <button onClick={submitHandler}>Edit Interview</button>
        </form>
      </div>
    </div>
  );
}

export default EditInt;
