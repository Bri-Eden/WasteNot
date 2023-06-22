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

    const foodInventoryArray = () => {
        fetch(`http://localhost:8088/foodInventory`)
            .then(response => response.json())
            .then((foodArray) => {
                setFood(foodArray)
            })
    }

    useEffect(
        () => {
            foodInventoryArray()
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

    const sortByDate = () => {
        fetch(`http://localhost:8088/foodInventory?userId=${wasteUserObject.id}`)
            .then(response => response.json())
            .then((foodData) => {
                const foodDate = foodData.sort((a, b) => new Date(a.expiration) - new Date(b.expiration));
                setFiltered(foodDate)
            })

    }

    const deleteButton = (foodId) => {
        fetch(`http://localhost:8088/foodInventory/${foodId}`, {
            method: "DELETE"
        })
            .then(() => {
                foodInventoryArray()
            })

    }


    return <>

        <button onClick={() => navigate("/food/addnew")}>Add New Item</button>
        <button onClick={sortByDate}>Sort by Expiration</button>



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
                            <div>
                                <button onClick={() => deleteButton(food.id)}>Delete Item</button>
                            </div>
                        </section>
                        </>
                    }
                )
            }
        </article>
    </>
}

