import React from "react"

export default class ArtInfo extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="artInfo">
                    <button onClick={this.props.close}>Back to Gallery</button>
                    <div className="artInfoImageHolder" style={{ backgroundImage: `url(${this.props.imageURL})` }}></div>
                    <button>Delete</button>
                    <p>Like(s): {this.props.like_count}</p>
                    <p>Review(s): {this.props.review_count}</p>
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