import axios from "axios"
import React from "react"

export default class ArtInfo extends React.Component {

    deleteArt = async (artIdToDelete) => {
        console.log(artIdToDelete)
        let response = await axios.delete("https://3000-coral-grasshopper-zdtsha75.ws-us09.gitpod.io/delete_artpost/" + artIdToDelete)
    }
    

    render() {
        return (
            <React.Fragment>
                <div className="artInfo">
                    <button onClick={this.props.close}>Back to Gallery</button>
                    <div className="artInfoImageHolder" style={{ backgroundImage: `url(${this.props.imageURL})` }}></div>
                    <button onClick={()=>{
                        this.deleteArt(this.props._id);
                    }}>Delete</button>
                    <p>Like(s): {this.props.like_count}</p>
                    <p>Review(s): {this.props.review_count}</p>
                    <p>{this.props._id}</p>
                    <h2>{this.props.art_title}</h2>
                    <h3>{this.props.poster_name}</h3>
                    <p>{this.props.art_description}</p>
                    <p>Date published: {this.props.post_date}</p>
                    <div className="reviewSection">
                        <p>Reviews {this.props.review_count}</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}