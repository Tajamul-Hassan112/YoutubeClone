
import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import moment from "moment";

import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";

import { API_KEY, value_converter } from "../../data";
import { useParams } from 'react-router-dom';


const PlayVideo = ({ categoryId }) => {
    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentsData, setCommentsData] = useState([]);
    const {videoId}=useParams()
  
    useEffect(() => {
      async function videoDetails() {
        try {
          const video_details_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
          const response = await fetch(video_details_url);
          const data = await response.json();
          setApiData(data.items[0]);
        } catch (error) {
          console.error("Error fetching video details:", error);
        }
      }
      videoDetails();
    }, [videoId]);
  
    useEffect(() => {
      async function fetchdetailsOther() {
        try {
          if (apiData) {
            const other_data = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData?.snippet.channelId}&key=${API_KEY}`;
            const result = await fetch(other_data);
            const output = await result.json();
            setChannelData(output.items[0]);
          }
        } catch (error) {
          console.error("Error fetching channel details:", error);
        }
      }
      fetchdetailsOther(); // Call the function here
    }, [apiData]);
  
    useEffect(() => {
      async function fetchCommentsData() {
        try {
          if (apiData) {
            const comment_details = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=56&videoId=${videoId}&key=${API_KEY}`;
            const response = await fetch(comment_details);
            const data = await response.json();
            setCommentsData(data.items);
          }
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      }
      fetchCommentsData(); // Call the function here
    }, [apiData, videoId]);
  


  return (
    <div className="play-video">
     <iframe
    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
    frameBorder="0" // Use frameBorder instead of frameborder
    allowFullScreen // Use allowFullScreen instead of allowfullscreen
    style={{ width: '100%', height: '500px' }} // Set a specific height
></iframe>


      <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
      <div className="play-video-info">
        <p>
          {apiData
            ? `${value_converter(apiData.statistics.viewCount)} views ${moment(
                apiData.snippet.publishedAt
              ).fromNow()}`
            : "20k views 2 days ago"}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData ? value_converter(apiData.statistics.likeCount) : "155K"}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData?channelData.snippet.thumbnails.default.url:''} alt="" />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
          <span>
            {channelData ? value_converter(channelData.statistics.subscriberCount ): "1M"}{" "}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="video-description">
        <p>
          {apiData
            ? apiData.snippet.description.slice(0, 250)
            : "Description Here"}
        </p>
        <hr />
        
        
        <h4>{apiData ? value_converter(apiData.statistics.commentCount) : "102"} Comments</h4>
        {
            commentsData.map((item,index)=>{
                return (
                    <div className="comment" key={index}>
                    <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                    <div>
                      <h3>
                        {item.snippet.topLevelComment.snippet.authorDisplayName}<span>1 day ago</span>
                      </h3>
                      <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                      <div className="comment-action">
                        <img src={like} alt="" />
                        <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                        <img src={dislike} alt="" />
                      </div>
                    </div>
                  </div>
                    
                )
            })
        }
       
       
      </div>
    </div>
  );
};

export default PlayVideo;
