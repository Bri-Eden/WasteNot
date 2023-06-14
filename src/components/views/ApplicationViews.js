import { FoodInventory } from "../food/FoodInventory"
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


			</Route>
		</Routes>
	)
}
