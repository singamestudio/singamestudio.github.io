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
	_SetupAutoInput('#type-animation-text', "> sin(studio) ");
    $('#main-contents').hide();
    
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
        __StartAutoInput(domID, inputString);

		
		// 自動入力開始
		function __StartAutoInput(domID, inputString)
		{
			typed = new Typed(domID,
			{
				strings:[inputString],
				typeSpeed: 100,
				startDelay: 600,
				loop: false,
				contentType: 'html',
				onComplete: function(self) {                    
					$('#type-animation').fadeOut(500).queue(function() {
                        $('#main-contents').fadeIn(500).queue(function() {
                            $('#type-animation').remove();
                            self.destroy();
                        });
                    });
				}
			});	
		}
	}
});