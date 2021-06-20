import React from "react"
import axios from "axios"

const baseUrl = "https://3000-coral-grasshopper-zdtsha75.ws-us09.gitpod.io"

export default class EditReviewPage extends React.Component {

    state = {
        reviewer_name: "",
        review: ""
    }

    async componentDidMount() {
        this.setState({
            reviewer_name: this.props.currentReview.reviewer_name,
            review: this.props.currentReview.review
        })
    }

    updateReview = async (currentReview) => {
        let userData = {
            reviewer_name: this.state.reviewer_name,
            liked_post: this.props.currentReview.liked_post,
            review: this.state.review
        }

        let response = await axios.put(baseUrl + "/review/edit/" + currentReview.id, userData)
        console.log("updated review")

        this.props.closeEditReview();
        this.props.getReview();

    }


    updateForm = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {

        return (
            <React.Fragment>
                <div className="popupBackground">
                    <div className="editReviewPopup">
                        
                        <div id="editReviewContent">
                            <label>Your name</label>
                            <input type="text" placeholder="Your name" name="reviewer_name" value={this.state.reviewer_name} onChange={this.updateForm} />
                            <label>Review</label>
                            <textarea rows="4" cols="40" placeholder="Leave a review" name="review" value={this.state.review} onChange={this.updateForm} />
                            <button id="closeBtn" onClick={this.props.closeEditReview}>Cancel</button>
                            <button onClick={() => {
                                this.updateReview(this.props.currentReview);
                            }}>Update review</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        )
    }
}