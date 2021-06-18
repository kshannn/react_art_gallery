import EditArtPage from "./EditArtPage"
import EditReviewPage from "./EditReviewPage"
import axios from "axios"
import React from "react"


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
        let artResponse = await axios.get("https://3000-coral-grasshopper-zdtsha75.ws-us08.gitpod.io/art_gallery/" + this.props._id)
        let reviewResponse = await axios.get("https://3000-coral-grasshopper-zdtsha75.ws-us08.gitpod.io/art_gallery/" + this.props._id + "/review_list")

        let sortedDates = reviewResponse.data[0].reviews.sort((a, b) => new Date(b.review_date) - new Date(a.review_date));

        this.setState({
            contentLoaded: true,
            currentArt: artResponse.data,
            reviewsSection: sortedDates
        })
    }


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
        let response = await axios.delete("https://3000-coral-grasshopper-zdtsha75.ws-us08.gitpod.io/review/delete/" + reviewHolder.id)

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
        let reviewResponse = await axios.get("https://3000-coral-grasshopper-zdtsha75.ws-us08.gitpod.io/art_gallery/" + this.props._id + "/review_list")
        this.setState({
            reviewsSection: reviewResponse.data[0].reviews.reverse()
        })
    }


    createReview = async () => {
        let userData = {
            reviewer_name: this.state.reviewer_name,
            liked_post: false,
            review: this.state.review
        }
        let response = await axios.post("https://3000-coral-grasshopper-zdtsha75.ws-us08.gitpod.io/art_gallery/" + this.props._id + "/create/review", userData)
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
        let response = await axios.delete("https://3000-coral-grasshopper-zdtsha75.ws-us08.gitpod.io/artpost/delete/" + artIdToDelete)

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
                            <h3>{review.reviewer_name}</h3>
                            <p>{review.review_date}</p>
                            <p>{review.review}</p>
                            <button onClick={() => {
                                this.editReview(review);
                            }}>Edit Review</button>
                            <button onClick={() => {
                                this.deleteReview(review);
                            }}>Delete Review</button>
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
                        <div className="artInfoImageHolder" style={{ backgroundImage: `url(${this.state.currentArt.image})` }}></div>
                        <button onClick={() => {
                            this.deleteArt(this.state.currentArt._id);
                        }}>Delete Art</button>
                        <button onClick={() => {
                            this.editArt();
                        }}>Edit Art</button>
                        <p>Like(s): {this.state.currentArt.statistics.like_count}</p>
                        <p>Review(s): {this.state.currentArt.statistics.review_count}</p>
                        <h2>{this.state.currentArt.art_title}</h2>
                        <h3>{this.state.currentArt.poster_name}</h3>
                        <p>{this.state.currentArt.art_description}</p>
                        <p>Date published: {this.state.currentArt.post_date}</p>
                        <div className="reviewSection">
                            <p>Reviews {this.state.currentArt.review_count}</p>
                            <div id="newReview">
                                <input type="text" placeholder="Your name" name="reviewer_name" value={this.state.reviewer_name} onChange={this.updateForm} />
                                <textarea rows="8" cols="40" placeholder="Leave a review" name="review" value={this.state.review} onChange={this.updateForm} />
                            </div>
                            <button onClick={() => {
                                this.createReview();
                            }}>Create Review</button>
                            {this.renderReviewList()}
                        </div>
                    </div>
                }

                {!this.state.displayInfo && this.renderEditArtPage()}
                {this.renderEditReview()}
            </React.Fragment>
        )
    }
}