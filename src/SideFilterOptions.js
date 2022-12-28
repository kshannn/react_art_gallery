import React from "react"
import axios from "axios";
import {baseUrl} from "./constants"

export default class SideFilterOptions extends React.Component {

    state = {
        art_type: "",
        art_subject: []
    };

    // Retain sorting regardless of filter
    retainSort = async () => {
        let response = await axios.get(baseUrl + "/art_gallery")
        let data = response.data
        if (this.props.isSortedBy === "most_liked") {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data.length - 1; j++) {
                    if (data[j].statistics.like_count < data[j + 1].statistics.like_count) {
                        let temp = data[j];
                        data[j] = data[j + 1];
                        data[j + 1] = temp;
                    }
                }
            }
    
            this.props.sortGallery(data);

        } else if (this.props.isSortedBy === "most_reviewed") {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data.length - 1; j++) {
                    if (data[j].statistics.review_count < data[j + 1].statistics.review_count) {
                        let temp = data[j];
                        data[j] = data[j + 1];
                        data[j + 1] = temp;
                    }
                }
            }
    
            this.props.sortGallery(data);

        } else if (this.props.isSortedBy === "most_recent") {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data.length - 1; j++) {
                    if (data[j].post_date < data[j + 1].post_date) {
                        let temp = data[j];
                        data[j] = data[j + 1];
                        data[j + 1] = temp;
                    }
                }
            }
    
            this.props.sortGallery(data);

        } 
    }

    retainSortTwo = () => {
        let data = this.props.gallery
        if (this.props.isSortedBy === "most_liked") {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data.length - 1; j++) {
                    if (data[j].statistics.like_count < data[j + 1].statistics.like_count) {
                        let temp = data[j];
                        data[j] = data[j + 1];
                        data[j + 1] = temp;
                    }
                }
            }

            this.props.sortGallery(data);

        } else if (this.props.isSortedBy === "most_reviewed") {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data.length - 1; j++) {
                    if (data[j].statistics.review_count < data[j + 1].statistics.review_count) {
                        let temp = data[j];
                        data[j] = data[j + 1];
                        data[j + 1] = temp;
                    }
                }
            }

            this.props.sortGallery(data);

        } else if (this.props.isSortedBy === "most_recent") {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data.length - 1; j++) {
                    if (data[j].post_date < data[j + 1].post_date) {
                        let temp = data[j];
                        data[j] = data[j + 1];
                        data[j + 1] = temp;
                    }
                }
            }

            this.props.sortGallery(data);

        }
    }

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

        if (this.state.art_type && this.state.art_subject) {
            q += "art_type=" + this.state.art_type + "&art_subject=" + this.state.art_subject
        } else if (this.state.art_type) {
            q += "art_type=" + this.state.art_type
        } else if (this.state.art_subject) {
            q += "art_subject=" + this.state.art_subject
        }

        let response = await axios.get(baseUrl + "/art_gallery/combinedFilter?" + q)
        this.props.filterGallery(response);
        this.retainSortTwo();
    }

    render() {
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
                            value="animal"
                            onChange={this.updateCheckbox}
                            checked={this.state.art_subject.includes("animal")}

                        />{" "}Animal
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            name="art_subject"
                            value="anime"
                            onChange={this.updateCheckbox}
                            checked={this.state.art_subject.includes("anime")}

                        />{" "}Anime
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            name="art_subject"
                            value="cartoon"
                            onChange={this.updateCheckbox}
                            checked={this.state.art_subject.includes("cartoon")}

                        />{" "}Cartoon
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            name="art_subject"
                            value="food"
                            onChange={this.updateCheckbox}
                            checked={this.state.art_subject.includes("food")}

                        />{" "}Food
                    </div>

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
                            value="people"
                            onChange={this.updateCheckbox}
                            checked={this.state.art_subject.includes("people")}

                        />{" "}People
                    </div>

                    {/* Apply filter button */}
                    <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" onClick={() => {
                        this.applyFilter();
                        this.props.closePage();
                        this.setState({
                            art_type: "",
                            art_subject: []
                        })
                    }}>Apply filter</button>

                    {/* Clear filter button */}
                    {/* Set state back to default (i.e. all options unchecked) */}
                    <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" onClick={() => {
                        this.setState({
                            art_type: "",
                            art_subject: []
                        })
                        
                        this.retainSort();
                    }
                    }>Clear filter</button>
                </div>
            </React.Fragment>
        )
    }
}