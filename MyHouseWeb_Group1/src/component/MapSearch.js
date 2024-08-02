import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import cookie from 'react-cookies'

mapboxgl.accessToken = 'pk.eyJ1IjoidGhhb2RvYW4yMDAyIiwiYSI6ImNseGlwaXlwejFmdzgyanIyd2Q2dG8wYXAifQ.FBkm_UbA0EhR6nJsC_kxpg'; // Thay thế bằng access token của bạn

const MapboxMap = ({ posts, location }) => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        const user = cookie.load('user');
        console.log(user);
        if (!location) {
            console.error('Location is null or undefined');
            return;
        }

        const [lng, lat] = location;
        if (lng == null || lat == null) {
            console.error('Longitude or Latitude is null or undefined');
            return;
        }

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: 12
        });

        // Thêm điểm đánh dấu cho vị trí hiện tại (màu xanh)
        new mapboxgl.Marker({ color: 'blue' })
            .setLngLat([lng, lat])
            .addTo(map);



        if (user) {
            if (user.role === 'ROLE_LANDLORD') {
                console.log("HELOO")
                // Thêm các điểm đánh dấu cho các bài đăng (màu đỏ)
                posts.forEach(post => {
                    new mapboxgl.Marker({ color: 'red' })
                        .setLngLat([post.longitude, post.latitude])
                        .setPopup(new mapboxgl.Popup().setText(post.address)) // Hiển thị tiêu đề bài đăng
                        .addTo(map);
                });
            }
        } else if (!user) {

            posts.forEach(post => {
                new mapboxgl.Marker({ color: 'red' })
                    .setLngLat([post.longitude, post.latitude])
                    .setPopup(new mapboxgl.Popup().setText(post.postId.title + " - " + post.roomId.address)) // Hiển thị tiêu đề bài đăng
                    .addTo(map);
            });
        }


        return () => map.remove();
    }, [location, posts]);

    return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapboxMap;