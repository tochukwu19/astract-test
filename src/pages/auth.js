import React, {useRef} from 'react';
import "../styles/auth.css";



const Auth = () => {

    const inputRef = useRef(null)

    const redirect = (e) => {
        e.preventDefault();         

        if(inputRef.current[0].value === "admin@gmail.com" && inputRef.current[1].value === "admin"){
            window.location.href = "/admin";
        }else{
            window.location.href = "/";
        }
    }

    return (
        <>
            <main>
                <div class="auth-container">
                    <form ref={inputRef} class="auth-form" onSubmit={(e)=> redirect(e)}>
                        <h1>Login to the TO-DO APP</h1>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"  required/>
                        </div>
                        <button type="submit" class="btn btn-primary">Log In</button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Auth;