import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import Input from "../../ui/Input";
import CheckBox from "../../ui/CheckBox";
import Button from "../../ui/Button";
import { useState } from "react";
import { AUTH_SERVICE_URL } from "../../credentials";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formError = useActionData();

  return (
    <div className="mt-2 flex items-center justify-center">
      <div className="w-full max-w-lg">
        <Form
          className="flex flex-col rounded-3xl px-5 py-5 shadow-md"
          method="POST"
        >
          <h1 className="mb-3 text-lg font-medium">Sign Up</h1>
          <Input labelText="Email" type="email" name="email" />
          <Input
            labelText="Password"
            type={!showPassword ? "password" : "text"}
            name="password"
          />
          <CheckBox
            labelText="Show password?"
            name="showPassword"
            value={showPassword ? "on" : "off"}
            onChange={() => setShowPassword((value) => !value)}
          />
          <div className="mt-6 flex items-center justify-between">
            <div className="flex flex-col items-center justify-center">
              <span className="mb-3">
                Dont have <br />
                an account?
              </span>
              <Button
                type="secondary-small"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/signup");
                }}
              >
                Sign Up
              </Button>
            </div>
            <span className="ml-2"></span>
            <Button onClick={null} type="primary">
              Log In
            </Button>
          </div>
        </Form>
        {formError && (
          <div
            className="bg-red-100 border mt-3 border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline">{formError.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const jsonData = Object.fromEntries(formData.entries());

  const response = await axios.post(`${AUTH_SERVICE_URL}signin`, jsonData);
  console.log(response);
  if (response.status === 200) {
    const responseData = response.data;

    // Save data to localStorage
    localStorage.setItem("accessToken", responseData.accessToken);
    localStorage.setItem("refreshToken", responseData.refreshToken);

    // Save user data to localStorage
    const userData = JSON.stringify(responseData.userData);
    localStorage.setItem("userData", userData);

    return redirect("/");
  } else {
    // Handle different error cases based on response.status
    let errorMessage = "";

    switch (response.status) {
      case 400:
        errorMessage = "Invalid request. Please check your input.";
        break;
      case 401:
        errorMessage = "Unauthorized. Please check your credentials.";
        break;
      case 500:
        errorMessage = "Internal server error.";
        break;
      // Add more cases as needed...

      default:
        errorMessage = "An error occurred during Login.";
        break;
    }

    // Return an object with the error message
    return { message: errorMessage };
  }
}

export default Login;
