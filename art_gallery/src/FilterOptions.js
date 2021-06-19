import React from "react"

export default function FilterOptions() {
    return (
        <React.Fragment>
            <div className="offcanvas offcanvas-start w-25" tabindex="-1" id="offcanvas" data-bs-keyboard="false" data-bs-backdrop="false">
                <div className="offcanvas-header">
                    <h6 className="offcanvas-title d-block" id="offcanvas">Search Filter</h6>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
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


                </div>
            </div>

        </React.Fragment>
    )
}