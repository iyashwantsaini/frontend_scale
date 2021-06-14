import React, { useState, useEffect } from "react";
import "./EditInt.css";

const baseUrl = "http://localhost:5000/";

function AccInt(props) {
  const [comp, setComp] = useState({
    id: props.match.params.id,
    email: props.match.params.email,
  });

  const [mess,setMess]=useState("");

  useEffect(() => {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    const resturl="api/interviews/accessinterview/"+props.match.params.id+"/"+props.match.params.email;
    fetch(baseUrl + resturl, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        let email1=result.data[0]["email1"];
        let email2=result.data[0]["email2"];

        if(email1===comp.email||email2===comp.email){
            setMess(`Welcome : ${comp.email}`)
        }else{
            setMess(`Not Allowed!`)
        }

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="editint">
      <div>
        {mess}
      </div>
    </div>
  );
}

export default AccInt;
