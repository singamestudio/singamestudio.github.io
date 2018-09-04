// -------------------
//
// sgs-fade クラスのフェードイン、アウトを切り替える
// @note 参考：https://medium.com/eureka-engineering/html-css-%E3%81%9F%E3%81%8B%E3%81%8C%E3%83%95%E3%82%A7%E3%83%BC%E3%83%89%E3%82%A4%E3%83%B3-%E3%83%95%E3%82%A7%E3%83%BC%E3%83%89%E3%82%A2%E3%82%A6%E3%83%88%E3%81%99%E3%82%8B%E3%81%A0%E3%81%91%E3%81%AE%E6%8C%99%E5%8B%95%E3%81%AB%E5%85%A8%E5%8A%9B%E3%81%A7%E5%8F%96%E3%82%8A%E7%B5%84%E3%82%93%E3%81%A0%E7%B5%90%E6%9E%9C-%E6%9C%80%E5%BC%B7%E3%81%AEcss%E3%81%8C%E3%81%A7%E3%81%8D%E3%81%A6%E3%81%97%E3%81%BE%E3%81%A3%E3%81%9F%E8%A9%B1-%E6%9C%80%E5%BC%B7-881152c4ff13
//
// -------------------
$(function(){
	// -----------------
	// 処理
	// -----------------
	// クリック、エンターキーにフェードアニメをセット
	$("header").on('click.fade', _FadeInScene);
	$(document).on('keydown.fade', _FadeInScene);
	
	
	// -----------------
	// 関数定義
	// -----------------
	// フェードインを行う
	// @note sgs-fade クラスのついた要素に is-show クラスを付ける/外す
	//       is-show クラスがつくとフェードイン、外れるとフェードアウトする
	// @note フェード自体の処理は css/sgs.css に記載
	function _FadeInScene(event)
	{
		var isClick = (event.type === "click");
		var isEnter = (event.type === "keydown") && (event.key === "Enter");
		
		if(!isClick && !isEnter)
		{
			// not match input
			return;
		}
		
		// フェードインアウト切り替え
		$(".sgs-fade").toggleClass("is-show");
		
		// イベントバインド解除
		$("header").off("click.fade");
		$(document).off("keydown.fade");
	};
});