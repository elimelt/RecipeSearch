import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


const FilterDropdown = (props) => {
    const { setCurrFilter, currFilter } = props
    const handleChange = (e) => {
        setCurrFilter(e.target.value);
    }

    return (
        <div className="my-2">
            <select 
                className="custom-select btn btn-secondary" 
                value={currFilter} 
                onChange={handleChange}
            >
                <option value="default">Filter by</option>
                <option value="increasing">Less ingredients</option>
                <option value="decreasing">More ingredients</option>
            </select>
        </div>
    );
}

const SearchBar = (props) => {
    return (
        <div className="outer-search-bar-container">
            <form onSubmit={props.handleSubmit} className="search-bar-container d-flex align-items-center">
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search..." 
                        value={props.query} 
                        onChange={props.searchChange} 
                    />
                    <div className="d-flex justify-content-center align-items-center">
                        <div>
                            <FilterDropdown 
                                currFilter={props.currFilter} 
                                setCurrFilter={props.setCurrFilter}
                            />
                        </div>
                        <div>
                            <button className="btn btn-primary" type="submit">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchBar;