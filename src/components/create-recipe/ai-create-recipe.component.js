const AICreateRecipe = () => {
    console.log("ai recipe is rendring");
    return (
        <>
            <form>
                <h4>Create a Recipe by AI</h4>
                <label>
                    Recipe URL: <input name="recipeURL" />
                </label>
                <button type="submit">Submit URL</button>
            </form>
        </>
    )

}

export default AICreateRecipe;