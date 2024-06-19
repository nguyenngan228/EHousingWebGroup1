import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { authApi, endpoints } from "../../config/APIs";
import NumberFormat from "react-number-format";

const ProfileLandlord = () => {
    const { userId } = useParams()
    const [user, setUser] = useState(null)
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [post, setPost] = useState(null);

    const loadUser = async () => {
        try {
            let res = await authApi().get(endpoints['loadUser'](userId))
            setUser(res.data)
            console.log(res.data)
        } catch (ex) {
            console.error(ex)
        }



    }
    const loadPost = async () => {
        try {
            let res = await authApi().get(endpoints['landlordPostByUserId'](userId))
            setPost(res.data)
            console.log(res.data)
        } catch (ex) {
            console.log(ex)
        }

    }
    const loadStatusFollow = async()=>{
        try{
            let res = await authApi().get(endpoints['checkFollow'](userId))
            setIsFollowing(res.data.followed)
        }catch(ex){
            console.error(ex)
        }
    }





    const handleFollow = async () => {
        setLoading(true);
        try {
            let response = await authApi().post(endpoints['follow'](userId))
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };




    useEffect(() => {
        loadPost()
    }, [userId])

    useEffect(() => {
        loadUser()
    }, [userId])


    useEffect(() => {
        loadStatusFollow()
    }, [userId])
    




    return (
        <div className="mb-4">
            {user === null ? (
                <Spinner animation="border" />
            ) : (
                <>
                    <div className="room-box">
                        <div className="container py-5">
                            <div className="row">
                                <div className="col-lg-3 col-md-4 col-sm-12">
                                    <img className="rounded-circle profile-img" src={user.avatar} alt="Profile" />
                                    <br />
                                    <br />
                                    <div className="room-details-container">
                                        <div className="room-details">
                                            <p>
                                                <span className="bold">{user.landlord.fullName}</span>
                                            </p>
                                            <p>
                                                <span className="bold">{user.landlord.phoneNumber}</span>
                                            </p>
                                            <p>
                                                <span className="bold">{user.landlord.street}</span>
                                            </p>
                                            <button
                                                style={{
                                                    ...styles.btn,
                                                    ...(isFollowing ? styles.btnFollowing : styles.btnFollow),
                                                    ...(loading ? styles.disabled : {})
                                                }}
                                                onClick={handleFollow}
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <span>Loading...</span>
                                                ) : isFollowing ? (
                                                    <>
                                                        <i className="fas fa-check"></i> Đang theo dõi
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="fas fa-plus"></i> Theo dõi
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-9 col-md-8 col-sm-12">
                                    <div className="container py-5">
                                        <div className="row room-items">
                                            {post === null ? (
                                                <Spinner animation="border" />
                                            ) : (
                                                post.map((c, index) => (
                                                    <div
                                                        key={c.id}
                                                        className={`col-lg-4 col-12 d-grid justify-content-center pb-5 ${index % 3 !== 2 ? 'mr-lg-4' : ''
                                                            }`}
                                                    >
                                                        <Card style={{ width: '12rem' }}>
                                                            <Card.Img variant="top" src='https://res.cloudinary.com/dc5gyjv8c/image/upload/v1713025498/uyqa8u9seyahpnk0k324.png' alt="Room" />
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
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            )}
        </div>
    );
}
export default ProfileLandlord;
const styles = {
    btn: {
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
    },
    btnFollow: {
        backgroundColor: '#FFA726',
        color: 'white',
    },
    btnFollowing: {
        backgroundColor: '#FFF3E0',
        color: '#FB8C00',
        border: '1px solid #FB8C00',
    },
    disabled: {
        opacity: 0.6,
        cursor: 'not-allowed',
    }
};
