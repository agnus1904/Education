import React from "react";
import Banner from "../Components/Banner";
import ConetentMovie from "../Components/ContentMovie";
import axios from "axios";



const Movie = ({match})=>{

    const [movie, setMovie] = React.useState([])


    async function fetchData() {
        let response = await axios(
            `http://localhost/Cinema/Movie/GetMovieBannerById/${match.params.id}`
        );
        let dataList = await response.data;

        // console.log(dataList["data"]);
        dataList["data"] ? setMovie(dataList["data"]): setMovie([])
    }

    React.useEffect(() => {
        fetchData();
    },[]);

    return(
        <>
            {/* Banner */}
            <Banner
                id={match.params.id}
                url={
                    ( movie.banner_url ||movie.banner_url===null) ?
                        movie.banner_url : ""}
                bannerText={
                    (movie.movie_name_banner || movie.movie_name_banner===null) ?
                        movie.movie_name_banner : ""
                }
                bannerType="movie"
            />
            <ConetentMovie
                movie_id={match.params.id}
            />
        </>
    );
}

export default Movie;
