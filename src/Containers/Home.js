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
            `http://localhost/Cinema/home/GetHomeBanner`
        );
        let res = await response.data;


        // console.log(res[1]);
        setMovie(res[1][0]);

    }

    React.useEffect(() => {
        fetchData();
    },[]);

    return(
        <>
            <Header />
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
            <Footer />
        </>
    );
}

export default Home;
