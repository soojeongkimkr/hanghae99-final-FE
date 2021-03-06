import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../redux/module/user";
import instance from "../shared/Request";
import "../css/signup.css";
import logoSmail from "../assets/logo-smail.png";

const Signup = () => {
    const dispatch = useDispatch();

    const status = useSelector((state) => state.user.status);
    console.log(status)

    const [username, setUsername] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    const [message, setMessage] = useState("");
    const [messageUsername, setMessageUsername] = useState("");
    const [messageNickname, setMessageNickname] = useState("");

    const [state, setState] = useState(false);
    const [stateUsername, setStateUsername] = useState(false);
    const [stateNickname, setStateNickname] = useState(false);

    const [signupState, setSignupState] = useState(false)
    const [idState, setIdState] = useState(false);
    const [nicknameState, setNicknameState] = useState(false);

     useEffect(() => {
        if(idState && !nicknameState) {
            idcondition();
        } 

        if(nicknameState && !idState) {
            nicknamecondition();
        }
        console.log("id", idState)
        console.log("nick", nicknameState) 
     },[dispatch, idState, nicknameState]) 

     useEffect(() => {
        if(signupState) {
            signupCheck();
        }
        console.log("signupState", signupState)
     },[status])

    const idCheck = (username) => {
        return async function (dispatch) {
          await instance.post("api/user/idCheck", {
            username : username
          })
          .then((response) => {
            setIdState(true)
            const status = response.status;

            console.log(response)
    
            if(status === 200) {
                setStateUsername(true);
                setMessageUsername("?????? ????????? ID ?????????.");
                setIdState(false);
            }
          })
          .catch((err) => {
            setIdState(true)
            const status = err.response.data.status;

            if(status === 400) {
                if(username === "") {
                    setStateUsername(false);
                    setMessageUsername("????????? ????????? ??? ????????????.");
                    setIdState(false);
                } else {
                    setStateUsername(false);
                    setMessageUsername("????????? ????????? ???????????? ????????????.");
                    setIdState(false);
                }
            }

            if(status === 500) {
                setStateUsername(false);
                setMessageUsername("?????? ???????????? ID ?????????.");
                setIdState(false);
          }
        });
      };
    }
    
    const nicknameCheck = (nickname) => {
        return async function (dispatch) {
          await instance.post("api/user/nickCheck", {
            nickname : nickname
          })
          .then((response) => {
            setNicknameState(true)
            const status = response.status;

            if(status === 200) {
                setStateNickname(true);
                setMessageNickname("?????? ????????? nickname ?????????.");
                setNicknameState(false);
            }
          }) 
          .catch((err) => {
            setNicknameState(true)
            const status = err.response.data.status;

            if(status === 400) {
                if(nickname === "") {
                    setStateNickname(false);
                    setMessageNickname("????????? ????????? ??? ????????????.");
                    setNicknameState(false);
                } else {
                    setStateNickname(false);
                    setMessageNickname("??????????????? ????????? ??? ????????????.");
                    setNicknameState(false);
                }
            }
            if(status === 500) {
                setStateNickname(false);
                setMessageNickname("?????? ???????????? nickname ?????????.");
                setNicknameState(false);
            }
        });
      };  
    }

    const idcondition = () => {
        if(username === "") {
            setStateUsername(false);
            setMessageUsername("????????? ????????? ??? ????????????.");
            setIdState(false);
        }

        let emailCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        
        if(!emailCheck.test(username)) {
            setStateUsername(false);
            setMessageUsername("????????? ????????? ???????????? ????????????.");
            setIdState(false);
        }
    }

    const nicknamecondition = () => {
        if(nickname === "") {
            setStateNickname(false);
            setMessageNickname("????????? ????????? ??? ????????????.");
            setNicknameState(false);
        }

        let special_pattern = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;

        if(special_pattern.test(nickname) === true){
            setStateNickname(false);
            setMessageNickname("??????????????? ????????? ??? ????????????.");
            setNicknameState(false);
        }
    
        if (nickname.length < 2 || nickname.length > 8) {
            setStateNickname(false);
            setMessageNickname("???????????? 2?????? ??????, 8?????? ???????????????.");
            setNicknameState(false);
        } 
    }

    const signupCheck = () => {
        if(status === 400) {
            if (username === "" || nickname === "" || password === "" || passwordCheck === "") {
                setState(false);
                setMessage("?????? ?????? ????????? ?????????.");
                setSignupState(false);
            } 

            if (password.length < 8 || password.length > 16) {
                setState(false);
                setMessage("??????????????? 8?????? ??????, 16?????? ???????????????.");
                setSignupState(false);
            }

            let special_pattern = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;
            if(special_pattern.test(password) === true){
                setState(false);
                setMessage("??????????????? ????????? ??? ????????????.");
                setSignupState(false);
            }

            let chk_num = password.search(/[0-9]/g);
            let chk_eng = password.search(/[a-z]/ig);
            if(chk_num < 0 || chk_eng < 0) {
                setState(false);
                setMessage("??????????????? ????????? ???????????? ??????????????? ?????????.");
                setSignupState(false);
            } 

            if (password !== passwordCheck) {
                setState(false);
                setMessage("??????????????? ?????? ??????????????????.");
                setSignupState(false);
            }
        }

        if(status === 201) {
            if (password === passwordCheck) {
                setState(true);
                setMessage("??????????????? ???????????????.");
            }
        }

    }

    const signup = () => {
        dispatch(userAction.signUpDB(
            username, nickname, password, passwordCheck
        ))
        setSignupState(true);
    }

  return (
    <div className="signup-container">
        <div className="signup-content">
            <div className="signup-logo">
                <img src={logoSmail} alt="logo" />
                <div className="signup-shadow"></div>
                <p>???????????? ????????? ????????? ??????????????????</p>
            </div>
            <div className="signup-input">
                <label>?????????</label>
                    <div className="signup-id">
                        <input type="text" label="?????????" placeholder="???????????? ????????? ?????????" onChange={(e) => setUsername(e.target.value)}/>
                        <button onClick={idCheck(username)} >????????????</button>
                    </div>
                    <div className="message">
                        <p className={stateUsername === false ? "error" : "success"}>{messageUsername}</p>
                    </div>

                <label>?????????</label>
                    <div className="signup-nickname">
                        <input type="text" label="?????????" placeholder="???????????? ????????? ?????????" onChange={(e) => setNickname(e.target.value)}/>
                        <button onClick={nicknameCheck(nickname)}>????????????</button>
                    </div>
                    <div className="message">
                        <p className={stateNickname === false ? "error" : "success"}>{messageNickname}</p>
                    </div>

                <label>????????????</label>
                    <div className="signup-password">
                        <input type="Password" label="????????????" placeholder="??????????????? ????????? ?????????" className="password" onChange={(e) => setPassword(e.target.value)}/>
                        <input type="Password" label="???????????? ??????" placeholder="???????????? ??????" className="passwordCheck"onChange={(e) => setPasswordCheck(e.target.value)}/>
                    </div>
                    <div className="signup-message">
                        <p className={state === false ? "error" : "success"}>{message}</p>
                    </div>
                <button onClick={signup} className="signup-btn">????????????</button>
                </div>
            </div>
        </div>
    )
}

export default Signup;