import { useEffect, useState } from 'react';
import '../../styles/ShowPage.css';
import LoadingSpinner from '../sub-components/LoadingSpinner';
import notFound from "../../assets/not-found.jpeg"
import { getShowAndEpisodes } from '../../utils/api';
import { useLocation, useSearchParams } from 'react-router-dom';
 


function ShowPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showLoading, setShowLoading] = useState(true)
  const location = useLocation()
  const showImage = location.state.showImageSrc

  const [showInfo, setShowInfo] = useState({
    image: showImage,
    title: "",
    synopsis: "",
    year: "",
    averageRating: "",
    episodes: []
  })

  useEffect(() => {
    setShowLoading(true)
    getShowAndEpisodes(searchParams.get('q'))
    .then(([showDetails, episodes]) => {
      const showInformation = {
        image: showImage,
        title: showDetails.data.name,
        synopsis: showDetails.data.summary.replace(/<[^>]*>?/gm, ''),
        year: showDetails.data.premiered.slice(0,4),
        averageRating: showDetails.data.rating.average,
        episodes: episodes
      }
      setShowInfo(showInformation)
      setShowLoading(false)
    })
    .catch((err) => {
      console.log("Error getting episodes ", err)
      setShowLoading(false)

    })

  }, [])

  return (
    <div className="ShowPage">
      <LoadingSpinner isLoading={showLoading}>
      <div className='show-container'>
      <div className='show-info-container'>
      <img className='show-image' src={showInfo.image}></img>
      <h2 className='show-title'>{showInfo.title}</h2>
      <h3 className='show-synopsis'>{showInfo.synopsis}</h3>
      <h3 className='show-year'>Premiered: {showInfo.year}</h3>
      <h3 className='show-rating'>Average Rating: {showInfo.averageRating}</h3>

      </div>
      </div>
      </LoadingSpinner>
    </div>
  );
}

export default ShowPage;
