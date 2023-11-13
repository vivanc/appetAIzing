const SearchBar = ({ input, onChangeHandler }) => {
  return (
    <div className="d-flex flex-row rounded">
      <input
        className="form-control rounded"
        type="search"
        placeholder="search recipe.."
        value={input}
        onChange={onChangeHandler}
      />
    </div>
  );
};
export default SearchBar;
