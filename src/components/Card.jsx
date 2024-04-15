import React from "react";
import { FaMapMarkerAlt } from 'react-icons/fa';

function Card(props) {
    console.log(props)
    return (
    <>
        <div className="wrapper">
            <div className="card__image">
                <img src={props.imgSrc} alt="Hello" height="420" width="327" />
            </div>
            <div className="card__info">
                <div className="card__info__text">
                    <h1 className="card__title">{props.title}</h1>
                    <h2 className="card__tag" >{props.tag}</h2>
                    <p className="card__description">{props.description} </p>
                    <h2 className="card__location"><FaMapMarkerAlt size={20} color="red"/>{props.location}</h2>
                </div>
                <div className="product__price">
                    <p><span>78</span>$</p>
                    <button type="button">View Details</button>
                </div>
            </div>
        </div>

    </>
    )
}

export default Card;