import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const RecipeEdit = () => {

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: "",
        instructions: ""
    })
    const { recipeId } = useParams()
    const navigate = useNavigate()

    const localWasteUser = localStorage.getItem("user")
    const wasteUserObject = JSON.parse(localWasteUser)

    useEffect(() => {
        fetch(`http://localhost:8088/recipes/${recipeId}`)
            .then(response => response.json())
            .then((data) => {
                setRecipe(data)
            })
    }, [recipeId])

    const handleSaveButtonClick = async (event) => {
        event.preventDefault()

        if (wasteUserObject.id !== 0 && recipe.userId !== 0 && recipe.name !== "" && recipe.instructions !== "" && recipe.ingredients !== "")

            return fetch(`http://localhost:8088/recipes/${recipe.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(recipe)
            })
                .then(response => response.json())
                .then(() => {
                    navigate(`/recipes`)
                })
    }

    return <form className="itemForm">
        <h2 className="itemForm__title">Edit Recipe</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Name:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={recipe.name}
                    onChange={
                        (evt) => {
                            const copy = { ...recipe }
                            copy.name = evt.target.value
                            setRecipe(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="ingredients">Ingredients:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={recipe.ingredients}
                    onChange={
                        (evt) => {
                            const copy = { ...recipe }
                            copy.ingredients = evt.target.value
                            setRecipe(copy)
                        }
                    } >

                </input>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="instructions">Instructions:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={recipe.instructions}
                    onChange={
                        (evt) => {
                            const copy = { ...recipe }
                            copy.instructions = evt.target.value
                            setRecipe(copy)
                        }
                    } />
            </div>
        </fieldset>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Edits
        </button>
    </form>
}
