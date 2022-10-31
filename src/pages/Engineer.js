import Sidebar from "../components/Sidebar";
import Widget from "../components/Widget";
import { Modal, ModalHeader, Button } from "react-bootstrap";

import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { useState } from "react";

const columns = [
  {
    title: "ID",
    field: "id",
  },
  {
    title: "TITLE",
    field: "title",
  },
  {
    title: "REPORTER",
    field: "reorter",
  },
  {
    title: "DESCRIPTION",
    field: "description",
  },
  {
    title: "PRIORITY",
    field: "ticket-priority",
  },
  {
    title: "STATUS",
    field: "status",
    lookup: {
      OPEN: "OPEN",
      IN_PROGRESS: "IN_PROGRESS",
      CLOSED: "CLOSED",
      BLOCKED: "BLOCKED",
    },
  },
];

const Engineer = () => {
  const [ticketUpdationModal, setTicketUpdationModal] = useState(false);
  return (
    <div className="bg-light vh-100">
      <Sidebar />
      <div className="container py-5">
        <h3 className="text-center text-primary">Welcome Engineer</h3>
        <p className="lead text-muted text-center">
          Take a quick look at your engineer stats below!
        </p>
        {/* Widgets starts : props : color, title, icon, ticketCount, pathColor */}
        <div className="row">
          <Widget
            color="primary"
            title="OPEN"
            icon="envelope-open"
            ticketCount="13"
            pathColor="darkblue"
          />
          <Widget
            color="warning"
            title="PROGRESS"
            icon="hourglass-split"
            ticketCount="10"
            pathColor="yellow"
          />
          <Widget
            color="success"
            title="CLOSED"
            icon="check2-circle"
            ticketCount="12"
            pathColor="darkgreen"
          />
          <Widget
            color="secondary"
            title="BLOCKED"
            icon="slash-circle "
            ticketCount="13"
            pathColor="darkgrey"
          />
        </div>
        <hr />
        <MaterialTable
          columns={columns}
          title="TICKETS ASSIGNED TO YOU"
          options={{
            filtering: true,
            exportMenu: [
              {
                label: "Export Pdf",
                exportFunc: (cols, data) =>
                  ExportPdf(cols, data, "Ticket Records"),
              },
              {
                label: "Export Csv",
                exportFunc: (cols, data) =>
                  ExportCsv(cols, data, "Ticket Records"),
              },
            ],
            headerStyle: {
              backgroundColor: "darkblue",
              color: "#fff",
            },
          }}
        />
        {ticketUpdationModal ? (
          <Modal
            show={ticketUpdationModal}
            onHide={() => setTicketUpdationModal(false)}
            backdrop="static"
            centered
          >
            <ModalHeader closeButton>
              <Modal.Title>UPDATE TICKET</Modal.Title>
            </ModalHeader>
            <Modal.Body>
              <form>
                <div className="p-1">
                  <h5 className="text-primary"> ID: </h5>
                </div>
                <div className="input-group m-1">
                  <label className="label label-md input-group-text">
                    TITLE
                  </label>
                  <input type="text" disabled className="form-control" />
                </div>
                <div className="input-group m-1">
                  <label className="label label-md input-group-text">
                    REPORTER
                  </label>
                  <input type="text" disabled className="form-control" />
                </div>
                <div className="input-group m-1">
                  <label className="label label-md input-group-text">
                    PRIORITY
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="priority"
                  />
                </div>

                <div className="input-group m-1">
                  <label className="label label-md input-group-text">
                    STATUS
                  </label>
                  <select className="form-select" name="status">
                    <option value="OPEN">OPEN</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="CLOSED">CLOSED</option>
                    <option value="BLOCKED">BLOCKED</option>
                  </select>
                </div>
                <div className="input-group m-1">
                  <label className="label label-md input-group-text">
                    DESCRIPTION
                  </label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                  />
                </div>

                <div className="d-flex justify-content-end">
                  <Button variant="secondary" className="m-1">
                    Cancel
                  </Button>
                  <Button variant="primary" className="m-1" type="submit">
                    Update
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default Engineer;
