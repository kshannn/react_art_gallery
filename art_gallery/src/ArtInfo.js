import React from "react"

export default class ArtInfo extends React.Component {
    render(){
        return (
            <React.Fragment>
                <div className="artInfo">
                    <button onClick={this.props.close}>Back to Gallery</button>
                    <div className="artInfoImageHolder" style={{backgroundImage: `url(${this.props.imageURL})`}}></div>
                    {/* <img src={this.props.imageURL} alt="user inserted art" /> */}
                    <h2>{this.props.art_title}</h2>

                    

                    
                </div>
            </React.Fragment>
        )
    }
}