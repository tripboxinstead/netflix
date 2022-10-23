import React,{useEffect} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import YouTube from 'react-youtube';
import { useDispatch } from 'react-redux';
import { movieAction } from "../redux/actions/movieAction";
import { useSelector } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import MovieVideoSlide from './MovieVideoSlide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MovieVideoPopup = ({show,handleVideoPopupClose,movieId}) => {

    const dispatch = useDispatch();  
    const {videos,modalloading} = useSelector(state => state.movieVideos );

    const handleShow = () => {
        handleVideoPopupClose();
    }

    useEffect ( () => {

        dispatch(movieAction.getVideos(movieId));

       

    },[movieId]);

    if (modalloading) {
        return   <ClipLoader color="#ffffff" loading={modalloading} size={150} aria-label="Loading Spinner" data-testid="loader"/> 
    }

  return (
    <>
    {videos? 
     

        <Modal show={show} onHide={handleShow} daria-labelledby="contained-modal-title-vcenter" size="lg"  centered>
            
            <Modal.Header className="modal-wrap"  closeButton>
                <Modal.Title>Modal heading</Modal.Title>         
                <FontAwesomeIcon icon="fa-duotone fa-xmark" />   
            </Modal.Header>
            <Modal.Body className="modal-wrap" >

                <YouTube
                //videoId : https://www.youtube.com/watch?v={videoId} 유튜브 링크의 끝부분에 있는 고유한 아이디
                videoId={videos.results[0].key}
                //opts(옵션들): 플레이어의 크기나 다양한 플레이어 매개 변수를 사용할 수 있음.
                //밑에서 더 설명하겠습니다.
                opts={{
                    width: "800",
                    height: "400",
                    playerVars: {
                    autoplay: 1, //자동재생 O
                    rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                    modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
                    },
                }}
                //이벤트 리스너 
                onEnd={(e)=>{e.target.stopVideo(0);}}      
                />

                <MovieVideoSlide videos = {videos} /> 
        
            </Modal.Body>
        
            <Modal.Footer className="modal-wrap" >
            
                <Button variant="secondary" onClick={handleShow}>
                Close
                </Button>
            
            </Modal.Footer>
        </Modal>

    : null
}
  </>
  )
}

export default MovieVideoPopup