import React from 'react';

const LocationSearch = (props) => (
    <div className="container mt-5">
        <div className="row">
            <div className="col-6 offset-3">
                <form onSubmit={props.onLocationChange}>
                    <div className="input-group">
                        <input type="text" name="location" className="form-control" placeholder="Search location..." />
                        <button className="btn btn-primary">Go!</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
)

export default LocationSearch;