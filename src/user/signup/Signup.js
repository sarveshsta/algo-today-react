import "./signup.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupAPI } from "../features/auth/authAuthentication";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const formData = new FormData()

  // const auth = useSelector((state) => state.auth)
  // const [showPassword, setShowPassword] = useState(false);
  // console.log("auth :", auth);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      otp: "",
      password: "",
      email: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
      password: Yup.string().min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),

    onSubmit: (values) => {
      formData.append("name", values.name);
      formData.append("phone", localStorage.getItem('phone_number'));
      formData.append("otp", localStorage.getItem('otp'));
      formData.append("password", values.password);
      formData.append("email", values.email);
      
      dispatch(signupAPI(formData))
      navigate("/dashboard");
    },
      
  });
  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };
  return (
    <>
      <div className="signup-main-div">
        <div className="signup-firstdiv">
          <img
            className="firstdiv-image"
            src={require("../../assets/icons/upscaler-1.png")}
            alt="Algo-Today-img"
          />
          <h1 className="firstdiv-h1">Algo Today</h1>
          <h3 className="firstdiv-h3">Trade Smarter.Live Free</h3>
        </div>

        {/* -----------------Form-section------------ */}
        <div className="form-section">
          <div className="signup-seconddiv">
            <h2 className="signup-form-h2">Signup</h2>
            <p className="signup-form-small-text">
              Just some details to get you in !
            </p>
            <form className="form-form" onSubmit={formik.handleSubmit}>
              <input
                className="signup-form-input"
                type="text"
                placeholder="Name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error-message" style={{ color: "red" }}>
                  {formik.errors.name}
                </div>
              ) : null}

              <input
                className="signup-form-input"
                type="email"
                placeholder="Email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-message" style={{ color: "red" }}>
                  {formik.errors.email}
                </div>
              ) : null}

              {/* Password input field */}
              <div className="password-input-container">
                <input
                  className="signup-form-input password-input"
                  type={"password"}
                  placeholder="Password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="error-message" style={{ color: "red" }}>
                  {formik.errors.password}
                </div>
              ) : null}

              {/* Confirm password input field */}
              <input
                className="signup-form-input"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="error-message" style={{ color: "red" }}>
                  {formik.errors.confirmPassword}
                </div>
              ) : null}

              
              <button className="signup-form-button" type="submit">
                Signup
              </button>
            </form>
            <p className="signup-form-already-registered-para">
              Already registered?{" "}
              <Link className="linking" to="/login">
                {" "}
                Login{" "}
              </Link>
            </p>

            <div className="signup-form-3-text-div">
              <p>Terms & Conditions</p>
              <p>Support</p>
              <p>Customer Care</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
