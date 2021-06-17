import React from "react"

export default class EditReviewPage extends React.Component {
    
    state = {
        reviewer_name: "",
        review: ""
    }

    async componentDidMount () {
        console.log("mounted")
        this.setState({
            reviewer_name:this.props.reviewer_name,
            review: this.props.review
        })
      }
    
    updateForm = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };

    render(){
    
        return (
            <React.Fragment>
                <div className="popupContainer">
                        <div className="modal">
                             <input type="text" placeholder="Your name" name="reviewer_name" value={this.state.reviewer_name} onChange={this.updateForm} />
                             <textarea rows="4" cols="40" placeholder="Leave a review" name="review" value={this.state.review} onChange={this.updateForm} />
                             <button>Update review</button>
                        </div>
                    </div>
            </React.Fragment>

        )
    }
}