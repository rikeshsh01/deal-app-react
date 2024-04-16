import React, { useEffect, useState } from "react";
import Card from "./components/Body/Card.jsx";
import Header from "./components/Header/Header.jsx"
import Sidebar from "./components/Sidebar/SideBar.jsx";


const App = () => {
    // Initialize state using useState
    const [posts, setPosts] = useState([]);

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/notes/getallnotes/", {
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
            <Sidebar />
            <Header />
            <div className="main">
                
                {posts.map((val, index, arr) => {
                    return (
                        <Card
                            key={val._id} // Add a unique key for each element in the array
                            imgSrc="https://picsum.photos/id/10/200/250"
                            tag={val.tag}
                            title={val.title}
                            description={val.description}
                            location={val.location} />
                    )
                })}

            </div>



        </>
    )
}

export default App;