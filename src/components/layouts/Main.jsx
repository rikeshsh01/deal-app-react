import React,{useEffect,useState} from "react";
import Post from "../common/Post";

const Main = ()=>{
        // Initialize state using useState
        const [posts, setPosts] = useState([]);

        // Fetch data when the component mounts
        useEffect(() => {
            fetchData();
        }, []);
    
        const fetchData = async () => {
            
            try {
                let authToken = localStorage.getItem("authToken")
                const response = await fetch("http://localhost:8080/api/post", {
                    method: "GET",
                    headers: {
                        "auth-token": authToken
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
        <div className="main">
                {posts.map((val, index, arr) => {
                    return (
                        <Post
                            key={val._id} // Add a unique key for each element in the array
                            postImage={val.image}
                            tag={val.tag}
                            title={val.title}
                            description={val.description}
                            location={val.location}
                            userName={val.userDetails.name}
                            likeCount={val.likeCount}
                            profileImage="https://picsum.photos/1920/1080"
                            additionalDetails={val.additionalDetail}
                            comments={val.comments} />
                    )
                })}

            </div>
    )
}

export default Main;