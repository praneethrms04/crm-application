import { useEffect, useState } from "react";
import { fetchTicket} from '../api/tickets';
import MaterialTable from "@material-table/core";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {ExportCsv, ExportPdf} from '@material-table/exporters'

import Sidebar from "../components/Sidebar";

const columns = [
  { title: "ID", field: "id" },
  { title: "TITLE", field: "title" },
  { title: "DESCRIPTION", field: "description" },
  { title: "REPORTER", field: "reporter" },
  { title: "ASSIGNEE", field: "assignee" },
  { title: "PRIORITY", field: "ticketPriority" },
  {
    title: "STATUS", field: "status",
    lookup: {
      "OPEN": "OPEN",
      "IN_PROGRESS": "IN_PROGRESS",
      "CLOSED": "CLOSED",
      "BLOCKED": "BLOCKED"
    }
  },
];

const userColumns = [
  { title: "ID", field: "id" },
  { title: "NAME", field: "name" },
  { title: "EMAIL", field: "email" },
  { title: "ROLE", field: "userTypes" },
  { title: "STATUS", field: "status" },
];

// const data = [
//   { firstName: "Tod", lastName: "Miles", birthYear: 1987, availability: true },
//   {
//     firstName: "Jess",
//     lastName: "Smith",
//     birthYear: 2000,
//     availability: false,
//   },
// ];

function Admin() {
  const [ticketDetails, setTicketDetails] = useState([]);
  const [ticketStatusCount, setTicketStatusCount] = useState({});

  useEffect(() => {
    fetchTickets()
  }, [])


  
  const fetchTickets = () => {
    fetchTicket().then((response) => {
      setTicketDetails(response.data)
      updateTicketCount(response.data)
    }).catch( (error)=> {
      console.log(error);
    })
  }

  // console.log('***', ticketDetails);

  
  const updateTicketCount = (tickets) => {

    // filling this empty object with the ticket counts
    // Segrating the tickets in 4 properties according to the status of the tickets 
    const data = {
      open: 0,
      closed: 0,
      progress: 0,
      blocked: 0
    }

    tickets.forEach(x => {
      if (x.status === "OPEN") {
        data.open += 1;
      }
      else if (x.status === "CLOSED") {
        data.closed += 1;
      }
      else if (x.status === "IN_PROGRESS") {
        data.progress += 1;
      } else {
        data.blocked += 1;
      }
    })
    setTicketStatusCount(Object.assign({}, data))
  }

  console.log('***', ticketStatusCount);

  return (
    <div className="bg-light vh-100%">
      <Sidebar />
      {/* welcome text */}
      <div className="container p-5">
        <h3 className="text-center text-danger">Welcome,{ localStorage.getItem("name")}</h3>
        <p className="text-muted text-center">
          Take a look at your admin stats below
        </p>
      </div>
      {/* widgets start */}
      <div className="row ps-5 ms-5 mb-5">
        {/* w1 */}
        <div className="col-xs-12 col-md-6 col-lg-3 my-1">
          <div
            className="card shadow bg-primary bg-opacity-50 text-center"
            style={{ width: 15 + "rem" }}
          >
            <h5 className="card-subtitle fw-bolder my-3 text-primary">
              <i className="bi bi-envelope-open text-primary mx-2"></i>Open
            </h5>
            <hr />
            <div className="row mb-2 d-flex align-items-center">
              <div className="col text-primary mx-4 fw-bolder display-6">{ticketStatusCount.open}</div>
              <div className="col">
                {/* Size of circular bar */}
                <div style={{ width: 40, height: 40 }}>
                  {/* How to use ? 
                    Import from top
                    value={the count of tickets}
                    buildStyles({}) : a function that accepts obj. Obj takes css styles in key value format. Colors can be accepted in hex, rgpa, and text names
                  */}
                  <CircularProgressbar
                    value={ticketStatusCount.open}
                    styles={buildStyles({
                      pathColor: "darkblue",
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* w2 */}
        <div className="col-xs-12 col-md-6 col-lg-3 my-1">
          <div
            className="card shadow bg-warning bg-opacity-50 text-center"
            style={{ width: 15 + "rem" }}
          >
            <h5 className="card-subtitle fw-bolder my-3 text-warning">
              <i className="bi  bi-hourglass-split text-warning mx-2"></i>
              Progress
            </h5>
            <hr />
            <div className="row mb-2 d-flex align-items-center">
              <div className="col text-warning mx-4 fw-bolder display-6">
                {ticketStatusCount.progress}
              </div>
              <div className="col">
                {/* Size of circular bar */}
                <div style={{ width: 40, height: 40 }}>
                  {/* How to use ? 
                    Import from top
                    value={the count of tickets}
                    buildStyles({}) : a function that accepts obj. Obj takes css styles in key value format. Colors can be accepted in hex, rgpa, and text names
                  */}
                  <CircularProgressbar
                    value={ticketStatusCount.progress}
                    styles={buildStyles({
                      pathColor: "darkgoldenrod",
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* w3 */}
        <div className="col-xs-12 col-md-6 col-lg-3 my-1">
          <div
            className="card shadow bg-success bg-opacity-50 text-center"
            style={{ width: 15 + "rem" }}
          >
            <h5 className="card-subtitle fw-bolder my-3 text-success">
              <i className="bi bi-check2-circle  text-success mx-2"></i>Closed
            </h5>
            <hr />
            <div className="row mb-2 d-flex align-items-center">
              <div className="col text-success mx-4 fw-bolder display-6">
                {ticketStatusCount.closed}
              </div>
              <div className="col">
                {/* Size of circular bar */}
                <div style={{ width: 40, height: 40 }}>
                  {/* How to use ? 
                    Import from top
                    value={the count of tickets}
                    buildStyles({}) : a function that accepts obj. Obj takes css styles in key value format. Colors can be accepted in hex, rgpa, and text names
                  */}
                  <CircularProgressbar
                    value={ticketStatusCount.closed}
                    styles={buildStyles({
                      pathColor: "darkgreen",
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* w4 */}
        <div className="col-xs-12 col-md-6 col-lg-3 my-1">
          <div
            className="card shadow bg-secondary bg-opacity-50 text-center"
            style={{ width: 15 + "rem" }}
          >
            <h5 className="card-subtitle fw-bolder my-3 text-secondary">
              <i className="bi bi-slash-circle text-secondary mx-2"></i>Blocked
            </h5>
            <hr />
            <div className="row mb-2 d-flex align-items-center">
              <div className="col text-secondary mx-4 fw-bolder display-6">
                {ticketStatusCount.blocked}
              </div>
              <div className="col">
                {/* Size of circular bar */}
                <div style={{ width: 40, height: 40 }}>
                  {/* How to use ? 
                    Import from top
                    value={the count of tickets}
                    buildStyles({}) : a function that accepts obj. Obj takes css styles in key value format. Colors can be accepted in hex, rgpa, and text names
                  */}
                  <CircularProgressbar
                    value={ ticketStatusCount.blocked}
                    styles={buildStyles({
                      pathColor: "darkblue",
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* widgets end */}
      <div className="container">
        <MaterialTable
          title="TICKET"
          columns={columns}
           data={ticketDetails}
          options={{
            filtering : true,
            headerStyle :{
              backgroundColor : "#d9534f",
              color : "#fff",
            },
            rowStyle :{
              backgroundColor : "#eee"
            },
            exportMenu : [{
              label : 'Export Pdf',
              exportFunc: (cols, data) => ExportPdf(cols, data, 'ticketRecords'),
            },
            {
              label : 'Export Csv',
              exportFunc: (cols, data) => ExportCsv(cols, data, 'ticketRecords'),
            }]
          }}
        />
        <hr />
        <MaterialTable
          title="USER DETAILS"
          columns={userColumns}
          // data={data}
          options={{
            filtering : true,
            headerStyle :{
              backgroundColor : "#d9534f",
              color : "#fff",
            },
            rowStyle :{
              backgroundColor : "#eee"
            },
            exportMenu : [{
              label : 'Export Pdf',
              exportFunc: (cols, data) => ExportPdf(cols, data, 'userRecords'),
            },
            {
              label : 'Export Csv',
              exportFunc: (cols, data) => ExportCsv(cols, data, 'userRecords'),
            }]
          }}
        />
      </div>
    </div>
  );
}

export default Admin;