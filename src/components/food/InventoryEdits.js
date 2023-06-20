import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const InventoryEdit = () => {

    const [foodTypes, setType] = useState([])

    const [food, assignFood] = useState({
        name: "",
        typeId: 0,
        expiration: ""
    })
    const { foodId } = useParams()
    const navigate = useNavigate()

    const localWasteUser = localStorage.getItem("user")
    const wasteUserObject = JSON.parse(localWasteUser)

    useEffect(() => {
        fetch(`http://localhost:8088/foodInventory/${foodId}`)
            .then(response => response.json())
            .then((data) => {
                assignFood(data)
            })
    }, [foodId])

    const handleSaveButtonClick = async (event) => {
        event.preventDefault()

        if (wasteUserObject.id !== 0 && food.typeId !== 0 && food.name !== "" && food.expiration !== "")


            return fetch(`http://localhost:8088/foodInventory/${food.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(food)
            })
                .then(response => response.json())
                .then(() => {
                    navigate(`/food`)
                })
    }

    useEffect(
        () => {
            fetch('http://localhost:8088/foodTypes')
                .then(response => response.json())
                .then((typeArray) => {
                    setType(typeArray)
                })
        },
        []
    )

    return <form className="itemForm">
        <h2 className="itemForm__title">Edit Pantry Item</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Item Name:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={food.name}
                    onChange={
                        (evt) => {
                            const copy = { ...food }
                            copy.name = evt.target.value
                            assignFood(copy)
                        }
                    } />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="category">Food Category:</label>
                <select
                    required autoFocus
                    className="form-control"
                    value={food.typeId}
                    onChange={
                        (evt) => {
                            const copy = { ...food }
                            copy.typeId = evt.target.value
                            assignFood(copy)
                        }
                    } >
                    <option value="" defaultValue>Select a Category</option>
                    {foodTypes.map(item => (
                        <option value={item.id} key={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="expiration">Use by date:</label>
                <input
                    required autoFocus
                    type="text"
                    className="form-control"
                    value={food.expiration}
                    onChange={
                        (evt) => {
                            const copy = { ...food }
                            copy.expiration = evt.target.value
                            assignFood(copy)
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
