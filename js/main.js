//This JS file is for scripts that will be used throughout the various game pages
//Copyright 2013 Matt Marakovits and Chris Ahmed

//Changes a Page
function changePage(filename) {
	window.location.replace(filename);
}

function updateText(id,context){
	document.getElementById(id).innerHTML = context;
}
//show a div when needed
function showDiv(id) {
	document.getElementById(id).style.display="inline-block";
}
//hide a div when needed
function hideDiv(id) {
	document.getElementById(id).style.display="none";
}

//OPENS HELP
function openHelp(){
	window.open('help.html','HelpWindow','width=600,height=850');
	}
	
//CLOSES POPUP
function closeWindow(){
	window.close();
	}
	
//CHANGES MUSIC
function changeMusic(file){
	var audio = document.getElementById('gameAudio');
	var source = document.getElementById('gameAudioSrc');
	source.src=file;
	audio.load();
	if (musicPlaying===0){
		pauseMusic();
		}
	else{
		playMusic();
		}
	}

	
//PAUSE MUSIC
function pauseMusic(){
	var audio = document.getElementById('gameAudio');
	audio.pause();
	hideDiv('pauseBtn');
	showDiv('playBtn');
	musicPlaying=0;
}

//RESUME MUSIC
function playMusic(){
	var audio = document.getElementById('gameAudio');
	audio.play();
	hideDiv('playBtn');
	showDiv('pauseBtn');
	musicPlaying=1;
}

//PLAY ALERT SOUND	
function playAlert(file){
	if (musicPlaying===1){
		var audio = document.getElementById('alertAudio');
		var source = document.getElementById('alertAudioSrc');
		source.src=file;
		audio.load();
		audio.play();
		}
}

//THESE FUNCTIONS ARE FOR CHARACTER CREATION
function charCreate() {
	hideDiv("charCreate");
	
	//This function is what records the user's responses to name and gender and begins game	
	character={
	name:'',
	gender:'',
	attack:10,
	hp:10,  //Default
	weapon:'wooden sword',
	food:1,
	money:0,
	bossCnt:0,
	};
	//setting the gender for the character
	if(document.getElementById('genderMale').checked) {
  		character.gender="male"
	}
	else if(document.getElementById('genderFemale').checked) {
  		character.gender="female"
	}
	character.name=document.getElementById('charName').value;
	backstoryStart();
}

function charImgswitch(gender) {
	//This function changes the image depending on what gender radio button the user clicks
	document.getElementById('charImg').src='images/charSheets/heroIcons/hero'+ gender + 'icon.png';
}

//creating monster datatype/classes
var Monster = function(name,hp,maxHP,attack,weapon,food,money,defeat){
	this.name = name;
	this.hp = hp;
	this.maxHP = maxHP;
	this.attack = attack;
	this.weapon = weapon;
	this.food = food;
	this.money = money;
	this.defeat = defeat;
}
//creating weapon datatype/classes
var Weapon = function(name,attack,price){
	this.name = name;
	this.attack = attack;
	this.price = price;
}
//created arrays for datatypes
var monster = new Array();
var weapon = new Array();	

//INITIALIZING MONSTERS
monster.push(new Monster('Shao Kahn',8,8,6,'Brahadur',1,10,0));
monster.push(new Monster('Dymen Rangor',9,9,11,'Sangre',2,15,0));
monster.push(new Monster('Telvyr Dwenfy',11,11,17,'Joyeuse',3,20,0));
monster.push(new Monster('Sauro Vicar',15,15,23,'Malveillant',4,50,0));

//INITIALIZING WEAPONS
weapon.push(new Weapon('Kusanagi',5,20));
weapon.push(new Weapon('Glamdring',10,40));
weapon.push(new Weapon('Anduril',15,60));
weapon.push(new Weapon('Wooden Sword',2,2));
	
//THIS FUNCTION IS FOR SHOWING ALL THE BACKSTORY AND INIT OF CERTAIN DATA
function backstoryStart() {
	//HE\SHE is personal pronoun (perPro), and HIM\HER is objective pronoun (objPro)
	//Setting Coordinate Variables
	xCord=0;
	yCord=0;
	cordMapping();
	//check and setting vars per gender selection
	if (character.gender==="male") {
		perPro="he";
		objPro="him";
		perProC="He";
		objProC="Him";
		context="M";
		document.getElementById('hero').src = 'images/charSheets/heroIcons/hero' + context + 'icon.png';
		}
	else {
		perPro="she";
		objPro="her";
		perProC="She";
		objProC="Her";
		context="F";
		document.getElementById('hero').src = 'images/charSheets/heroIcons/hero' + context + 'icon.png';
		}
	
	//CHANGING MUSIC TO STORY
	changeMusic('audio/storymusic.ogg');
	
	//CREATING BACKSTORY ARRAY
		backArray=new Array();
		backArray[0] = "There once was a town by the name of Aldshore. It was a peaceful town until....";
		backArray[1] = '<img src="images/explosion.gif"><br>' + "*EXPLOSIONS*";
		backArray[2] = '...until everyone died, except for one young person named ' + character.name +'.';
		backArray[3] = character.name + ' wakes up to the smell of smoke, the crackling of dwindling flames and the faint sound of Michael Bolton\'s music in the distance.';
		backArray[4] = perProC + ' looks around to see darkness, except from the light of the flickering flames surrounding ' + objPro +'. <br>The sight ' + perPro + ' could not believe was before him. Ashes coat the destroyed town.';
		backArray[5] = character.name + ', in disbelief, faints.';
		backArray[6] = '...the next morning...';
		backArray[7] = character.name + ' awakens from their slumber, cold, afraid. ' + perProC + ' gets up and walks around. Everything is gone.';
		backArray[8] = perProC + ' finds a small hut that managed to defy what destruction happened. Inside ' + perPro + ' finds a wooden sword and some bread.';
		backArray[9] = 'The adventure begins...';	
		
	//SETTING COUNTER VARIABLE
	backCount=0;
			
	//SETTING FIRST INTRO DIV
	document.getElementById('introStory').innerHTML=backArray[0];		
			
	//SHOWING INTRO DIVS
	showDiv('intro');
	showDiv('introStory');
	showDiv('introNext');
}

//ADVANCES DIVS FOR BACKSTORY PART
function nextStory(){
	div=document.getElementById('introStory');
	if (backCount<8){
		backCount++;
		div.innerHTML=backArray[backCount];
		}
	else {
		backCount++;
		div.innerHTML=backArray[backCount];
		hideDiv('introNext');
		showDiv('introFinish');
		}
}

function beginGame(){
	hideDiv('intro');
	character.weapon = weapon[3].name;
	
	//INITIALIZING CHARACTER STATS
	document.getElementById('charHP').innerHTML='Health: ' + character.hp;
	document.getElementById('charMoney').innerHTML='Money: ' + character.money;	
	document.getElementById('charWeapon').innerHTML='Weapon: ' + character.weapon;
	document.getElementById('charFood').innerHTML='Food: ' + character.food;	
	document.getElementById('charAttack').innerHTML='Attack: ' + character.attack;
	
	//CHANGING MUSIC
	changeMusic('audio/hyrule.ogg');
	
	//SHOWING DIVS
	showDiv('start');
	showDiv('charStats');
	document.title = 'The Legacy of Hero';
}

/*THESE FUNCTIONS MOVE THE MAP 
When the user clicks a button, compare what the co-ordinates would be to
the list of coordinates in the array.
If the co-ordinates do match up, continue with moving on.
The the co-ordinates do not match up, stop the function and prompt the 
player that they are unable to move that way.*/
var mapCords = new Array();
var tempX = 0;
var tempY = 0;
function mapImage(){
	document.getElementById('gameMap').src='images/maps/' + xCord + 'x' + yCord + '.png';
	tempX = xCord;
	tempY = yCord;
}

//DEBUGGING FUNCTION
function debug(){
	document.getElementById('debugInfo').innerHTML='TempX: ' + tempX + ' TempY: ' + tempY + ' xCord: ' + xCord + ' yCord: ' + yCord;
	}	

//BUTTON MOVEMENT
function moveUp(){
	tempY+=1;
	if(imageExist())
	{
		//alert("You're moving on");
		yCord+=1;
		mapImage();
		checkNPCloc();
		document.getElementById("hero").src = 'images/charSheets/heroIcons/hero' + context + 'up.png';
		updateText('infoUpdate', '---');
		randomMoney(); //Adds randomness of finding money in the map like other games		
	}
	else
	{
		alert("You can not move this way");
		tempY-=1;		
	}
}
function moveDown(){
	tempY-=1;
	if(imageExist())
	{
		//alert("You're moving on");
		yCord-=1;	
		mapImage();
		checkNPCloc();
		document.getElementById("hero").src = 'images/charSheets/heroIcons/hero' + context + 'icon.png';
		updateText('infoUpdate', '---');
		randomMoney(); //Adds randomness of finding money in the map like other games		
	}
	else
	{
		alert("You can not move this way");
		tempY+=1;		
	}

}

function moveLeft(){
	tempX-=1;
	if(imageExist())
	{
		//alert("You're moving on");
		xCord-=1;
		mapImage();
		checkNPCloc();
		document.getElementById("hero").src = 'images/charSheets/heroIcons/hero' + context + 'left.png';
		updateText('infoUpdate', '---');
		randomMoney(); //Adds randomness of finding money in the map like other games	
	}
	else
	{
		alert("You can not move this way");
		tempX+=1;
	}

}
function moveRight(){
	tempX+=1;
	if(imageExist())
	{
		//alert("You're moving on");
		xCord+=1;
		mapImage();
		checkNPCloc();
		document.getElementById("hero").src = 'images/charSheets/heroIcons/hero' + context + 'right.png';
		updateText('infoUpdate', '---');
		randomMoney(); //Adds randomness of finding money in the map like other games
	}
	else
	{
		alert("You can not move this way");
		tempX-=1;		
	}
}
//GAME RESET WHEN CHARACTER DIES
function reset(){
	hideDiv('battle');
	xCord = 0;
	yCord = 0;
	character.hp = 10;
	character.gold = 0;
	document.getElementById('charHP').innerHTML = 'Health: ' + character.hp;
	document.getElementById('charMoney').innerHTML = 'Money: ' + character.money;
	changeMusic('audio/hyrule.ogg');
	monster[boss].hp = monster[boss].maxHP;
	checkNPCloc();
	mapImage();
	alert('You mysteriously wake up in your broken town. All your money is gone. Well time to get back to work!');
	showDiv('start');
}

//compares map coordinates to let player know they can not go that way.
function imageExist() 
{
	cord = tempX + 'x' + tempY;
	for(var i = 0; i < mapCords.length; i++)
	{
		if(cord === mapCords[i])
		{
			battleCheck();
			return true;
			break;
		}
	} 
	return false;
}
//CHECKING LOCATION TO SPAWN NPCs IN THEIR SPECIFIC LOCATION
function checkNPCloc()
{
	if(cord === "-2x0")
	{
		obj=document.getElementById('npc');
		obj.className = 'overNPC';
		obj=document.getElementById('shopButton');
		obj.className = 'overButton';
		obj=document.getElementById('talkShop');
		obj.className = 'npcStoreTalk';		
	}
	else if(cord === "0x-2")
	{
		obj=document.getElementById('npc');
		obj.className = 'npcBoss0x-2';
		obj=document.getElementById('talkBoss0x-2');
		obj.className = 'npcBoss0x-2Talk';	
		obj=document.getElementById('talkNPC-1x-2');
		obj.className = 'hide';			
	}	
	else if(cord === "0x2")
	{
		obj=document.getElementById('npc');
		obj.className = 'npcBoss0x2';
		obj=document.getElementById('talkBoss0x2');
		obj.className = 'npcBoss0x2Talk';		
	}		
	else if(cord === "2x0")
	{
		obj=document.getElementById('npc');
		obj.className = 'npcBoss2x0';
		obj=document.getElementById('talkBoss2x0');
		obj.className = 'npcBoss2x0Talk';		
	}
	else if(cord === "-5x0")
	{
		obj=document.getElementById('npc');
		obj.className = 'npcBoss-5x0';
		obj=document.getElementById('talkBoss-5x0');
		obj.className = 'npcBoss-5x0Talk';		
	}
	else if(cord === "-1x-2")
	{
		obj=document.getElementById('npc');
		obj.className = 'npc-1x-2';
		obj=document.getElementById('talkNPC-1x-2');
		obj.className = 'npcTalk-1x-2';		
		obj=document.getElementById('talkBoss0x-2');
		obj.className = 'hide';	
	}						
	else
	{
		obj=document.getElementById('npc');
		obj.className = 'hide';
		obj=document.getElementById('shopButton');
		obj.className = 'hide';
		obj=document.getElementById('talkShop');
		obj.className = 'hide';
		obj=document.getElementById('talkBoss0x-2');
		obj.className = 'hide';
		obj=document.getElementById('talkBoss0x2');
		obj.className = 'hide';							
		obj=document.getElementById('talkBoss2x0');
		obj.className = 'hide';						
		obj=document.getElementById('talkBoss-5x0');
		obj.className = 'hide';		
		obj=document.getElementById('talkNPC-1x-2');
		obj.className = 'hide';						
	}
}

/*Maps coordinates of map images into an array for future calculations.
This is very long indeed due to the fact that there are 28 different map images
the player could walk to.
This map is formed to a  backwards L shape to give it some 'worldly' formation.
as opposed to a square.*/
function cordMapping(){
	mapCords[1] = "0x0";
	mapCords[2] = "0x1";
	mapCords[3] = "0x2";
	mapCords[4] = "0x3";
	mapCords[5] = "0x-1";
	mapCords[6] = "0x-2";
	mapCords[7] = "0x-3";
	mapCords[8] = "1x0";
	mapCords[9] = "2x0";
	mapCords[10] = "3x0";
	mapCords[11] = "-1x0";
	mapCords[12] = "-2x0";
	mapCords[13] = "-3x0";
	mapCords[14] = "-4x0";
	mapCords[15] = "-5x0";
	mapCords[16] = "-6x0";
	mapCords[17] = "1x1"; 
	mapCords[18] = "2x1"; 
	mapCords[19] = "1x2"; 
	mapCords[20] = "2x2"; 
	mapCords[21] = "-1x-1"; 
	mapCords[22] = "-2x-1";
	mapCords[23] = "-1x-2";
	mapCords[24] = "-2x-2";  
	mapCords[25] = "1x-1"; 
	mapCords[26] = "1x-2"; 
	mapCords[27] = "2x-1";
	mapCords[28] = "2x-2"; 
}

//CHECKING BATTLE AREA TO SPAWN BOSS
function battleCheck(){
	var bossPic = "";
	boss = 0;
	switch(cord)
	{
	case '0x3':
		var r=confirm('Are you sure you want to go into battle?');
			if (r==true){
				bossPic = "boss2Battle";
				boss = 2;
				initBattle(bossPic);
				break;
				}
			else{
				moveDown();
				break;
			}
	case '0x-3':
		var r=confirm('Are you sure you want to go into battle?');
			if (r==true){		
				bossPic = "boss1Battle";
				boss = 0;
				initBattle(bossPic);
				break;
				}
			else{
				moveUp();
				break;
				}
	case '3x0':
		var r=confirm('Are you sure you want to go into battle?');
			if (r==true){
				bossPic = "boss3Battle";
				boss = 1;
				initBattle(bossPic);
				break;
				}
			else{
				moveLeft();
				break;
				}
	case '-6x0':
		if(character.bossCnt === 3){
			var r=confirm('Are you sure you want to go into battle?');
				if (r==true){
					bossPic = "boss5Battle";
					boss = 3;
					initBattle(bossPic);
				}
				else{
					moveRight();
					break;
				}
		}
		else{
			alert('You need to defeat all 3 bosses before the final fight');
			moveRight();
		}
		break;
	default:
		break;
	}
}
//INITIALIZING BATTLE SYSTEM
function initBattle(pic){
	hideDiv('start');
	changeMusic('audio/boss.ogg');
	document.getElementById('mapBattle').src = 'images/maps/' + cord +'.png';
	document.getElementById('boss').src =   'images/charSheets/boss/' + pic + '.png';	
	document.getElementById('heroBattle').src = 'images/charSheets/heroIcons/hero' + context + 'right.png';
	obj=document.getElementById('heroBattle');
	obj.className = 'overHEROb';
	showDiv('battle');
	dialogue = 'You are battling ' + monster[boss].name + '. It\'s wielding a ' + monster[boss].weapon + '. Better watch out! HP: ' + monster[boss].hp + ' Attack: ' + monster[boss].attack;	
	updateText('battleUpdate', dialogue);
}
//ATTACK
function attack(){
	var rndPlayer=Math.floor(Math.random()*character.attack);
	var rndBoss=Math.floor(Math.random()*monster[boss].attack);
	if(rndPlayer >= rndBoss){
		removeHP(1,'boss');
	}
	else{
		removeHP(1,'char');
	}
}
//RUN FROM BATTLE
function retreat(){
	hideDiv('battle');
	changeMusic('audio/hyrule.ogg');
	switch(cord)
	{
	case '0x3':
		moveDown();
		break;
	case '0x-3':
		moveUp();
		break;
	case '3x0':
		moveLeft();	
		break;
	case '-6x0':
		moveRight();
		break;	
	default:
		break;
	}
	showDiv('start');
}

//THESE FUNCTIONS AR DEDICATED TO CHARACTER STAT FUNCTIONS

	//THESE FUNCTIONS ADD OR REMOVE HP
	function removeHP(amt,who){
		if(who === 'char'){
			if (character.hp-amt>0){
				character.hp=character.hp-amt;
				document.getElementById('charHP').innerHTML='Health: ' + character.hp;
				dialogue = monster[boss].name + ' hit you for 1 point! HP left: ' + character.hp;
				updateText('battleUpdate', dialogue);
			}
			else {
				character.hp=0;
				document.getElementById('charHP').innerHTML='Health: ' + character.hp;
				alert('You passed out!');
				reset();
			}
		}else if(who === 'boss'){
			if (monster[boss].hp-amt>0){
				monster[boss].hp=monster[boss].hp-amt;
				dialogue = 'You land a hit! HP left: ' + monster[boss].hp;
				updateText('battleUpdate', dialogue);
			}
			else {
				monster[boss].hp=0;
				alert('You defeated ' + monster[boss].name);
				dialogue = 'You search the corpse and find some money';
				updateText('infoUpdate', dialogue);
				playAlert('audio/rupee.ogg');
				character.money += monster[boss].money;
				if(monster[boss].defeat === 0){
					character.bossCnt +=1
				}
				monster[boss].defeat = 1;
				if (character.bossCnt===4){
					hideDiv('battle');
					showDiv('endGame');
					changeMusic('audio/end.ogg');	
					}
				else{
				retreat();
				}
			}
		}
		
	}

	function addHP(amt){
		if (character.hp<16 && character.food>0){
			if (character.hp+amt<=15){
				character.hp=character.hp+amt;
				removeFood(1);
				document.getElementById('charHP').innerHTML='Health: ' + character.hp;
				document.getElementById('charFood').innerHTML='Food: ' +character.food;
			}
			else if (character.hp+amt>15){
				character.hp=15;
				document.getElementById('charHP').innerHTML='Health: ' + character.hp;
				dialogue = 'You already have max health';
				updateText('battleUpdate', dialogue);
			}
		}else{
			dialogue = 'You have no food left!';
			updateText('battleUpdate', dialogue);
		}
	}

	//THESE FUNCTIONS ADD OR REMOVE CHAR.FOOD
	function removeFood(amt){
		if (character.food>=1){
			character.food=character.food-amt;
			document.getElementById('charFood').innerHTML='Food: ' + character.food;
		}
	}

	function addFood(amt){
		character.food=character.food+amt;
		document.getElementById('charFood').innerHTML='Food: ' + character.food;
	}

	//THESE FUNCTIONS ADD ATTACK POINTS
	function addAttack(amt){
		if (character.attack<10){
			if (character.attack+amt<=10){
				character.attack=character.attack+amt;
				document.getElementById('charAttack').innerHTML='Attack: ' + character.attack;
			}
			else if (character.attack+amt>10){
				character.attack=10;
				document.getElementById('charAttack').innerHTML='Attack: ' + character.attack;
			}
		}
	}
	
//THESE FUNCTIONS WILL BE USED FOR NPC\VILLAGE INTERACTIONS
function openShop(){
	document.getElementById("heroStore").src = 'images/charSheets/heroIcons/hero' + context + 'up.png';
	changeMusic('audio/Shop.ogg');
	hideDiv('start');
	showDiv('shop');
}

function leaveShop(){
	hideDiv('shop');
	changeMusic('audio/hyrule.ogg');	
	showDiv('start');
}

function talkNPC(name){
	if (name==='shopNPC'){
		alert('You can buy weapons and food at this shop to increase your stats!');
	}
	else if (name==='boss0x2NPC'){
		alert('This boss is named Telvyr Dwenfy! His attack level is 17. Your attack level is ' + character.attack + '. Be prepared before entering.');
	}		
	else if (name==='boss0x-2NPC'){
		alert('This boss is named Shao Kahn! His attack level is 6. Your attack level is ' + character.attack + '. Be prepared before entering.');
	}			
	else if (name==='boss2x0NPC'){
		alert('This boss is named Dymen Rangor! His attack level is 11. Your attack level is ' + character.attack + '. Be prepared before entering.');
	}
	else if (name==='boss-5x0NPC'){
		alert('This boss is named Sauro Vicar! His attack level is 23. Your attack level is ' + character.attack + '. Be sure you\'re ready for this before entering.');
	}	
	else if (name==='-1x-2NPC'){
		alert('I am sorry to hear about your town, ' + character.name + '.');
		alert('Rumor has it that the monsters that were responsible are still in the area. There is one to the North. One to the South. One to the East. And the most powerful of them all to the West.');
	}		
}
//ADDS FOOD WHEN PURCHASED IN STORE
function addFood(){
	if(character.money >= 5){
		character.food++;
		character.money-=5;
		document.getElementById('charFood').innerHTML='Food: ' + character.food;	
		document.getElementById('charMoney').innerHTML='Money: ' + character.money
		playAlert('audio/item.ogg');
	}else{
		dialogue = 'You don\'t have enough money!';
		updateText('storeUpdate', dialogue);
	}
}
//UPDATES WEAPON WHEN PURCHASED
function purchWeap(wep){
	if(wep === 'Kusanagi' && character.money >= 20)
	{
		character.weapon = weapon[0].name;
		character.attack += 5;
		character.money -= 20;
		document.getElementById('charWeapon').innerHTML='Weapon: ' + character.weapon;
		document.getElementById('charAttack').innerHTML='Attack: ' + character.attack;
		document.getElementById('charMoney').innerHTML='Money: ' + character.money;
		playAlert('audio/item.ogg');
	}
	else if(wep === 'Glamdring' && character.money >= 40)
	{
		character.weapon = weapon[1].name;
		character.attack += 10;
		character.money -= 40;
		document.getElementById('charWeapon').innerHTML='Weapon: ' + character.weapon;
		document.getElementById('charAttack').innerHTML='Attack: ' + character.attack;
		document.getElementById('charMoney').innerHTML='Money: ' + character.money;
		playAlert('audio/item.ogg');
	}
	else if(wep === 'Anduril' && character.money >= 60)
	{
		character.weapon = weapon[2].name;
		character.attack += 15;
		character.money -= 60;
		document.getElementById('charWeapon').innerHTML='Weapon: ' + character.weapon;
		document.getElementById('charAttack').innerHTML='Attack: ' + character.attack;
		document.getElementById('charMoney').innerHTML='Money: ' + character.money;	
		playAlert('audio/item.ogg');
	}
	else{
		dialogue = 'You don\'t have enough money!';
		updateText('storeUpdate', dialogue);
	}
}

//THESE FUNCTIONS WILL RANDOMLY GIVE THE PLAYER MONEY WHENEVER THEY MOVE TO A NEW TILE
function randomMoney(){
	var randomNumber=Math.floor(Math.random()*101);

	if (randomNumber>10 && randomNumber<=15){
		character.money++;
		var dialogue = 'You have found 1 piece of money on the ground!';
		updateText('infoUpdate', dialogue);
		playAlert('audio/rupee.ogg');		
		}
	
	else if (randomNumber>38 && randomNumber<=42){
		character.money=character.money+2;
		var dialogue = 'You have found 2 piece of money on the ground!';
		updateText('infoUpdate', dialogue);
		playAlert('audio/rupee.ogg');		
		}
	
	else if (randomNumber>60 && randomNumber<=63){
		character.money=character.money+3;
		var dialogue = 'You have found 3 piece of money on the ground!';
		updateText('infoUpdate', dialogue);
		playAlert('audio/rupee.ogg');		
		}
		
	else if (randomNumber>95 && randomNumber<=97){
		character.money=character.money+4;
		var dialogue = 'You have found 4 piece of money on the ground!';
		updateText('infoUpdate', dialogue);
		playAlert('audio/rupee.ogg');
		}
		
	document.getElementById('charMoney').innerHTML='Money: ' + character.money;	
}

//FOR GAME END DIV
function continuePlaying(){
	hideDiv('endGame');
	retreat();
	}

/*
//TESTING ARROW KEY MOVEMENT
document.onkeydown = function(e) {
    e = e || window.event;
    switch(e.which || e.keyCode) {
        case 37: // left
        moveLeft();
        break;

        case 38: // up
        moveUp();
        break;

        case 39: // right
        moveRight();
        break;

        case 40: // down
        moveDown();
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
};
*/