import React from "react"

export default class ArtInfo extends React.Component {
    
    
    render(){
        return (
            <React.Fragment>
                <div className="artInfo">
                    <button onClick={this.props.close}>Back to Gallery</button>
                    
                    <img src={this.props.imageURL} alt="user inserted image"/>
                    

                    
                </div>
            </React.Fragment>
        )
    }
}