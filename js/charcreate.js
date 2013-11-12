//script

function charCreate() {
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
alert(character.name);
alert(character.gender);
}

function charImgswitch(gender) {
document.getElementById('charImg').src='images/charSheets/heroIcons/hero'+ gender + 'icon.png';
}