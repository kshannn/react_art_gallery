import React from "react"

export default function FilterOptions() {
    return (
        <React.Fragment>
            {/* Art type */}
            <h2>Type</h2>

            <div>
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
</div>


            {/* Art subject */}
            <h2>Subject</h2>
            <div>
                <input
                    type="checkbox"
                    name="art_subject"
                    value="nature"

                />{" "}
Nature
</div>

            <div>
                <input
                    type="checkbox"
                    name="art_subject"
                    value="animal"

                />{" "}
                Animal
                </div>

            <div>
                <input
                    type="checkbox"
                    name="art_subject"
                    value="people"

                />{" "}
                People
                </div>


            <button>Apply filter</button>
            <button>Clear filter</button>


        </React.Fragment>
    )
}