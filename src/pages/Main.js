import React, { useState } from "react";
import Header from "../components/common/Header";
import  "../css/main.css";
import MainPost from "../components/post/MainPost";
import CategoryPost from "../components/category/CategoryPost";
import Comment from "../components/comment/Comment";

const Main = () => {

    return (
      <>
      <Header />
      <div className="main-button">
        <button>서울</button>
        <button>힐링</button>
        <button>대구</button>
      </div> 
      <div className="main-container">   
        <div className="main-content">
          <div className="main-recommend">
            <MainPost />
          </div>
          <div className="main-category">
            <CategoryPost />
          </div>
            <Comment />
        </div>
      </div>
    </>
  )
}

export default Main;