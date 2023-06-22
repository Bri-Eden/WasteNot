import { useState } from "react"
import { RecipeSearch } from "./RecipeSearch"
import { RecipesList } from "./Recipes"

export const RecipeContainer = () => {
    const [recipeSearch, setRecipeSearch] = useState()

    return <>
        <RecipeSearch setterFunction={setRecipeSearch} />
        <RecipesList searchTermState={recipeSearch} />
    </>
}