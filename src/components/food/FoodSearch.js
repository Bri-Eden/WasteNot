export const FoodSearch = ({ setterFunction }) => {
    return (
        <div>
            <input
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    }
                }
                type="text" placeholder="Search Your Inventory" />
        </div>
    )
}