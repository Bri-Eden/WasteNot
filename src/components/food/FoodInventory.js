import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import "./FoodInventory.css"


export const FoodInventory = ({ searchTermState }) => {
    const [food, setFood] = useState([])
    const [filteredFood, setFiltered] = useState([])
    const { foodId } = useParams()

    const navigate = useNavigate()
    //const [filteredFood, setFiltered] = useState([])
    //pull user from local storage

    const localWasteUser = localStorage.getItem("user")
    //convert retrieved string to object
    const wasteUserObject = JSON.parse(localWasteUser)

    useEffect(
        () => {
            if (searchTermState) {
                const searchedFood = filteredFood.filter(foods => foods.name.toLowerCase().startsWith(searchTermState.toLowerCase()))
                setFiltered(searchedFood)
            }
            else {
                const myPantry = food.filter(food => food.userId === wasteUserObject.id)
                setFiltered(myPantry)
            }
        },
        [searchTermState]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/foodInventory`)
                .then(response => response.json())
                .then((foodArray) => {
                    setFood(foodArray)
                })// View the initial state of tickets
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            //filter based on userId===food.userId

            const myPantry = food.filter(food => food.userId === wasteUserObject.id)
            setFiltered(myPantry)

        },
        [food] //observe specifically food state
    )

    //add new useEffect to observe inventory state, and sort display for each user based on customer Id on inventory and inventory Id number alignment


    return <>

        <button onClick={() => navigate("/food/addnew")}>Add New Item</button>



        <h2>My Pantry</h2>

        <article className="foodInventory">
            {
                //need to look through the array created by filtered in order to see specific tickets per user, which is filteredFood
                filteredFood.map(
                    (food) => {
                        return <> <section className="myPantry">
                            <header>
                                {food.name}
                            </header>

                            <footer>{food.expiration}</footer>
                            <div>
                                <Link className="edit-btn" to={`/food/edit/${food.id}`}>Edit Item</Link>

                            </div>
                        </section>
                        </>
                    }
                )
            }
        </article>
    </>
}

