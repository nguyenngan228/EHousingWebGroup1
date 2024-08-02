import { useContext, useEffect, useState } from "react";
import { authApi, endpoints } from "../../config/APIs";
import { MyUserContext } from "../../config/Contexts";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const MyLandlordPost = () => {
    const user = useContext(MyUserContext)
    const [post, setPost] = useState(null)
    const [img, setImg] = useState(null)



    const getPost = async () => {
        try {
            let res = await authApi().get(endpoints['landlordPostByUserId'](user.id))
            setPost(res.data)
            

        } catch (ex) {
            console.error(ex)
        }

    }
    

    useEffect(() => {
        getPost()
    }, [user.id])



    return (
        <div className="container py-5 w-75">
            <div className="row room-items">
                {post === null ? (
                    <Spinner animation="border" />
                ) : (
                    post.map(c => (
                        <div key={c.id} className="col-lg-4 col-12 d-grid justify-content-center pb-5">
                            <Card style={{ width: '18rem', height: '35rem' }}>
                                <Card.Img
                                    variant="top"
                                    src={c.room.imageSet[0].image}
                                />
                                <Card.Body>
                                    <Card.Title>{c.post.title}</Card.Title>
                                    <Card.Text>
                                        {c.post.content} <br />
                                        Giá: <span className="fw-bold"><NumberFormat value={c.room.price} displayType={'text'} thousandSeparator={true} /> (VND)</span> <br />
                                        {c.room.address}
                                    </Card.Text>
                                    <a href={`/landlordposts/${c.post.id}/`} className="cs-btn-detail btn btn-default text-white">Chi tiết</a>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                )}
            </div>
        </div>
    )

}
export default MyLandlordPost;