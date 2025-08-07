import InputField from "../components/InputField";
import Button from "../components/Button";
import "../styles/auth.css";

// src/pages/Signup.jsx
function Signup() {
  return (
    <>
    <div className="signup-container">
        <h1>회원가입</h1>

        <div className="singupList-wrapper">
            {/* {sortedData.map((item)=><DiaryItem key={item.id} {...item} />)} */}

            <InputField 
              label="이메일"
              type="email"
              placeholder="example@email.com"
            /> 
            <InputField 
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요 (영문+숫자 조합 8자리 이상)"
            />  
            <InputField 
              label="비밀번호 재확인"
              type="password"
              placeholder="비밀번호를 한 더 입력하세요"
            />  
            <InputField 
              label="이름"
              type="text"
              placeholder="홍길동"
            /> 
            <InputField 
              label="전화번호"
              type="tel"
              placeholder="010-1234-5678"
            />      
        </div>
        <Button className="signup-button" text="가입하기" onClick={() => console.log("가입 요청")} />
    </div>
    </>
  );
}

export default Signup;