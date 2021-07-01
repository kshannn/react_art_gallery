import axios from "axios"
import React from "react"
import 'bootstrap/dist/css/bootstrap.css'
import EditArtPage from "./EditArtPage"
import EditReviewPage from "./EditReviewPage"

const baseUrl = "https://8080-coral-grasshopper-zdtsha75.ws-us11.gitpod.io"

export default class ArtInfo extends React.Component {

    state = {
        contentLoaded: false,
        displayEditForm: false,
        displayInfo: true,
        displayEditReview: false,
        displayDeleteArtPage: false,
        displayDeleteReviewPage: false,
        currentArt: {},
        currentReview: {},
        otherArt: [],
        reviewsSection: [],
        reviewer_name: "",
        review: "",
        errorMessageReviewerName: "",
        errorMessageReview: ""
    }

    // ===== Get all information on the art selected and other arts and their reviews on load (GET Request) =====
    async componentDidMount() {
        this.getArtInfo();
        this.getOtherArt();
    }

    // Get selected art info
    getArtInfo = async (id = this.props._id) => {
        let artResponse = await axios.get(baseUrl + "/art_gallery/" + id)
        let reviewResponse = await axios.get(baseUrl + "/art_gallery/" + id + "/review_list")
        let reviewsSortedByLatest = reviewResponse.data[0].reviews.sort((a, b) => new Date(b.review_date) - new Date(a.review_date));

        this.setState({
            contentLoaded: true,
            currentArt: artResponse.data,
            reviewsSection: reviewsSortedByLatest
        })
    }

    // Get other art
    getOtherArt = async (id = this.props._id) => {
        let response = await axios.get(baseUrl + "/art_gallery/other/" + id)
        this.setState({
            otherArt: response.data
        })
    }

    // Refreshes reviews and sorts them from most recent
    getReview = async (id = this.props._id) => {
        let reviewResponse = await axios.get(baseUrl + "/art_gallery/" + id + "/review_list")
        let reviewsSortedByLatest = reviewResponse.data[0].reviews.sort((a, b) => new Date(b.review_date) - new Date(a.review_date));
        this.setState({
            reviewsSection: reviewsSortedByLatest
        })
    }

    // Clicking on heart icon increases like count
    addLike = async () => {
        await axios.post(baseUrl + "/" + this.state.currentArt._id + "/like")
        let artResponse = await axios.get(baseUrl + "/art_gallery/" + this.state.currentArt._id)
        this.setState({
            currentArt: artResponse.data
        })
    }

    // ===== Clicking on edit art renders edit art page =====
    editArt = () => {
        this.setState({
            displayEditForm: true,
            displayInfo: false
        })
    }

    renderEditArtPage = () => {
        if (this.state.displayEditForm) {
            return <EditArtPage
                closeEditArt={this.closeEditArt}
                currentArt={this.state.currentArt}
                getArtInfo={this.getArtInfo}
            />
        } else {
            return null
        }
    }

    // Close edit art page
    closeEditArt = () => {
        this.setState({
            displayEditForm: false,
            displayInfo: true
        })
    }


    // ===== Clicking on delete art button prompts delete confirmation page =====
    displayDeleteArtPage = () => {
        this.setState({
            displayDeleteArtPage: true
        })
    }

    renderDeleteArtPage = () => {
        if (this.state.displayDeleteArtPage) {
            return (
                <div className="popupBackground">
                    <div id="deleteConfirmation" className="alert alert-danger" role="alert">
                        Are you sure you want to delete this art?
                        <div className="deleteBtnContainer mt-3">
                            <button className="btn cancelBtn" onClick={() => {
                                this.setState({
                                    displayDeleteArtPage: false
                                })
                            }}>Cancel</button>
                            <button className="btn deleteBtn ms-3" onClick={() => {
                                this.deleteArt(this.state.currentArt._id)
                                this.setState({
                                    displayDeleteArtPage: false
                                })
                            }}>Delete</button>
                        </div>
                    </div>
                </div>)
        } else {
            return null
        }
    }

    // Clicking on delete in the confirmation screen deletes art
    deleteArt = async (artIdToDelete) => {
        let response = await axios.delete(baseUrl + "/artpost/delete/" + artIdToDelete)

        // close popup
        this.props.closePage();

        // refresh gallery
        this.props.getGallery();
    }

    // Clicking on post button creates a new review in database and displays the new review
    createReview = async () => {
        let isError = false;

        if (this.state.reviewer_name === "" || this.state.reviewer_name === undefined) {
            isError = true;
            this.setState({
                errorMessageReviewerName: "Please enter a valid name",
            })
        }

        if (this.state.review === "" || this.state.review === undefined) {
            isError = true;
            this.setState({
                errorMessageReview: "Please provide a review",
            })
        }

        if (isError) {
            return;
        }

        let userData = {
            reviewer_name: this.state.reviewer_name,
            review: this.state.review,
        }

        let response = await axios.post(baseUrl + "/art_gallery/" + this.state.currentArt._id + "/create/review", userData)

        // Resets review fields to empty
        this.setState({
            reviewer_name: "",
            review: ""
        })

        // Refreshes reviews
        this.getArtInfo(this.state.currentArt._id);
    }

    // ===== Clicking on edit review prompts edit review page =====
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

    // Clicking on cancel closes edit review popup
    closeEditReview = () => {
        this.setState({
            displayEditReview: false
        })
    }

    // ===== Clicking on delete review button prompts delete confirmation page =====
    displayDeleteReviewPage = () => {
        this.setState({
            displayDeleteReviewPage: true
        })
    }

    renderDeleteReviewPage = () => {
        if (this.state.displayDeleteReviewPage) {
            return (
                <div className="popupBackground">
                    <div id="deleteConfirmation" className="alert alert-danger" role="alert">
                        Are you sure you want to delete this review?
                        <div className="deleteBtnContainer mt-3">
                            <button className="btn cancelBtn" onClick={() => {
                                this.setState({
                                    displayDeleteReviewPage: false
                                })
                            }}>Cancel</button>
                            <button className="btn deleteBtn ms-3" onClick={() => {
                                this.deleteReview(this.state.currentReview)
                                this.setState({
                                    displayDeleteReviewPage: false
                                })
                            }}>Delete</button>
                        </div>
                    </div>
                </div>)
        } else {
            return null
        }
    }

    // Clicking on delete in the confirmation screen deletes review
    deleteReview = async (reviewHolder) => {
        let response = await axios.delete(baseUrl + "/review/delete/" + reviewHolder.id)

        // Refresh leftover reviews
        this.getArtInfo(this.state.currentArt._id);
    }

    // ===== Process form fields =====
    updateForm = (e) => {
        this.setState({
            errorMessageReviewerName: "",
            errorMessageReview: "",
            [e.target.name]: e.target.value
        });
    };

    // ===== Clicking on other art changes the current art info =====
    switchArt = (otherArt) => {
        this.getOtherArt(otherArt._id)
        this.getArtInfo(otherArt._id);
        this.getReview(otherArt._id);

        this.setState({
            currentArt: otherArt,
            reviewsSection: otherArt.reviews
        })
    }

    // ===== Render other arts =====
    renderOtherArt = () => {
        if (this.state.otherArt) {
            let jsx = this.state.otherArt.map((otherArt) => {
                return (
                    <React.Fragment>
                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <div
                                className="otherArtContainer"
                                style={{ backgroundImage: `url(${otherArt.image})` }}
                                onClick={() => {
                                    this.switchArt(otherArt);
                                }}></div>
                        </div>
                    </React.Fragment>
                )
            })
            return jsx
        }
    }


    // ===== If there are reviews, render reviews =====
    renderReviewList = () => {
        if (this.state.reviewsSection) {
            let jsx = this.state.reviewsSection.map((review) => {
                return (
                    <React.Fragment>
                        <div className="reviewContainer">
                            <h3>{review.reviewer_name}</h3><span>{review.review_date.slice(0, 10)}</span>
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
                                        this.setState({
                                            currentReview: review
                                        })
                                        this.displayDeleteReviewPage();
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


    // Render art information page
    render() {
        return (
            <React.Fragment>
                {this.state.contentLoaded && this.state.displayInfo &&
                    <div className="artInfo">
                        {/* Back button */}
                        <button className="backBtn" onClick={() => {
                            this.props.closePage();
                            this.props.getGallery();
                        }}><i class="fas fa-chevron-left"></i>Back</button>

                        <div id="mainContentContainer">
                            {/* Art section */}
                            <div id="currentArtSection">
                                <div id="artAndToolOptions">
                                    <div id="artInfoImageHolder" style={{ backgroundImage: `url(${this.state.currentArt.image})` }}></div>
                                    <div id="toolOptions">
                                        <div id="artInfoStatistics">
                                            <button id="heartBtn" onClick={() => {
                                                this.addLike();
                                            }}>{this.state.currentArt.statistics.like_count == 0 ? <i className="fas fa-heart innerHeart"></i> : <i style={{ 'color': '#EF463A' }} className="fas fa-heart innerHeart"></i>}</button>{this.state.currentArt.statistics.like_count}
                                            <a href="#reviewSection"><i id="comments" className="far fa-comment-dots"></i></a> {this.state.currentArt.statistics.review_count}
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
                                                    this.displayDeleteArtPage();

                                                }}>Delete art</button></li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div id="artDetailsSection">
                                    <h2>{this.state.currentArt.art_title}</h2>
                                    <h3>by {this.state.currentArt.poster_name}</h3>
                                    <span>{this.props.displayArtType(this.state.currentArt)}</span>
                                    {this.state.currentArt.art_subject.map((subject) => {
                                        return (
                                            <span className={"badge " + "badge-" + subject} style={{ marginRight: "5px" }}>{subject}</span>
                                        )
                                    })}
                                    <p id="artDescription">{this.state.currentArt.art_description}</p>
                                    <p id="artPostDate">Published: {this.state.currentArt.post_date.slice(0, 10)}</p>
                                </div>

                                {/* Review section */}
                                <div id="reviewSection">
                                    <h3>Help a fellow artist out by leaving a review!</h3>
                                    <div id="newReview">
                                        <input type="text" placeholder="Your name" name="reviewer_name" value={this.state.reviewer_name} onChange={this.updateForm} />
                                        <div class="alert alert-danger" role="alert" style={{ "display": (this.state.errorMessageReviewerName ? "block" : "none") }}>
                                            {this.state.errorMessageReviewerName}
                                        </div>
                                        <textarea rows="5" placeholder="Leave a review" name="review" value={this.state.review} onChange={this.updateForm} />
                                        <div class="alert alert-danger" role="alert" style={{ "display": (this.state.errorMessageReview ? "block" : "none") }}>
                                            {this.state.errorMessageReview}
                                        </div>
                                        <div id="postReviewBtnContainer">
                                            <button id="postReviewBtn" onClick={() => {
                                                this.createReview();
                                            }}>Post</button>
                                        </div>

                                    </div>
                                    <h2>Reviews <span>{this.state.currentArt.statistics.review_count}</span></h2>
                                    {this.state.reviewsSection.length === 0 ? <p>No reviews currently, leave a review to help the artist!</p> : this.renderReviewList()}

                                </div>
                            </div>

                            {/* Other arts section */}
                            <div id="otherArtSection" className="d-none d-lg-block">
                                <h2>Explore other art work</h2>
                                <div className="row">
                                    {this.renderOtherArt()}
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {!this.state.displayInfo && this.renderEditArtPage()}
                {this.renderEditReview()}
                {this.renderDeleteArtPage()}
                {this.renderDeleteReviewPage()}

            </React.Fragment>
        )
    }
}