import { Outlet, Route, Routes } from "react-router-dom"
import { NewFoodForm } from "../food/AddNewForm"
import { RecipesList } from "../recipes/Recipes"
import { NewRecipeForm } from "../recipes/AddNewRecipeForm"
import { FoodContainer } from "../food/FoodContainer"
import { InventoryEdit } from "../food/InventoryEdits"
import { RecipeEdit } from "../recipes/RecipeListEdits"

export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Waste Not</h1>


					<Outlet />
				</>
			}>

				<Route path="food" element={
					<FoodContainer />
				} />
				<Route path="food/edit/:foodId" element={<InventoryEdit />} />

				<Route path="food/addnew" element={<NewFoodForm />} />

				<Route path="recipes" element={<RecipesList />} />

				<Route path="recipes/addnew" element={<NewRecipeForm />} />

				<Route path="recipes/edit/:recipeId" element={<RecipeEdit />} />

			</Route>
		</Routes>
	)
}
