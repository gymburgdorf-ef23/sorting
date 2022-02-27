function swap(list, i, j) {
	const temp = list[i]
	list[i] = list[j]
	list[j] = temp
}

function bubbleSort(list) {
	let N = list.length
	for(let end = N; end > 0; end--) {
		for(let i = 0; i < end - 1; i++) {
			if(list[i] > list[i+1]) {
				swap(list, i, i+1)
			}
		}
	}
}

function insertionSort(list) {
	let N = list.length
	for(let i = 1; i < N; i++) {
		let element = list[i]
		let pos = i-1
		let value = list[pos]
		while(pos >= 0 && value > element) {
			list[pos+1] = value
			pos -= 1
			value = list[pos]
		}
		list[pos+1] = element
	}
}

function selectionSort(list) {
	let N = list.length
	for(let i = 0; i < N; i++) {
		let minIndex = i
		for(let j = i; j < N; j++) {
			if(list[j] < list[minIndex]) {
				minIndex = j
			}
		}
		swap(list, i, minIndex)
	}
}

function quickSort(list) {
	let N = list.length
	if(N <= 1) return list
	let pivot = list[N-1]
	let smallerThanPivot = []
	let largerThanPivot = []
	for(let i = 0; i < N-1; i++) {
		if(list[i] <= pivot) {
			smallerThanPivot.push(list[i])
		}
		else {
			largerThanPivot.push(list[i])
		}
	}
	return [...quickSort(smallerThanPivot), pivot, ...quickSort(largerThanPivot)]
}

function mergeSort(list) {
	const N = list.length
	if(N <= 1) return list
	let mid = Math.ceil(N / 2)
	const left = mergeSort(list.slice(0, mid))
	const right = mergeSort(list.slice(mid))
	
	// merge left and right
	let l = 0, r = 0, k = 0
	while(l < left.length && r < right.length) {
		if(left[l] <= right[r]) {
			list[k] = left[l]
			l++
		}
		else {
			list[k] = right[r]
			r++
		}
		k++
	}

	while(l < left.length) {
		list[k] = left[l]
		l++;
		k++;
	}

	while(r < right.length) {
		list[k] = right[r]
		r++;
		k++;
	}
	return list
}

function heapSort(list) {
	const N = list.length
	
	// Create heap
	for(var n = Math.floor(N/2); n >= 0; n--)
		heapify(list, n)

	// extract Max and rebuild heap
	for(var last = N - 1; last >= 0; last--){
		swap(list, 0, last)
		heapify(list, 0, last)
	}

	function heapify(arr, root=0, len=arr.length) {
		largest = root
		left = root * 2 + 1
		right = root * 2 + 2
	
		if(left >= len)
			return
	
		if(right < len && arr[right] > arr[largest])
			largest = right
	
		if(arr[left] > arr[largest])
			largest = left
	
		if(largest != root) {
			swap(arr, root, largest)
			heapify(arr, largest, len)
		}
	}
}

function radixSort(list) {
	let max = findMax(list)
	let maxDigits = Math.ceil(Math.log10(max))
	for(let d = 0; d < maxDigits; d++) {
		radix1digit(list, d)
	}

	function getDigit(n, digitPlace) {
		return Math.floor(n / 10**digitPlace) % 10
	}
	
	function radix1digit(list, digitPlace) {
		let groups = []
		for(let d=0; d <= 9; d++) {
			groups[d] = []
		}
		for(let i=0; i<list.length; i++) {
			let value = list[i]
			const digit = getDigit(value, digitPlace)
			groups[digit].push(value)
		}
		let j = 0
		for(let d = 0; d <= 9; d++) {
			for(let k = 0; k < groups[d].length; k++) {
				list[j] = groups[d][k]
				j++
			}
		}
		return groups
	}
}

function bucketSort(list) {
	let N = list.length
	let itemsPerBucket = 8
	let numBuckets = N / itemsPerBucket
	let max = findMax(list)

	let buckets = []
	for(let b = 0; b < numBuckets; b++) {
		buckets[b] = []
	}
	for(let i = 0; i < list.length; i++) {
		let value = list[i]
		const whichBucket = Math.floor(numBuckets * value / (max+1e-6))
		buckets[whichBucket].push(value)
	}

	let j = 0
	for(let b = 0; b < numBuckets; b++) {
		selectionSort(buckets[b])
		for(let element of buckets[b]) {
			list[j] = element
			j++
		}
	}
}

function jsSort(list) {
	list.sort()
	return list
}

const sorters = {
	bubbleSort,
	insertionSort, 
	selectionSort,
	quickSort,
	mergeSort,
	heapSort,
	radixSort,
	bucketSort,
	jsSort
}