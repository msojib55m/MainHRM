import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/Contextsprovider";
export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const { user, setUser, setToken } = useStateContext();
    // try

    // try
    const Submit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        console.log(payload);
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
    };
    return (
        <>
            {" "}
            <Helmet>
                <title>Login</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div className="bg-[url('https://hrm.bdtask-demoserver.com/storage/application/1716899134login-image.jpg')] w-screen h-screen bg-no-repeat bg-cover">
                <div>
                    <div className="absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4  p-[20px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[25rem]">
                        <div>
                            <div className="flex items-center justify-center">
                                <img
                                    src="https://hrm.bdtask-demoserver.com/storage/application/1716986808logo.jpg"
                                    alt=""
                                    className="w-[100px] h-[100px] rounded-full "
                                />
                            </div>
                            <h3 className="text-[24px] font-bold text-center m-[14px]">
                                Bdtask HRM Login
                            </h3>
                            <p className="font-semibold text-center fs-14 mb-0">
                                Welcome Back, Bdtask HRM
                            </p>
                        </div>
                        <form onSubmit={Submit} action="" className="mt-7">
                            <div class="w-full max-w-sm min-w-[200px]">
                                <label for="email" class="font-semibold">
                                    Email address
                                </label>
                                <input
                                    name="email"
                                    ref={emailRef}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-teal-500 hover:border-teal-300 shadow-sm focus:shadow mt-4"
                                    type="email"
                                    placeholder="Enter Email Address"
                                />
                            </div>

                            <div class="w-full max-w-sm min-w-[200px] mt-6">
                                <label for="email" class="font-semibold">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    ref={passwordRef}
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-teal-500 hover:border-teal-300 shadow-sm focus:shadow mt-4"
                                    type="password"
                                    placeholder="Enter your Password"
                                />
                                <div className="mt-6">
                                    <a href="" className="float-right">
                                        Forget password
                                    </a>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-6 w-full"
                                >
                                    Sign in
                                </button>
                                <br />
                                <br />
                                <Link
                                    to="/register"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Register
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
