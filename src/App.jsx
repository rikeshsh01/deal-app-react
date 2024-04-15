import React from "react";
import Card from "./components/Card";
import Odata from "./components/Sdata.jsx";
import Header from "./components/Header.jsx"


const data = JSON.parse(Odata);

const App = () => {
    return (
        <>
            <Header />

            {data.map((val, index, arr) => {
                return (
                    <Card
                        imgSrc={val.imgSrc}
                        tag={val.tag}
                        title={val.title}
                        description = {val.description}
                        location = {val.location} />
                )
            })}

        </>
    )
}

export default App;