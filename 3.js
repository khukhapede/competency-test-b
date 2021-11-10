// * # # * # # *
// # # # * # # #
// # # # * # # #
// * * * # * * *
// # # # * # # #
// # # # * # # #
// * # # * # # * 


 // row or column count
// defining an empty string
let string = "";

function drawImage(n){
if(n % 2 !== 0){
for(let i = 0; i < n; i++) { // external loop
  for(let j = 0; j < n; j++) { // internal loop
    if(i === 0 || i === n - 1) {
      if(j === 0 || j === Math.floor(n/2) || j === n-1){
        string += "* ";
      }else{
        string +="# ";
      }
    }
    else if(i === Math.floor(n/2)){
      if(j === Math.floor(n/2)){
        string += "# ";
      }else{
        string += "* ";
      }

    }else{
      if(j === Math.floor(n/2)) {
        string += "* ";
      }
      else {
        string += "# ";
      }
    }

  }
  // newline after each row
  string += "\n";
}
// printing the string
console.log(string);
}else{
  console.log(`input must odd number!!!`)
}
}

drawImage(5)