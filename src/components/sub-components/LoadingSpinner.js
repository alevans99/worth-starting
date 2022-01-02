import '../../styles/LoadingSpinner.css';
import loadingSpinnerImage from '../../assets/loading-spinner-white.svg'


function LoadingSpinner({children, isLoading}) {
  return (
    <div className="ShowLoadingSpinner">
        {isLoading ? (
            <div className='loading-container'>
                <img className='loading-spinner-image' src={loadingSpinnerImage} alt='loading'></img>
            </div>
        ) : children}
    </div>
  );
}

export default LoadingSpinner;
