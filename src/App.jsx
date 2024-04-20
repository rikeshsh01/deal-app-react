import React, { useEffect, useState } from "react";
import Card from "./components/Body/Card.jsx";
import Header from "./components/Header/Header.jsx"
import AddButton from "./components/Body/AddButton.jsx";


const App = () => {
    // Initialize state using useState
    const [posts, setPosts] = useState([]);

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/post", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxYWIwM2EzZmJjZDM1MDJkMDA4M2Q3In0sImlhdCI6MTcxMzAyNTM0OH0.ALYgsPV7mpffGgtwEdy7wNuVJvLBBnHW69vjriaoGHQ"
                }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setPosts(data.data); // Update state with fetched data
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    console.log(posts)

    return (
        <>
            <Header />
            <AddButton/>
            <div className="main">
            
                
                {posts.map((val, index, arr) => {
                    return (
                        <Card
                            key={val._id} // Add a unique key for each element in the array
                            postImage={val.image}
                            tag={val.tag}
                            title={val.title}
                            description={val.description}
                            location={val.location}
                            userName={val.userDetails.name}
                            likeCount = {val.likeCount}
                            profileImage = "https://picsum.photos/1920/1080"
                            additionalDetails = {val.additionalDetail}
                            comments = {val.comments} />
                    )
                })}

            </div>



        </>
    )
}

export default App;