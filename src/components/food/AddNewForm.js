import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const NewFoodForm = () => {

    const [food, update] = useState({
        name: "",
        expiration: ""
    })

    const navigate = useNavigate()

    const localWasteUser = localStorage.getItem("user")
    const wasteUserObject = JSON.parse(localWasteUser)

    const handleSaveButtonClick = async (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const itemToSend = {
            userId: wasteUserObject.id,
            name: food.name,
            type: food.typeId,
            expiration: food.name
        }


        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/addnew`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(itemToSend)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/food")
            })
    }

    return (
        <form className="itemForm">
            <h2 className="itemForm_title">New Pantry Item</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Item Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="name"
                        value={food.name}
                        onChange={
                            (evt) => {
                                const copy = { ...food }
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="expiration">Use by date:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="00-00-0000"
                        value={food.expiration}
                        onChange={
                            (evt) => {
                                const copy = { ...food }
                                copy.expiration = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Add To My Pantry
            </button>
        </form>
    )
}