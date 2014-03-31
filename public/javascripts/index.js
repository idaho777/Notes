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

	//add 10 test notes
	for(var i=0; i<5; i++) {
		AddNote({
			noteTitle : 'Test Title',
			noteText : 'Test text \n we are going to do more I promise \n but for now we only have these tests'
		});
	}

	for(var i=0; i<5; i++) {
		AddNote({
			noteTitle : 'Test Title',
			noteText : 'Test text \n we are going to do more I promise \n but for now we only have these testsi \n what if the notes are longer? \n would javascript be nice enough to do some magic for us? \n or do we have to do some magic ourselves?'
		});
	}
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

/**
 * this function will add a note into the current canvas
 *
 * @param : args {
 * 		noteTitle : title of the note
 * 		noteText : text of the note
 * }
 */
function AddNote (args) {
	var note = $('<div />')
		.addClass('noteWrapper')
		.append($('<span />')
				.html(args.noteTitle))
		.append($('<p />')
				.text(args.noteText));

	note.appendTo($('.notesDisplayContainer'));
}
