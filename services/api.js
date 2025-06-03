import axios from 'axios'
import { BASE_URL, headers } from '../constants/constants'

const fetchListByStatus = async (payload, api_url) => {
	try {
		const { data } = await axios.post(`${BASE_URL}/${api_url}`, payload, {
			headers,
		})
		return data
	} catch (error) {
		console.log(error)
	}
}

export { fetchListByStatus }
