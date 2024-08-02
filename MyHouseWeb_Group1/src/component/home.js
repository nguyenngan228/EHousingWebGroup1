import React, { useState, useEffect } from 'react';
import { Carousel, Card, Spinner, Form, Button, Pagination } from 'react-bootstrap';
import NumberFormat from "react-number-format";
import APIs, { endpoints } from '../config/APIs';

const Home = () => {
    const [rooms, setRooms] = useState(null);
    const [maxOccupants, setMaxOccupants] = useState('')
    const [price, setPrice] = useState('')
    const [result, setResult] = useState(null)
    const [page, setPage] = useState(1); // Trang hiện tại
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang

    const loadLandlordPost = async () => {
        try {
            let res = await APIs.get(endpoints['landlordPost'](page));
            setRooms(res.data.posts)
            setTotalPages(res.data.totalPages)
        } catch (ex) {
            console.error(ex);
        }
    }
    useEffect(() => {
        loadLandlordPost();
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

    const kw = `maxOccupants=${maxOccupants}&price=${price}&page=${page}`


    const search = async (e) => {
        e.preventDefault();
        try {
            const res = await APIs.get(endpoints['searchLandlordPostByKw'](kw))
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
                                        <Form.Group controlId="price">
                                            <Form.Control
                                                onChange={e => setPrice(e.target.value)}
                                                value={price}
                                                placeholder="Nhập giá mong muốn"
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
                                    <Card style={{ width: '18rem', height: '35rem' }}>
                                        <Card.Img variant="top" src={c.room.imageSet[0].image} />
                                        <Card.Body>
                                            <Card.Title>{c.post.title}</Card.Title>
                                            <Card.Text>
                                                {/* {c.post.content} <br /> */}
                                                Giá: <span className="fw-bold"><NumberFormat value={c.room.price} displayType={'text'} thousandSeparator={true} /> (VND)</span> <br />
                                                {c.room.address} <br />
                                                Số người ở: {c.room.maxOccupants}
                                            </Card.Text>
                                            <a href={`/landlordposts/${c.post.id}/`} className="cs-btn-detail btn btn-default text-white">Chi tiết</a>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))
                        )

                    ) : (
                        result.map(c => (
                            <div key={c.id} className="col-lg-4 col-12 d-grid justify-content-center pb-5">
                                <Card style={{ width: '18rem', height: '35rem' }}>
                                    <Card.Img variant="top" src='https://res.cloudinary.com/dc5gyjv8c/image/upload/v1713025498/uyqa8u9seyahpnk0k324.png' />
                                    <Card.Body>
                                        <Card.Title>{c.post.title}</Card.Title>
                                        <Card.Text>
                                            {c.post.content} <br />
                                            Giá: <span className="fw-bold"><NumberFormat value={c.room.price} displayType={'text'} thousandSeparator={true} /> (VND)</span> <br />
                                            {c.room.address} <br />
                                            Số người ở: {c.room.maxOccupants}
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









// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { Carousel, Card, Spinner, Container } from 'react-bootstrap';
// import APIs, { API_URL, authApi, endpoints } from '../config/APIs';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import MapboxMap from './MapSearch';




// const Home = () => {
//     // const [rooms, setRooms] = useState(null);

//     const [provinces, setProvinces] = useState([]);
//     const [districts, setDistricts] = useState([]);
//     const [wards, setWards] = useState([]);

//     const [selectedProvince, setSelectedProvince] = useState('');
//     const [selectedDistrict, setSelectedDistrict] = useState('');
//     const [selectedWard, setSelectedWard] = useState('');
//     const [address, setAddress] = useState('');
//     const [location, setLocation] = useState(null);
//     const [posts, setPosts] = useState([]); // State for the posts
//     const [radius, setRadius] = useState(); // Add state for radius

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const history = useHistory();
//     // const tenantPost = async () => {
//     //     try {
//     //         let res = await APIs.get(endpoints.tenantPost);
//     //         setRooms(res.data)
//     //         console.log(res.data);
//     //     } catch (ex) {
//     //         console.error(ex);
//     //     }
//     // }
//     // useEffect(() => {
//     //     tenantPost();
//     // }, [])

//     useEffect(() => {
//         axios.get('https://vapi.vnappmob.com/api/province/')
//             .then(response => setProvinces(response.data.results))
//             .catch(error => console.error('Error fetching provinces:', error));
//     }, []);

//     useEffect(() => {
//         if (selectedProvince) {
//             axios.get(`https://vapi.vnappmob.com/api/province/district/${selectedProvince}`)
//                 .then(response => {
//                     setDistricts(response.data.results);
//                     setWards([]);
//                     setSelectedDistrict('');
//                     setSelectedWard('');
//                 })
//                 .catch(error => console.error('Error fetching districts:', error));
//         }
//     }, [selectedProvince]);

//     useEffect(() => {
//         if (selectedDistrict) {
//             axios.get(`https://vapi.vnappmob.com/api/province/ward/${selectedDistrict}`)
//                 .then(response => setWards(response.data.results))
//                 .catch(error => console.error('Error fetching wards:', error));
//         }
//     }, [selectedDistrict]);

//     useEffect(() => {
//         const province = provinces.find(p => p.province_id === selectedProvince)?.province_name || '';
//         const district = districts.find(d => d.district_id === selectedDistrict)?.district_name || '';
//         const ward = wards.find(w => w.ward_id === selectedWard)?.ward_name || '';

//         const addressArray = [ward, district, province].filter(Boolean);
//         setAddress(addressArray.join(', '));
//     }, [selectedProvince, selectedDistrict, selectedWard]);
//     useEffect(() => {

//     }, [location, posts])


//     const handleSearch = async () => {
//         setLoading(true); // Set loading state to true when starting search
//         setError(null); // Clear previous error messages

//         try {
//             const mapboxResponse = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json', {
//                 params: {
//                     access_token: 'pk.eyJ1IjoidGhhb2RvYW4yMDAyIiwiYSI6ImNseGlwaXlwejFmdzgyanIyd2Q2dG8wYXAifQ.FBkm_UbA0EhR6nJsC_kxpg' // Replace with your Mapbox access token
//                 }
//             });

//             if (mapboxResponse.data.features && mapboxResponse.data.features.length > 0) {
//                 const location2 = mapboxResponse.data.features[0].geometry.coordinates; // [lng, lat]
//                 setLocation(location2);


//                 try {
//                     const postsResponse = await APIs.get(endpoints.getlLandlordPost, {
//                         params: {
//                             lat: location2[1],
//                             lng: location2[0],
//                             radius: radius,
//                         }
//                     });

//                     setPosts(postsResponse.data);
//                     console.log('Nearby Posts Response:', postsResponse.data);
//                 } catch (postsError) {
//                     console.error('Error fetching nearby posts:', postsError);
//                     setError('Error fetching nearby posts');
//                 }

//             } else {
//                 console.error('No location found for the address:', address);
//                 setError('No location found for the address');
//             }
//         } catch (geocodingError) {
//             console.error('Error geocoding address:', geocodingError);
//             setError('Error geocoding address');
//         } finally {
//             setLoading(false); // Set loading state to false
//         }
//     };

//     return (
//         <>
//             <Carousel className="banner">
//                 <Carousel.Item>
//                     <img
//                         className="d-block w-100"
//                         src="/banner-1.jpg"
//                         alt="First slide"
//                     />
//                     <Carousel.Caption>
//                         <h3 className="text-white">Kênh thông tin Phòng Trọ số 1 Việt Nam</h3>
//                         <p>Kênh thông tin Phòng Trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn,
//                             căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.</p>
//                     </Carousel.Caption>
//                 </Carousel.Item>
//                 <Carousel.Item>
//                     <img
//                         className="d-block w-100"
//                         src="/banner-2.jpg"
//                         alt="Second slide"
//                     />
//                     <Carousel.Caption>
//                         <h3 className="text-white">Chi phí thấp, hiệu quả tối đa</h3>
//                         <p>Không phải tốn nhiều công sức và chi phí cho việc đăng tin cho thuê: từ việc phát tờ rơi, dán
//                             giấy, và đăng lên các website khác nhưng hiệu quả không cao.</p>
//                     </Carousel.Caption>
//                 </Carousel.Item>
//                 <Carousel.Item>
//                     <img
//                         className="d-block w-100"
//                         src="/banner-3.jpg"
//                         alt="Third slide"
//                     />

//                     <Carousel.Caption>
//                         <h3 className="text-white">Bạn đang có phòng trọ / căn hộ cho thuê?</h3>
//                         <p>Không phải lo tìm người cho thuê, phòng trống kéo dài</p>
//                     </Carousel.Caption>
//                 </Carousel.Item>
//             </Carousel>
//             <section className="search-sec">
//                 <div className="container">
//                     <form action="#" method="post" noValidate="novalidate">
//                         <div className="row">
//                             <div className="col-lg-12">
//                                 <div className="row">
//                                     <div className="col-lg-3 col-12 p-0" style={{ marginRight: '10px', marginBottom: '10px' }}>
//                                         <select value={selectedProvince} className='search-slt' onChange={(e) => setSelectedProvince(e.target.value)}>
//                                             <option value="">Chọn tỉnh/thành phố</option>
//                                             {provinces.map(province => (
//                                                 <option key={province.province_id} value={province.province_id}>{province.province_name}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                     <div className="col-lg-3 col-12 p-0" style={{ marginRight: '10px', marginBottom: '10px' }}>
//                                         <select value={selectedDistrict} className='search-slt' onChange={(e) => setSelectedDistrict(e.target.value)}>
//                                             <option value="">Chọn quận/huyện</option>
//                                             {districts.map(district => (
//                                                 <option key={district.district_id} value={district.district_id}>{district.district_name}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                     <div className="col-lg-3 col-12 p-0" style={{ marginRight: '10px', marginBottom: '10px' }}>
//                                         <select value={selectedWard} className='search-slt' onChange={(e) => setSelectedWard(e.target.value)}>
//                                             <option value="">Chọn phường/xã</option>
//                                             {wards.map(ward => (
//                                                 <option key={ward.ward_id} value={ward.ward_id}>{ward.ward_name}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                     <div className="col-lg-2 col-12 p-0" style={{ marginBottom: '10px' }}>
//                                         <input
//                                             type="number"
//                                             className="search-slt"
//                                             placeholder="Nhập bán kính (km)"
//                                             value={radius}
//                                             onChange={(e) => setRadius(e.target.value)}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="p-0 text-center" style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
//                             <button
//                                 type="button"
//                                 onClick={handleSearch}
//                                 className="btn bg-gradient btn-danger wrn-btn"
//                                 style={{ width: '150px', padding: '10px 20px' }}
//                             >
//                                 Search
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </section>
//             <div className="container py-5 w-75">
//                 {location && (
//                     <Container>
//                         <MapboxMap location={location} posts={posts} />
//                     </Container>
//                 )}

//                 {error && <p style={{ color: 'red' }}>{error}</p>}
//             </div>
//             <div className="container py-5 w-75">
//                 <div className="row room-items">
//                     {posts === null ? (
//                         <Spinner animation="border" />
//                     ) : (
//                         posts.map(c => (
//                             <div key={c.id} className="col-lg-4 col-12 d-grid justify-content-center pb-5">
//                                 <Card style={{ width: '18rem' }}>
//                                     <Card.Img variant="top" src='https://res.cloudinary.com/dc5gyjv8c/image/upload/v1713025498/uyqa8u9seyahpnk0k324.png' />
//                                     <Card.Body>
//                                         <Card.Title>{c.postId.title && c.postId.title}</Card.Title>
//                                         <Card.Text>
//                                             {c.postId.content && c.postId.content} <br />
//                                             {/* Giá: <span className="fw-bold"><NumberFormat value={c.room.price} displayType={'text'} thousandSeparator={true} /> (VND)</span> <br /> */}
//                                             {c.roomId.address && c.roomId.address}
//                                         </Card.Text>
//                                         <a href={`/landlordposts/${c.postId.id}/`} className="cs-btn-detail btn btn-default text-white">Chi tiết</a>
//                                     </Card.Body>
//                                 </Card>
//                             </div>
//                         ))
//                     )}
//                 </div>
//             </div>


//         </>
//     );

// };

// export default Home;