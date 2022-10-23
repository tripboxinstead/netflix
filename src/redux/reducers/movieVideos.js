let initialState = {    
    modalloading: true,
    videos: [],
}


function movieVideoReducer (state = initialState,action) {
    let {type,payload} = action;

    switch (type) {

        case "GET_MOVIE_VIDEOS_SUCCESS":
            return {
                ...state,              
                videos : payload.videos,  
                modalloading : false,              
            };
        
        case "GET_MOVIE_VIDEOS_REQUEST":
             return {
                ...state,                
                modalloading : true,
            };

       
        case "GET_MOVIES_VIDEOS_FAILURE" :
            return {
                ...state,
                modalloading : false
            };

     
        default :
            return {
                ...state
            }


    }
    

}

export default movieVideoReducer;