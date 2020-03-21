import React from 'react';
import './Gallery.scss'
import GalleryItem from '../GalleryItem';
import Loader from '../Loader';

class Gallery extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      gallery: [],
      loading: false,
      autoRefresh: false,
      minComments: 0
    }
  }


  componentDidMount() {
    this.getGallery()
  }


  getGallery = () => {
    this.setState({
      loading: true
    });
    fetch('https://www.reddit.com/r/reactjs.json?limit=100')
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            gallery: data.data.children,
            loading: false
          });
        })
  };

  autoReload = () => {
    this.setState(
        state => ({
          autoRefresh: !this.autoRefresh
        }),

        () => {
          this.state.autoRefresh ? this.autoRefresh = setInterval(this.getGallery, 3000)
                                  : clearInterval(this.autoRefresh)
      }
    )
  };

  updateComment = (event) =>{
    this.setState({
      minComments: Number(event.target.value)
    })
  };

  render() {
    const { gallery, loading, minComments } = this.state;
    const itemSortedByComents = gallery
        .filter(item => item.data.num_comments >= minComments)
        .sort((a,b) => b.data.num_comments - a.data.num_comments);


    return (
      <div className="gallery-page">
        <div className="gallery-page__container">
          <div className="gallery-page__title">
            Top commented
          </div>
          <div>Current filter: {minComments}</div>
          <button onClick={this.autoReload}>
            {
              this.state.autoRefresh ? 'Stop auto refresh'
                                      : 'Start auto refresh'
            }
          </button>
          <div className="filter-comments">
            <input type="range"
                   value={minComments}
                   onChange={this.updateComment}
                   min={0}
                   max={500}
                   className="comments"/>
          </div>
          <div className="gallery-list">

            { loading
                ? <Loader/>
                :
                itemSortedByComents.length > 0
                    ? itemSortedByComents.map((item, index) => <GalleryItem key={item.data.id} {...item} />)
                    : <p>No search results</p>

            }
          </div>
        </div>
      </div>
    )
  }
}

export default Gallery;
