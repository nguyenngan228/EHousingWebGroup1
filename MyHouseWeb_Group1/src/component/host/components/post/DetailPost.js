import { useEffect, useState } from "react";
import APIs, { authApi, endpoints } from "../../../../config/APIs";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Form, Spinner } from "react-bootstrap";

const TenantDetailPost = () => {
    const [postDetail, setPostDetail] = useState(null)
    const { detailId } = useParams();
    const [cmt, setCmt] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [listComment, setListComment] = useState(null)



    const loadPost = async () => {
        try {
            let res = await authApi().get(endpoints['tenantPostDetail'](detailId))
            setPostDetail(res.data)
        } catch (ex) {
            console.error(ex)
        }


    }
    useEffect(() => {
        loadPost();
    }, [detailId])

    const loadCmt = async () => {
        try {
            let res = await authApi().get(endpoints['listCmt'](detailId))
            setListComment(res.data)
        } catch (ex) {
            console.error(ex)
        }
    }
    useEffect(() => {
        loadCmt();
    }, [detailId])


    const addComment = async () => {
        try {
            let res = await authApi().post(endpoints['comment'](detailId), {
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
   

    return (
        <div style={styles.containerCenter}>
            {postDetail === null ? (
                <Spinner animation="border" />
            ) : (
                <>
                    <div style={styles.roomDetails}>
                        <div>
                            <h1>{postDetail.post.title}</h1>
                            <p>
                                <span className="bold">Nội dung: </span>
                                {postDetail.post.content}
                            </p>
                            <p>
                                <span className="bold">Ngày đăng: </span>
                                {postDetail.post.createdAt}
                            </p>
                            <p>
                                <span className="bold">Địa chỉ: </span>
                                {postDetail.address}
                            </p>
                        </div>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Control onChange={e => setCmt(e.target.value)} value={cmt} type="text" placeholder="Nhập bình luận" />
                        </Form.Group>
                        <Button onClick={addComment} className="mt-3 btn btn-default text-white" variant="primary">
                            Bình luận
                        </Button>
                        <div style={styles.commentsSection}>
                            { !listComment ? (
                                <p>Chưa có bình luận nào</p>
                            ) : (
                                listComment.map(c => (
                                    <div key={c.id} style={styles.comment}>
                                        <p>{c.user.fullName}</p>
                                        <img className="rounded-circle profile-img" src={c.user.avatar} alt="Profile" style={styles.avatar} />
                                        <div style={styles.commentContent}>
                                            <p>{c.content}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const styles = {
    containerCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',

    },
    roomDetails: {
        maxWidth: '600px',
        padding: '20px'
    },
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
export default TenantDetailPost;
