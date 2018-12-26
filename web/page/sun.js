
$(function() {
	$(".unread").hide();
	$(".button").bind('click', buttonOnClick);
});

function buttonOnClick() {
	var thisButton = $(this);
	var otherButtons = $('.button').not(this);
	var unread = $(this).find(".unread");

	thisButton.unbind('click');
	disableButton(otherButtons);
	unread.show();
	
	var request = $.get("http://localhost:8000", function(data) {
		console.log(data);
		unread.html(data);
		thisButton.css("background-color", "#666666").css("cursor", "default");
		thisButton.addClass("hasGotNum");
		enableButton(otherButtons);

		if (canSum()) {
			$("#info-bar").css("background-color", "rgba(48, 63, 159, 1)").css("cursor", "pointer");
			$("#info-bar").bind('click', sum);
		}
	});

	$("#button").unbind('mouseleave');
	$("#button").bind('mouseleave', function() {
		reset();
		if (request)
			request.abort();
	});
}

function sum() {
	var amount = 0;
	$(".unread").each(function() {
		amount += parseInt($(this).html());
	});
	$("#sum").hide().html(amount);
	$("#sum").fadeIn();
	$("#info-bar").unbind('click');
	$("#info-bar").css("background-color", "gray").css("cursor", "default");
}

function reset() {
	$(".unread").hide();
	$(".unread").html("...");
	$(".button").unbind('click');
	$(".button").bind('click', buttonOnClick);
	$(".button").removeClass("hasGotNum");
	$(".button").css("background-color", "rgba(48, 63, 159, 1)").css("cursor", "pointer");
	$("#info-bar").unbind('click');
	$("#info-bar").css("background-color", "gray").css("cursor", "default");
	$("#sum").html("");
}

function disableButton(button) {
	button.unbind('click');
	button.css("background-color", "#666666").css("cursor", "default");
}

function enableButton(button) {
	var toDo = button.not(".hasGotNum");
	toDo.unbind('click');
	toDo.bind('click', buttonOnClick);
	toDo.css("background-color", "rgba(48, 63, 159, 1)").css("cursor", "pointer");
}

function canSum() {
	return $(".button").not(".hasGotNum").length == 0;
}