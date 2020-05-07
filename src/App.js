import React, { useState, useEffect } from "react";

import "antd/dist/antd.css";
import "./css/hospital.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Role from "./config/Role";
import axios from "./config/axios";
import Nav from "./components/Nav";
import _ from "lodash";
import { Button, Modal } from "antd";
import CancelReserve from "./components/Reserve/CancelReserve";

function App() {
  const [user, setUser] = useState("guest");
  const [department, setDepartment] = useState();
  const [hospital, setHospital] = useState();
  const [request, setRequest] = useState();
  const [reserve, setReserve] = useState();

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

  const fetchDataReserve = async () => {
    const resultReserveAndMaker = await axios.get("/reserves/for_admin");
    for (let row of resultReserveAndMaker.data) {
      let date = new Date();
      let date2 = new Date(row.createdAt);
      let diffTime = Math.abs(date - date2);
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      row.createdAt = date2;
      row.diffDays = diffDays;
      row.dayNow = date;
      row.delete = <CancelReserve id={row.id} deleteReserve={deleteReserve} />;
    }
    resultReserveAndMaker.data.sort((a, b) => {
      return b.diffDays - a.diffDays;
    });
    setReserve(resultReserveAndMaker.data);
  };

  const deleteReserve = async (idReserve) => {
    await axios.delete(`/reserves/${idReserve}`);
    fetchDataReserve();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("ACCESS_TOKEN")) {
        setUser("admin");
        await axios.get("/admin/check_token");

        const result = await axios.get(
          "/departments?non_accept=1&included_request=1"
        );
        const resultHospital = await axios.get("/hospitals/non_accepts/0");
        const resultRequest = await axios.get("/requests/name");
        const resultReserveAndMaker = await axios.get("/reserves/for_admin");

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

        for (let row of resultReserveAndMaker.data) {
          let date = new Date();
          let date2 = new Date(row.createdAt);
          let diffTime = Math.abs(date - date2);
          let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          row.createdAt = date2;
          row.diffDays = diffDays;
          row.dayNow = date;
          row.delete = (
            <CancelReserve id={row.id} deleteReserve={deleteReserve} />
          );
        }

        resultReserveAndMaker.data.sort((a, b) => {
          return b.diffDays - a.diffDays;
        });
        console.log(resultReserveAndMaker.data);
        setReserve(resultReserveAndMaker.data);
        setDepartment(result.data);
        setHospital(resultHospital.data);
        setRequest(mapResultRequest);
      }
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
                /////////
                reserve={reserve}
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
