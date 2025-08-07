import { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import '../styles/auth.css';
import '/src/styles/colors.css';
import axios from 'axios';


function Login() {
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');


  const handleLogin = async () => {
    //입력 값 정합성 체크 후 login API 요청
        if (id === "" || pwd === "") {
          alert("아이디와 비밀번호를 입력해주세요.");
          return;
        }

        try {
          const response = await axios.post('http://192.9.10.10:8080', {
            email: id,
            password: pwd,
          }, { withCredentials: true });
          // }, {credentials: 'include'} );

          // 성공 응답 처리
          console.log(response.data); // accessToken, user info 등
          alert('로그인 성공!');
          localStorage.setItem('token', response.data.token); // 또는 원하는 값 저장

          // 필요하다면 페이지 이동
          // navigate('/main'); 

        } catch (error) {
          console.error('로그인 실패:', error);
          alert('로그인 실패: 아이디나 비밀번호를 확인해주세요.');
        }
      };


  return (
    <div className="login-container">
      <h1>로그인</h1>
      <p>Wassup에 오신 것을 환영합니다!</p>
      <InputField 
        label="아이디" 
        type="id" 
        value={id} 
        onChange={e => setId(e.target.value)} 
        placeholder="아이디를 입력하세요"
      />
      <InputField 
        label="비밀번호" 
        type="pwd" 
        value={pwd} 
        onChange={e => setPwd(e.target.value)} 
        placeholder="비밀번호를 입력하세요"
      />
      {/* <Button text="로그인" onClick={logi} />  */}
      <Button className="login-button" text="로그인" onClick={handleLogin} />
      <Link to="/signup">
        <Button className="signup-button" text="회원가입" />
      </Link>
    </div>
  );
}

export default Login;