import {
  ActionFunction,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { signIn } from "../../services";
import axios from "axios";
import DarkButton from "../../Components/UI/Buttons/DarkButton/DarkButton";
import FormBlock from "../../Components/UI/FormElements/FormBlock/FormBlock";
import FormContainer from "../../Components/UI/FormElements/FormContainer/FormContainer";
import Input from "../../Components/UI/FormElements/Input/Input";
import Text from "../../Components/UI/Text/Text";
import Preloader from "../../Components/UI/Preloader/Preloader";
import Form from "../../Components/UI/FormElements/Form/Form";

const FormSignIn = () => {
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
            name="email"
            placeholder="Enter email"
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
        <DarkButton type="submit" disabled={isLoading}>
          Submit
        </DarkButton>
        {isLoading && <Preloader width={20} />}
        <div>
          <Text color="#808080">Don't have an account? </Text>
          <Link to="/signup" className="link-primary">
            Sign up
          </Link>
        </div>
      </Form>
    </FormContainer>
  );
};

export const formSignInAction: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
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

    const response = await signIn(data.email, data.password);

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

export default FormSignIn;
