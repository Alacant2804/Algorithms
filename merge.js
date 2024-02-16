function mergeSort(arr) {
    if (arr.length <= 1) { 
        return arr;
    }

    const mid = Math.floor(arr.length / 2); 
    const leftHalf = arr.slice(0, mid); 
    const rightHalf = arr.slice(mid); 

    const sortedLeft = mergeSort(leftHalf);  
    const sortedRight = mergeSort(rightHalf);

    return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
    let merged = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            merged.push(left[leftIndex]);
            leftIndex++;
        } else {
            merged.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Add remaining elements from left and right subarrays
    merged = merged.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    
    return merged;
}
