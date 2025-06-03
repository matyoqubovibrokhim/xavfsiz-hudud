import { fetchListByStatus } from '../services/api'

const payload = {
	region_id: '00s0eed0000region000198',
	limit: 20,
	offset: 0,
	status: 'pending',
}

fetchListByStatus(payload, 'list-by-status-and-region').then(response => {
	response.forEach(item => {
		const tbody = document.getElementById('table-body')
		tbody.innerHTML += `
 				<tr>
 		 			<td style="border-right: 1px solid black;">${item.created_by_db.name_ru}</td>
 		 			<td style="border-right: 1px solid black;">${item.task_text}</td>
 		 			<td style="padding-right: 20px;">${item.total}</td>
 		 		</tr>
 			`
	})
	console.log(response)
})

// fetch(_URL, {
// 	method: 'POST',
// 	headers: headers,
// 	body: JSON.stringify(payload),
// })
// 	.then(response => {
// 		if (!response.ok) {
// 			throw new Error(`Xatolik: ${response.status}`)
// 		}
// 		return response.json()
// 	})
// 	.then(data => {
// 		const tbody = document.getElementById('table-body')
// 		data.forEach(item => {
// 			tbody.innerHTML += `
// 				<tr>
// 		 			<td style="border-right: 1px solid black;">${item.task_text}</td>
// 		 			<td style="text-align: right; padding-right: 20px;">${item.total}</td>
// 		 		</tr>
// 			`
// 		})

// 		console.log(data)
// 	})
// 	.catch(error => {
// 		console.error('Request error:', error.message)
// 	})

// =================================================

// const tbody = document.getElementById('table-body')
// const regions = data.regions
// const tasks = data.tasks

// const maxLength = Math.max(regions.length, tasks.length)

// for (let i = 0; i < maxLength; i++) {
// 	const regionName = regions[i]?.name || ''
// 	const taskText = tasks[i]?.text || ''

// 	const row = `
// 		<tr>
// 			<td style="border-right: 1px solid black;">${regionName}</td>
// 			<td>${taskText}</td>
// 		</tr>
// 	`

// 	tbody.innerHTML += row
// }
