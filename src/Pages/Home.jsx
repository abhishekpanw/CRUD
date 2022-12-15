import React, { useEffect, useState } from "react";
import "./Home.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

export const Home = () => {
  const [filter, setFilter] = useState("");

  const [employeeData, setEmployeeData] = useState([
    {
      employee: "Abhishek Panwar",
      departments: "React",
      salary: "20000",
    },
  ]);
  const [result, setResult] = useState(employeeData);
  const [fields, setFields] = useState({
    employee: "",
    departments: "",
    salary: "",
  });

  useEffect(() => {
    setResult(employeeData);
  }, [employeeData]);

  useEffect(() => {
    if (filter == "0") {
      setResult(
        employeeData.sort(function (a, b) {
          return a.salary - b.salary;
        })
      );
    } else if (filter == "1") {
      setResult(
        employeeData.sort(function (a, b) {
          return b.salary - a.salary;
        })
      );
    } else {
      setResult(
        employeeData.filter((item, idx) => item.departments.includes(filter))
      );
    }
  }, [filter]);

  const [error, setError] = useState({
    employee: "",
    departments: "",
    salary: "",
  });

  const handleDepartmentFilter = (e) => {
    const { value } = e.target;
    setFilter(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const handleSelect = (e) => {
    const { value } = e.target;
    setFilter(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fields.hasOwnProperty("idx")) {
      setEmployeeData((prev) => {
        prev[fields.idx] = fields;
        delete fields.idx;
        return prev;
      });
    } else {
      setEmployeeData((prev) => {
        return [...prev, fields];
      });
    }
    setFields({ employee: "", departments: "", salary: "" });
  };

  const handleDelete = (idx) => {
    setEmployeeData((prev) => {
      prev.splice(idx, 1);
      return [...prev];
    });
  };

  const handleClean = () => {
    setFields({ employee: "", departments: "", salary: "" });
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "employee":
          if (!value) {
            stateObj[name] = "Required";
          }
          break;

        case "departments":
          if (!value) {
            stateObj[name] = "Required";
          }
        case "salary":
          if (!value) {
            stateObj[name] = "Required";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  return (
    <div className="App-header">
      {" "}
      <div className="create-style">
        <h1>Create Employee</h1>
        <Form className="form-style" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Employees Name </Form.Label>
            <Form.Control
              type="text"
              placeholder="Employee"
              name="employee"
              value={fields.employee}
              onBlur={validateInput}
              onChange={(e) => handleChange(e)}
            />
            {error.employee && <span className="err">{error.employee}</span>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Departments</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="departments"
              placeholder="Departments"
              value={fields.departments}
              onBlur={validateInput}
              onChange={(e) => handleChange(e)}
            />
            {error.departments && (
              <span className="err">{error.departments}</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Salary </Form.Label>
            <Form.Control
              type="number"
              placeholder="Salary"
              name="salary"
              value={fields.salary}
              onBlur={validateInput}
              onChange={(e) => handleChange(e)}
            />
            {error.salary && <span className="err">{error.salary}</span>}
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="primary" type="button" onClick={() => handleClean()}>
            Cancel
          </Button>
        </Form>
      </div>
      <div className="create-style-table">
        <h1>Table Employee</h1>
        <input
          type="text"
          placeholder="department"
          className="departmentWise"
          onChange={(e) => handleDepartmentFilter(e)}
        />
        <select className="custom-select" onChange={(e) => handleSelect(e)}>
          <option>Select Salary Range:</option>
          <option value="1">Highest Salary</option>
          <option value="0">Lowest Salary</option>
        </select>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Employees Name </th>
              <th>Departments</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {result.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td key={idx}>{idx + 1}</td>
                  <td>{item.employee}</td>
                  <td>{item.departments}</td>
                  <td>{item.salary}</td>
                  <button
                    className="primary"
                    onClick={() =>
                      setFields({
                        idx,
                        ...employeeData[idx],
                      })
                    }
                  >
                    Update
                  </button>{" "}
                  <button className="danger" onClick={() => handleDelete(idx)}>
                    Delete
                  </button>{" "}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
