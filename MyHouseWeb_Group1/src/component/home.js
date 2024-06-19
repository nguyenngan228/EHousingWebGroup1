import React, { useState, useEffect } from 'react';
import { Carousel, Card, Spinner } from 'react-bootstrap';
import NumberFormat from "react-number-format";
import APIs, { endpoints } from '../config/APIs';

const Home=()=> {
    const [rooms, setRooms] = useState(null);

    const loadLandlordPost = async () => {
        try {
            let res = await APIs.get(endpoints['landlordPost']);
            setRooms(res.data)
            console.info(res)
        } catch (ex) {
            console.error(ex);
        }
    }
    useEffect(() => {
        loadLandlordPost();
    }, [])


    return (
        <>
            <Carousel className="banner">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/banner-1.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3 className="text-white">Kênh thông tin Phòng Trọ số 1 Việt Nam</h3>
                        <p>Kênh thông tin Phòng Trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn,
                            căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/banner-2.jpg"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3 className="text-white">Chi phí thấp, hiệu quả tối đa</h3>
                        <p>Không phải tốn nhiều công sức và chi phí cho việc đăng tin cho thuê: từ việc phát tờ rơi, dán
                            giấy, và đăng lên các website khác nhưng hiệu quả không cao.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/banner-3.jpg"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3 className="text-white">Bạn đang có phòng trọ / căn hộ cho thuê?</h3>
                        <p>Không phải lo tìm người cho thuê, phòng trống kéo dài</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <section className="search-sec">
                <div className="container">
                    <form action="#" method="post" noValidate="novalidate">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    
                                    <div className="col-lg-3 col-12 p-0">
                                        <select className="form-control search-slt" id="province" >
                                            <option value="">Chọn tỉnh thành</option>
                                    
                                        </select>
                                    </div>
                                    <div className="col-lg-3 col-12 p-0">
                                        <select className="form-control search-slt" id="province">
                                            <option value="">Chọn quận huyện</option>
                            
                                        </select>
                                    </div>
                                    <div className="col-lg-3 col-12 p-0">
                                        <select className="form-control search-slt" id="province">
                                            <option value="">Chọn quận huyện</option>
                    
                                        </select>
                                    </div>
                                    <div className="col-lg-3 col-12 p-0">
                                        <button type="button" className="btn bg-gradient btn-danger wrn-btn">Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            <div className="container py-5 w-75">
                <div className="row room-items">
                    {rooms === null ? (
                        <Spinner animation="border" />
                    ) : (
                        rooms.map(c => (
                            <div key={c.id} className="col-lg-4 col-12 d-grid justify-content-center pb-5">
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src='https://res.cloudinary.com/dc5gyjv8c/image/upload/v1713025498/uyqa8u9seyahpnk0k324.png' />
                                    <Card.Body>
                                        <Card.Title>{c.post.title && c.post.title}</Card.Title>
                                        <Card.Text>
                                            {c.post.content && c.post.content} <br />
                                            Giá: <span className="fw-bold"><NumberFormat value={c.room.price} displayType={'text'} thousandSeparator={true} /> (VND)</span> <br />
                                            {c.room.address && c.room.address}
                                        </Card.Text>
                                        <a href={`/landlordposts/${c.post.id}/`} className="cs-btn-detail btn btn-default text-white">Chi tiết</a>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );

};

export default Home;