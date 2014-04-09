$(document).ready(function() {
	InitIndex();
});

var basePath = 'http://localhost:3000/'; //hardcode for now

function InitIndex() {

	// update page dimensions
	UpdateDimensions();

	//change handler
	ChangeHandler();

	//event listener
	EventListeners();

	//refreshes the notes page
	RefreshPage();
}

/**
 * this function will refresh the page
 */
function RefreshPage() {
	//this is only proof of concept
	$.get(basePath + 'getAllNotes', function(data, status){
		var json = data;

		var noteList = json.list;

		for(var i=0; i<noteList.length; i++) {
			AddNote({
				id : noteList[i]._id,
				noteTitle : noteList[i].title,
				noteText : noteList[i].text
			});
		}
	});
}

/**
 * This function is responsible for updating the page dimensions
 */
function UpdateDimensions() {

	var controlBarHeight = $('.controlBar').height();

	var windowWidth = $(window).width();
	var windowHeight = $(window).height();

	//update the top control bar
	$('.notesContainer').css("height", windowHeight)
		.css("width", windowWidth);

	var sideControlHeight = windowHeight - controlBarHeight
	$('.sideControlWrapper').css("height", sideControlHeight)
		.css('margin-top', -sideControlHeight);
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
		.attr('id', args.id)
		.append($('<span />')
				.html(args.noteTitle))
		.append($('<p />')
				.text(args.noteText));

	note.appendTo($('.notesDisplayContainer'));
}
