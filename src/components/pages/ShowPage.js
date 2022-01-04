import { useEffect, useState } from "react";
import "../../styles/ShowPage.css";
import LoadingSpinner from "../sub-components/LoadingSpinner";
import { getShowAndEpisodes } from "../../utils/api";
import { useLocation, useSearchParams } from "react-router-dom";
import ChartContainer from "../sub-components/ChartContainer";
import InfoModal from "../sub-components/InfoModal";
import ErrorWarning from "../sub-components/ErrorWarning";
import notFound from "../../assets/not-found.jpeg";
import { imageCheck } from "../../utils/utils";

function ShowPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showLoading, setShowLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [episodesInfo, setEpisodesInfo] = useState({});
  // const showImage = location.state.showImageSrc
  const [errorDisplayed, setErrorDisplayed] = useState(false);
  const errorText = "Sorry! There was an error retrieving this show.";

  const [showInfo, setShowInfo] = useState({
    image: null,
    title: "",
    synopsis: "",
    year: "",
    averageRating: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setShowLoading(true);
    setErrorDisplayed(false);
    getShowAndEpisodes(searchParams.get("q"))
      .then(([showDetails, episodes]) => {
        let showImageSrc = notFound;
        if (imageCheck(showDetails.data)) {
          showImageSrc = showDetails.data.image.medium;
        }

        const showInformation = {
          image: showImageSrc,
          title: showDetails.data.name,
          synopsis: showDetails.data.summary?.replace(/<[^>]*>?/gm, ""),
          year: showDetails.data.premiered.slice(0, 4),
          averageRating: showDetails.data.rating.average,
        };

        let episodeNames = [];
        let episodeNumbers = [];
        let episodeRatings = [];

        let modalData = episodes.data.map((episode) => {
          episodeNames.push(episode.name);
          episodeNumbers.push(`S${episode.season}:E${episode.number}`);
          episodeRatings.push(episode.rating.average);
          const infoForModal = {
            title: `S${episode.season}:E${episode.number}: ${episode.name}`,
            rating: episode.rating.average,
            date: episode.airdate,
            summary: episode.summary?.replace(/<[^>]*>?/gm, ""),
          };

          return infoForModal;
        });

        setEpisodesInfo({
          showTitle: showDetails.data.name,
          episodeNames: episodeNames,
          episodeNumbers: episodeNumbers,
          episodeRatings: episodeRatings,
          modalData: modalData,
        });

        setShowInfo(showInformation);
        setShowLoading(false);
      })
      .catch((err) => {
        setShowLoading(false);
        setErrorDisplayed(true);
      });
  }, []);

  return (
    <div className="ShowPage">
      <ErrorWarning errorDisplayed={errorDisplayed} errorText={errorText}>
        <LoadingSpinner isLoading={showLoading}>
          <div className="show-container">
            <div className="show-info-container">
              <img className="show-image" src={showInfo.image}></img>
              <h2 className="show-title">{showInfo.title}</h2>
              <h3 className="show-synopsis">{showInfo.synopsis}</h3>
              <h3 className="show-year">Premiered: {showInfo.year}</h3>
              <h3 className="show-rating">
                Average Rating: {showInfo.averageRating}
              </h3>
            </div>
            <div className="chart-container">
              <ChartContainer
                episodesInfo={episodesInfo}
                setModalData={setModalData}
                setShowModal={setShowModal}
              ></ChartContainer>
            </div>
          </div>
          {showModal ? (
            <InfoModal
              showModal={showModal}
              setShowModal={setShowModal}
              modalData={modalData}
            ></InfoModal>
          ) : null}
        </LoadingSpinner>
      </ErrorWarning>
    </div>
  );
}

export default ShowPage;
