import { Link } from "react-router-dom";
import { useState, useCallback } from "react";
import Header from "../../components/Header";
import LoginTemplate from "../../components/signup/LoginTemplate";
import PlaceInfoModifyTemplate from "../../components/modify/PlaceInfoModifyTemplate";

const PlaceInfoModify = () => {
    return (
        <div>
            <Header PageName={"공간정보수정"} />
            <h1>PlaceInfoModifyPage</h1>
            <PlaceInfoModifyTemplate />
        </div>
    )
};

export default PlaceInfoModify;