module.exports = function solveSudoku(matrix) { 
  
    var i = 0;
    var j = 0;	
    var possibilities = [];
    
    if (isFull(matrix)){
      return matrix;
    } else {
      //find the first vacant spot
      for (var x = 0; x < 9; x++) {
        for (var y = 0; y < 9; y++) {
          if (matrix[x][y] == 0){
            i = x;//level
            j = y;//column
            break;					
          }		
        }    
      }
      //possible values for the empty spot
      possibilities = possibleValues(matrix, i, j);
      for (var x = 0; x < possibilities.length; x++) {
          if (possibilities[x] != "undefined") {
            //the first number in the list
            matrix[i][j] = possibilities[x]; 
            //check: is the sudoku full?
            solveSudoku(matrix); 
          } else {
            matrix[i][j] = 0;
            solveSudoku(matrix);
          }				
      }
    }
    return matrix;
  }

  function isFull(matrix) {
    for (let x = 0; x < 9; x++) {
        for (var y = 0; y < 9; y++) {
			if (matrix[x][y] == 0) return false;
		}
	}
    return true;
}
 

function possibleValues(matrix, i, j) {
	var values = [];
	var tempArray = [0,0,0,0,0,0,0,0,0,0];

	//For horizontal
	for (var y = 0; y < 9; y++) {
		if(matrix[i][y] != 0) tempArray[matrix[i][y]] = 1;
	}
	
	//For vertical
	for (var x = 0; x < 9; x++) {
		if(matrix[x][j] != 0) tempArray[matrix[x][j]] = 1;
	}
	
	//For squares            
	var k = 0;
	var l = 0;
	if ( i >= 0 && i <= 2) {
		k = 0;
	} else if (i >= 3 && i <= 5) {
		k = 3;
	} else {
		k = 6;
	}
	
	if ( j >= 0 && j <= 2) {
		l = 0;
	} else if (j >= 3 && j <=5) {
		l = 3;
	} else {
		l = 6;
	}
	
	for (var x = k; x < (k + 3); x++) {
		for (var y = l; y < (l + 3); y++) {
			if(matrix[x][y] != 0) tempArray[matrix[x][y]] = 1;
		}
	}
	
	for (var x = 1; x < 10; x++) {
		if (tempArray[x] == 0) {
			values.push(x);
		}
	}
	return values;	
}
