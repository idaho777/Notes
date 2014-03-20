$(document).ready(function() {
	InitIndex();
});

function InitIndex() {

	// update page dimensions
	UpdateDimensions();

	//change handler
	ChangeHandler();

	//event listener
	EventListeners();
}

/**
 * This function is responsible for updating the page dimensions
 */
function UpdateDimensions() {

	var windowWidth = $(window).width();
	var windowHieght = $(window).height();

	//update the top control bar
	$('.notesContainer').css("height", windowHieght)
		.css("width", windowWidth);

	$('.sideControlWrapper').css("height", windowHieght)
		.css('margin-top', -windowHieght);
}


function ChangeHandler() {
	$( window ).resize(function() {
		UpdateDimensions();
	});
}

function EventListeners() {

	// show side control button
	$('.sideControlToggleButtonWrap').click(function(event) {
		event.preventDefault();
		event.stopPropagation();
		$('.sideControlWrapper').animate({'width': 'toggle'});;
	});

	//hide wrapper
	$('.notesContainer').click(function (event){
		event.preventDefault();
		if ($('.sideControlWrapper').is(':visible')) {
			$('.sideControlWrapper').animate({'width': 'toggle'});
		}
	})
}
