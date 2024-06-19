import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";

const ImageSlick = ({ images }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <Slider {...settings}>
            {images === null || images === undefined ? (
                <Spinner animation="border" />
            ) : (
                images.map((item) => (
                    <div key={item.id} className="room-box-img">
                        <Image src={item.image} fluid />
                    </div>
                ))
            )}
        </Slider>
    );
};

export default ImageSlick;
