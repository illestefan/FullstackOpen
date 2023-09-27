// this is the filter component with the input field for the filter
// it takes the following props:
// - filter: the state with the filter string
// - handleFilterChange: the function (event handler) to handle changes in the filter input field
const Filter = ({ filter, handleFilterChange }) => {
    return (
      <div>
        filter shown with <input value={filter} onChange={handleFilterChange} />
      </div>
    )
  }
  
  export default Filter
  