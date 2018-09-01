// -------------------
//
// 自動で文字送りを行うテスト
// @note なんかいい感じに関数化したい（つかれた）
//
// -------------------

$(function(){

// -------------
//
// 変数定義
//
// -------------

// 表示予定のテキスト
var MyText = "> sin(studio) |";
// 文字表示を行うテキストブロック
var TargetTextBlock = $('#test');

// 表示予定テキストの配列
var TextArray = MyText.split("");
// 配列の表示している文字数
var CurrentIndex = 0;
// 実際に表示しているテキスト
var CurrentText = "";

// 1フレームの時間
var DeltaTime = 1/30;
// 経過時間
var ElapsedTime = 0;

// 文字送りを行う間隔
var ShowNextCharTimer = 0;
var ShowNextCharThreshold = 0.05;


// -------------
//
// 関数定義
//
// -------------

// 現在のテキストを用意
var Func_MakeCurrentText = function()
{
	CurrentText = "";
	for(var i=0; i<CurrentIndex && i<TextArray.length; i++)
	{
		CurrentText += TextArray[i];
	}
}


// 文字表示間隔のタイマー
var Func_CheckTimer = function(dTime)
{
	ShowNextCharTimer += dTime;
	
	// 一定時間表示したか確認
	if(ShowNextCharTimer >= ShowNextCharThreshold)
	{
		ShowNextCharTimer = 0;
		return true;
	}
	return false;
}


// 末尾にランダムな文字列を追加する
var Func_AddRandomChar = function()
{
	// 配列の長さまでのランダムなインデックスを取得
	var randomIndex = Math.floor( Math.random() * TextArray.length);
	if(!(randomIndex in TextArray))
	{
		console.log("ERROR: Invalid index [" + randomIndex + "]");
		return;
	}
	CurrentText += TextArray[randomIndex];
	TargetTextBlock.text(CurrentText);
}


// 次の文字を表示する
// @return 表示に成功したらtrue, 最後まで表示したらfalse
var Func_ShowNextChar = function(dTime)
{
	if(TextArray.length <= CurrentIndex)
	{
		TargetTextBlock.text(CurrentText);
		return false;
	}
	ElapsedTime += dTime;
	
	CurrentText += TextArray[CurrentIndex];
	TargetTextBlock.text(CurrentText);
	
	CurrentIndex = Math.floor(ElapsedTime / ShowNextCharThreshold);
	
	CurrentIndex++;
	return true;
};


// 毎フレーム処理
var Func_Tick = setInterval(function()
{
	Func_MakeCurrentText();
	
	if(!Func_CheckTimer(DeltaTime))
	{
		// Func_AddRandomChar();
		return;
	}
	
	if(!Func_ShowNextChar(DeltaTime))
	{
		clearInterval(Func_Tick);
	}
}, DeltaTime*1000);	// @note setIntervalの間隔はミリ秒

});