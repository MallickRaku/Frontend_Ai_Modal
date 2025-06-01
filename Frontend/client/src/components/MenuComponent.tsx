import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Menu() {
  const [showA, setShowA] = useState(true);

  const toggleShowA = () => setShowA(!showA);

  return (
    // <Row className="fw-semibold position-fixed fw-semibold" style={{ right: "2%", top: "2%" }}>
    //   <Col md={6} className="mb-2">
    //     <Button onClick={toggleShowA} className="mb-2">
    //       <FontAwesomeIcon icon={faBars} />
    //     </Button>
    //     <Toast
    //       show={showA}
    //       onClose={toggleShowA}
    //       className="fw-semibold position-fixed fw-semibold"
    //       style={{ right: "2%", top: "10%", width: "250px" }}
    //     >
    //       <Toast.Header>
    //         <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
    //         <strong className="me-auto">Hello Rakesh</strong>
    //       </Toast.Header>
    //       <Toast.Body>
    //         <button className="btn btn-outline-success  fw-semibold fw-semibold">Logout</button>
    //       </Toast.Body>
    //     </Toast>
    //   </Col>
    // </Row>
    <h2>hello</h2>
  );
}

export default Menu;
