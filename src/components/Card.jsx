import React from "react";

function Card(props) {
    // console.log(props)
    return (<>
        <div className="cards">
            <div className="card">
                <img src={props.imgSrc} className="card__image" alt="Hello" />
                <div className="card__info">
                    <span className="card__category">{props.category}</span>
                    <h3 className="card__title">{props.title}</h3>
                    <a href="https://www.google.com" target="_blank" rel="noreferrer">
                        <button>Watch Now</button>
                    </a>

                </div>
            </div>
        </div>
    </>)
}

export default Card;