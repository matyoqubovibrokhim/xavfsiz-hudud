import { fetchListByStatus } from '../services/api'

const payload = {
	task_type: 4,
	region_id: '00s0eed0000region000013',
	district_id: '00s0eed0000region000198',
}

document.addEventListener('DOMContentLoaded', () => {
	fetchListByStatus(payload, 'list-by-date')
		.then(res => {
			const tbody = document.getElementById('table-body')
			const selectContainer = document.getElementById('region-select-box')
			const summaryDiv = document.getElementById('summary')
			const showAllBtn = document.getElementById('showAllBtn')
			const showTopBtn = document.getElementById('showTopBtn')

			const regions = res.regions
			const tasks = res.tasks

			let selectHTML =
				'<select style="padding: 10px;" id="region-select" onchange="displayTasksForRegion(this.value, \'all\')">'
			selectHTML +=
				'<option style="font-size: 16px;" value="">Маҳаллани танланг</option>'
			regions.forEach((region, index) => {
				selectHTML += `<option style="font-size: 16px;" value="${index}">${
					index + 1
				}. ${region.name}</option>`
			})
			selectHTML += '</select>'

			selectContainer.innerHTML = selectHTML

			window.displayTasksForRegion = function (
				regionIndex,
				filterType = 'all'
			) {
				tbody.innerHTML = ''
				summaryDiv.innerHTML = ''

				if (regionIndex === '') return

				let completedTasksCount = 0
				let displayedTasks = []

				tasks.forEach(task => {
					const taskText = `${task.point_number} - ${task.text || ''}`
					const resultForRegion = task.results[regionIndex]

					let shouldDisplay = true
					if (filterType === 'top' && resultForRegion <= 0) {
						shouldDisplay = false
					}

					if (shouldDisplay) {
						if (resultForRegion > 0) completedTasksCount++
						displayedTasks.push({ text: taskText, result: resultForRegion })
					}
				})

				if (filterType === 'top') {
					displayedTasks.sort((a, b) => b.result - a.result)
				}

				displayedTasks.forEach(task => {
					const row = `
                    <tr>
                        <td style="border-right: 1px solid black;">${task.text}</td>
                        <td>${task.result}</td>
                    </tr>
                `
					tbody.innerHTML += row
				})

				summaryDiv.innerHTML = `<p>Бу маҳаллада бажарилган вазифалар сони: ${completedTasksCount}</p>`
			}

			showAllBtn.addEventListener('click', () => {
				const select = document.getElementById('region-select')
				if (select.value) {
					displayTasksForRegion(select.value, 'all')
				}
			})

			showTopBtn.addEventListener('click', () => {
				const select = document.getElementById('region-select')
				if (select.value) {
					displayTasksForRegion(select.value, 'top')
				}
			})

			console.log(res)
		})
		.catch(err => {
			console.error('Error fetching data:', err)
		})
})

// fetchListByStatus(payload, 'list-by-date').then(res => {
// 	const tbody = document.getElementById('table-body')

// 	const regions = res.regions
// 	const tasks = res.tasks

// 	const maxLength = Math.max(regions.length, tasks.length)

// 	for (let i = 0; i < maxLength; i++) {
// 		const regionName = regions[i]?.name || ''
// 		const taskText = tasks[i]?.text || ''
// 		const taskResult = res.tasks[i].results
// 		const taskResults = taskResult.map(item => {
// 			return item
// 		})

// 		const row = `
// 		<tr>
// 		<td style="border-right: 1px solid black;">${regionName}</td>
// 		<td style="border-right: 1px solid black;">${taskText}</td>
// 			<td>${taskResults}</td>
// 		</tr>
// 	`

// 		tbody.innerHTML += row
// 	}

// 	console.log(res)
// })
