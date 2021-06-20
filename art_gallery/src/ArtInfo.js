import EditArtPage from "./EditArtPage"
import EditReviewPage from "./EditReviewPage"
import axios from "axios"
import React from "react"

const baseUrl = "https://3000-coral-grasshopper-zdtsha75.ws-us09.gitpod.io"

export default class ArtInfo extends React.Component {

    state = {
        contentLoaded: false,
        displayEditForm: false,
        displayInfo: true,
        displayEditReview: false,
        currentArt: {},
        reviewsSection: [],
        reviewer_name: "",
        review: "",
        currentReview: {}
    }

    async componentDidMount() {
        let artResponse = await axios.get(baseUrl + "/art_gallery/" + this.props._id)
        let reviewResponse = await axios.get(baseUrl + "/art_gallery/" + this.props._id + "/review_list")

        let sortedDates = reviewResponse.data[0].reviews.sort((a, b) => new Date(b.review_date) - new Date(a.review_date));

        this.setState({
            contentLoaded: true,
            currentArt: artResponse.data,
            reviewsSection: sortedDates
        })

    }



    // countReviews = async () => {
    //     let userData = {
    //         statistics:{
    //             review_count: this.state.reviewsSection.length
    //         }
    //     }
    //     let response = await axios.put(baseUrl + "/artpost/updateReviewCount/" + this.props._id, userData);
    // }



    closeEditReview = () => {
        this.setState({
            displayEditReview: false
        })
    }

    editReview = (review) => {
        this.setState({
            displayEditReview: true,
            currentReview: review
        })
    }

    renderEditReview = () => {
        if (this.state.displayEditReview) {
            return <EditReviewPage
                updateForm={this.updateForm}
                updateReview={this.updateReview}
                currentReview={this.state.currentReview}
                closeEditReview={this.closeEditReview}
                getReview={this.getReview} />

        } else {
            return null
        }
    }

    deleteReview = async (reviewHolder) => {
        let response = await axios.delete(baseUrl + "/review/delete/" + reviewHolder.id)

        // refresh review
        this.getReview();
    }

    clearFields = () => {
        this.setState({
            reviewer_name: "",
            review: ""
        })
    }

    getReview = async () => {
        let reviewResponse = await axios.get(baseUrl + "/art_gallery/" + this.props._id + "/review_list")
        let sortedDates = reviewResponse.data[0].reviews.sort((a, b) => new Date(b.review_date) - new Date(a.review_date));
        this.setState({
            reviewsSection: sortedDates
        })
    }


    createReview = async () => {
        let userData = {
            reviewer_name: this.state.reviewer_name,
            liked_post: false,
            review: this.state.review
        }
        let response = await axios.post(baseUrl + "/art_gallery/" + this.props._id + "/create/review", userData)
        this.clearFields();
        this.getReview();
    }

    updateForm = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    closeEdit = () => {
        this.setState({
            displayEditForm: false,
            displayInfo: true
        })
    }

    editArt = () => {
        this.setState({
            displayEditForm: true,
            displayInfo: false
        })
    }

    renderEditArtPage = () => {
        if (this.state.displayEditForm) {
            return <EditArtPage
                closePage={this.props.closePage}
                closeEdit={this.closeEdit}
                getGallery={this.props.getGallery}
                poster_name={this.state.currentArt.poster_name}
                image={this.state.currentArt.image}
                art_title={this.state.currentArt.art_title}
                art_description={this.state.currentArt.art_description}
                art_type={this.state.currentArt.art_type}
                art_subject={this.state.currentArt.art_subject}
                like_count={this.state.currentArt.statistics.like_count}
                review_count={this.state.currentArt.statistics.review_count}
                _id={this.state.currentArt._id}
                post_date={this.state.currentArt.post_date}
            />


        } else {
            return null
        }
    }



    deleteArt = async (artIdToDelete) => {
        let response = await axios.delete(baseUrl + "/artpost/delete/" + artIdToDelete)

        // close popup
        this.props.closePage();

        // refresh gallery
        this.props.getGallery();

    }

    renderReviewList = () => {
        if (this.state.reviewsSection) {
            let jsx = this.state.reviewsSection.map((review) => {
                return (
                    <React.Fragment>
                        <div className="reviewContainer">
                            <h3>{review.reviewer_name}</h3><span>{review.review_date}</span>
                            <p>{review.review}</p>
                            <div className="dropdown">
                                <button className="btn" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fas fa-ellipsis-h"></i>
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                    <li> <button className="dropdown-item" onClick={() => {
                                        this.editReview(review);
                                    }}>Edit review</button></li>
                                    <li><button className="dropdown-item" onClick={() => {
                                        this.deleteReview(review);
                                    }}>Delete review</button></li>
                                </ul>
                            </div>


                        </div>
                    </React.Fragment>
                )
            })
            return jsx
        }
    }



    render() {
        return (
            <React.Fragment>
                {this.state.contentLoaded && this.state.displayInfo &&
                    <div className="artInfo">
                        <button onClick={this.props.closePage}>Back to Gallery</button>

                        <div id="mainContentContainer">
                            <div id="artAndToolOptions">
                                <div className="artInfoImageHolder" style={{ backgroundImage: `url(${this.state.currentArt.image})` }}></div>
                                <div id="toolOptions">
                                    <div id="artInfoStatistics">
                                        <i className="fas fa-heart"></i> {this.state.currentArt.statistics.like_count}
                                        <i className="far fa-comment-dots"></i> {this.state.currentArt.statistics.review_count}
                                    </div>
                                    <div className="dropdown">

                                        <button className="btn" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="fas fa-ellipsis-h"></i>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <li><button className="dropdown-item" onClick={() => {
                                                this.editArt();
                                            }}>Edit art</button></li>
                                            <li><button className="dropdown-item" onClick={() => {
                                                this.deleteArt(this.state.currentArt._id);
                                            }}>Delete art</button></li>

                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div id="artDetailsSection">
                                <h2>{this.state.currentArt.art_title}</h2>
                                <h3>by {this.state.currentArt.poster_name}</h3>
                                <p>{this.state.currentArt.art_description}</p>
                                <p>Published: {this.state.currentArt.post_date}</p>
                            </div>

                            <div id="reviewSection">
                                <h2>Reviews {this.state.currentArt.review_count}</h2>
                                <div id="newReview">
                                    <input type="text" placeholder="Your name" name="reviewer_name" value={this.state.reviewer_name} onChange={this.updateForm} />
                                    <textarea rows="5" placeholder="Leave a review" name="review" value={this.state.review} onChange={this.updateForm} />
                                    <button id="postReviewBtn" onClick={() => {
                                        this.createReview();
                                    }}>Post</button>
                                </div>

                                {this.renderReviewList()}

                            </div>
                        </div>
                    </div>


                }


                {!this.state.displayInfo && this.renderEditArtPage()}
                {this.renderEditReview()}

            </React.Fragment>
        )
    }
}