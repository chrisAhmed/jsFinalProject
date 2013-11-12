//script

function charCreate(name) {
	if(document.getElementById('genderMale').checked) {
  		gender="male"
	}
	else if(document.getElementById('genderFemale').checked) {
  		gender="female"
	}
alert(name);
alert(gender);
}