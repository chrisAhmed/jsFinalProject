//This JS file is for scripts that will be used throughout the various game pages
//Copyright 2013 Matt Marakovits and Chris Ahmed

//Changes a Page
function changePage(filename) {
	window.location.replace(filename);
}

//show a div when needed
function showDiv(id) {
	document.getElementById(id).style.display="inline-block";
}
//hide a div when needed
function hideDiv(id) {
	document.getElementById(id).style.display="none";
}

//THESE FUNCTIONS ARE FOR CHARACTER CREATION
function charCreate() {
	hideDiv("charCreate");
	//This function is what records the user's responses to name and gender and begins game	
	character={
	name:'',
	gender:'',
	attack:2, //Out of 10
	hp:10,  //Default
	weapon:'wooden sword',
	food:1
	};
	//setting the gender for the character
	if(document.getElementById('genderMale').checked) {
  		character.gender="male"
	}
	else if(document.getElementById('genderFemale').checked) {
  		character.gender="female"
	}
	character.name=document.getElementById('charName').value;
	backstoryAlert();
}

function charImgswitch(gender) {
	//This function changes the image depending on what gender radio button the user clicks
	document.getElementById('charImg').src='images/charSheets/heroIcons/hero'+ gender + 'icon.png';
}

//THIS FUNCTION IS FOR SHOWING ALL THE BACKSTORY STUFFS
function backstoryAlert() {
	//HE\SHE is personal pronoun (perPro), and HIM\HER is objective pronoun (objPro)
	//Setting Coordinate Variables
	xCord=0;
	yCord=0;
	cordMapping();
	
	if (character.gender==="male") {
		perPro="he";
		objPro="him";
		perProC="He";
		objProC="Him";
		}
	else {
		perPro="she";
		objPro="her";
		perProC="She";
		objProC="Her";	
	}

	alert('There once was a town by the name of Aldshore. It was a peaceful town until....');
	alert('*EXPLOSIONS*');
	alert('...until everyone died, except for one young person named ' + character.name +'.');
	alert(character.name + ' wakes up to the smell of smoke, the crackling of dwindling flames and the faint sound of Michael Bolton\'s music in the distance.');
	alert(perProC + ' looks around to see darkness, except from the light of the flickering flames surrounding ' + objPro +'. the sight one could not believe was before him. Ashes coat the destroyed town.');
	alert(character.name + ', in disbelief, faints.');
	alert('...the next morning...');
	alert(character.name + ' awakens from their slumber, cold, afraid. ' + perProC + ' gets up and walks around. Everything is gone.');
	alert(perProC + ' finds a small hut that managed to defy what destruction happened. Inside ' + perPro + ' finds a wooden sword and some bread.');
	alert('The adventure begins...');
	
	//INITIALIZING CHARACTER STATS
	document.getElementById('charHP').innerHTML='Health: ' + character.hp;
	document.getElementById('charWeapon').innerHTML='Weapon: ' + character.weapon;
	document.getElementById('charFood').innerHTML='Food: ' + character.food;	
	document.getElementById('charAttack').innerHTML='Attack: ' + character.attack;
	
	//SHOWING DIVS
	showDiv('start');
	showDiv('charStats');
	document.title = 'The Legacy of Hero';
}

/*THESE FUNCTIONS MOVE THE MAP 
TO DO: NEED TO MAKE THEM STOP AT A CERTAIN POINT
Create array of map coordinates *DONE*
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
//Setting up button movement for game.
function moveUp(){
	tempY+=1;
	if(imageExist() === true)
	{
		alert("You're moving on");
		yCord+=1;
		mapImage();
	}
	else
	{
		alert("You can not move this way");
	}
}
function moveDown(){
	tempY-=1;
	if(imageExist() === true)
	{
		alert("You're moving on");
		yCord-=1;	
		mapImage();
	}
	else
	{
		alert("You can not move this way");
	}

}
function moveLeft(){
	tempX-=1;
	if(imageExist() === true)
	{
		alert("You're moving on");
		xCord-=1;
		mapImage();
	}
	else
	{
		alert("You can not move this way");
	}

}
function moveRight(){
	tempX+=1;
	if(imageExist() === true)
	{
		alert("You're moving on");
		xCord+=1;
		mapImage();
	}
	else
	{
		alert("You can not move this way");
	}
}

//compares map coordinates to let player know they can not go that way.
function imageExist() 
{
	cord = tempX + 'x' + tempY;
	for(var i = 0; i < mapCords.length; i++)
	{
		if(cord === mapCords[i])
		{
			return true;
			break;
		}
	} 
	return false;
}
/*Maps coordinates of map images into an array for future calculations.
This is very long indeed due to the fact that there are 28 different map images
the player could walk to.
This map is formed to a  backwards L shape to give it some 'worldly' formation.*/

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

//THESE FUNCTIONS ADD OR REMOVE HP
function removeHP(amt){
	if (character.hp>1){
		character.hp=character.hp-amt;
	}
	else {
		character.hp=character.hp-amt;
		alert('You died!');
	}
	
	document.getElementById('charHP').innerHTML=character.hp;
}

function addHP(amt){
	if (character.hp<16){
		character.hp=character.hp+amt;
	}
	document.getElementById('charHP').innerHTML=character.hp;
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
		character.attack=character.attack+amt;
		document.getElementById('charAttack').innerHTML='Attack: ' + character.attack;
	}
}