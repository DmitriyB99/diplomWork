const formSupportSup = document.querySelector('.form-support-sup');

formSupportSup.addEventListener('submit', formSupp);

async function formSupp(e) {
	e.preventDefault();

	let formData = new FormData(formSupportSup);
	
	let response = await fetch('sendmail.php', {
		method: 'POST',
		body: formData
	});

	if (response.ok) {
		let result = await response.json();
		alert(result.message);
		formPickup.reset();
	} else {
		alert('Произошла ошибка, попробуйте еще раз')
	}
}
