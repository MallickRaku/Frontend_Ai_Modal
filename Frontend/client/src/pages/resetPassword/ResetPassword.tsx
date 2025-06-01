import React, { useEffect, useState } from "react";
import InputDiv from "../../Common/InputDiv";
import ShortMessage from "../../Common/ShortMessage";
import * as Yup from "yup";
import { toast, Toaster } from "sonner";
import { Form, Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSatellite } from "@fortawesome/free-solid-svg-icons";
import ReactLoading from "react-loading";
import { Link, useNavigate, useParams } from "react-router-dom";
import { postData } from "../../services/apis";
import PageLoader from "../../components/PageLoader";
import { Button, Modal } from "react-bootstrap";

const validationSchema = Yup.object({
  newPassword: Yup.string().required("Please Enter New Password").trim().min(6, "Password to short"),
  confirmPassword: Yup.string().required("Please Enter Confirm Password").trim().min(6, "Password to short"),
});

function ResetPassword() {
  const { token } = useParams();
  const [isPageAccessible, setIspageAccessible] = useState<any>("loading");
  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        try {
          setIspageAccessible("checking");
          const resp = await postData(`/user/tokenverify`, { token }); // Wait for the response

          if (resp.status === 200 && resp !== undefined) {
            if (resp?.data?.isValid) setIspageAccessible(true);
            else setIspageAccessible(false);
          }
        } catch (err: any) {
          console.log(err);
          // setSubmitting(false); // Ensure submitting is set to false on error
          // if (err.response && err.response.data.error) {
          //   toast.error(err.response.data.message);
          // } else {
          //   toast.error("An error occurred, please try again.");
          // }
          setIspageAccessible(false);
        }
      }
    };
    verifyToken();
  }, [token]);

  const navigate = useNavigate();

  const handleSubmit = async (
    values: { newPassword: string; confirmPassword: string },
    { setSubmitting, reset }: any
  ) => {
    if (values.newPassword !== values.confirmPassword) {
      toast.warning("Oops! Your passwords don’t match. Give it another shot!");
      return;
    }

    try {
      setSubmitting(true); // Set submitting to true immediately
      const resp = await postData(`/user/resetPassword`, { newPassword: values.newPassword, token }); // Wait for the response

      if (resp.status === 200 && resp !== undefined) {
        toast.success(`${resp.data?.message}`);
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

  return isPageAccessible === "loading" ? (
    <PageLoader />
  ) : isPageAccessible === false ? (
    <Modal show={true} onHide={() => navigate(-1)}>
      <Modal.Body>Sorry, you cannot access this page.</Modal.Body>

      <Modal.Footer></Modal.Footer>
    </Modal>
  ) : (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Toaster position="top-center" richColors />
      <Formik
        initialValues={{
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit, touched, errors, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="d-flex flex-column gap-3 justify-content-center align-items-center w-[200px]"
            style={{ width: "400px" }}
          >
            <h2 className="fs-2 my-4 fw-bold text-center" style={{ color: "#2d333a" }}>
              Reset Password <FontAwesomeIcon icon={faSatellite} />
            </h2>

            {/* Loader appears when isSubmitting is true */}
            {isSubmitting && <ReactLoading type="spinningBubbles" color="#433878" height={40} width={40} />}

            <div className="mb-3">
              <InputDiv
                type="password"
                placeholder="New Password"
                name="newPassword"
                value={values.newPassword}
                onChangeHandler={handleChange}
                error={touched.newPassword && errors.newPassword ? errors.newPassword : undefined}
              />
            </div>

            <div className="mb-3">
              <InputDiv
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChangeHandler={handleChange}
                error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
              />
            </div>

            <button className="btn btn-outline-primary w-50 fw-semibold" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ResetPassword;
