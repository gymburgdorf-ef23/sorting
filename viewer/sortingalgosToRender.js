window.render = true

async function swap(list, i, j) {
	let temp = list[i]
	list[i] = list[j]
	list[j] = temp
	if(render) {
		await update(list, i)
		await update(list, j)
	}
}

async function bubbleSort(list) {
	let N = list.length
	for(let end = N; end > 0; end--) {
		for(let i = 0; i < end - 1; i++) {
			let left = await read(list, i)
			let right = await read(list, i+1)
			if(left > right) {
				await swap(list, i, i+1)
			}
		}
	}
}

async function insertionSort(list) {
	let N = list.length
	for(let i = 1; i < N; i++) {
		let element = await read(list, i)
		let pos = i-1
		while(pos >= 0) {
			let value = await read(list, pos)
			if(value > element) {
				await set(list, pos+1, value)
				pos -= 1
			}
			else break;
		}
		await set(list, pos+1, element, true)
	}
}

async function selectionSort(list) {
	let N = list.length
	for(let i = 0; i < N; i++) {
		let minIndex = 0
		let minimum = Infinity
		for(let j = i; j < N; j++) {
			const value = await read(list, j)
			if(value < minimum) {
				minimum = value
				minIndex = j
			}
		}
		await swap(list, i, minIndex)
	}
}

async function quickSortInPlace(list, from=0, to=list.length-1) {
	let N = to - from + 1
	if(N <= 1) return
	let pivotIndex = from + Math.floor(Math.random() * N)
	let pivot = await read(list, pivotIndex)
	await swap(list, to, pivotIndex, true)
	let jump = from
	for(let right = from; right < to; right++) {
		let element = await read(list, right)
		if(element < pivot) {
			await swap(list, jump, right, true)
			jump += 1
		}
	}
	await swap(list, to, jump)
	await quickSortInPlace(list, from, jump-1)
	await quickSortInPlace(list, jump +1, to)
}

async function quickSort(list, low=0, high=list.length-1) {
	let N = list.length
	if(N <= 1) return list
	let pivot = list[N-1]
	let lower = []
	let higher = []
	for(let i = 0; i < N-1; i++) {
		let element = list[i]
		if(list[i] < pivot) {
			lower.push(element)
		}
		else {
			higher.push(element)
		}
	}
	return [...await quickSort(lower), pivot, ...await quickSort(higher)]
}

async function merge(list, low, mid, high) {
	for(let i = low; i <= high; i++) {
		await read(list, i)
	}
	const left = list.slice(low, mid+1)
	const right = list.slice(mid+1, high+1)

	let l = 0, r = 0, k = low
	while(l < left.length && r < right.length) {
		let leftfront = await read(left, l)
		let rightfront = await read(right, r)
		if(leftfront < rightfront) {
			set(list, k, leftfront)
			l++
		}
		else {
			set(list, k, rightfront)
			r++
		}
		k++
	}

	while(l < left.length) {
		let leftfront = await read(left, l)
		set(list, k, leftfront)
		l++;
		k++;
	}

	while(r < right.length) {
		let rightfront = await read(right, r)
		set(list, k, rightfront)
		r++;
		k++;
	}
}

async function mergeSort(list, low=0, high=list.length-1) {
	if(low >= high) return
	let mid = low + Math.floor((high - low) / 2)
	await mergeSort(list, low, mid)
	await mergeSort(list, mid+1, high)
	await merge(list, low, mid, high)
}

async function heapify(arr, root=0, len=arr.length) {
	let largest = root
	let l = root * 2 + 1
	let r = root * 2 + 2

	if(l >= len) return

	let tempmax = await read(arr, largest)

	if(r < len) {
		const right = await read(arr, r)
		if(right > tempmax) {
			largest = r
			tempmax = right
		}
	}

	const left = await read(arr, l)
	if(left > tempmax)
		largest = l

	if(largest != root) {
		await swap(arr, root, largest)
		await heapify(arr, largest, len)
	}
}

async function heapSort(list) {
	const N = list.length
	
	// Create heap
	for(var n = Math.floor(N/2); n >= 0; n--)
		await heapify(list, n)
		
	console.log("heap is ready")

	// extract Max and rebuild heap
	for(var last = N - 1; last >= 0; last--){
		await swap(list, 0, last)
		await heapify(list, 0, last)
	}
}

function getDigit(n, digitPlace) {
	return Math.floor(n / 10**digitPlace) % 10
}

async function radix1digit(list, digitPlace) {
	let buckets = []
	for(let d=0; d <= 9; d++) {
		buckets[d] = []
	}
	for(let i=0; i<list.length; i++) {
		let value = await read(list, i)
		const digit = getDigit(value, digitPlace)
		buckets[digit].push(value)
	}
	let j = 0
	for(let d = 0; d <= 9; d++) {
		for(let k = 0; k < buckets[d].length; k++) {
			let value = await read(buckets[d], k)
			await set(list, j, value)
			j++
		}
	}
	return buckets
}

async function radixSort(list) {
	let max = 0
	for(let i = 0; i < list.length; i++) {
		const value = await read(list, i)
		if(value > max) {
			max = value 
		}
	}
	let maxDigits = Math.ceil(Math.log10(max))
	for(let d = 0; d < maxDigits; d++) {
		await radix1digit(list, d)
	}
}


async function bucketSort(list) {
	let N = list.length
	let max = 0
	let itemsPerBucket = 8
	let numBuckets = N/itemsPerBucket
	for(let i = 0; i < N; i++) {
		const value = await read(list, i)
		if(value > max) {
			max = value 
		}
	}
	let buckets = []
	for(let b=0; b < numBuckets; b++) {
		buckets[b] = []
	}
	for(let i=0; i<list.length; i++) {
		let value = await read(list, i)
		const b = Math.floor(numBuckets * value / (max+1e-6))
		buckets[b].push(value)
	}

	let j = 0
	for(let b = 0; b < numBuckets; b++) {
		await insertionSort(buckets[b])
		for(let k = 0; k < buckets[b].length; k++) {
			let value = await read(buckets[b], k)
			await set(list, j, value)
			j++
		}
	}
}

const sorters = {
	bubbleSort,
	insertionSort, 
	selectionSort,
	quickSort: quickSortInPlace,
	mergeSort,
	heapSort,
	radixSort,
	bucketSort,
}