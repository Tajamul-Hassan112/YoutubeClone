

import React, { useEffect, useState } from 'react'
 import "./Recommended.css"
 import { API_KEY, value_converter } from '../../data'
 import { Link } from 'react-router-dom'
const Recommended = ({ categoryId }) => {
    const [recomData, setRecomData] = useState([]);


    async function fetchData() {
        const relatedVideo = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
        const response = await fetch(relatedVideo);
        const data = await response.json();
        setRecomData(data.items); // Set recomData with data.items array
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='recom'>
            {
                recomData.map((item, index) => {
                    return (
                        <Link  to={`/video/${item.snippet.categoryId}/${item.id}`} className='side-video-list' key={index}>
                            <img src={item.snippet.thumbnails.medium.url} alt="" />
                            <div className="video-info">
                                <h4>{item.snippet.title}</h4>
                                <p>{item.snippet.channelTitle}</p>
                                <p>{value_converter(item.statistics.viewCount)} views</p>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    );
}

export default Recommended;
