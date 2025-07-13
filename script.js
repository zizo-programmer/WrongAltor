 const display = document.getElementById('display');
 const buttons = document.querySelectorAll('.buttons button');
 const secretBtn = document.getElementById('secret-btn');
 const fakeBtn = document.getElementById('fake-btn');
 const challengeBox = document.getElementById('challenge-box');
 const countdown = document.getElementById('countdown');
 const challengeMsg = document.getElementById('challenge-msg');
 const timerText = document.getElementById('timer-text');
 const soundEvil =document.getElementById('sound-evil');
 const soundFail =document.getElementById('sound-fail');
 const soundOpen =document.getElementById('sound-open');
 const soundScary =document.getElementById('sound-scary');
 const soundTick =document.getElementById('sound-tick');
 let challengeStarted = false;
 let expression='';
 let attempCount=0;
 let attemptLimit=5;
 let challengeTime =50;
 let wrongMode =true;
 let countdownTimer;
 let timeLeft;
 let secretUnlocked= false;
  function showSnackbar(message){
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent= message;
    snackbar.classList.add('show');
    setTimeout(() => snackbar.classList.remove('show'), 4000);
  }
  function showSecretBtn(){
    const snackbar=document.getElementById('snackbar');
    snackbar.textContent=message;
    snackbar.classList.add('show');
    setTimeout(() => snackbar.classList.remove('show'), 4000);
  }
  function hideSecretBtn(){
    secretBtn.style.opacity="0";
    secretBtn.style.pointerEvents="none";
  }
   hideSecretBtn();
  challengeBox.classList.add('hidden');
  buttons.forEach( button =>{
    button.addEventListener('click', () =>{
        const val =button.textContent;
        if (val === "C"){
            expression="";
            display.value="";
        } else if (val=== "="){
            attempCount++;
            if( wrongMode && challengeStarted){
                challengeTime= 5;
                if (challengeTime <5) challengeTime =5;
            }
            if (attempCount >= attemptLimit){
                secretBtn.style.opacity='0.5';
                secretBtn.style.pointerEvents='auto';
            }
           try {
                let result= eval(expression);
                if(wrongMode){
                    let  wrongResult = result+ Math.floor(Math.random() *50)+1;
                    display.value= wrongResult;
                } else {
                    display.value= result;
                }
            } catch {
                display.value= "Error";
            }
            if (attempCount === attemptLimit && !secretUnlocked){
                showSnackbar(" 💡Hint:There's a secret key, find it before the time runs out");
                secretBtn.style.opacity="0.2";
                secretBtn.style.pointerEvents="auto";

                setTimeout(() => startChallenge(), 1500);
            }
        } else if (val === "DEL") {
            expression = expression.slice(0, -1); 
            display.value= expression;
        }else {
            expression +=val;
            display.value = expression;
        }
    });
  });
  secretBtn.addEventListener("click", () =>{
    if(!secretUnlocked){
     wrongMode = false;
     secretUnlocked = true;
     showSnackbar("✔ Secret Key Activated! You're now in True Mode.");
     soundOpen.play();
    } else{
        wrongMode = true;
        secretUnlocked = false;
        showSnackbar("😈 You pressed the secret again... Welcome back to Wrong Mode!");
        soundEvil.play();
    }
    soundTick.pause();
    soundTick.currentTime=0;
    soundScary.pause();
    soundScary.currentTime=0;
    clearInterval(countdownTimer);
    soundTick.pause();
    soundTick.currentTime = 0;
    soundScary.pause();
    soundScary.currentTime = 0;
    challengeBox.classList.remove('show');
    challengeBox.classList.add('hidden');
    attempCount =0;
});

fakeBtn.addEventListener('click', () =>{
    if(!challengeStarted) return;
    soundEvil.play();
    showSnackbar("😈 I think you're smarter then that...");

});
  function startChallenge(){
    challengeStarted = true;
    showSnackbar("⚠ CHALLENGE MODE STARTED!");
    challengeBox.classList.remove("hidden");
    challengeBox.classList.add('show');
    challengeMsg.textContent="⏳ Challenge Begin!"; 
    timeLeft = challengeTime;
  timerText.textContent= timeLeft;
    challengeBox.classList.remove('danger');
     secretBtn.style.pointerEvents="auto";
            secretBtn.style.opacity="0.05"; 
    soundTick.play();
    countdownTimer = setInterval(() =>{
        timeLeft--;
        countdown.textContent =timeLeft;
        if (timeLeft <=3){
            challengeBox.classList.add('danger');
            challengeMsg.textContent ="⛔ HURRYY! TIME IS ENDING"
            soundScary.play();
        }
        if (timeLeft <=0) {
            clearInterval(countdownTimer);
            challengeBox.classList.remove('show');
            challengeBox.classList.add('hidden');
             soundTick.pause();
            soundTick.currentTime=0;
            onChallengeFailed();
        }
    },1000);
  }
  function onChallengeFailed(){
    showSnackbar("🙅 YOU FAILED...");
    hideSecretBtn();
    document.querySelector('.calculator').classList.add('shake');
    display.classList.add('flash-danger');
    soundFail.play();
    setTimeout(() =>{
        document.querySelector('.calculator').classList.remove('shake');
        display.classList.remove('flash-danger');
    },1000);
    attempCount=0;
    wrongMode=true;
  }
  function PlayBuzz(){
    if(window.navigator.vibrate){
        window.navigator.vibrate([200,100,200]);
    }
  }
  
