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
  email: Yup.string().required("Please Enter Your Email Id").email("Enter Valid Email").min(5),
  password: Yup.string().required("Please Enter Your Password").trim(),
});

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: {}, { setSubmitting }: any) => {
    try {
      setSubmitting(true); // Set submitting to true immediately
      const resp = await postData(`/user/login`, values); // Wait for the response

      if (resp.status === 201 && resp !== undefined) {
        localStorage.setItem("userInfo", JSON.stringify(resp.data));
        localStorage.setItem("loggedIn", JSON.stringify(true));
        toast.success(`Hello, ${resp?.data?.userInfo?.name}! You are successfully logged in.`);

        // Navigate after a short delay to show success toast
        setTimeout(() => {
          navigate("/");
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
          email: "",
          password: "",
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
              Welcome back <FontAwesomeIcon icon={faSatellite} />
            </h2>

            {/* Loader appears when isSubmitting is true */}
            {isSubmitting && <ReactLoading type="spinningBubbles" color="#433878" height={40} width={40} />}

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

            <button className="btn btn-outline-primary w-50 fw-semibold" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            <button className="btn btn-outline-danger w-50 fw-semibold" type="button">
              <Link to={"/forgetpassword"} style={{ textDecoration: "none", color: "inherit" }}>
                Forget Password
              </Link>
            </button>

            <p style={{ fontSize: "12px", fontWeight: "bold" }}>
              Not a Registered user? <Link to={"/register"}> Signup</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
