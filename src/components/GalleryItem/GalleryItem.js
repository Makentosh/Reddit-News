import React from 'react';
import './GalleryItem.scss';

const GalleryItem = ({data}) => {
  return (
    <div className="gallery-item">
      <img src={data.thumbnail}
           className="gallery-item__image"
           alt=""/>
      <div className="gallery-item__title">
        {data.title}
      </div>
      <div className="gallery-item__comments">
        Comment count: {data.num_comments}
      </div>
      <a href={`https://www.reddit.com/${data.permalink}`}
         target="_blank"
         rel="noopener noreferrer"
         className="gallery-item__link"
      >
        Link
      </a>
    </div>
  )
};

export default GalleryItem;
