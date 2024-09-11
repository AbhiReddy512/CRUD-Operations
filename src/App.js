import React from "react";
import Employee from "./container/employee/employee";
import Counter from "./container/counter/counter";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Create from "./container/employee/create/create";
import './App.css'
import { Provider } from "react-redux";
import { store } from "./container/store/store";
const App = React.memo(() => {
  console.log("app");
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
      <div className="main">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/employee">Employee</Link>
            </li>
            <li>
              <Link to="/counter">Counter</Link>
            </li>
          </ul>
        </nav>
        </div>
        <Routes>
          <Route path="/" element={<h1 className="element">Welcome to the App</h1>} />
          <Route path="/employee" element={<Employee />} />
          <Route path="employee/createemployee" element={<Create />} />
          <Route path="/counter" element={<Counter />} />
        </Routes>
      </div>
    </Router>
    </Provider>
  );
});

export default App;
