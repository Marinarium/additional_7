module.exports = function solveSudoku(matrix) {   
  var box = 3;
  var visitedCells = [];
  var numberOfCell = 1;
  var empty = true;
    
  for (var x = 0; x < 9; x++) {
    for (var y = 0; y < 9; y++) {    
      if (!empty) {
        var backtrack = false;
        while (!backtrack) {
          var array = visitedCells.pop();
          if (array == 'undefined') {
            empty = true;
            backtrack = true;
          } else if (array[2] !== 9) {
            x = array[0];
            y = array[1];
            numberOfCell = array[2] + 1;
            matrix[x][y] = 0;    
            empty = true;
            backtrack = true;
          } else {
            x = array[0];
            y = array[1];
            numberOfCell = 1;
            matrix[x][y] = 0;
          }
        }
      } 
    
      if (matrix[x][y]) {
            continue;
      }

      for (var num = numberOfCell; num <= 9; num++) {    
        if (getNumber(matrix, box, x, y, num)) {
          visitedCells.push([x, y, num]);
          matrix[x][y] = num;
          empty = true;
          numberOfCell = 1;
          break;
        } else {
          empty = false;
        }                
      } 
    } 
  }     

  return matrix;
}
    
function getNumber (matrix, box, x, y, num) {
  var result = false;
  var x2 = true;
  var y2 = true;
  var box2 = true;

  if (matrix[x].indexOf(num) === -1) {
    x2 = false;
  }
  var tempY = [];
    for (var tempX = 0; tempX < 9; tempX++) {
      if (tempX !== x){
        tempY.push(matrix[tempX][y]);
      }
    }
    
  if (tempY.indexOf(num) === -1) {
    y2 = false;
  }

  var boxMinX = box * Math.floor(x / box);
  var boxMinY = box * Math.floor(y / box);
  var boxMaxX = boxMinX + box;
  var boxMaxY = boxMinY + box;
  var boxVisitedCells = []; 
    
  for (var i = boxMinX; i < boxMaxX; i++) {
    for (var j = boxMinY; j < boxMaxY; j++) {
      if(i !== x && j !== y) {
            boxVisitedCells.push(matrix[i][j]);
      }
    }
  }
    
  if (boxVisitedCells.indexOf(num) === -1) {
    box2 = false;
  }  
      
  if(!x2 && !y2 && !box2) {
    result = true;
  }
  return result;
}
