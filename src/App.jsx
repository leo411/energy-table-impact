import { useState, useEffect } from "react"
import DropDown from "./Dropdown"

const HEADERS = [
	"Location",
	"Meter Id",
	"Start Date",
	"End Date",
	"Provider",
	"Usage",
	"GreenPower %",
	"Amount paid",
	"Emissions",
]

function App() {
	const [data, setData] = useState([])
	const [page, setPage] = useState(0)
	const [search, setSearch] = useState("")
	const [startDateFrom, setStartDateFrom] = useState("")
	const [endDateTo, setEndDateTo] = useState("")
	const [location, setLocation] = useState("")
	const [provider, setProvider] = useState("")

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(
					`https://impact-code-test.fly.dev/fetch-data?page=${page}&search=${search}&startDateFrom=${startDateFrom}&endDateTo=${endDateTo}&location=${location}&provider=${provider}`,
					{
						method: "GET",
					}
				)
				const data = await res.json()

				setData(data)
			} catch (error) {
				alert(`The table cannot be loaded: ${error}`)
			}
		}
		fetchData()
	}, [page, search, startDateFrom, endDateTo, location, provider])

	if (!data) return <p>Data loading</p>

	return (
		<>
			<input
				type="search"
				placeholder="Search"
				onChange={(e) => setSearch(e.target.value)}
			/>
			<DropDown
				{...{
					type: "year",
					setStartDateFrom,
					setEndDateTo,
					setLocation,
					setProvider,
				}}
			/>
			<DropDown
				{...{
					type: "location",
					setStartDateFrom,
					setEndDateTo,
					setLocation,
					setProvider,
				}}
			/>
			<DropDown
				{...{
					type: "provider",
					setStartDateFrom,
					setEndDateTo,
					setLocation,
					setProvider,
				}}
			/>

			<table>
				<tbody>
					<tr>
						<td>
							<input type="checkbox"></input>
						</td>
						{HEADERS.map((header, index) => (
							<th key={index}>{header}</th>
						))}
					</tr>
					{data.map((data, index) => (
						<tr key={index}>
							<td>
								<input type="checkbox"></input>
							</td>
							<td>{data.location}</td>
							<td>NMI {data.meterId}</td>
							<td>{data.startDate}</td>
							<td>{data.endDate}</td>
							<td>{data.provider}</td>
							<td>{data.usageKwh} kWh</td>
							<td>{data.greenPower}%</td>
							<td>${data.amountPaid}</td>
							<td>{data.emissions} tCO2e</td>
						</tr>
					))}
				</tbody>
			</table>
			{page === 0 ? null : (
				<button className="button" onClick={(e) => setPage(page - 1)}>
					Previous page
				</button>
			)}
			{page >= 6 ? null : (
				<button className="button" onClick={(e) => setPage(page + 1)}>
					Next page
				</button>
			)}
		</>
	)
}

export default App
