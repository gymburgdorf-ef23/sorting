
"""""""""""""""""""""""""""""
Bubble Sort - by Matthew
"""""""""""""""""""""""""""""
def bubbleSort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1] :
                arr[j], arr[j+1] = arr[j+1], arr[j]

"""""""""""""""""""""""""""""
Selection Sort - by Sanchaai
"""""""""""""""""""""""""""""
def selectionSort(myList):
    for i in range(len(myList)):
        minPoint = i
        for j in range(i+1, len(myList)):
            if myList[minPoint] > myList[j]:
                minPoint = j
        myList[i], myList[minPoint] = myList[minPoint], myList[i]

"""""""""""""""""""""""""""""
Quick Sort - by Birk
"""""""""""""""""""""""""""""
def quicksort(listtosort):
  
  if len(listtosort) < 2:
    return listtosort
  
  pivot = listtosort[len(listtosort)-1]
  lowerlist = []
  upperlist = []
  for i in range(len(listtosort)-1):
    if listtosort[i] <= pivot:
      lowerlist.append(listtosort[i])
    if listtosort[i] > pivot:
      upperlist.append(listtosort[i])
      
  low = quicksort(lowerlist)
  high = quicksort(upperlist)

  return low + [pivot] + high

"""""""""""""""""""""""""""""
Merge Sort - by Jannis
"""""""""""""""""""""""""""""
def mergeSort(myList):
    if len(myList) > 1:
        mid = len(myList) // 2
        left = myList[0:mid]
        right = myList[mid:]

        mergeSort(left)
        mergeSort(right)

        # Two iterators for traversing the two halves
        i = 0
        j = 0
        # Iterator for the main list
        k = 0
        
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
              # The value from the left half has been used
              myList[k] = left[i]
              # Move the iterator forward
              i += 1
            else:
                myList[k] = right[j]
                j += 1
            # Move to the next slot
            k += 1

        # For all the remaining values
        while i < len(left):
            myList[k] = left[i]
            i += 1
            k += 1

        while j < len(right):
            myList[k]=right[j]
            j += 1
            k += 1
        
    return myList

"""""""""""""""""""""""""""""
Bucket Sort - by Rafael
"""""""""""""""""""""""""""""
def bucketsort_func(data, algorithm_for_sorting_buckets=sorted):
    """
    Run the bucketsort alogrithm on the given data.
    """

    mi = min(data)
    ma = max(data)

    # Create bucket amount depending on the length of the list
    # This could be changed, but here it creates buckets of +- size 10
    bucketcount = len(data)//10+1
    buckets = list([] for i in range(bucketcount))
    bucketrange = (ma-mi)/bucketcount+0.000000001

    # Sort elements into buckets
    for elem in data:
        bucketnum = (elem-mi)/bucketrange
        buckets[int(bucketnum)].append(elem)

    # Run the algorithm to sort each bucket
    sortedbuckets = map(algorithm_for_sorting_buckets, buckets)

    result = []
    for bucket in sortedbuckets:
        result += bucket

    return result

"""""""""""""""""""""""""""""
Radix Sort - by Cyril
"""""""""""""""""""""""""""""
def radix(lis):
    stellen = len(str(max(lis)))
    lis = [x.zfill(stellen) for x in list(map(str, lis))]
    
    for stelle in range(stellen):
        new_lis = []
        for digit in range(10):
            dig = str(digit)
            for element in lis:
                if element[-(stelle+1)] == dig:
                    new_lis.append(element)
        lis = new_lis
    return lis



