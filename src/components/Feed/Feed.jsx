import React, { useEffect, useState } from 'react'
import "./Feed.css"
import {Link} from "react-router-dom"
import moment from 'moment';

import { API_KEY, value_converter } from '../../data'

const Feed = ({category}) => {
    const[data,setData]=useState([])
    async function fetchdata(){
        const videoList_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=75&regionCode=in&videoCategoryId=${category}&key=${API_KEY} `
        const response=await fetch(videoList_url)
        const data=await response.json()
        setData(data.items)
    }
    useEffect(()=>{
        fetchdata();
    },[category])
  return (
    <div className='feed'>
        {
            data.map((item,index)=>{
                return (

                    <Link  key={index} to={`video/${item.snippet.categoryId}/${item.id}`} className='card'>
                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                    <h2>{item.snippet.title}</h2>
                    <h3>{item.snippet.channelTitle}</h3>
                    <p>{value_converter(item.statistics.viewCount)}. &bull; {moment(item.snippet.publishedAt).fromNow()}</p>

                  </Link>
                )
                
            })
        }

    
    </div>
   
  )
}

export default Feed
