import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Employee from "../employee";

// const [name ,setName] = useState("")
// const [avatar ,setAvatar] = useState("")
// const navigate = useNavigate();

export default function create() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();



  const submit = async () => {
    try {
      const response = await fetch(
        "https://66c05c6eba6f27ca9a566426.mockapi.io/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            avatar: avatar,
          }),
        }
      );
      console.log("3")

      // if (response.status !== 200) {
      //   throw new Error("Failed to add employee");
      // }
      console.log("2")
      const data = await response.json();

     setAvatar("");
     console.log("1")
     setName("");
      navigate("/Employee")
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <input
        placeholder="Avatar Url"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      ></input>
      <button onClick={submit}>Submit</button>
    </div>
  );
}
