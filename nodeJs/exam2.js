const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What is your number ? ", function(num) {
        // console.log(`${num}`);
        for (let i =1 ; i<=10; i++) {
            console.log(i * num)
        }
        rl.close();
        process.exit(0);

});


