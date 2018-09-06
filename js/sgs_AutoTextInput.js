// -------------------
//
// 自動で文字送りを行う
// @note プラグインよくできてて草も生えない
//
// -------------------

$(function(){
	// -----------------
	// 処理
	// -----------------
	// 自動入力のセット
	_SetupAutoInput('#autoInput', "> sin(studio) ");
	
	
	// -----------------
	// 関数定義
	// -----------------
	// 自動入力のセット
	// @note 画面内に入ったら自動入力開始、画面外に出たら自動入力終了
	// @param domID : dom要素の検索名（jQueryの要素検索と同義）
	// @param inputString : 入力したい文字列
	function _SetupAutoInput(domID, inputString)
	{
		var typed;
		$(domID).on('inview', function(event, bIsInview)
		{
			if(bIsInview)
			{
				__StartAutoInput(domID, inputString);
			}
			else
			{
				__StopAutoInput();
			}
		});
		
		// 自動入力開始
		function __StartAutoInput(domID, inputString)
		{
			typed = new Typed(domID,
			{
				strings:[inputString],
				typeSpeed: 40,
				startDelay: 5,
				loop: false,
				contentType: 'html',
				onComplete: function(self) {
					$(".sgs-fade").toggleClass("is-show");
					self.destroy();
					$('#typeAnimation').remove();
				}
			});	
		};
		// 自動入力停止
		function __StopAutoInput()
		{
			// console.log(typed.el.id);
			typed.stop();
			typed.destroy();
			$(".sgs-fade").toggleClass("is-show");
		};
	}
});