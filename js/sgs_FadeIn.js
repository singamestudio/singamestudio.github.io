$(function(){
	$("header").on('click', function()
	{
		$(".sgs-fade").toggleClass("is-show");
		$("header").off();
	});
});