import React from "react";
import Banner from "../Components/Banner"
import ContentHome from "../Components/ContentHome";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";


const Home = ()=>{

    const [movie, setMovie] = React.useState([])

    async function fetchData() {
        let response = await axios.post(
            `http://localhost/Cinema/Movie/GetMovieBannerById/20`
        );
        let res = await response.data;

        setMovie(res["data"]);
    }

    React.useEffect(() => {
        fetchData();
    },[]);

    return(
        <>
            <Banner
                id={String(movie.movie_id)}
                url={
                    ( movie.banner_url ||movie.banner_url===null) ?
                        movie.banner_url : ""}
                bannerText={
                    (movie.movie_name_banner || movie.movie_name_banner===null) ?
                        movie.movie_name_banner : ""
                }
                bannerType="home"
            />
            <ContentHome />
        </>
    );
}

export default Home;
