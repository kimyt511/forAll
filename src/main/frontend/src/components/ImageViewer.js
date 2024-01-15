import {useEffect, useRef, useState} from "react";

const ImageViewer = ({val}) => {
    const spring_app_url = "http://localhost:8080";
    // 기본 이미지 추후 설정 필요
    const BaseImgSrc = "/logo512.png";
    const [imgFile, setImgFile] = useState("");
    useEffect(() => {
        if (val === undefined) setImgFile("");
        else setImgFile(spring_app_url + "/api/v1/image/"+val);
    }, [val]);
    const onErrorImg = (e) => {
        e.target.src = BaseImgSrc;
    }
    return (
        <div style={{height:"20vh"}}>
            <label>
                <img
                    className="image"
                    src={imgFile}
                    alt={"image"}
                    onError={onErrorImg}
                />
            </label>
        </div>
    )
};

export default ImageViewer;