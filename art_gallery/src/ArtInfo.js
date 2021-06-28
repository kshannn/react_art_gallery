import axios from "axios"
import React from "react"
import 'bootstrap/dist/css/bootstrap.css'
import EditArtPage from "./EditArtPage"
import EditReviewPage from "./EditReviewPage"


const baseUrl = "https://3000-coral-grasshopper-zdtsha75.ws-us09.gitpod.io"

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
        reviewsSection: [],
        reviewer_name: "",
        review: ""
    }

    // ===== Get all information on the art selected and their reviews on load (GET Request) =====
    async componentDidMount() {
        this.getArtInfo();
    }

    getArtInfo = async () => {
        let artResponse = await axios.get(baseUrl + "/art_gallery/" + this.props._id)
        let reviewResponse = await axios.get(baseUrl + "/art_gallery/" + this.props._id + "/review_list")
        let reviewsSortedByLatest = reviewResponse.data[0].reviews.sort((a, b) => new Date(b.review_date) - new Date(a.review_date));

        this.setState({
            contentLoaded: true,
            currentArt: artResponse.data,
            reviewsSection: reviewsSortedByLatest
        })
    }

    // refreshes reviews and sorts them from most recent
    getReview = async () => {
        let reviewResponse = await axios.get(baseUrl + "/art_gallery/" + this.props._id + "/review_list")
        let reviewsSortedByLatest = reviewResponse.data[0].reviews.sort((a, b) => new Date(b.review_date) - new Date(a.review_date));
        this.setState({
            reviewsSection: reviewsSortedByLatest
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
                closePage={this.props.closePage}
                closeEditArt={this.closeEditArt}
                getGallery={this.props.getGallery}
                currentArt = {this.state.currentArt}
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
        if (this.state.displayDeleteArtPage){
            return (
            <div className="popupBackground">
                <div id="deleteConfirmation"className="alert alert-warning" role="alert">
                Are you sure you want to delete this art?
                    <div>
                        <button className="btn btn-primary" onClick={()=>{
                            this.setState({
                                displayDeleteArtPage:false
                            })
                        }}>Cancel</button>
                        <button className="btn btn-info" onClick={()=>{
                            this.deleteArt(this.state.currentArt._id)
                            this.setState({
                                displayDeleteArtPage:false
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

    // delete liked_post!!
    // Clicking on post button creates a new review in database and displays the new review
    createReview = async () => {
        let userData = {
            reviewer_name: this.state.reviewer_name,
            liked_post: false, 
            review: this.state.review
        }
        let response = await axios.post(baseUrl + "/art_gallery/" + this.props._id + "/create/review", userData)
        
        // resets review fields to empty
        this.setState({
            reviewer_name: "",
            review: ""
        })

        // refreshes reviews
        this.getReview();
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
        if (this.state.displayDeleteReviewPage){
            return (
            <div className="popupBackground">
                <div id="deleteConfirmation"className="alert alert-warning" role="alert">
                Are you sure you want to delete this review?
                    <div>
                        <button className="btn btn-primary" onClick={()=>{
                            this.setState({
                                displayDeleteReviewPage:false
                            })
                        }}>Cancel</button>
                        <button className="btn btn-info" onClick={()=>{
                            this.deleteReview(this.state.currentReview)
                            this.setState({
                                displayDeleteReviewPage:false
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

        // refresh leftover reviews
        this.getReview();
    }

    // not working
    // countReviews = async () => {
    //     let userData = {
    //         statistics: {
    //             review_count: this.state.reviewsSection.length
    //         }
    //     }

    //     let response = await axios.put(baseUrl + "/artpost/updateReviewCount/" + this.props._id, userData);
    //     this.getArtInfo();
    //     // let artResponse = await axios.get(baseUrl + "/art_gallery/" + this.props._id)

    //     // this.setState({
    //     //     currentArt: artResponse.data,
    //     // })

    // }

    // ===== Process form fields =====
    updateForm = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };


    // ===== If there are reviews, render reviews =====
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
                                        this.setState({
                                            currentReview:review
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
                            <div id="artAndToolOptions">
                                <div id="artInfoImageHolder" style={{ backgroundImage: `url(${this.state.currentArt.image})` }}></div>
                                <div id="toolOptions">
                                    <div id="artInfoStatistics">
                                        <i className="fas fa-heart"></i> {this.state.currentArt.statistics.like_count}
                                        <i className="far fa-comment-dots"></i> {this.state.currentArt.reviews.length}
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
                                <p id="artPostDate">Published: {this.state.currentArt.post_date}</p>
                            </div>
                            
                            {/* Review section */}
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
                {this.renderDeleteArtPage()}
                {this.renderDeleteReviewPage()}

            </React.Fragment>
        )
    }
}