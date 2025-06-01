import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

function RandomQuestion() {
  return (
    <ul className="d-flex mx-5 gap-lg-4 list-unstyled my-4 ">
      <li className=" border border-success border-4 rounded-4 p-4 fw-bold questionbox">
        <FontAwesomeIcon icon={faGlobe} className="fs-1 my-2 " />
        <p className=" fs-6 m-0 ">What methods do you use to learn from interactions?</p>
      </li>
      <li className=" border border-success border-4 rounded-4 p-4 fw-bold questionbox">
        <FontAwesomeIcon icon={faGlobe} className="fs-1 my-2 " />
        <p className=" fs-6  m-0">Can you explain the reasoning behind your conclusions?</p>
      </li>
      <li className=" border border-success border-4 rounded-4 p-4 fw-bold questionbox">
        <FontAwesomeIcon icon={faGlobe} className="fs-1 my-2 " />
        <p className=" fs-6  m-0">How do you prioritize information when generating answers?</p>
      </li>
    </ul>
  );
}

export default RandomQuestion;
