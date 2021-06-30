import React from "react"
import axios from "axios";

const baseUrl = "https://3000-coral-grasshopper-zdtsha75.ws-us08.gitpod.io"

export default class FilterOptions extends React.Component {

    state = {
        art_type: "",
        art_subject: []
      };

    // Process checkbox, store art subject selected in state
    updateCheckbox = (e) => {
    if (!this.state.art_subject.includes(e.target.value)) {
        let clone = [...this.state.art_subject, e.target.value];
        this.setState({
        art_subject: clone
        });
    } else {
        let indexToDelete = this.state.art_subject.findIndex((s) => {
        return s === e.target.value;
        });
        let clone = [
        ...this.state.art_subject.slice(0, indexToDelete),
        ...this.state.art_subject.slice(indexToDelete + 1)
        ];
        this.setState({
        art_subject: clone
        });
    }
    };

    // When apply filter button is clicked, gallery returns art posts that meets filter criteria
    applyFilter = async () => {
        let q = ""

        if(this.state.art_type && this.state.art_subject){
            q += "art_type=" + this.state.art_type + "&" + "art_subject=" + this.state.art_subject
        } else if(this.state.art_type){
            q += "art_type=" + this.state.art_type
        } else if(this.state.art_subject){
            q += "art_subject=" + this.state.art_subject
        }

        let response = await axios.get(baseUrl + "/art_gallery/combinedFilter?" + q)
        this.props.filterGallery(response);        
    }

    render(){
        return (
            <React.Fragment>
                <div className="mainFilter">
                    
                {/* Art type */}
                <h2>Type</h2>
                <select
                    value={this.state.art_type}
                    // Process select dropdown, store art type selected in state
                    onChange={(e) => {
                        this.setState({
                            art_type: e.target.value
                        });
                    }}
                >
                    <option value="">-- Select an art type ---</option>
                    <option value="digital">Digital</option>
                    <option value="traditional">Traditional</option>
                </select>
        
                {/* Art subject */}
                <h2>Subject</h2>
                <div>
                    <input
                        type="checkbox"
                        name="art_subject"
                        value="nature"
                        onChange={this.updateCheckbox}
                        checked={this.state.art_subject.includes("nature")}
    
                    />{" "}Nature
                </div>
    
                <div>
                    <input
                        type="checkbox"
                        name="art_subject"
                        value="animal"
                        onChange={this.updateCheckbox}
                        checked={this.state.art_subject.includes("animal")}
    
                    />{" "}Animal
                </div>
    
                <div>
                    <input
                        type="checkbox"
                        name="art_subject"
                        value="people"
                        onChange={this.updateCheckbox}
                        checked={this.state.art_subject.includes("people")}
    
                    />{" "}People
                </div>
    
                {/* Apply filter button */}
                <button onClick={()=>{
                    this.applyFilter();
                }}>Apply filter</button>

                {/* Clear filter button */}
                {/* Set state back to default (i.e. all options unchecked) */}
                <button onClick={()=>{
                    this.setState({
                        art_type: "",
                        art_subject: []
                    })
                    this.props.getGallery()
                }
                }>Clear filter</button>
                </div>
            </React.Fragment>
        )
    }
}