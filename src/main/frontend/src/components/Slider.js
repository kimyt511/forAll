import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Autoplay, Pagination} from "swiper";
import 'swiper/css';
import  './Slider.css'
import {useEffect} from "react"; // 나중에 Styles.css로 합쳐도 무방
const Slider = ({dataSet, navigate}) => {
    // 왜인지는 모르겠는데 얘만 process 접근이 안됨
    // const SpringAppUrl = process.env.SPRING_APP_URL;
    const SpringAppUrl = "http://localhost:8080"
    SwiperCore.use([Autoplay]);

    const handleClick = (data) => {
        navigate("/rentPlace",data);
    };
    return (<div>
            <Swiper
                className={"swiper"}
                spaceBetween={50}
                slidesPerView={3}
                autoplay={{delay: 0, disableOnInteraction: false}}
                speed={2000} // 넘어가는 속도
                loop={true}
            >
                {dataSet ? dataSet.map((data, idx) => {
                    return (<SwiperSlide key={idx}>
                        <div onClick={() => handleClick(data)}>
                            <img
                                src={SpringAppUrl + "/upload/" + data.mainImage + ".png"}
                                alt={"image"}
                            />
                            <p>{data.priceSet}원</p>
                            <p>{data.address} | {data.name}</p>
                        </div>
                    </SwiperSlide>)
                }) : null}
                {/* slide가 최소 3개는 있어야 무한으로 돌아감 아래 슬라이드는 그것을 보여주기 위함 */}
                {/*<SwiperSlide>1</SwiperSlide>*/}
                {/*<SwiperSlide>1</SwiperSlide>*/}
                {/*<SwiperSlide>1</SwiperSlide>*/}

            </Swiper>
    </div>)
};

export default Slider;