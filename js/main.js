//This JS file is for scripts that will be used throughout the various game pages

function changePage(filename) {
window.location.replace(filename);
}

function showDiv(id) {
document.getElementById(id).style.display="inline-block";
}

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
	};
	if(document.getElementById('genderMale').checked) {
  		character.gender="male"
	}
	else if(document.getElementById('genderFemale').checked) {
  		character.gender="female"
	}
	character.name=document.getElementById('charName').value;
//alert(character.name);   //These were used for testing all the variables
//alert(character.gender);
backstoryAlert();
}

function charImgswitch(gender) {
	//This function changes the image depending on what gender radio button the user clicks
	document.getElementById('charImg').src='images/charSheets/heroIcons/hero'+ gender + 'icon.png';
}

//THIS FUNCTION IS FOR SHOWING ALL THE BACKSTORY STUFFS

function backstoryAlert() {
//HE\SHE is personal pronoun (perPro), and HIM\HER is objective pronoun (objPro)

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
alert(character.name + ' in disbelief, faints.');
alert('...the next morning...');
alert(character.name + ' awakens from their slumber, cold, afraid. ' + perProC + ' gets up and walks around. Everything is gone.');
alert(perProC + ' finds a small hut that managed to defy what destruction happened. Inside ' + perPro + ' finds a wooden sword and some bread.');
alert('The adventure begins...');

showDiv('start');
document.title = 'The Legacy of Sam';
}