import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RandomQuestion from "../../components/homePageComponents/RandomQuestion";
import Searchbox from "../../components/homePageComponents/Searchbox";
import { PreviousSearchList } from "../../components/homePageComponents/PreviousSearchList";
import { Link } from "react-router-dom";
import ProtectedComponent from "../../services/protectedComponent";
import Menu from "../../components/MenuComponent";

function HomePage() {
  return (
    <div>
      <div className=" mx-4">
        {/* fixed buttons */}
        {loginSignUpButtons()}

        {/* custom container */}
        <div className="d-flex " style={{ height: "100vh" }}>
          <ProtectedComponent>
            <PreviousSearchList />
          </ProtectedComponent>

          <div className="w-100 d-flex flex-column align-items-center py-4 px-2">
            <h1 className=" text-primary">NexGenia</h1>
            <h3 className="  text-danger-emphasis my-5 mb-3 fs-4">
              An AI platform that boosts business efficiency and decision-making.
            </h3>
            <RandomQuestion />

            <Searchbox />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

const loginSignUpButtons = () => {
  const isLoggedIn = localStorage.getItem("loggedIn");
  return (
    <>
      {!isLoggedIn ? (
        <>
          <button
            className="btn btn-outline-success  fw-semibold position-fixed fw-semibold"
            style={{ right: "10%", top: "2%", listStyle: "none" }}
          >
            <Link
              to={"/register"}
              style={{
                textDecoration: "none",
                color: "inherit", // or specify a color
              }}
            >
              Sign up
            </Link>
          </button>
          <button
            className="btn btn-outline-info fw-semibold position-fixed fw-semibold"
            style={{ right: "2%", top: "2%" }}
          >
            <Link
              to={"/login"}
              style={{
                textDecoration: "none",
                color: "inherit", // or specify a color
              }}
            >
              Log in
            </Link>
          </button>
        </>
      ) : (
        <Menu />
      )}
    </>
  );
};
