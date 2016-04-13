$(function(){
	bet();
	playerOut();
	standRes();
	rebet();
});
// 控制下注
function bet(){
	$(".ten-bet").on("click",function(){
		var bet = parseInt($(".player-sweepstakes5 .money-text").text());
		bet+=10000;
		bet = parseInt(bet);
		$(".player-sweepstakes5 .money-text").text(bet);
		var asset = $(".item-playerSelf .asset").text().split("$")[1];
		asset=asset-10000;
		$(".item-playerSelf .asset").text("$"+asset);
		asset = $(".gold .nums").text();
		asset=asset-10000;
		$(".gold .nums").text(asset);
		$(".tips-bet").hide(600,"linear");
	});
	$(".five-bet").on("click",function(){
		var bet = parseInt($(".player-sweepstakes5 .money-text").text());
		bet+=5000;
		bet = parseInt(bet);
		$(".player-sweepstakes5 .money-text").text(bet);
		var asset = $(".item-playerSelf .asset").text().split("$")[1];
		asset=asset-5000;
		$(".item-playerSelf .asset").text("$"+asset);
		asset = $(".gold .nums").text();
		asset=asset-5000;
		$(".gold .nums").text(asset);
		$(".tips-bet").hide(600,"linear");
	});
	$(".two-bet").on("click",function(){
		var bet = parseInt($(".player-sweepstakes5 .money-text").text());
		bet+=2000;
		bet = parseInt(bet);
		$(".player-sweepstakes5 .money-text").text(bet);
		var asset = $(".item-playerSelf .asset").text().split("$")[1];
		asset=asset-2000;
		$(".item-playerSelf .asset").text("$"+asset);
		asset = $(".gold .nums").text();
		asset=asset-2000;
		$(".gold .nums").text(asset);
		$(".tips-bet").hide(600,"linear");
	});
	$(".one-bet").on("click",function(){
		var bet = parseInt($(".player-sweepstakes5 .money-text").text());
		bet+=1000;
		bet = parseInt(bet);
		$(".player-sweepstakes5 .money-text").text(bet);
		var asset = $(".item-playerSelf .asset").text().split("$")[1];
		asset=asset-1000;
		$(".item-playerSelf .asset").text("$"+asset);
		asset = $(".gold .nums").text();
		asset=asset-1000;
		$(".gold .nums").text(asset);
		$(".tips-bet").hide(600,"linear");
	});
	$(".clear-bet").on("click",function(){//清空下注
		var bet = parseInt($(".player-sweepstakes5 .money-text").text());
		$(".player-sweepstakes5 .money-text").text("0");
		var asset = parseInt($(".item-playerSelf .asset").text().split("$")[1]);
		asset+= bet;
		$(".item-playerSelf .asset").text("$"+asset);
		asset = parseInt($(".gold .nums").text());
		asset+=bet;
		$(".gold .nums").text(asset);
		$(".tips-bet").show(600,"linear");
	});
	$(".btn-bet").on("click",function(){//确定下注
		var bet = parseInt($(".player-sweepstakes5 .money-text").text());
		if(bet>0){
			$(".tips-bet").hide(600,"linear");
			$(".wrap-bet").hide(600,"linear");
			$(".wrap-poker").show(600,"linear");
			initPoker();
			changeTotalPoints();
		}
	});
}
//初始化最初两张牌
function initPoker(){
	$(".poker-dealer").show(600,"linear");
	$(".poker-player").show(600,"linear");
	var dealer_poker1 = $(".poker-dealer .first-poker");
	var dealer_poker2 = $(".poker-dealer .other-poker");
	var player_poker1 = $(".poker-player .first-poker");
	var player_poker2 = $(".poker-player .other-poker");
	pokerPoints(dealer_poker1);
	pokerPoints(dealer_poker2);
	pokerFlower(dealer_poker1);
	pokerFlower(dealer_poker2);

	pokerPoints(player_poker1);
	pokerPoints(player_poker2);
	pokerFlower(player_poker1);
	pokerFlower(player_poker2);
}
//控制扑克点数
function pokerPoints(poker){
	gpoints = parseInt(Math.random()*13+1);
	if(gpoints>10){
		switch (gpoints){
			case 11:
				poker.children(".point").text("J");
				poker.children(".color-big").children("img").attr({
					src: 'images/gameImg/ranker.png'
				});
				break;
			case 12:
				poker.children(".point").text("Q");
				poker.children(".color-big").children("img").attr({
					src: 'images/gameImg/kueen.png'
				});
				break;
			case 13:
				poker.children(".point").text("K");
				poker.children(".color-big").children("img").attr({
					src: 'images/gameImg/king.png'
				});
				break;
			default:
				break;
		}
	}else if(gpoints==1){
		poker.children(".point").text("A");
	}else{
		poker.children(".point").text(gpoints);
	}
}
//控制扑克花色
function pokerFlower(poker){
	var pokerText = poker.children(".point").text();
	var points;
	if(pokerText=="A"){
		points = 1;
	}else{
		points = parseInt(pokerText);
	}
	flower = parseInt(Math.random()*4+1);
	switch(flower){
		case 1://红色
			poker.children(".point").css({color:"#c01e2e"});
			poker.children(".color-small").children("img").attr({
				src: "images/gameImg/hongtao_small.png"
			});
			if(typeof(points)==="number" && points<=10){
				poker.children(".color-big").children("img").attr({
					src: "images/gameImg/hongtao_big.png"
				});
			}
			break;
		case 2://黑色
			poker.children(".color-small").children("img").attr({
				src: "images/gameImg/heitao_small.png"
			});
			if(typeof(points)==="number" && points<=10){
				poker.children(".color-big").children("img").attr({
					src: "images/gameImg/heitao_big.png"
				});
			}
			break;
		case 3://梅花
			poker.children(".color-small").children("img").attr({
				src: "images/gameImg/heimei_small.png"
			});
			if(typeof(points)==="number" && points<=10){
				poker.children(".color-big").children("img").attr({
					src: "images/gameImg/heimei_big.png"
				});
			}
			break;
		case 4://方块
			poker.children(".point").css({color:"#c01e2e"});
			poker.children(".color-small").children("img").attr({
				src: "images/gameImg/fangkuai_small.png"
			});
			if(typeof(points)==="number" && points<=10){
				poker.children(".color-big").children("img").attr({
					src: "images/gameImg/fangkuai_big.png"
				});
			}
			break;
		default:
				break;
	}
}
//玩家要牌
function playerOut(){
	$(".hit").on("click",function(){
		var html = "<li class='item-poker other-poker'>";
		html+="<span class='point'></span>";
		html+="<span class='color-small'><img src=''></span>";
		html+="<span class='color-big'><img src=''></span>";
		html+="</li>";
		$(html).insertAfter(".player-poker-list .last");//加一张牌

		$(".player-poker-list > .item-poker").last().addClass('last').siblings().removeClass("last");
		var poker = $(".player-poker-list .last");
		pokerPoints(poker);
		pokerFlower(poker);//为新增的牌加点数,花色

		changeTotalPoints();//改变点数,将点数消息框右移
		var left = parseInt($(".player-points").css("left").split("px")[0]);
		left+=27;
		$(".player-points").css({left:left+"px"});

		//庄家出牌
		var flag = isBurst();
		var points_dealer = totalPoints("poker-dealer");
		var points_player = totalPoints("poker-player");
		if(flag[1]){
			$(".tips-bet .bet-txt").text("You Burst");
			$(".tips-bet").show(600,"linear");
			$(".wrap-poker").hide(600,"linear");
			$(".wrap-bet").hide(600,"linear");
			$(".wrap-rebet").show(600,"linear");

		}else if(!flag[0] && !flag[1]){
			setTimeout(function(){
				dealerOut();
			},1000);
		}
	});
}
//庄家出牌
function dealerOut(){

	var html = "<li class='item-poker other-poker'>";
	html+="<span class='point'></span>";
	html+="<span class='color-small'><img src=''></span>";
	html+="<span class='color-big'><img src=''></span>";
	$(html).insertAfter(".dealer-poker-list .last");

	$(".dealer-poker-list > .item-poker").last().addClass('last').siblings().removeClass("last");
	var poker = $(".dealer-poker-list .last");
	pokerPoints(poker);
	pokerFlower(poker);
	changeTotalPoints();

	var left = parseInt($(".dealer-points").css("left").split("px")[0]);
	left+=27;
	$(".dealer-points").css({left:left+"px"});

	var flag = isBurst();
	if(flag[0]){
		$(".tips-bet .bet-txt").text("Banker Burst");
		$(".tips-bet").show(600,"linear");
		$(".wrap-poker").hide(600,"linear");
		$(".wrap-bet").hide(600,"linear");
		$(".wrap-rebet").show(600,"linear");
		countAsset();
	}
}
//计算每次发牌后的点数
function totalPoints(player){//参数是玩家扑克集合的DOM类名
	var poker_list = $("."+player+" .item-poker");
	var total_points = 0;
	for(var i=0;i<poker_list.length;i++){
		var tmp = poker_list.eq(i).children(".point").text();
		if(tmp==="A"){
			total_points+=1;
		}else if(tmp==="J" || tmp==="Q" || tmp==="K"){
			total_points+=10;
		}else{
			total_points+=parseInt(tmp);
		}
	}
	return total_points;
}
//改变每次发牌后的点数
function changeTotalPoints(){
	var points_dealer = totalPoints("poker-dealer");
	var points_player = totalPoints("poker-player");
	$(".dealer-points .points-txt").text(points_dealer);
	$(".player-points .points-txt").text(points_player);
}
//比较点数
function comparePoints(){
	var points_dealer = totalPoints("poker-dealer");
	var points_player = totalPoints("poker-player");
	if (points_dealer<points_player) {
		$(".tips-bet .bet-txt").text("You Win");
		$(".tips-bet").show(600,"linear");
		countAsset();
	} else if (points_dealer>points_player) {
		$(".tips-bet .bet-txt").text("You Lost");
		$(".tips-bet").show(600,"linear");
	} else {
		$(".tips-bet .bet-txt").text("Draw,Banker Win");
		$(".tips-bet").show(600,"linear");
	}
}
//发牌过程判断是否爆掉
function isBurst(){
	var points_dealer = totalPoints("poker-dealer");
	var points_player = totalPoints("poker-player");
	var flag = [false,false];
	if(points_dealer>21 && points_player<=21){
		flag[0] = true;
	}
	if(points_dealer<=21 && points_player>21){
		flag[1] = true;
	}
	return flag;
}
//停牌判断输赢
function standRes(){
	$(".stand").on("click",function(){
		var points_dealer = totalPoints("poker-dealer");
		var points_player = totalPoints("poker-player");
		while(points_dealer<points_player && points_dealer<=21){
			dealerOut();
			points_dealer = totalPoints("poker-dealer");
		}
		var flag = isBurst();
		if(!flag[0]&& !flag[1]){
			comparePoints();
		} else if(flag[0]) {
			$(".tips-bet .bet-txt").text("Banker Burst");
			countAsset();
		}else if(flag[1]) {
			$(".tips-bet .bet-txt").text("You Burst");
		}
		$(".wrap-bet").hide(600,"linear");
		$(".wrap-poker").hide(600,"linear");
		$(".wrap-rebet").show(600,"linear");
	});
}
//重新下注
function rebet(){
	$(".rebet-txt").on("click",function(){
		var asset = parseInt($(".item-playerSelf .asset").text().split("$")[1]);
		localStorage.asset = asset;
		location.reload();
	});
	$(".item-playerSelf .asset").text("$"+localStorage.asset);
	$(".gold .nums").text(localStorage.asset);
}
//计算每局之后玩家余额
function countAsset(){
	var bet_money = parseInt($(".player-sweepstakes5 .money-text").text());
	var bet_txt = $(".bet-txt").text();
	var asset = parseInt($(".item-playerSelf .asset").text().split("$")[1]);
	localStorage.asset = asset;
	switch(bet_txt) {
		case "Banker Burst":
			localStorage.asset=asset+bet_money;
			$(".item-playerSelf .asset").text("$"+localStorage.asset);
			$(".gold .nums").text(localStorage.asset);
			break;
		case "You Win":
			localStorage.asset=asset+bet_money;
			$(".item-playerSelf .asset").text("$"+localStorage.asset);
			$(".gold .nums").text(localStorage.asset);
			break;
		default:
			break;
	}
}
