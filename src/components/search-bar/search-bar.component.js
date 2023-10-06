const SearchBar = () => {
  return (
    <div className="d-flex flex-row rounded">
      <input
        className="form-control rounded"
        type="search"
        placeholder="search recipe.."
        onChange={""}
      />
      <button class="btn btn-outline-warning my-2 my-sm-0" type="submit">
        search
      </button>
    </div>
  );
};
export default SearchBar;
