import { useContext, useEffect, useState } from "react";
import { MyUserContext } from "../../../../config/Contexts";
import { authApi, endpoints } from "../../../../config/APIs";
import { Card, Spinner } from "react-bootstrap";

const MyTenantPost = () => {
    const [post, setPost] = useState(null)
    const user = useContext(MyUserContext)
    console.log(user.id)


    const getPost = async () => {
        try {
            let res = await authApi().get(endpoints['tenantPostByUserId'](user.id))
            setPost(res.data)
            console.log('==============')
            console.log(res.data)

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
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>{c.post.title && c.post.title}</Card.Title>
                                    <Card.Text>
                                        {c.post.content && c.post.content} <br /> 
                                        {c.address && c.address}
                                    </Card.Text>
                                    <a href={`/tenantpost/${c.post.id}/`} className="cs-btn-detail btn btn-default text-white">Chi tiết</a>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
export default MyTenantPost;