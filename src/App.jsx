import React from "react";
import Card from "./components/Card";
import Odata from "./components/Sdata.jsx";
import Heading from "./components/Heading.jsx"


const data = JSON.parse(Odata);

const App = () => {
    return (
        <>
            <Heading />

            {data.map((val, index, arr) => {
                return (
                    <Card
                        imgSrc={val.imgSrc}
                        category={val.category}
                        title={val.title} />
                )
            })}

        </>
    )
}

export default App;