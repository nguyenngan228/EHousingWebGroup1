import React, { useState, useEffect } from 'react';
import { Carousel, Card, Spinner, Form, Button, Pagination } from 'react-bootstrap';
import APIs, { authApi, endpoints } from '../../config/APIs';


const HomeLandlord = () => {
    const [rooms, setRooms] = useState(null);
    const [maxOccupants, setMaxOccupants] = useState('')
    const [minPrice, setminPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [result, setResult] = useState(null)
    const [page, setPage] = useState(1); // Trang hiện tại
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang



    const tenantPost = async () => {
        try {
            let res = await APIs.get(endpoints['tenantPost'](page));
            setRooms(res.data.posts)
            setTotalPages(res.data.totalPages)
        } catch (ex) {
            console.error(ex);
        }
    }
    useEffect(() => {
        tenantPost();
    }, [page])

    const handlePageChange = (number) => {
        setPage(number); // Cập nhật trang hiện tại
    };
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === page} onClick={() => handlePageChange(number)}>
                {number}
            </Pagination.Item>
        );
    }

    const kw = `maxOccupants=${maxOccupants}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}`


    const search = async (e) => {
        e.preventDefault();
        try {
            const res = await authApi().get(endpoints['searchTeantPostByKw'](kw))
            setResult(res.data.posts)
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

                            </div>
                            <div className="row">
                                <Form onSubmit={search} className="row mb-3">
                                    <div className="col-lg-3 col-12 p-0">
                                        <Form.Group controlId="maxOccupants">
                                            <Form.Control
                                                onChange={e => setMaxOccupants(e.target.value)}
                                                value={maxOccupants}
                                                placeholder="Số người ở"
                                                className="form-control search-slt"
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-lg-3 col-12 p-0">
                                        <Form.Group controlId="minPrice">
                                            <Form.Control
                                                onChange={e => setminPrice(e.target.value)}
                                                value={minPrice}
                                                placeholder="Từ giá"
                                                className="form-control search-slt"
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-lg-3 col-12 p-0">
                                        <Form.Group controlId="maxPrice">
                                            <Form.Control
                                                onChange={e => setMaxPrice(e.target.value)}
                                                value={maxPrice}
                                                placeholder="Đến giá"
                                                className="form-control search-slt"
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-lg-3 col-12 p-0">
                                        <Button type="submit" className="btn bg-gradient btn-danger wrn-btn">Search</Button>
                                    </div>

                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container py-5 w-75">
                <div className="row room-items">
                    <div>
                        <Pagination size="sm">{items}</Pagination>
                    </div>
                    {result === null ? (
                        rooms === null ? (
                            <Spinner animation="border" />
                        ) : (
                            rooms.map(c => (
                                <div key={c.id} className="col-lg-4 col-12 d-grid justify-content-center pb-5">
                                    <Card style={{ width: '18rem', height: '18rem' }}>
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
                                <Card style={{ width: '18rem', height: '18rem' }}>
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








