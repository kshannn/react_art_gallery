import EditArtPage from "./EditArtPage"
import axios from "axios"
import React from "react"

export default class ArtInfo extends React.Component {

    state = {
        displayEditForm: false
    }


    closeEdit = () => {
        this.setState({
            displayEditForm: false
        })
    }

    editArt = () => {
        this.setState({
            displayEditForm: true
        })
    }

    renderEditArtPage = () => {
        if (this.state.displayEditForm){
            return <EditArtPage 
            closePage={this.props.closePage}
            closeEdit={this.closeEdit}
            poster_name={this.props.poster_name}
            image={this.props.image}
            art_title={this.props.art_title}
            art_description={this.props.art_description}
            art_type={this.props.art_type}
            art_subject={this.props.art_subject}
            like_count={this.props.like_count} 
            review_count={this.props.review_count} 
            _id={this.props._id}
            post_date={this.props.post_date}
            getGallery={this.props.getGallery}/>
    

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
    

    render() {
        return (
            <React.Fragment>
                <div className="artInfo">
                    <button onClick={this.props.closePage}>Back to Gallery</button>
                    <div className="artInfoImageHolder" style={{ backgroundImage: `url(${this.props.image})` }}></div>
                    <button onClick={()=>{
                        this.deleteArt(this.props._id);
                    }}>Delete Art</button>
                    <button onClick={()=>{
                        this.editArt();
                    }}>Edit Art</button>
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

                {this.renderEditArtPage()}
            </React.Fragment>
        )
    }
}