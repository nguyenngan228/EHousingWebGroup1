import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './room.css';


import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '../../../common/alert';
import { authApi, endpoints } from '../../../../config/APIs';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Container } from 'react-bootstrap';

const PostSetail = () => {
    const [detail, setDetail] = useState(null);
    const { postId } = useParams();
    const loadPostDetail = async () => {
        try {
            let res = await authApi.get(endpoints['landlordPostDetail'](postId));
            setDetail(res.data)
        } catch (ex) {
            console.info(ex)
        }

    }
    useEffect(() => {
        loadPostDetail();
    }, [postId]);
    return (
        <Container>
            <h1 className="text-center text-info mt-1">CHI TIẾT BÀI ĐĂNG</h1>
            {/* {detail === null ? <MySpinner /> : <>
                <Row>
                    <Col md={5} xs={6}>
                        <Image src={detail.image} rounded fluid />
                    </Col>
                    <Col md={7} xs={6}>
                        <h1>{detail.title}</h1>
                        <h4 className="text-danger">{product.price} VNĐ</h4>
                    </Col>
                </Row>
            </>} */}
        </Container>
    )
}
export default PostSetail;

