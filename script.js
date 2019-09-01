var playing = false;
var score, action, timeRemaining, answer, choice, done=false;

function change() {
    showHide("operations", "none");
    showHide("score", "block");
    showHide("question", "block");
    showHide("choose", "block");
    showHide("choices", "block");
    showHide("start-quiz", "block");
}

document.getElementById("op1").onclick = function() {
    var text = document.getElementById("text1").innerHTML;
    choice = 1;
    change();
}
document.getElementById("op2").onclick = function() {
    var text = document.getElementById("text2").innerHTML;
    choice = 2;
    change();
}
document.getElementById("op3").onclick = function() {
    var text = document.getElementById("text3").innerHTML;
    choice = 3;
    change();
}
document.getElementById("op4").onclick = function() {
    var text = document.getElementById("text4").innerHTML;
    choice = 4;
    change();
}

document.getElementById("start-quiz").onclick = function() {
    if(playing) {
        location.reload();
    }
    else {
        playing = true;
        
        score = 0;
        document.getElementById("score-value").innerHTML = score;
        
        showHide("time-remainig", "block");
        showHide("game-over", "none");
        document.getElementById("start-quiz").innerHTML = "Reset";
        
        timeRemaining = 60;
        document.getElementById("time").innerHTML = timeRemaining;
        
        startCount();
        
        play();
    }
}

for(var i=1; i<=4; i++) {
    document.getElementById("box"+i).onclick = function() {
    if(playing) {
        if(this.innerHTML == answer) {
            score++;
            document.getElementById("score-value").innerHTML = score;
            
            showHide("correct", "block");
            showHide("wrong", "none");
            setTimeout(function() {
                showHide("correct", "none");
            }, 1000);
            
            play();
        }
        else {
            showHide("wrong", "block");
            showHide("correct", "none");
            setTimeout(function() {
                showHide("wrong", "none");
            }, 1000);
        }
    }
}
}

function startCount() {
    action = setInterval(function() {
        timeRemaining -= 1;
        document.getElementById("time").innerHTML = timeRemaining;
        if(timeRemaining == 0) {
            clearInterval(action);
            
            showHide("game-over", "block");
            document.getElementById("game-over").innerHTML = 
                "<p>GAME OVER!</p><p>Your score is " + score + ".</p>";
            
            showHide("time-remainig", "none");
            showHide("correct", "none");
            showHide("wrong", "none");
            playing = false;
            
            document.getElementById("start-quiz").innerHTML = "Start";
        }
    }, 1000);
}

function showHide(id, value) {
    document.getElementById(id).style.display = value;
}

function play() {
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    
    if(choice == 1) {
        document.getElementById("question").innerHTML = x + "x" + y;
        answer = x*y;
    }else if(choice == 2) {
        document.getElementById("question").innerHTML = x + "/" + y;
        answer = x/y;
        answer = Number(answer.toFixed(2));
    }else if(choice == 3) {
        document.getElementById("question").innerHTML = x + "+" + y;
        answer = x+y;
    }else {
        document.getElementById("question").innerHTML = x + "-" + y;
        answer = x-y;
    }
    
    var answerIdx = 1 + Math.round(3*Math.random());
    document.getElementById("box"+answerIdx).innerHTML = answer;
    
    for(var i=1; i<=4; i++) {
        if(i != answerIdx) {
            var wrongAnswer;
            
            if(choice == 1) {
                 do {
                    wrongAnswer = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random()));
                }while(wrongAnswer == answer);
            }else if(choice == 2) {
                do {
                    wrongAnswer = (1 + Math.round(9*Math.random()))/(1 + Math.round(9*Math.random()));
                    wrongAnswer = Number(wrongAnswer.toFixed(2));
                }while(wrongAnswer == answer);
            }else if(choice == 3) {
                do {
                    wrongAnswer = (1 + Math.round(9*Math.random()))+(1 + Math.round(9*Math.random()));
                }while(wrongAnswer == answer);
            }else {
                do {
                    wrongAnswer = (1 + Math.round(9*Math.random()))-(1 + Math.round(9*Math.random()));
                }while(wrongAnswer == answer);
            }

            document.getElementById("box"+i).innerHTML = wrongAnswer;
        }
    }
}