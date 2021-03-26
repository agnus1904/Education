import React from "react";
import Banner from "../Components/Banner";
import ConetentMovie from "../Components/ContentMovie";
import axios from "axios";



const Movie = ({match})=>{

    const [movie, setMovie] = React.useState([])


    async function fetchData() {
        let response = await axios(
            `http://localhost/Cinema/Movie/GetMovieBanner/${match.params.id}`
        );
        let dataList = await response.data;

        // console.log(dataList);
        dataList[1] ? setMovie(dataList[1][0]): setMovie([])
    }

    React.useEffect(() => {
        fetchData();
    },[]);

    return(
        <>
            {/* Banner */}
            <Banner
                url={
                    ( movie.banner_url ||movie.banner_url===null) ?
                        movie.banner_url : ""}
                bannerText={
                    (movie.movie_name_banner || movie.movie_name_banner===null) ?
                        movie.movie_name_banner : ""
                }
                bannerType="movie"
            />
            {/* Content */}
            <ConetentMovie  
                movie_id={match.params.id}
            />
        </>
    );
}

export default Movie;
