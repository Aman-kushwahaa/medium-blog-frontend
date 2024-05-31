import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SignupInput } from "aman100xdevcommon/src";
import { BACKEND_URL } from "../config";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postinputs, setPostinputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postinputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      alert("Error while signing up");
    }
  }
  return (
    <>
      {console.log(type)}
      <div className="h-screen flex justify-center flex-col ">
        <div className="flex justify-center ">
          <div>
            <div className="px-10 ">
              <div className="text-3xl font-extrabold ">Create an account</div>
              <div className="text-slate-400 mb-10">
                {type === "signin"
                  ? "Dont have an account"
                  : "Already have an account"}
                <Link
                  to={type === "signin" ? "/signup" : "/signin"}
                  className="pl-2  underline underline-offset-1"
                >
                  {type === "signin" ? "Sign Up" : "Sign In "}
                </Link>
              </div>
            </div>
            <div className="flex  flex-col ">
              {type === "signup" ? (
                <LabelledInput
                  lable="Name"
                  placeholder="Enter you name"
                  onChange={(e: any) => {
                    setPostinputs((c) => ({
                      ...c,
                      name: e.target.value,
                    }));
                  }}
                />
              ) : null}

              <LabelledInput
                lable="Username"
                placeholder="Enter you username"
                onChange={(e: any) => {
                  setPostinputs((c) => ({
                    ...c,
                    username: e.target.value,
                  }));
                }}
              />

              <LabelledInput
                lable="Password"
                placeholder="**********"
                type={"password"}
                onChange={(e: any) => {
                  setPostinputs((c) => ({
                    ...c,
                    username: e.target.value,
                  }));
                }}
              />

              <button
                type="button"
                onClick={sendRequest}
                className="text-white mt-10 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                {type === "signup" ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface labelledInputType {
  lable: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  lable,
  placeholder,
  onChange,
  type,
}: labelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-black mt-5">
        {lable}
      </label>
      <input
        onChange={onChange}
        type="text"
        id="first_name"
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default Auth;
