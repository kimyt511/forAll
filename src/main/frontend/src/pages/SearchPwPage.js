import Header from "../components/Header";
import SearchPwTemplate from "../components/SearchPwTemplate";
import {useState} from "react";
import * as regularExpressions from "../utils/regularExpressions";
import axios from "axios";

const SearchPwPage = () => {
    const [pw, setPw] = useState("");
    const [id, setId] = useState('');
    const [phone, setPhone] = useState('');
    const [cerifiedNum, setCerifiedNum] = useState('');
    const [isSendCerifiedNum, setIsSendCerifiedNum] = useState(false);
    const [isCerified, setIsCerified] = useState(false);

    const sendCerifiedNum = () => {
        const phoneRule = regularExpressions.phoneNum;
        if (!phoneRule.test(phone)){
            alert("전화번호 형식을 확인해주세요");
        }
        else{
            axios.post("/api/v1/send-one/"+phone)
                .then((response) => {
                    alert("인증번호를 발송했습니다");
                    setIsSendCerifiedNum(true);
                }).catch((response) => {
                alert("인증번호를 발송하지 못했습니다");
            });
        }
    };
    const checkCerifiedNum = () => {
        axios.get("/api/v1/findPw/"+id+"/"+phone+"/"+cerifiedNum)
            .then((response) => {
                alert("인증에 성공했습니다!");
                setPw(response.data);
                setIsCerified(true);
            }).catch((response) => {
            alert("인증에 실패했거나, 아이디와 핸드폰 번호에 해당하는 계정이 존재하지 않습니다.");
        });
    };

    return (
        <div>
            <Header PageName={"비밀번호 찾기"}/>
            <SearchPwTemplate
                pw={pw}
                setId={setId}
                setPhone={setPhone}
                setCerifiedNum={setCerifiedNum}
                isSendCerifiedNum={isSendCerifiedNum}
                isCerified={isCerified}
                checkCerifiedNum={checkCerifiedNum}
                sendCerifiedNum={sendCerifiedNum}
            />
        </div>
    )
}

export default  SearchPwPage;