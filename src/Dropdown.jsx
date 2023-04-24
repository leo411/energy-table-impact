const YEARS = ["All years", "2023", "2022", "2021", "2020", "2019"]

const LOCATIONS = ["All location", "Sydney", "Melbourne", "Adelaide"]

const PROVIDERS = [
	"All providers",
	"Momentum",
	"Diamond",
	"Powershop",
	"Simply Energy",
	"Enova",
	"AGL",
]

const DropDown = ({
	type,
	setStartDateFrom,
	setEndDateTo,
	setLocation,
	setProvider,
}) => {
	const handleChange = ({ target: { value } }) => {
		if (type == "year") {
			setStartDateFrom(`${value}-01-01`)
			setEndDateTo(`${value}-12-31`)
		} else if (type === "location") {
			setLocation(value)
		} else if (type === "provider") {
			setProvider(value)
		}
	}

	let categories
	if (type === "year") {
		categories = YEARS
	} else if (type === "location") {
		categories = LOCATIONS
	} else if (type === "provider") {
		categories = PROVIDERS
	}

	if (!categories) return null

	return (
		<select onChange={handleChange}>
			<option value="">{categories[0]}</option>
			{categories.map((category, index) => {
				if (index >= 1) {
					return (
						<option key={`${index}-${category}`} value={category}>
							{category}
						</option>
					)
				}
			})}
		</select>
	)
}

export default DropDown
