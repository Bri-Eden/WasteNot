import { FoodInventory } from "../food/FoodInventory"
import { NewFoodForm } from "../food/AddNewForm"
import { RecipesList } from "../recipes/Recipes"
import { NewRecipeForm } from "../recipes/AddNewRecipeForm"
import { Outlet, Route, Routes } from "react-router-dom"

export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Waste Not</h1>


					<Outlet />
				</>
			}>

				<Route path="food" element={<FoodInventory />} />

				<Route path="food/addnew" element={<NewFoodForm />} />

				<Route path="recipes" element={<RecipesList />} />

				<Route path="recipes/addnew" element={<NewRecipeForm />} />

			</Route>
		</Routes>
	)
}
