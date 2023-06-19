import { useState } from "react"
import { FoodSearch } from "./FoodSearch"
import { FoodInventory } from "./FoodInventory"

export const FoodContainer = () => {
    const [foodSearch, setFoodSearch] = useState()

    return <>
        <FoodSearch setterFunction={setFoodSearch} />
        <FoodInventory searchTermState={foodSearch} />
    </>
}