import React from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ({ employee, deleteEmployee }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={employee.avatar}
          alt={`${employee.name}'s avatar`}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
        <div>
          <h3>{employee.name}</h3>
          <p>ID: {employee.id}</p>
          <p>Created At: {new Date(employee.createdAt).toLocaleString()}</p>
        </div>
      </div>
      <button
        onClick={() => deleteEmployee(employee.id)}
        style={{
          padding: "5px 10px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Delete
      </button>
      <button onClick={() => navigate(`createemployee/?id=${employee.id}`)}>
        Modify
      </button>
    </div>
  );
};

export default UserCard;
