import { productApi } from "@renderer/apis/product";
import { useState } from "react";
import '../../assets/fb.css'
import LikeAction from "./fbAction";

function LoginForm() {
  const [uuid, setuuid] = useState('100091846032169');
  const [password, setPassword] = useState('rhhmqaog52');
  const [faCode, setFaCode] = useState('E5EFHTBZ77JJ3XFQHYU7MB4F7DXP64D3');
  const [uuid2, setuuid2] = useState('100091993924887');
  const [password2, setPassword2] = useState('jxqhmqjx38');
  const [faCode2, setFaCode2] = useState('DDAJFXD4MNB6ZIUHWRAYI2RYXYZIHO2T');
  const [displayActions, setDisplayAction] = useState(false)

  const handleEmailChange = (event) => {
    setuuid(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleFaCode = (event) => {
    setFaCode(event.target.value);
  };
  const handleEmail2Change = (event) => {
    setuuid2(event.target.value);
  };

  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
  };
  const handleFaCode2 = (event) => {
    setFaCode2(event.target.value);
  };

  async function handleLogin() {
    await productApi.loginWithFb([
      {
        username: uuid,
        password,
        faCode
      },
      {
        username: uuid2,
        password: password2,
        faCode: faCode2
      }
    ])
    setDisplayAction(true)
  };

  return (
    <>
    <h2 className="text-light">{!displayActions ? "Đăng nhập bằng Facebook":"Facebook action"}</h2>
      <div className="parent">
        <div className="child">
          <h6>Like action</h6>
          {!displayActions ?(
            <form>
            <div className="parent">
              <label>
                UUID:
                <input type="text" value={uuid} onChange={handleEmailChange} />
              </label>
            </div>
            <div>
              <label>
                Password:
                <input type="password" value={password} onChange={handlePasswordChange} />
              </label>
            </div>
            <div>
              <label>
                Hash-fa-code:
                <input type="text" value={faCode} onChange={handleFaCode} />
              </label>
            </div>
          </form>
          ):<LikeAction></LikeAction>}
          
        </div>
        <div className="child">
          <h6>Comment action</h6>
          <form>
            <div>
              <label>
                UUID:
                <input type="text" value={uuid2} onChange={handleEmail2Change} />
              </label>
            </div>
            <div>
              <label>
                Password:
                <input type="password" value={password2} onChange={handlePassword2Change} />
              </label>
            </div>
            <div>
              <label>
                Hash-fa-code:
                <input type="text" value={faCode2} onChange={handleFaCode2} />
              </label>
            </div>
            
          </form>
        </div>
        <button className="margin-left-40" type="button" onClick={handleLogin}>Login</button>
      </div>
    </>
  );
}
export default LoginForm