import React from "react"
import axios from "axios"

export default class EditReviewPage extends React.Component {
    
    state = {
        reviewer_name: "",
        review: ""
    }

    async componentDidMount () {
        this.setState({
            reviewer_name:this.props.currentReview.reviewer_name,
            review: this.props.currentReview.review
        })
    }

    updateReview = async (currentReview) => {
        let userData = {
            reviewer_name: this.state.reviewer_name,
            liked_post: this.props.currentReview.liked_post,
            review: this.state.review
        }
    
        let response = await axios.put("https://3000-coral-grasshopper-zdtsha75.ws-us08.gitpod.io/review/edit/" + currentReview.id, userData)
        console.log("updated review")

        this.props.closeEditReview();
        this.props.getReview();

    }
   

    updateForm = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };

    render(){
    
        return (
            <React.Fragment>
                <div className="popupBackground">
                        <div className="popup">
                            <button onClick={this.props.closeEditReview}>X</button>
                             <input type="text" placeholder="Your name" name="reviewer_name" value={this.state.reviewer_name} onChange={this.updateForm} />
                             <textarea rows="4" cols="40" placeholder="Leave a review" name="review" value={this.state.review} onChange={this.updateForm} />
                             <button onClick={()=>{
                                 this.updateReview(this.props.currentReview);
                             }}>Update review</button>
                        </div>
                    </div>
            </React.Fragment>

        )
    }
}