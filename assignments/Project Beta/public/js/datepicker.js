$(function() {
	var datepicker = $("#datepicker").datepicker({
		changeMonth : true,
		changeYear : true,
		maxDate : "-1M -1D -1Y",
		dateFormat : "dd-mm-yyyy"
	});
	$("#datepicker").bind("keydown", function(event) {
		event.preventDefault();
	});
});