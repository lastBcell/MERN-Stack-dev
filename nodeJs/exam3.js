const arr =[{id:1,name:"rajesh"},{id:2,name:"rahul"},{id:3,name:"sruthi"}]
// const { exit, exitCode } = require("process");
// console.log(arr[-1])
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
abc()
function abc(){


rl.question("What is your number ? ", function(num) {
    if (num>arr.length) {
        console.log("enter 3 or below")
        abc()
        
    }
     else {
        var name= arr[num-1].name
        var id = arr[num-1].id
        console.log(`name is: ${name} and id is: ${id}`)
        rl.close();
        // process.exit(0);

     }   
    
    
      
});
}
