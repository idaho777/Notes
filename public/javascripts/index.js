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

	$('.notesDisplayContainer').html('');
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
	});

	//add notes button
	$('.addNotesButton').click(function(event) {
		event.preventDefault();
		event.stopPropagation();

		if(! $('.overlay').is(":visible")) {
			$('.overlay')
				.append($('<input type = "text" name = "newNoteTitle"/>')
					.addClass('newNoteTitle'))
				.append($('<textarea />')
					.addClass('newNoteText'))
				.append($('<button type="button" class="dialogSubmitButton"/>')
					.text("Add Note"))
				.append($('<button type="button" class="dialogCancelButton"/>')
					.text("Cancel"));
			$('.overlay').fadeIn();

			$('.dialogCancelButton').click(function(event) {
				$('.overlay').fadeOut();
				$('.overlay').html('');
			});

			$('.dialogSubmitButton').click(function(event) {
				var text = $('.newNoteText').val();
				var title = $('.newNoteTitle').val();

				$.ajax({
					type: "POST",
					url: basePath + 'addNote',
					data: {
						title : title,
						text : text
					},
					success: function() {
						$('.overlay').fadeOut();
						$('.overlay').html('');
						RefreshPage();
					}
				});
			});
		}
	});
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
		.append($('<a href="#" />')
				.addClass('deleteNoteLink')
				.text('x').click(function(event) {
					$.ajax({
						type: "POST",
						url: basePath + 'deleteNote',
						data: {
							id : $(this).parent('div').attr('id')
						},
						success: function() {
							RefreshPage();
						}
					});
				}))
		.append($('<p />')
			.html(args.noteText.replace(/\n/g, '<br>')));
	note.appendTo($('.notesDisplayContainer'));

	//update notes listener
	$('#' + args.id).click(function(event) {
		event.preventDefault();
		event.stopPropagation();

		if(! $('.overlay').is(":visible")) {
			$('.overlay')
				.append($('<textarea />')
					.addClass('updateNoteTitle')
					.text($(this).find('span').text()))
				.append($('<textarea />')
					.addClass('updateNoteText')
					.text($(this).find('p').text()))
				.append($('<button type="button" class="dialogSubmitButton"/>')
					.text("Update Note"))
				.append($('<button type="button" class="dialogCancelButton"/>')
					.text("Cancel"));
			$('.overlay').fadeIn();

			$('.dialogCancelButton').click(function(event) {
				$('.overlay').fadeOut();
				$('.overlay').html('');
			});

			var id = $(this).attr('id');

			$('.dialogSubmitButton').click(function(event) {
				var text = $('.updateNoteText').val();
				var title = $('.updateNoteTitle').val();

				$.ajax({
					type: "POST",
					url: basePath + 'updateNote',
					data: {
						id : id,
						title : title,
						text : text
					},
					success: function() {
						$('.overlay').fadeOut();
						$('.overlay').html('');
						RefreshPage();
					}
				});
			});
		}
	});
}
