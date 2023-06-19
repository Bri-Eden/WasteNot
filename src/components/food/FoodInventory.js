import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const FoodInventory = ({ searchTermState }) => {
    const [food, setFood] = useState([])
    const [filteredFood, setFiltered] = useState([])

    const navigate = useNavigate()
    //const [filteredFood, setFiltered] = useState([])
    //pull user from local storage

    const localWasteUser = localStorage.getItem("user")
    //convert retrieved string to object
    const wasteUserObject = JSON.parse(localWasteUser)

    useEffect(
        () => {
            const searchedFood = filteredFood.filter(foods => foods.name.toLowerCase().startsWith(searchTermState.toLowerCase()))
            setFiltered(searchedFood)
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
                        return <section className="myPantry">
                            <header>{food.name}</header>

                            <footer>{food.expiration}</footer>
                        </section>
                    }
                )
            }
        </article>
    </>
}

