import React, { useState, useEffect } from "react";
import "./App.css";
import "antd/dist/antd.css";
import "./css/hospital.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Role from "./config/Role";
import axios from "./config/axios";
import Nav from "./components/Nav";
import _ from "lodash";

function App() {
  const [user, setUser] = useState("guest");
  const [department, setDepartment] = useState();
  const [hospital, setHospital] = useState();
  const [request, setRequest] = useState();

  const [indexDefaultFilter, setIndexDefaultFilter] = useState(0);

  const fetchData = async () => {
    const result = await axios.get(
      "/departments?non_accept=1&included_request=1"
    );

    setDepartment(result.data);
  };

  const fetchDataHospital = async () => {
    const resultHospital = await axios.get("/hospitals/non_accepts/0");
    setHospital(resultHospital.data);
  };

  const fetchDataRequest = async (region) => {
    let resultRequest;

    if (region) {
      resultRequest = await axios.get(`/requests/name?region=${region}`);
    } else {
      resultRequest = await axios.get(`/requests/name`);
    }

    const mapResultRequest = resultRequest.data?.map((row) => {
      const dataDate = row.createdAt.split("T", 1).toString();
      return {
        id: row.id,
        requestAmount: row.request_amount,
        reserveAmount: row.reserve_amount,
        deliveredAmount: row.delivered_amount,
        hospital: row.MedicalStaff.Hospital.hospital,
        date: dataDate,
        isUrgent: row.isUrgent,
      };
    });

    if (mapResultRequest) {
      setRequest(mapResultRequest);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("ACCESS_TOKEN")) {
        setUser("admin");
        await axios.get("/admin/check_token");
      }

      const result = await axios.get(
        "/departments?non_accept=1&included_request=1"
      );
      const resultHospital = await axios.get("/hospitals/non_accepts/0");
      const resultRequest = await axios.get("requests/name");

      const mapResultRequest = resultRequest.data?.map((row) => {
        const dataDate = row.createdAt.split("T", 1).toString();
        return {
          id: row.id,
          requestAmount: row.request_amount,
          reserveAmount: row.reserve_amount,
          deliveredAmount: row.delivered_amount,
          hospital: row.MedicalStaff.Hospital.hospital,
          date: dataDate,
          isUrgent: row.isUrgent,
        };
      });

      setDepartment(result.data);
      setHospital(resultHospital.data);
      setRequest(mapResultRequest);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Nav user={user}></Nav>
      <Switch>
        {Role[user].haveRoutes.map((route) => {
          return (
            <Route exact path={route.path}>
              <route.component
                department={department}
                setUser={setUser}
                fetchData={fetchData}
                /////////////////
                hospital={hospital}
                fetchDataHospital={fetchDataHospital}
                ///////////////////
                request={request}
                fetchDataRequest={fetchDataRequest}
                key={_.uniqueId()}
                ///////////////
                setIndexDefaultFilter={setIndexDefaultFilter}
                indexDefaultFilter={indexDefaultFilter}
              />
            </Route>
          );
        })}
        {<Redirect to={Role[user].redirect} />}
      </Switch>
    </div>
  );
}

export default App;
