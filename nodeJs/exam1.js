const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("enter the number:",function(n){
    var arr=[]
    // var arr1
    for (let index = 0; index < n; index++) {
       arr.push('*')
    //    arr1= arr.join(' ')
    console.log(arr.join(''))
    }
rl.close()

})
// function print(n){
   

// print(5)