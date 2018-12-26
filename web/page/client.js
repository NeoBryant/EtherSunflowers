var from = 1;
var accounts = new Array();

$(function() {
	/********************************** block 1 ********************************************/
	$("#getMyBalance").click(function() {
		$("#error-getMyBalance").html("...");
		var request = $.get("http://localhost:8000?functionName=getMyBalance&from=" + from, function(data) {
			console.log(data);
			$("#error-getMyBalance").html(data);
		});
	});
	
	$("#getContractBalance").click(function() {
		$("#error-getContractBalance").html("...");
		var request = $.get("http://localhost:8000?functionName=getContractBalance&from=" + from, function(data) {
			console.log(data);
			$("#error-getContractBalance").html(data);
		});
	});

	$("#getSunsBalance").click(function() {
		$("#error-getSunsBalance").html("...");
		var request = $.get("http://localhost:8000?functionName=getSunsBalance&from=" + from, function(data) {
			console.log(data);
			$("#error-getSunsBalance").html(data);
		});
	});

	$("#getFreeSuns").click(function() {
		$("#error-getFreeSuns").html("...");
		var request = $.get("http://localhost:8000?functionName=getFreeSuns&from=" + from, function(data) {
			console.log(data);
			$("#error-getFreeSuns").html(data);
		});
	});
	
	$("#getSunflowersNum").click(function() {
		$("#error-getSunflowersNum").html("...");
		var request = $.get("http://localhost:8000?functionName=getSunflowersNum&from=" + from, function(data) {
			console.log(data);
			$("#error-getSunflowersNum").html(data);
		});
	});

	$("#getSuccessAmount").click(function() {
		$("#error-getSuccessAmount").html("...");
		var request = $.get("http://localhost:8000?functionName=getSuccessAmount&from=" + from, function(data) {
			console.log(data);
			$("#error-getSuccessAmount").html(data);
		});
	});

	$("#getFailAmount").click(function() {
		$("#error-getFailAmount").html("...");
		var request = $.get("http://localhost:8000?functionName=getFailAmount&from=" + from, function(data) {
			console.log(data);
			$("#error-getFailAmount").html(data);
		});
	});
	/********************************** end block 1 ********************************************/

	/********************************** block 2 ********************************************/
	$("#getSunflowersBySuns-input").blur(function() {
		if (!isValueValid($(this).val())) {
			$("#error-getSunflowersBySuns").css("color", "red");
			$("#error-getSunflowersBySuns").html("\u2718Invalid Input!");
		}
		else {
			$("#error-getSunflowersBySuns").css("color", "#00FF00");
			$("#error-getSunflowersBySuns").html("\u2714");
		}
	});
	$("#getSunflowersBySuns").click(function() {
		var value = $("#getSunflowersBySuns-input").val();
		console.log(value);

		$("#getSunflowersBySuns-input").blur();
		if (!isValueValid(value))
			return false;
		
		$("#error-getSunflowersBySuns").css("color", "#125688");
		$("#error-getSunflowersBySuns").html("...");
		var url = "http://localhost:8000?functionName=getSunflowersBySuns&from=" + from + "&value=" + value;
		console.log(url);
		var request = $.get(url, function(data) {
			console.log(data);
			$("#error-getSunflowersBySuns").html(data);
		});
	});

	$("#work").click(function() {
		$("#error-work").html("...");
		var request = $.get("http://localhost:8000?functionName=work&from=" + from, function(data) {
			console.log(data);
			$("#error-work").html(data);
		});
	});

	$("#quit").click(function() {
		$("#error-quit").html("...");
		var request = $.get("http://localhost:8000?functionName=quit&from=" + from, function(data) {
			console.log(data);
			$("#error-quit").html(data);
		});
	});

	$("#rest").click(function() {
		$("#error-rest").html("...");
		var request = $.get("http://localhost:8000?functionName=rest&from=" + from, function(data) {
			console.log(data);
			$("#error-rest").html(data);
		});
	});

	


	/********************************** end block 2 ********************************************/

	/********************************** block 3 ********************************************/
	$("#buySuns-input").blur(function() {
		if (!isValueValid($(this).val())) {
			$("#error-buySuns").css("color", "red");
			$("#error-buySuns").html("\u2718Invalid Input!");
		}
		else {
			$("#error-buySuns").css("color", "#00FF00");
			$("#error-buySuns").html("\u2714");
		}
	});
	$("#buySuns").click(function() {
		var value = $("#buySuns-input").val();
		console.log(value);

		$("#buySuns-input").blur();
		if (!isValueValid(value))
			return false;
		
		$("#error-buySuns").css("color", "#125688");
		$("#error-buySuns").html("...");
		var url = "http://localhost:8000?functionName=buySuns&from=" + from + "&value=" + value;
		console.log(url);
		var request = $.get(url, function(data) {
			console.log(data);
			$("#error-buySuns").html(data);
		});
	});

	$("#sellSuns").click(function() {
		$("#error-sellSuns").html("...");
		var request = $.get("http://localhost:8000?functionName=sellSuns&from=" + from, function(data) {
			console.log(data);
			$("#error-sellSuns").html(data);
		});
	});

	$("#donate-input").blur(function() {
		if (!isValueValid($(this).val())) {
			$("#error-donate").css("color", "red");
			$("#error-donate").html("\u2718Invalid Input!");
		}
		else {
			$("#error-donate").css("color", "#00FF00");
			$("#error-donate").html("\u2714");
		}
	});
	$("#donate").click(function() {
		var value = $("#donate-input").val();
		console.log(value);

		$("#donate-input").blur();
		if (!isValueValid(value))
			return false;
		
		$("#error-donate").css("color", "#125688");
		$("#error-donate").html("...");
		var url = "http://localhost:8000?functionName=donate&from="+ from + "&value=" + value;
		console.log(url);
		var request = $.get(url, function(data) {
			console.log(data);
			$("#error-donate").html(data);
		});
	});
	/********************************** end block 3 ********************************************/



	createDropdown();
	refreshPage();
	// var interval = setInterval(function() {
	// 	refreshPage();
   	// }, 5000);
});

function isValueValid(value) {
	return /^[1-9]\d*$/.test(value);
}

function refreshPage() {
	$(".simple-get-btn").click();
}

function createDropdown() {
	var request = $.get("http://localhost:8000?functionName=getAccountsNum", function(data) {
		console.log("getAccountsNum", data);
		accounts = data.split(",");

		for (var i = 0; i < accounts.length; ++i) {
			var option = document.createElement("option");
			option.value = i;
			option.innerHTML = accounts[i];
			if (i == 1) {
				option.selected = "selected";
			}
			$("#dropdown").append(option);
		}
	});
	$("#dropdown").change(function() {
		var options = $("#dropdown option:selected");
		from = options.val();
		console.log(from);
		refreshPage();
	});
}