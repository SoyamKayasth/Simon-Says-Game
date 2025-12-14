   const gameSequence = [];
   const userSequence = [];
      let started = false;
      let level = 0;
   let h2 = document.querySelector("h2");
   let btns = ["red", "yellow", "green" , "purple"];

     // to display High Score
     let highScore = document.createElement("h4");
       h2.insertAdjacentElement("beforebegin" , highScore);
       highScore.style.textAlign = "start";
        

  document.addEventListener("keypress", function() {
  if (!started) {
    console.log("Game Started");
      started = true;
      levelUp();
    }
});
 
// Level up
    function levelUp() {    
        level++;
        h2.innerText = "Level " + level;
        
         let randIdX = Math.floor(Math.random()*3);
         let randColor = btns[randIdX];
        let randBtn = document.querySelector(`.${randColor}`);
        gameSequence.push(randColor);
        console.log(gameSequence);
         btnFlash(randBtn);       
    }
     // To flash button
     function btnFlash(btn){
              btn.classList.add("flash");
              setTimeout(() =>{
                btn.classList.remove("flash");
              }, 800 );
     }

    // To play sound
       function playSound(name){
        let audio = new Audio(`sounds/${name}.mp3`);
        audio.play();
      }

  //Trigger user button presses    
 function btnPress() {
     console.log("Button Pressed" , this); 
     let btn = this;
       btnFlash(btn);
       
      let userChosenColor = btn.getAttribute("id");
      userSequence.push(userChosenColor);

      checkAnswer(userSequence.length-1);
 }
   // checking the sequence 
  function checkAnswer(idx){
          if(userSequence[idx] === gameSequence[idx]){
            if(userSequence.length === gameSequence.length){
            console.log("Same value");
            setTimeout(() => {
                 userSequence.length = 0;
              levelUp();
            }, 1500); 
           }
          } else {
                    h2.innerHTML = `Game Over, your score is <b>${level}<b> <br> Press Any Key to Restart`;
                      let body = document.querySelector("body");
                          body.style.backgroundColor = "red";
                         setTimeout(function(){
                            body.style.backgroundColor = "white";
                         },150);
                    playSound("wrong");
                      if(highScore < level || highScore.innerText === ""){
                          highScore.innerText = `High Score: ${level}`;
                      }
                    reset();

                }
  }
  
   
  // Select all colors
   let allBtns = document.querySelectorAll(".btn");
     
    allBtns.forEach((btn) => {  
      btn.addEventListener("click", btnPress); 
    });      
    
     // To reset game
      function reset(){
                    started = false;
                    level = 0;
                    gameSequence.length = 0;
                    userSequence.length = 0;  
      }