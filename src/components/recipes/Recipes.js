import { useEffect, useState } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"

export const RecipesList = () => {
    const [recipe, setRecipe] = useState([])
    const [filteredRecipe, setFiltered] = useState([])
    const { recipeId } = useParams()

    const navigate = useNavigate()
    //const [filteredFood, setFiltered] = useState([])
    //pull user from local storage

    const localWasteUser = localStorage.getItem("user")
    //convert retrieved string to object
    const wasteUserObject = JSON.parse(localWasteUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/recipes`)
                .then(response => response.json())
                .then((recipeArray) => {
                    setRecipe(recipeArray)
                })// View the initial state of tickets
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            //filter based on userId===food.userId

            const myRecipes = recipe.filter(recipe => recipe.userId === wasteUserObject.id)
            setFiltered(myRecipes)

        },
        [recipe] //observe specifically food state
    )

    //add new useEffect to observe inventory state, and sort display for each user based on customer Id on inventory and inventory Id number alignment


    return <>

        <button onClick={() => navigate("/recipes/addnew")}>Add New Recipe</button>

        <h2>My Recipes</h2>

        <article className="recipes">
            {
                //need to look through the array created by setFiltered in order to see specific tickets per user, which is filteredTickets
                filteredRecipe.map(
                    (recipe) => {
                        return <section className="myRecipes">
                            <header>{recipe.name}</header>
                            <footer>{recipe.ingredients}</footer>
                            <footer>{recipe.instructions}</footer>
                            <div>
                                <Link className="edit-btn" to={`/recipes/edit/${recipe.id}`}>Edit Item</Link>
                            </div>
                        </section>
                    }
                )
            }
        </article>
    </>
}
