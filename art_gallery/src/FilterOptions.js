import React from "react"

export default class FilterOptions extends React.Component {

    state = {
        art_type: "",
        art_subject: []
      };

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

    render(){
        return (
            <React.Fragment>
                {/* Art type */}
                <h2>Type</h2>
                <select
                    value={this.state.art_type}
                    onChange={(e) => {
                        this.setState({
                            art_type: e.target.value
                        });
                    }}
                >
                    <option>-- Select an art type ---</option>
                    <option value="digital">Digital</option>
                    <option value="traditional">Traditional</option>
                </select>
                {/* <div>
                    <input
                        type="radio"
                        name="art_type"
                        value="digital"
                    />{" "}
    Digital
    </div>
    
                <div>
                    <input
                        type="radio"
                        name="art_type"
                        value="traditional"
                    />{" "}
    Traditional
    </div> */}
    
    
                {/* Art subject */}
                <h2>Subject</h2>
                <div>
                    <input
                        type="checkbox"
                        name="art_subject"
                        value="nature"
                        onChange={this.updateCheckbox}
                        checked={this.state.art_subject.includes("nature")}
    
                    />{" "}
    Nature
    </div>
    
                <div>
                    <input
                        type="checkbox"
                        name="art_subject"
                        value="animal"
                        onChange={this.updateCheckbox}
                        checked={this.state.art_subject.includes("animal")}
    
                    />{" "}
                    Animal
                    </div>
    
                <div>
                    <input
                        type="checkbox"
                        name="art_subject"
                        value="people"
                        onChange={this.updateCheckbox}
                        checked={this.state.art_subject.includes("people")}
    
                    />{" "}
                    People
                    </div>
    
    
                <button>Apply filter</button>
                <button>Clear filter</button>
    
    
            </React.Fragment>
        )
    }
    
}