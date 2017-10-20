function merge(left, right){
    var result = [];
 
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
 
    while (left.length)
        result.push(left.shift());
 
    while (right.length)
        result.push(right.shift());
 
    return result;
}

function mergeSort(list){
    if (list.length < 2)
        return list;
 
    var middle = parseInt(list.length / 2);
    var left   = list.slice(0, middle);
    var right  = list.slice(middle, list.length);
 
    return merge(mergeSort(left), mergeSort(right));
}


$(function(){
  var list = [1, 4, 11, 6, 3, 2, 7];

  console.log(list);
  list = mergeSort(list);
  console.log(list);
});