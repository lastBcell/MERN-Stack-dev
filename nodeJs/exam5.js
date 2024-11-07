const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("what is the first string:",function(n1){
     console.log(n1)
    
     rl.question("what is the second string:",function(n2){
     console.log(n2)
     if(n2.length>n1.length){
        console.log("errror")
     }
     else{
        // console.log()
        if(n1.split('').sort().join('')==n2.split('').sort().join('')){
            console.log("This string is  Annagram")
        }
        else{
            console.log(" This string is not an Annagram")
        }
    }
     rl.close()
     })
    })