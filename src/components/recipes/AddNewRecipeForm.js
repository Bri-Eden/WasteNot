import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const NewRecipeForm = () => {

    const [recipe, update] = useState({
        name: "",
        ingredients: "",
        instructions: ""
    })

    const navigate = useNavigate()

    const localWasteUser = localStorage.getItem("user")
    const wasteUserObject = JSON.parse(localWasteUser)

    const handleSaveButtonClick = async (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const itemToSend = {
            userId: wasteUserObject.id,
            name: recipe.name,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions
        }


        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/recipes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(itemToSend)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/recipes")
            })
    }

    return (
        <form className="itemForm">
            <h2 className="itemForm_title">New Recipe</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Recipe Title"
                        value={recipe.name}
                        onChange={
                            (evt) => {
                                const copy = { ...recipe }
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="expiration">Ingredients:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Ingredients Needed"
                        value={recipe.ingredients}
                        onChange={
                            (evt) => {
                                const copy = { ...recipe }
                                copy.ingredients = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="expiration">Instructions:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Instructions"
                        value={recipe.instructions}
                        onChange={
                            (evt) => {
                                const copy = { ...recipe }
                                copy.instructions = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Add To My Recipes
            </button>
        </form>
    )
}