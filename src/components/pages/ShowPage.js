import { useEffect, useState } from 'react';
import '../../styles/ShowPage.css';
import LoadingSpinner from '../sub-components/LoadingSpinner';
import { getShowAndEpisodes } from '../../utils/api';
import { useLocation, useSearchParams } from 'react-router-dom';
import VerticalBarChart from '../sub-components/VerticalBarChart';


function ShowPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [showLoading, setShowLoading] = useState(true)
  const location = useLocation()
  const [episodesInfo, setEpisodesInfo] = useState({})
  const showImage = location.state.showImageSrc

  const [showInfo, setShowInfo] = useState({
    image: showImage,
    title: "",
    synopsis: "",
    year: "",
    averageRating: ""
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
        averageRating: showDetails.data.rating.average
      }

      let episodeNames = []
      let episodeNumbers = []
      let episodeRatings = []

      episodes.data.forEach((episode) => {
        episodeNames.push(episode.name)
        episodeNumbers.push(`S${episode.season}:E${episode.number}`)
        episodeRatings.push(episode.rating.average)
      })
  
      setEpisodesInfo({
        showTitle: showDetails.data.name,
        episodeNames: episodeNames,
        episodeNumbers: episodeNumbers,
        episodeRatings: episodeRatings
      })

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
      <div className='chart-container'>
        <VerticalBarChart episodesInfo={episodesInfo}></VerticalBarChart>
      </div>
      </div>

      </LoadingSpinner>
    </div>
  );
}

export default ShowPage;
