function createList(N) {
	return [...new Array(N)].map(i => Math.round(1e6*Math.random()));
}

async function sleep(millis=0) {
	await new Promise(r=>setTimeout(r, millis))
}

function randint(low, high) {
	const r = (high - low + 1) * Math.random()
	return low + Math.floor(r)
}

function findMax(list) {
	let max = 0
	for(let item of list) {
		if(item > max) max = item
	}
	return max
}