// Contants
const vhUnit = $(window).height() / 100;

// Navigation
$('#aboutLink').on('click', () => {
	window.scroll({
		top: 0,
		left: 0,
		behavior: 'smooth'
	})
});

$('#workLink').on('click', () => {
	$('html, body').animate({
		scrollTop: $('#work').offset().top-9*vhUnit
	}, null);
});

$('#contactLink').on('click', () => {
	$('html, body').animate({
		scrollTop: $('#contact').offset().top-8*vhUnit
	}, null);
});
