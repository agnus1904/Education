import axios from "axios";
import React from "react";
import Banner from "../Components/Banner"
import ContentActor from "../Components/ContentActor"

const Actor = React.memo(({match})=>{

    const [actor, setActor] = React.useState({})

    // console.log("actor render");

    async function fetchData() {
        let response = await axios(
            `http://localhost/Cinema/actor/GetActorBanner/${match.params.id}`
        );
        let user = await response.data;

        // console.log(user);
        setActor(user[0]);
    }

    React.useEffect(() => {
        fetchData();
    },[]);

    // console.log(actor);


    return(
        <>
            <Banner
                url={
                    ( actor ) ?
                        actor.avatar_banner_url : ""}
                bannerText={
                    (actor ) ?
                        actor.actor_name_banner : ""
                }
                bannerType="actor"
            />

            <ContentActor
                    actorID={match.params.id}
            />
        </>
    )

});

export default Actor;




