const state = {
    // selecting every class and id we'll need to amnipulate our game
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time"),
        score: document.querySelector("#score"),

    },
    // defining values to use in the code
    values: {
       
        gameVelocity: 700, //milliseconds
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions: {
        // sets the game speed into 700 ms and the timer to 1000 ms to decrement
        timerId: setInterval(randomSquare, 700),
        countDownTimerId: setInterval(countDown, 1000),

    }
};

function randomSquare(){
    // cleaning all squares, so the enemy will appear in one of all nine

    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    })

    // picks the randomNumber and sets it as the current square where the enemy is

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}


function addListenerHitBox(){
    // everytime the action mousedown (click) happens, we'll verify if it was on the same square as the enemy is
    state.view.squares.forEach((square)=> {
        square.addEventListener("mousedown", ()=> {
            if (square.id === state.values.hitPosition){
                // if it is, than we'll increment our score and set it again to null, so it won't accumulate in the wrong way
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
            }
        })
    })
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;


    if (state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("The time is over! Your result is " + state.values.result)
    }
}



function main(){
    countDown();
    addListenerHitBox();
}

main();
