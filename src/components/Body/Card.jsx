import React, { useState } from "react";
import { FaMapMarkerAlt, FaThumbsUp, FaComment, FaArrowRight } from 'react-icons/fa';
import Slider from "react-slick";
import { GoArrowLeft , GoArrowRight  } from 'react-icons/go';

function Card(props) {
    console.log(props.comments)
    const [isOpenAdditionalSection, setIsOpenAdditionalSection] = useState(false);
    const [isOpenCommentSection, setIsOpenCommentSection] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleClickSeeMore = () => {
        setIsOpenAdditionalSection(!isOpenAdditionalSection);
    };

    const ClickComment = () => {
        setIsOpenCommentSection(!isOpenCommentSection);
    }


    var settings = {
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
        beforeChange: (current, next) => setCurrentSlide(next),  // Update current slide index

    };
     // Conditional rendering of arrows based on the current slide index
     const PrevArrow = ({ onClick }) => (
        currentSlide > 0 && <GoArrowLeft size={35} className="slick-prev" onClick={onClick} />
    );

    const NextArrow = ({ onClick }) => (
        currentSlide < props.postImage.length - 1 && <GoArrowRight size={35} className="slick-next" onClick={onClick} />
    );

    // Add customized arrow components to settings
    settings.prevArrow = <PrevArrow />;
    settings.nextArrow = <NextArrow />;

    return (
        <div className="wrapper">
            <div className="posted-user">
                <img src={props.profileImage} alt="profileImage" />
                <p className="posted-by"> {props.userName} </p>
                <div className="card__tag">
                    <h2 className="card__tag__text" >{props.tag}</h2>
                </div>
                <div className="card__location">
                    <h2 className="card__location__text">{props.location} <FaMapMarkerAlt size={15} color="red" /> </h2>
                </div>
            </div>

            <div className="card__image">
                {props.postImage.length === 1 ? (
                    // If only one image, render it directly
                    <img src={props.postImage[0].url} alt="img" />
                ) : (
                    // If multiple images, use a slider
                    <Slider {...settings}>
                    {props.postImage.map((image, index) => (
                        <div key={index}>
                            <img src={image.url} alt={`${index + 1}`} />
                        </div>
                    ))}
                </Slider>
                )}
            </div>


            <div className="card__info">
                <div className="card__title">
                    <h2 className="card__title__text">{props.title}</h2>
                </div>

                <div className="card__description">
                    <p className="card__description__text">{props.description} </p>
                    <div className="view__details" onClick={handleClickSeeMore}>
                        <p className="see__more">{isOpenAdditionalSection ? 'See less...' : 'See more...'}</p>
                    </div>
                    {isOpenAdditionalSection && (
                        <div className="additional__details">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="key__head">Key</th>
                                        <th className="value__head">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.additionalDetails.map((detail, index) => (
                                        <tr key={index}>
                                            <td className="details__key">{detail.key} :</td>
                                            <td className="details__value">{detail.value} npr</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    )}
                </div>
            </div>
            <div className="activity__section">
                <button className="like__button"><FaThumbsUp />  Like</button>
                <button className="comment__button" onClick={ClickComment}><FaComment />  Comment</button>
            </div>
            {isOpenCommentSection && (
                <>
                    <div className="comment_section">
                        {props.comments.map((comment, index) => (
                            <div key={index} className="comment_section_each">
                                <img
                                    src={comment.userDetails.image ? comment.userDetails.image[0].url : "http://localhost:8080/images/default.jpg"}
                                    alt="userphoto"
                                />
                                <div className="user__and__date">
                                    <p className="comment_posted_by">{comment.userDetails.name}</p>
                                    <p className="comment_date">date</p>
                                </div>

                                <div className="comment_section_content">
                                    <p className="comment_content">{comment.content}</p>
                                </div>
                            </div>
                        ))}


                    </div>
                    <div className="input__comment">
                        <img src="http://localhost:8080/images/default.jpg" alt="pht" />
                        <input type="text" value="" />
                        <FaArrowRight size={15} />
                    </div>
                </>
            )}
        </div>
    );
}

export default Card;
