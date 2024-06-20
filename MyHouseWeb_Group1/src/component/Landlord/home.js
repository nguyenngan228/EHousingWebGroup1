import React, { useState, useEffect } from 'react';
import { Carousel, Card, Spinner, Form, Button } from 'react-bootstrap';
import APIs, { endpoints } from '../../config/APIs';
import { getCities, getDistricts, getWards } from '../../config/APIAdress';


const HomeLandlord = () => {
    const [rooms, setRooms] = useState(null);
    const [maxOccupants, setMaxOccupants] = useState('')
    const [minPrice, setminPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [result, setResult] = useState(null)


    const tenantPost = async () => {
        try {
            let res = await APIs.get(endpoints['tenantPost']);
            setRooms(res.data)
        } catch (ex) {
            console.error(ex);
        }
    }
    useEffect(() => {
        tenantPost();
    }, [])

    const kw = `/api/tenantpost/?maxOccupants=${maxOccupants}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    console.log(kw)


    const search = async () => {
        try {
            const res = await APIs.get(endpoints['searchTeantPostByKw'](kw))
            console.log('===================')
            console.log(res.data)
            setResult(res.data)
        } catch (ex) {
            console.error(ex)
        }

    }


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
                    <Form onSubmit={search} className="mt-5">
                        <div className="row align-items-center">
                            <div className="col-lg-4">
                                <Form.Group key={maxOccupants} className="mb-3" controlId={maxOccupants}>
                                    <Form.Control onChange={e => setMaxOccupants(e.target.value)} value={maxOccupants} className="mb-3" placeholder="Số người ở" />
                                </Form.Group>
                            </div>
                            <div className="col-lg-4">
                                <Form.Group key={minPrice} className="mb-3" controlId={minPrice}>
                                    <Form.Control onChange={e => setminPrice(e.target.value)} value={minPrice} className="mb-3" placeholder="Từ giá" />
                                </Form.Group>
                            </div>
                            <div className="col-lg-4">
                                <Form.Group key={maxPrice} className="mb-3" controlId={maxPrice}>
                                    <Form.Control onChange={e => setMaxPrice(e.target.value)} value={maxPrice} className="mb-3" placeholder="Đến giá" />
                                </Form.Group>
                            </div>

                        </div>
                        <div>
                            <Button type="submit" className="mt-3 btn btn-default text-white" variant="primary" >
                                Search
                            </Button>
                        </div>
                    </Form>
                </div>
            </section>
            <div className="container py-5 w-75">
                <div className="row room-items">
                    {result === null ? (
                        rooms === null ? (
                            <Spinner animation="border" />
                        ) : (
                            rooms.map(c => (
                                <div key={c.id} className="col-lg-4 col-12 d-grid justify-content-center pb-5">
                                    <Card style={{ width: '18rem', height: '15rem' }}>
                                        <Card.Body>
                                            <Card.Title>{c.post.title}</Card.Title>
                                            <Card.Text>
                                                {c.post.content} <br />
                                                Số người ở: {c.maxOccupants} <br />
                                                Giá từ: {c.minPrice} - {c.maxPrice} <br />
                                                Địa chỉ: {c.address}
                                            </Card.Text>
                                            <a href={`/tenantpost/${c.post.id}/`} className="cs-btn-detail btn btn-default text-white">Chi tiết</a>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))
                        )
                    ) : (
                        result.map(c => (
                            <div key={c.id} className="col-lg-4 col-12 d-grid justify-content-center pb-5">
                                <Card style={{ width: '18rem', height: '15rem' }}>
                                    <Card.Body>
                                        <Card.Title>{c.post.title}</Card.Title>
                                        <Card.Text>
                                            {c.post.content} <br />
                                            Số người ở: {c.maxOccupants} <br />
                                            Giá từ: {c.minPrice} - {c.maxPrice} <br />
                                            Địa chỉ: {c.address}
                                        </Card.Text>
                                        <a href={`/tenantpost/${c.post.id}/`} className="cs-btn-detail btn btn-default text-white">Chi tiết</a>
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

export default HomeLandlord;
