import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import UserCard from "../userCard/userCard";
import "./employee.css";
import { useSelector,useDispatch } from "react-redux";
import { deleteEmployee , fetchEmployees } from "./employeeSlice";

const Employee = () => {
  const [search, setSearch] = useState("");
  const dispatch=useDispatch();
    const { responseStatus,error,employees} = useSelector((state) => state.employees);
  // const [employees, setEmployees] = useState({
  //   responseStatus: "pending",
  //   response: [],
  // });
  const [sorted, setSorted] = useState("nosort");
  const navigate = useNavigate(); 

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };

  // useEffect(() => {
  //   fetchEmployees();
  // }, []);

  if (responseStatus === "pending") return <div>Loading...</div>;
  if (responseStatus === "rejected")
    return (
      <div>
        Error :{error}
        <button onClick={()=>dispatch(fetchEmployees)}>Retry</button>
      </div>
    );

  const searchedData = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortData = () => {
    if (sorted === "nosort") {
      return searchedData;
    }
    const sortedData = [...searchedData].sort((a, b) =>
      sorted === "ascending"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    return sortedData;
  };

  const sortedData = sortData();

  const sorts = () => {
    if (sorted === "nosort") {
      setSorted("ascending");
    } else if (sorted === "ascending") {
      setSorted("descending");
    } else if (sorted === "descending") {
      setSorted("nosort");
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => navigate("createemployee")}>
          Create Employee
        </button>
        <button onClick={dispatch(fetchEmployees)}>Reload</button>
        <button onClick={sorts}>{sorted}</button>
      </div>
      <input
        placeholder="Search by name"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        style={{ margin: "5px 0", padding: "8px", width: "200px" }}
      />

      {employees.length > 0 && sortedData.length > 0 ? (
        sortedData.map((employee) => (
          <UserCard
            key={employee.id}
            employee={employee}
            deleteEmployee={handleDelete}
          />
        ))
      ) : (
        <div>No employees found.</div>
      )}
    </div>
  );
};

export default Employee;
