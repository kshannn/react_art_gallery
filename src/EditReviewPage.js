import React from "react"
import axios from "axios"

const baseUrl = "https://8080-coral-grasshopper-zdtsha75.ws-us10.gitpod.io"

export default class EditReviewPage extends React.Component {

    state = {
        reviewer_name: "",
        review: "",
        errorMessageReviewerName:"",
        errorMessageReview:""
    }

    // ===== Load existing review =====
    async componentDidMount() {
        this.setState({
            reviewer_name: this.props.currentReview.reviewer_name,
            review: this.props.currentReview.review
        })
    }

    // ===== Process form fields =====
    updateForm = (e) => {
            this.setState({
                errorMessageReviewerName:"",
                errorMessageReview: "",
                [e.target.name]: e.target.value
            });
    };

    // ===== When update button is clicked, updated review is updated in database =====
    updateReview = async (currentReview) => {

        let isError = false;
        if (this.state.reviewer_name === "" || this.state.reviewer_name === undefined){
            isError = true;
            this.setState({
                errorMessageReviewerName: "Please enter a valid name"
            })
        }

        if (this.state.review === "" || this.state.review === undefined){
            isError = true;
            this.setState({
                errorMessageReview: "Please provide a review"
            })
        }

        if (isError){
            return;
        }


        let userData = {
            reviewer_name: this.state.reviewer_name,
            liked_post: this.props.currentReview.liked_post,
            review: this.state.review
        }

        let response = await axios.put(baseUrl + "/review/edit/" + currentReview.id, userData)

        // Returns to art information page and refreshes to display updated review
        this.props.closeEditReview();
        this.props.getReview();
    }

    render() {
        return (
            <React.Fragment>
                <div className="popupBackground">
                    <div className="editReviewPopup">
                        <div id="editReviewContent">
                            <h2>Edit Review</h2>
                            <label>Your name</label>
                            <input type="text" placeholder="Your name" name="reviewer_name" value={this.state.reviewer_name} onChange={this.updateForm} />
                            <div class="alert alert-danger" role="alert" style={{ "display": (this.state.errorMessageReviewerName ? "block" : "none") }}>
                                {this.state.errorMessageReviewerName}
                            </div>

                            <label>Review</label>
                            <textarea rows="4" cols="40" placeholder="Leave a review" name="review" value={this.state.review} onChange={this.updateForm} />
                            <div class="alert alert-danger" role="alert" style={{ "display": (this.state.errorMessageReview? "block" : "none") }}>
                                {this.state.errorMessageReview}
                            </div>
                            
                            <div id="editReviewBtnContainer">
                                {/* Cancel button */}
                                <button id="closeBtn" onClick={this.props.closeEditReview}>Cancel</button>
                                
                                {/* Submit button */}
                                <button id="saveChangeBtn" onClick={() => {
                                    this.updateReview(this.props.currentReview);
                                }}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}