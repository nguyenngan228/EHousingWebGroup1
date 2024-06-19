import React, { useState, useEffect } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import ImageSlider from "./ImageSlider";
import { authApi, endpoints } from '../../config/APIs';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
const RoomDetail = () => {
    const [room, setRoom] = useState(null);
    const [img, setImg] = useState(null);
    const { id } = useParams();
    const [cmt, setCmt] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [listComment, setListComment] = useState(null)

    const loadPostDetail = async () => {
        try {
            let res = await authApi().get(endpoints['landlordPostDetail'](id));
            setRoom(res.data)
            let resp = await authApi().get(endpoints['roomDetail'](res.data.room.id))
            setImg(resp.data)
        } catch (ex) {
            console.info(ex)
        }


    }
    useEffect(() => {
        loadPostDetail();
    }, [id]);

    const addComment = async () => {
        try {
            let res = await authApi().post(endpoints['comment'](id), {
                "content": cmt
            })
            setCmt("");
            setListComment([res.data, ...listComment]);
            setIsFollowing(true)

        } catch (ex) {
            console.error(ex)
        } finally {
            setIsFollowing(false)
        }
    }
    const loadCmt = async () => {
        try {
            let res = await authApi().get(endpoints['listCmt'](id))
            setListComment(res.data)
            console.log('============')
            console.log(res.data)
        } catch (ex) {
            console.error(ex)
        }
    }
    useEffect(() => {
        loadCmt();
    }, [id])



    return (
        <div className="mb-4">
            {room === null ? (
                <Spinner animation="border" />
            ) : (
                <>
                    {Object.keys(room).length !== 0 &&
                        <div className="room-box">
                            <div className="room-slide-img">
                                <ImageSlider images={img} />
                            </div>
                            <br />
                            <br />
                            <div className="room-details-container">
                                <div className="room-details">
                                    <div style={containerStyle}>
                                        <div style={leftColumnStyle}>
                                            <h1>{room.post.title}</h1>
                                            <p>
                                                <span className="bold">Nội dung </span>
                                                {room.post.content}
                                            </p>
                                            <p>
                                                <span className="bold">Ngày đăng </span>
                                                {room.post.createdAt}
                                            </p>
                                            <p>
                                                <span className="bold">Tên phòng </span> {room.room.name}
                                            </p>
                                            <p>
                                                <span className="bold">Giá cả </span> {room.room.price} (VND)
                                            </p>
                                            <p>
                                                <span className="bold">Địa chỉ </span> {room.room.address}
                                            </p>
                                            <p>
                                                <span className="bold">Số người ở </span> {room.room.maxOccupants}
                                            </p>
                                        </div>
                                        <div style={{ ...rightColumnStyle, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <img className="rounded-circle profile-img" src={room.post.user.avatar} alt="User avatar" />
                                            <p>
                                                <span className="bold"></span> {room.post.user.fullName}
                                            </p>
                                            <p>
                                                <span className="bold"></span> {room.post.user.landlord.phoneNumber}
                                            </p>
                                            <a href={`/users/${room.post.user.id}/`} className="cs-btn-detail btn btn-default text-white">Xem trang</a>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <Form.Group className="mb-3 d-flex align-items-center" controlId="formBasicCheckbox">
                                            <Form.Control
                                                onChange={e => setCmt(e.target.value)}
                                                value={cmt}
                                                type="text"
                                                placeholder="Nhập bình luận"
                                            />
                                            <Button onClick={addComment} className="ms-2 mt-3 btn btn-default text-white">
                                                Bình luận
                                            </Button>
                                        </Form.Group>
                                    </div>

                                    <div style={styles.commentsSection}>
                                        {listComment === null ? (
                                            <p>Chưa có bình luận nào</p>
                                        ) : (
                                            listComment.map(c => (
                                                <div key={c.id} style={styles.comment}>
                                                    <p>{c.userId.fullName}</p>
                                                    <img className="rounded-circle profile-img" src={c.userId.avatar} alt="Profile" style={styles.avatar} />
                                                    <div style={styles.commentContent}>
                                                        <p>{c.content}</p>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>


                                </div>
                            </div>
                        </div>
                    }
                </>
            )}
        </div>
    );
};


export default RoomDetail;

const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
};

const leftColumnStyle = {
    flex: 3,
    marginRight: '20px',
};

const rightColumnStyle = {
    flex: 1,



};
const styles = {
    comment: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
    },
    avatar: {
        width: '50px',
        height: '50px',
        marginRight: '10px',
    },
    commentContent: {
        margin: '20px',
        backgroundColor: '#f1f1f1',
        padding: '10px',
        borderRadius: '10px',
        flex: 1
    }
};