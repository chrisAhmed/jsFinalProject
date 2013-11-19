//script

function charCreate() {
	//This function is what records the user's responses to name and gender and begins game	
	character={
	name:'',
	gender:'',
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

}

function charImgswitch(gender) {
	//This function changes the image depending on what gender radio button the user clicks
	document.getElementById('charImg').src='images/charSheets/heroIcons/hero'+ gender + 'icon.png';
}