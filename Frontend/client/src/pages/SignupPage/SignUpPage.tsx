import React, { useState } from "react";
import InputDiv from "../../Common/InputDiv";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { postData } from "../../services/apis";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Toaster, toast } from "sonner";
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSatellite } from "@fortawesome/free-solid-svg-icons";

const validationSchema = Yup.object({
  name: Yup.string().required("Please Enter Your Name").min(5),
  email: Yup.string().required("Please Enter Your Email Id").email("Enter Valid Email").min(5),
  password: Yup.string().required("Please Enter Your Password").trim().min(6, "Password to short"),
});

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: {}, { setSubmitting }: any) => {
    try {
      setSubmitting(true); // Set submitting to true immediately
      const resp = await postData(`/user/register`, values); // Wait for the response

      if (resp.status === 201 && resp !== undefined) {
        toast.success(`Hello, ${resp?.data?.name}! You are successfully Registered.`);

        // Navigate after a short delay to show success toast
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }

      setSubmitting(false); // Set submitting to false after response handling
    } catch (err: any) {
      console.log(err);
      setSubmitting(false); // Ensure submitting is set to false on error
      if (err.response && err.response.data.error) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An error occurred, please try again.");
      }
    }
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Toaster position="top-center" richColors />
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit, handleReset, handleBlur, touched, errors, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="d-flex flex-column gap-3 justify-content-center align-items-center w-[200px]"
            style={{ width: "400px" }}
          >
            <h2 className="fs-2 my-4 fw-bold text-center" style={{ color: "#2d333a" }}>
              Register Now <FontAwesomeIcon icon={faSatellite} />
            </h2>

            {isSubmitting && <ReactLoading type="spinningBubbles" color="#433878" height={40} width={40} />}
            <div className="mb-3">
              <InputDiv
                type="text"
                placeholder="Full Name"
                name="name"
                value={values.name}
                onChangeHandler={handleChange}
                error={touched.name && errors.name ? errors.name : undefined}
              />
            </div>
            <div className="mb-3">
              <InputDiv
                type="email"
                placeholder="Email"
                name="email"
                value={values.email}
                onChangeHandler={handleChange}
                error={touched.email && errors.email ? errors.email : undefined}
              />
            </div>
            <div className="mb-3">
              <InputDiv
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChangeHandler={handleChange}
                error={touched.password && errors.password ? errors.password : undefined}
              />
            </div>
            <button className="btn btn-outline-success w-50 fw-semibold" disabled={isSubmitting}>
              {isSubmitting ? "Please Wait ..." : "Submit"}
            </button>

            <p style={{ fontSize: "12px", fontWeight: "bold" }}>
              Already an user ?<Link to={"/login"}> Login </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpPage;
