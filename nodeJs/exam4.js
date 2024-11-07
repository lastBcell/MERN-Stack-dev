const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class calc {
   static add(a,b){
        return `your answer is: ${a+b}`
    }
   static sub(a,b){
        return `your answer is:${a-b}`
   }
    static mul(a,b){
        return `your answer is:${a*b}`
    }
    static div(a,b){
        if (a==0 || b==0) {
            return "cant divide by zero"
        }
        else{
            return `your answer is ${a/b}`
        }
    }
    

}

function abc(){


    var num1
    var num2
    var op
    rl.question("what is the first number:",function(n1){
    //  console.log(num1)
    num1 = parseInt(n1)
     rl.question("what is the second number:",function(n2){
    //  console.log(num2)
    num2 = parseInt(n2)
    rl.question("what operation to perform:add,sub,mul,div :",function(o){
    op = o.toLowerCase()

    // console.log(num1,num2,op)
    
    
    if (op=='add' || op=='sub' || op=='mul' || op=='div') {
       if(op=='add'){
        console.log(calc.add(num1,num2))
       }
       else if(op=='sub'){
        console.log(calc.sub(num1,num2))
       }
       else if(op=='mul'){
        console.log(calc.mul(num1,num2))
    
       }
       else if(op=='div'){
        console.log(calc.div(num1,num2))
       }}
        else {
            console.log("enter a valid operation")
            
       }
       rl.question("do you want to continue: yes or no:" ,function(a1){
        if (a1.toLowerCase() =='yes') {
            abc()
        }
        else{
        rl.close();
        }
    })
    
   
    
     
    })
   
        

    })
    })

}
abc()