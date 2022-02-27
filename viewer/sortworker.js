importScripts("./sortinghelpers.js")
importScripts("./sortingalgosSimplecode.js")

onmessage = function(e) {
	const {sorter, N, runs=10, myId} = e.data
	const t = runTest(sorter, N, runs)
  postMessage({sorter, N, myId, t});
}

function runTest(sorter, N, runs) {
	const lists = [...new Array(runs)].map(i=>createList(N))
	const start = performance.now()
	for(let run = 0; run < runs; run++) {
		sorters[sorter](lists[run])
	}
	const t = performance.now() - start
	return t / runs
}