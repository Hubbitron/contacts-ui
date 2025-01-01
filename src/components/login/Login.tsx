import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavigateFunction, useNavigate, useParams } from "react-router";
import { UserAccount } from "./model/UserAccount";
import { Credentials } from "../model/Credentials";
import { callFetch } from "../helper/Global";
import { Button } from "react-bootstrap";

const Login = () => {
  
    let navigate: NavigateFunction = useNavigate();

    const form = useForm<Credentials>({
      defaultValues: async (): Promise<Credentials> => {
        let form: Credentials = new Credentials();
          return form;
        },
        mode: "all",
    });
    
    const { register, handleSubmit, formState } = form;
    const { errors, isValid } = formState;

    const onSubmit = async (formObj: any): Promise<void> => {
        const credentials = new Credentials();
        credentials.username = formObj.username;
        credentials.password = formObj.password;
    
        const formData: FormData = new FormData();
    
        const httpMethod = "POST";
        const endpoint = "/authenticate";
        let response = await callFetch(endpoint, httpMethod, JSON.stringify(credentials));
        const jwtJson = await response.json();
        if (!jwtJson.jwt) {
          alert("Invalid Credentials");
          return;
        }
        
        sessionStorage.setItem("jwt", jwtJson.jwt);

        response = await callFetch("/getUser/" + formObj.username, "GET", "");

        const userAccount: UserAccount = await response.json();
        navigate("/contactlist");
    }
    return(
        <div>
            <h2>Enter your login credentials</h2>
            <form name="Login" id="Login" onSubmit={handleSubmit(onSubmit)}>
                <table>
                    <tbody>
                        <tr>
                            <td className='label-align'>
                                Username
                            </td>
                            <td className='label-align'>
                                <div className='field-label'>
                                    <input type = "text" className='textbox-large' id="username"
                                        {...register("username")}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className='label-align'>
                                Password
                            </td>
                            <td className='label-align'>
                                <div className='field-label'>
                                    <input type = "password" className='textbox-large' id="password"
                                        {...register("password")}
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Button variant = "secondary" type = "submit">
                    Submit
                </Button>
            </form>
        </div>
    );
}
export default Login;