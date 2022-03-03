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

// Effects

// The following code I got from StackOverflow
$(window).on("load",function() {
	$(window).scroll(function() {
	  var windowBottom = $(this).scrollTop() + $(this).innerHeight();
	  $(".fade").each(function() {
	    /* Check the location of each desired element */
	    var objectBottom = $(this).offset().top + $(this).outerHeight();
			console.log($(this).offset().top);
	    
	    /* If the element is completely within bounds of the window, fade it in */
	    if (objectBottom < windowBottom) { //object comes into view (scrolling down)
	      if ($(this).css("opacity")==0) {$(this).fadeTo(500,1);}
	    } else { //object goes out of view (scrolling up)
	      if ($(this).css("opacity")==1) {$(this).fadeTo(500,0);}
	    }
	  });
	}).scroll(); //invoke scroll-handler on page-load
});
