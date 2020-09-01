/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores,roundScore,activePlayer,gamePlaying,prevs;
init();
document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){
        //1. randome number
    var dice=Math.floor(Math.random()*6)+1;
        
    //display the result
    
    var diceDOM=document.querySelector('.dice');
    diceDOM.style.display='block';
    diceDOM.src='dice-'+dice+'.png';
    //update the round score if the rolled number is not 1
    //checking for two sixes in a row
    if(dice===6 && prevs==6)
    {
            scores[activePlayer]=0;
            document.querySelector('#score-'+activePlayer).textContent='0';
            nextPlayer();
    }
   else if(dice!==1){
        //add the score
        roundScore+=dice;
        document.querySelector('#current-'+activePlayer).textContent=roundScore;

    }
    else{
        //next player
       nextPlayer();
        // if(activePlayer===0){
        //     document.querySelector('.player-0-panel').classList.remove('active');
        //     document.querySelector('.player-1-panel').classList.add('active');
        // }
        // else{
        //     document.querySelector('.player-1-panel').classList.remove('active');
        //     document.querySelector('.player-0-panel').classList.add('active');
        // }
        
    }
    }
    prevs=dice;
});
document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){
        //current score to the global score
    scores[activePlayer]+=roundScore;

    //update the ui
    document.querySelector('#score-'+activePlayer).textContent=scores[activePlayer];
    
    //check if player won the game
    var input=document.querySelector('.final-score').value; 
    var winscore;
    if(input)
    {winscore=input;}
    else{
        winscore=100;
    }
    if(scores[activePlayer]>=winscore)
    {
       document.querySelector('#name-'+activePlayer).textContent='WINNER!';
       document.querySelector('.dice').style.display='none';
       document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
       document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
       gamePlaying=false;
    }
    else{
        nextPlayer();
    }
    }
});
//trying to not repete the code more times
function nextPlayer()
{
    roundScore=0;
    activePlayer===0?activePlayer=1:activePlayer=0;
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';      
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display='none';
}

document.querySelector('.btn-new').addEventListener('click',init);

function init(){
    scores=[0,0];
    roundScore=0;
    activePlayer=0;
    prevs=0;
    gamePlaying=true;
    document.querySelector('.dice').style.display='none';
    //document.querySelector('#score-'+activePlayer).textContent=0;
    document.getElementById('score-0').textContent='0';
    document.getElementById('score-1').textContent='0';
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';
    document.querySelector('#name-0').textContent='player 1';
    document.querySelector('#name-1').textContent='player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.final-score').value='';
}

//document.querySelector('#current-'+activePlayer).textContent=dice;//only used to change text
//document.querySelector('#current-'+activePlayer).innerHTML='<em>'+dice+'</em>' //also changes HTML texts
//var x=document.querySelector('#score-0').textContent;//it stores the valuse at the selected element