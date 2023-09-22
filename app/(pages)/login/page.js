"use client";
import React, { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import Button from "../../components/Common/Button/Button";
import { Input } from "../../components/Common/Input/Input";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  setUserInfo,
  userLogin,
} from "../../components/store/slices/userInfoSlice";
import {
  exchangeGoogleToken,
  getUserInfoFromCognito,
  loginWithGoogle,
} from "@/app/API/pages/Login";
import { editUserValue } from "@/app/components/store/slices/userSlice";
import { createContactInFreshsales } from "@/app/API/components/Demo";
import { getUserProfile } from "@/app/API/components/Sidebar";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("password");
  const as = searchParams.has("dashboard");
  const code = searchParams.get("code");

  useEffect(() => {
    const isLogged = window.localStorage.getItem("Token");
    if (search) {
      setShow(true);
    }
    if (isLogged) {
      router.push("/dashboard");
    }
    if (code) {
      handleLoginWithGoogleCode();
    }
  }, [search]);

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  // Handlers
  const handleFormValues = (e) => {
    setError("");
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (formValues.email === "" || formValues.password === "") {
      setError("Please fill all fields");
      return false;
    }
    if (!emailRegex.test(formValues.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    let result = dispatch(userLogin(formValues));
    // let result = dispatch(fetchProfile(formValues))

    result.then(async (res) => {
      if (res.payload?.token) {
        localStorage.setItem("Token", res.payload.token);

        //// This next logic is for collect data from invited new users
        let checkProperties = await getUserProfile()
        if (checkProperties?.is_first_login && checkProperties?.was_invited) {
          router.push("/invited-email-info");
        } else {
          router.push("/dashboard");
        }
        ////

      } else {
        setError("Unable to log in with provided credentials.");
        setLoading(false);
      }
    });
  };

  const handleLoginWithGoogleCode = async () => {
    const clientGoogleSecret = process.env.NEXT_PUBLIC_CLIENT_GOOGLE_SECRET;
    const clientGoogleId = process.env.NEXT_PUBLIC_CLIENT_GOOGLE;
    let access_token;

    if (loading) return;
    setLoading(true);

    let exchangePayload = {
      client_id: clientGoogleId,
      client_secret: clientGoogleSecret,
      redirect_uri: "https://usetempo.ai/login",
      grant_type: "authorization_code",
      code: code,
    };

    // Three steps to login with google:
    // 1 After get the code by query we exchange it for an access token >
    exchangeGoogleToken(exchangePayload)
      .then((res) => {
        console.log("respuesta", res);
        let access_token = res.access_token;
        // 2 Now we get the user info (we only need email) from cognito using the access token >
        getUserInfoFromCognito(access_token).then(async (res) => {
          // 3 We call our API, using the email we got from cognito and the access token we got previously >
          let useremail = res.email;
          loginWithGoogle({
            email: useremail,
            access_token: access_token,
          }).then((res) => {
            if (res.user_exist) {
              localStorage.setItem("Token", res.token);
              router.push("/dashboard");
            }
            if (!res.user_exist) {
              router.push(
                `/checkout?gauth=true&email=${useremail}&gtoken=${access_token}`
              );
            }
            setLoading(false);
          });
          // This line below creates a contact in freshsales with the email we got from cognito >
          await createContactInFreshsales({ email: useremail });
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleLoginWithGoogle = () => {
    window.open(
      "https://tempouserpool.auth.eu-north-1.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=https://usetempo.ai/login&response_type=CODE&client_id=24um0utvb6qtum1u3beb6bafr&scope=email%20openid%20profile",
      "_self"
    );
  };

  return (
    <Container>
      {show && (
        <div
          className="mb-3 hidden w-full items-center rounded-lg bg-[#86efac] mt-5 px-6 py-5 text-thin text-white data-[te-alert-show]:inline-flex"
          role="alert"
          data-te-alert-init
          data-te-alert-show
        >
          You will receive an email with instructions on how to reset your
          password in a few minutes.
          <button
            type="button"
            className="ml-auto box-content rounded-none border-none p-1 text-warning-900 opacity-50 hover:text-warning-900 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
            data-te-alert-dismiss
            aria-label="Close"
            onClick={(e) => {
              setShow(false);
            }}
          >
            <span className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </span>
          </button>
        </div>
      )}
      <div className="w-full sm:w-[40%] md:w-[70%] lg:w-[40%] mx-auto text-center">
        <h1 className="text-center text-2xl tracking-wide sm:text-3xl md:text-4xl lg:text-5xl my-2 font-bold text-heading">
          Welcome.
        </h1>

        {/* <Button
          className="gap-4 items-center flex w-full mx-auto mt-4 justify-center px-4 py-2 bg-[#3c6df1] border border-gray-300 rounded-md shadow-sm"
          onClick={handleLoginWithGoogle}
        >
          <div>
            <img width="25px" src="/icons/google-g.svg"></img>
          </div>
          <span className="text-sm font-medium text-white">
            Sign in with Google
          </span>
        </Button>

        <div className="flex items-center w-full mx-auto mt-4">
          <hr className="flex-grow border-gray-300" />
          <p className="mx-4">Or, sign in with your email</p>
          <hr className="flex-grow border-gray-300" />
        </div> */}
        <form>
          <label className="block my-5" htmlFor="email">
            <span className="block text-start text-sm font-normal text-border">
              Email
            </span>
            <Input
              type={"email"}
              placeholder={"name@company.com"}
              className={`w-full border mx-auto mt-4 ${error.includes("email") && "border-red"
                }`}
              name="email"
              value={formValues.email}
              id={"email"}
              onChange={(value) => {
                handleFormValues(value);
              }}
            />
          </label>
          <label className="block my-5" htmlFor="email">
            <span className="block text-start text-sm font-normal text-border">
              Password
            </span>
            <Input
              type={"password"}
              placeholder={"password"}
              className={`w-full border mx-auto mt-4 ${error && "border-red"}`}
              name="password"
              value={formValues.password}
              id={"password"}
              onKeyDown={(event) => {
                if (event.key === 'Enter')
                  // Perform action when Enter key is pressed
                  handleLogin()
              }}
              onChange={(value) => {
                handleFormValues(value);
              }}
            />
          </label>

          {error && (
            <p className="text-red text-sm text-center mb-4">{error}</p>
          )}

          <div className="flex justify-between">
            {/* <div className="flex items-center mr-4">
                                <Input id="inline-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={(value) => { console.log(value) }} />
                                <label htmlFor="inline-checkbox" className="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">Keep me signed in</label>
                            </div> */}
            <div>
              <Link
                href="/forgot-password"
                className={`${error && "text-sky underline"
                  }  text-border text-sm font-normal`}
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <Button
            className="flex w-full mx-auto mt-4 justify-center px-4 py-2 text-white hover:border hover:bg-white hover:text-black bg-black border border-gray-300 rounded-md shadow-sm"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? "Loading..." : "Sign In"}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
