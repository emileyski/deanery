import {
  ActionFunction,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import axios from "axios";
import { signUp } from "../../services";
import { JwtTokens } from "../../interfaces";
import Form from "../../Components/UI/FormElements/Form/Form";
import DarkButton from "../../Components/UI/Buttons/DarkButton/DarkButton";
import FormBlock from "../../Components/UI/FormElements/FormBlock/FormBlock";
import FormContainer from "../../Components/UI/FormElements/FormContainer/FormContainer";
import Input from "../../Components/UI/FormElements/Input/Input";
import Preloader from "../../Components/UI/Preloader/Preloader";
import Text from "../../Components/UI/Text/Text";

const FormSignUp = () => {
  const errors = useActionData() as {
    emailError?: string;
    passwordError?: string;
  };

  const navigation = useNavigation();
  const isLoading =
    navigation.state === "submitting" || navigation.state === "loading";

  return (
    <FormContainer>
      <Form method="post">
        <FormBlock>
          <Input
            type="email"
            placeholder="Enter email"
            name="email"
            disabled={isLoading}
          />
          <Text color="#d62424" fontSize="14px">
            {errors?.emailError}
          </Text>
        </FormBlock>
        <FormBlock>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            disabled={isLoading}
          />
          <Text color="#d62424" fontSize="14px">
            {errors?.passwordError}
          </Text>
        </FormBlock>
        <FormBlock>
          <Input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            disabled={isLoading}
          />
        </FormBlock>
        <DarkButton disabled={isLoading}>Submit</DarkButton>
        {isLoading && <Preloader width={20} />}
        <div>
          <Text color="#808080">Already have an account? </Text>
          <Link to="/signin" className="link-primary">
            Sign in
          </Link>
        </div>
      </Form>
    </FormContainer>
  );
};

export const formSignUpAction: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
      confirmPassword: string;
    };

    if (!data.email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      return { emailError: "Email Not Valid" };
    }

    if (!data.password.match(/^[a-zA-Z0-9]{8,22}$/)) {
      return {
        passwordError:
          "Password length must best min 8 Chracters and Max 22 Chracters",
      };
    }

    if (data.confirmPassword !== data.password) {
      return { passwordError: "Passwords should match" };
    }

    const response = await signUp(data.email, data.password);

    const { accessToken, refreshToken } = response;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return redirect("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { emailError: error.response?.data.message };
    } else throw error;
  }
};

export default FormSignUp;
