import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faRobot } from "@fortawesome/free-solid-svg-icons";

const Searchbox = () => {
  return (
    <div className=" border border-2 border-dark rounded-2 position-fixed w-50 " style={{ bottom: "10%" }}>
      {/* <FontAwesomeIcon icon={faRobot} className=" position-absolute fs-3" style={{ left: "3%", top: "25%" }} /> */}
      <FontAwesomeIcon icon={faPaperPlane} className=" position-absolute fs-3" style={{ right: "3%", top: "25%" }} />
      <input
        type="text"
        name=""
        id=""
        placeholder="Search Anything"
        className="p-3 fw-semibold w-100 h-100 rounded-2  border border-0"
        style={{ outline: "none", paddingLeft: "30px" }}
      />
    </div>
  );
};

export default Searchbox;
