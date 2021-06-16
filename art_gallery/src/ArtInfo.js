// import EditArtPage from "./EditArtPage"
// import axios from "axios"
// import React from "react"

// export default class ArtInfo extends React.Component {

//     state = {
//         displayEditForm: false,
//         displayInfo: true,
//         reviewsSection:[]
//     }

//     // GET request: Reviews
//     async componentDidMount() {
//         let response = await axios.get("https://3000-coral-grasshopper-zdtsha75.ws-us09.gitpod.io/review_list")
        
//         this.setState({
//             reviewsSection: response.data
//         })
//     }



//     closeEdit = () => {
//         this.setState({
//             displayEditForm: false,
//             displayInfo: true
//         })
//     }

//     editArt = () => {
//         this.setState({
//             displayEditForm: true,
//             displayInfo: false
//         })
//     }

//     renderEditArtPage = () => {
//         if (this.state.displayEditForm) {
//             return <EditArtPage
//                 closePage={this.props.closePage}
//                 closeEdit={this.closeEdit}
//                 poster_name={this.props.poster_name}
//                 image={this.props.image}
//                 art_title={this.props.art_title}
//                 art_description={this.props.art_description}
//                 art_type={this.props.art_type}
//                 art_subject={this.props.art_subject}
//                 like_count={this.props.like_count}
//                 review_count={this.props.review_count}
//                 _id={this.props._id}
//                 post_date={this.props.post_date}
//                 getGallery={this.props.getGallery} />


//         } else {
//             return null
//         }
//     }

//     deleteArt = async (artIdToDelete) => {
//         let response = await axios.delete("https://3000-coral-grasshopper-zdtsha75.ws-us09.gitpod.io/delete_artpost/" + artIdToDelete)

//         // close popup
//         this.props.closePage();

//         // refresh gallery
//         this.props.getGallery();

//     }

//     renderReviewList = () => {
//         let jsx = this.state.reviewsSection.map((review)=>{
//           return(
//             <React.Fragment>
//               <div className="reviewContainer">
//                 <h3>{review.reviewer_name}</h3>
//                 <p>{review.review_date}</p>
//                 <p>{review.review}</p>
//               </div>
//             </React.Fragment>
//           )
//         })
//         return jsx
//       }

//     render() {
//         return (
//             <React.Fragment>
//                 {this.state.displayInfo &&
//                     <div className="artInfo">
//                         <button onClick={this.props.closePage}>Back to Gallery</button>
//                         <div className="artInfoImageHolder" style={{ backgroundImage: `url(${this.props.image})` }}></div>
//                         <button onClick={() => {
//                             this.deleteArt(this.props._id);
//                         }}>Delete Art</button>
//                         <button onClick={() => {
//                             this.editArt();
//                         }}>Edit Art</button>
//                         <p>Like(s): {this.props.like_count}</p>
//                         <p>Review(s): {this.props.review_count}</p>
//                         <h2>{this.props.art_title}</h2>
//                         <h3>{this.props.poster_name}</h3>
//                         <p>{this.props.art_description}</p>
//                         <p>Date published: {this.props.post_date}</p>
//                         <div className="reviewSection">
//                             <p>Reviews {this.props.review_count}</p>
//                             {this.renderReviewList()}
//                         </div>
//                     </div>
//                 }

//                 {!this.state.displayInfo && this.renderEditArtPage()}
//             </React.Fragment>
//         )
//     }
// }

// TEST REVISED
import EditArtPage from "./EditArtPage"
import axios from "axios"
import React from "react"

export default class ArtInfo extends React.Component {

    state = {
        displayEditForm: false,
        displayInfo: true,
        currentArt: {},
        reviewsSection:[]
    }

    // GET request: Reviews
    // async componentDidMount() {
    //     let response = await axios.get("https://3000-coral-grasshopper-zdtsha75.ws-us09.gitpod.io/review_list")
        
    //     this.setState({
    //         reviewsSection: response.data
    //     })
    // }

    async componentDidMount(){
        let artResponse = await axios.get("https://3000-coral-grasshopper-zdtsha75.ws-us09.gitpod.io/art_gallery/" + this.props._id)
        this.setState({
            currentArt: artResponse.data
        })

        let reviewResponse = await axios.get("https://3000-coral-grasshopper-zdtsha75.ws-us09.gitpod.io/art_gallery/" + this.props._id + "/review_list")
        this.setState({
            reviewsSection: reviewResponse.data
        })
    }

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
                like_count={this.state.currentArt.like_count}
                review_count={this.state.currentArt.review_count}
                _id={this.state.currentArt._id}
                post_date={this.state.currentArt.post_date}
                 />


        } else {
            return null
        }
    }

    deleteArt = async (artIdToDelete) => {
        let response = await axios.delete("https://3000-coral-grasshopper-zdtsha75.ws-us09.gitpod.io/delete_artpost/" + artIdToDelete)

        // close popup
        this.props.closePage();

        // refresh gallery
        this.props.getGallery();

    }

    renderReviewList = () => {
        let jsx = this.state.reviewsSection.map((review)=>{
          return(
            <React.Fragment>
              <div className="reviewContainer">
                <h3>{review.reviewer_name}</h3>
                <p>{review.review_date}</p>
                <p>{review.review}</p>
              </div>
            </React.Fragment>
          )
        })
        return jsx
      }

    render() {
        return (
            <React.Fragment>
                {this.state.displayInfo &&
                    <div className="artInfo">
                        <button onClick={this.props.closePage}>Back to Gallery</button>
                        <div className="artInfoImageHolder" style={{ backgroundImage: `url(${this.state.currentArt.image})` }}></div>
                        <button onClick={() => {
                            this.deleteArt(this.state.currentArt._id);
                        }}>Delete Art</button>
                        <button onClick={() => {
                            this.editArt();
                        }}>Edit Art</button>
                        <p>Like(s): {this.state.currentArt.like_count}</p>
                        <p>Review(s): {this.state.currentArt.review_count}</p>
                        <h2>{this.state.currentArt.art_title}</h2>
                        <h3>{this.state.currentArt.poster_name}</h3>
                        <p>{this.state.currentArt.art_description}</p>
                        <p>Date published: {this.state.currentArt.post_date}</p>
                        <div className="reviewSection">
                            <p>Reviews {this.state.currentArt.review_count}</p>
                            {this.renderReviewList()}
                        </div>
                    </div>
                }

                {!this.state.displayInfo && this.renderEditArtPage()}
            </React.Fragment>
        )
    }
}