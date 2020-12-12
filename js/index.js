$(function(){

	/* Изначальные значения rates */

	let global_blue_epic = 0.08,
		global_blue_legendary = 0.005,
		global_purple_epic = 0.08,
		global_purple_legendary = 0.005,
		global_gold_legendary = 0.06;

	/* Текущие значения rates пользователя */
	
	let player_blue_epic = global_blue_epic,
		player_blue_legendary = global_blue_legendary,
		player_purple_epic = global_purple_epic,
		player_purple_legendary = global_purple_legendary,
		player_gold_legendary = global_gold_legendary;

	/* Контейнеры для расчёта ср. кол-ва осколков */

	let avShards_blue_epic = 0,
		avShards_blue_legendary = 0,
		avShards_purple_epic = 0,
		avShards_purple_legendary = 0,
		avShards_gold_legendary = 0;

	/* Счётчики текущего кол-ва осколков */

	let blue_counter = 0,
		purple_counter = 0,
		gold_counter = 0;

	/* Контейнеры статистики */

	let blue_epic_info_count = 0,
		blue_legendary_info_count = 0
		purple_epic_info_count = 0
		purple_legendary_info_count = 0
		gold_legendary_info_count = 0;

	let blue_info_counter = 0,
		purple_info_counter = 0
		gold_info_counter = 0;

	let blue_epic_info_rate = 0,
		blue_legendary_info_rate = 0
		purple_epic_info_rate = 0
		purple_legendary_info_rate = 0
		gold_legendary_info_rate = 0;

	/* Запрет двойного клика */

	$('div').dblclick(function (){
		false;
	});

	/* Включение x2 rates */

	function SwitchBlueX2 () {
		if (global_blue_epic == 0.08) {
			global_blue_epic = global_blue_epic * 2;
			global_blue_legendary = global_blue_legendary * 2;
			$('.global_rates_blue img').toggleClass('faded');
		}
		else {
			global_blue_epic = global_blue_epic / 2;
			global_blue_legendary = global_blue_legendary / 2;
			$('.global_rates_blue img').toggleClass('faded');
		}
		$('.global_rates_blue .global_rates_current_epic').html(global_blue_epic * 100 + '%');
		$('.global_rates_blue .global_rates_current_legendary').html(global_blue_legendary * 100 + '%');
	};

	function SwitchPurpleX2 () {
		if (global_purple_epic == 0.08) {
			global_purple_epic = global_purple_epic * 2;
			global_purple_legendary = global_purple_legendary * 2;
			$('.global_rates_purple img').toggleClass('faded');
		}
		else {
			global_purple_epic = global_purple_epic / 2;
			global_purple_legendary = global_purple_legendary / 2;
			$('.global_rates_purple img').toggleClass('faded');
		}
		$('.global_rates_purple .global_rates_current_epic').html(global_purple_epic * 100 + '%');
		$('.global_rates_purple .global_rates_current_legendary').html(global_purple_legendary * 100 + '%');
	};

	function SwitchGoldX2 () {
		if (global_gold_legendary == 0.06) {
			global_gold_legendary = global_gold_legendary * 2;
			$('.global_rates_gold img').toggleClass('faded');
		}
		else {
			global_gold_legendary = global_gold_legendary / 2;
			$('.global_rates_gold img').toggleClass('faded');
		}
		$('.global_rates_gold .global_rates_current_legendary').html(global_gold_legendary * 100 + '%');
	};

	$('.global_rates_blue .global_rates_button .switch').on('click', SwitchBlueX2);
	$('.global_rates_blue .global_rates_button .switch').on('click', BlueActualRatesEpic);
	$('.global_rates_blue .global_rates_button .switch').on('click', avShardsBlueEpic);
	$('.global_rates_blue .global_rates_button .switch').on('click', BlueActualRatesLegendary);
	$('.global_rates_blue .global_rates_button .switch').on('click', avShardsBlueLegendary);
	$('.global_rates_purple .global_rates_button .switch').on('click', SwitchPurpleX2);
	$('.global_rates_purple .global_rates_button .switch').on('click', PurpleActualRatesEpic);
	$('.global_rates_purple .global_rates_button .switch').on('click', avShardsPurpleEpic);
	$('.global_rates_purple .global_rates_button .switch').on('click', PurpleActualRatesLegendary);
	$('.global_rates_purple .global_rates_button .switch').on('click', avShardsPurpleLegendary);
	$('.global_rates_gold .global_rates_button .switch').on('click', SwitchGoldX2);
	$('.global_rates_gold .global_rates_button .switch').on('click', GoldActualRatesLegendary);
	$('.global_rates_gold .global_rates_button .switch').on('click', avShardsGoldLegendary);

	/* Кнопки счётчика осколков */

	$('.blue .plus').on('click', function () {
		blue_counter = blue_counter + 1;
		$(this).parent().prev().html(blue_counter);
		BlueActualRatesEpic();
		BlueActualRatesLegendary();
		avShardsBlueEpic();
		avShardsBlueLegendary();
	});

	$('.blue .plus5').on('click', function () {
		blue_counter = blue_counter + 5;
		$(this).parent().prev().html(blue_counter);
		BlueActualRatesEpic();
		BlueActualRatesLegendary();
		avShardsBlueEpic();
		avShardsBlueLegendary();
	});

	$('.blue .plus10').on('click', function () {
		blue_counter = blue_counter + 10;
		$(this).parent().prev().html(blue_counter);
		BlueActualRatesEpic();
		BlueActualRatesLegendary();
		avShardsBlueEpic();
		avShardsBlueLegendary();
	});

	$('.blue .minus').on('click', function() {
		if (blue_counter == 0) {
			false;
			BlueActualRatesEpic();
			BlueActualRatesLegendary();
			avShardsBlueEpic();
			avShardsBlueLegendary();
			console.log('Неа');
		}
		else {
			blue_counter = blue_counter - 1;
			$(this).parent().prev().prev().html(blue_counter);
			BlueActualRatesEpic();
			BlueActualRatesLegendary();
			avShardsBlueEpic();
			avShardsBlueLegendary();
		}
	})

	$('.blue .minus10').on('click', function() {
		if (blue_counter - 10 < 0) {
			false;
			BlueActualRatesEpic();
			BlueActualRatesLegendary();
			avShardsBlueEpic();
			avShardsBlueLegendary();
		}
		else {
			blue_counter = blue_counter - 10;
			$(this).parent().prev().prev().html(blue_counter);
			BlueActualRatesEpic();
			BlueActualRatesLegendary();
			avShardsBlueEpic();
			avShardsBlueLegendary();
		}
	})

	$('.blue .zero').on('click', function() {
		blue_counter = 0;
		$(this).parent().prev().prev().html(blue_counter);
		BlueActualRatesEpic();
		BlueActualRatesLegendary();
		avShardsBlueEpic();
		avShardsBlueLegendary();
	});

	$('.purple .plus').on('click', function () {
		purple_counter = purple_counter + 1;
		$(this).parent().prev().html(purple_counter);
		PurpleActualRatesEpic();
		PurpleActualRatesLegendary();
		avShardsPurpleEpic();
		avShardsPurpleLegendary();
	});

	$('.purple .plus5').on('click', function () {
		purple_counter = purple_counter + 5;
		$(this).parent().prev().html(purple_counter);
		PurpleActualRatesEpic();
		PurpleActualRatesLegendary();
		avShardsPurpleEpic();
		avShardsPurpleLegendary();
	});

	$('.purple .plus10').on('click', function () {
		purple_counter = purple_counter + 10;
		$(this).parent().prev().html(purple_counter);
		PurpleActualRatesEpic();
		PurpleActualRatesLegendary();
		avShardsPurpleEpic();
		avShardsPurpleLegendary();
	});

	$('.purple .minus').on('click', function() {
		if (purple_counter == 0) {
			false;
			PurpleActualRatesEpic();
			PurpleActualRatesLegendary();
			avShardsPurpleEpic();
			avShardsPurpleLegendary();
		}
		else {
			purple_counter = purple_counter - 1;
			$(this).parent().prev().prev().html(purple_counter);
			PurpleActualRatesEpic();
			PurpleActualRatesLegendary();
			avShardsPurpleEpic();
			avShardsPurpleLegendary();
		}
	})

	$('.purple .minus10').on('click', function() {
		if (purple_counter - 10 < 0) {
			false;
			PurpleActualRatesEpic();
			PurpleActualRatesLegendary();
			avShardsPurpleEpic();
			avShardsPurpleLegendary();
		}
		else {
			purple_counter = purple_counter - 10;
			$(this).parent().prev().prev().html(purple_counter);
			PurpleActualRatesEpic();
			PurpleActualRatesLegendary();
			avShardsPurpleEpic();
			avShardsPurpleLegendary();
		}
	})

	$('.purple .zero').on('click', function() {
		purple_counter = 0;
		$(this).parent().prev().prev().html(purple_counter);
		PurpleActualRatesEpic();
		PurpleActualRatesLegendary();
		avShardsPurpleEpic();
		avShardsPurpleLegendary();
	});

	$('.gold .plus').on('click', function () {
		gold_counter = gold_counter + 1;
		$(this).parent().prev().html(gold_counter);
		GoldActualRatesLegendary();
		avShardsGoldLegendary();
	});

	$('.gold .plus5').on('click', function () {
		gold_counter = gold_counter + 5;
		$(this).parent().prev().html(gold_counter);
		GoldActualRatesLegendary();
		avShardsGoldLegendary();
	});

	$('.gold .plus10').on('click', function () {
		gold_counter = gold_counter + 10;
		$(this).parent().prev().html(gold_counter);
		GoldActualRatesLegendary();
		avShardsGoldLegendary();
	});

	$('.gold .minus').on('click', function() {
		if (gold_counter == 0) {
			false;
			GoldActualRatesLegendary();
			avShardsGoldLegendary();
		}
		else {
			gold_counter = gold_counter - 1;
			$(this).parent().prev().prev().html(gold_counter);
			GoldActualRatesLegendary();
			avShardsGoldLegendary();
		}
	})

	$('.gold .minus10').on('click', function() {
		if (gold_counter - 10 < 0) {
			false;
			GoldActualRatesLegendary();
			avShardsGoldLegendary();
		}
		else {
			gold_counter = gold_counter - 10;
			$(this).parent().prev().prev().html(gold_counter);
			GoldActualRatesLegendary();
			avShardsGoldLegendary();
		}
	})

	$('.gold .zero').on('click', function() {
		gold_counter = 0;
		$(this).parent().prev().prev().html(gold_counter);
		GoldActualRatesLegendary();
		avShardsGoldLegendary();
	});

		
	/* Счётчик event */

	function BlueEpicFactRate () {
		blue_epic_info_rate = blue_epic_info_count / blue_counter;
	}

	function BlueEpicEvent () {
		/* Счётчик событий и кол-ва открытых осколков и героев */
		blue_epic_info_count = blue_epic_info_count + 1;
		blue_info_counter = blue_counter;
		BlueEpicFactRate();
		$('.blue .rates_fact-epic').html((blue_epic_info_rate * 100).toFixed(1) + '%');
		avShardsBlueEpic();
		/* Обновление текущего шанса */
		player_blue_epic = global_blue_epic;
		$('.blue .actual_rates_epic .rate').html((player_blue_epic * 100).toFixed() + '%');
	}

	function BlueLegendaryFactRate () {
		blue_legendary_info_rate = blue_legendary_info_count / blue_counter;
	}

	function BlueLegendaryEvent () {
		blue_legendary_info_count = blue_legendary_info_count + 1;
		blue_info_counter = blue_counter;
		BlueLegendaryFactRate();
		$('.blue .rates_fact-legendary').html((blue_legendary_info_rate * 100).toFixed(1) + '%');
		avShardsBlueLegendary();
		player_blue_legendary = global_blue_legendary;
		$('.blue .actual_rates_legendary .rate').html((player_blue_legendary * 100).toFixed(1) + '%');
	}

	function PurpleEpicFactRate () {
		purple_epic_info_rate = purple_epic_info_count / purple_counter;
	}

	function PurpleEpicEvent () {
		purple_epic_info_count = purple_epic_info_count + 1;
		purple_info_counter = purple_counter;
		PurpleEpicFactRate();
		$('.purple .rates_fact-epic').html((purple_epic_info_rate * 100).toFixed(1) + '%');
		avShardsPurpleEpic();
		player_purple_epic = global_purple_epic;
		$('.purple .actual_rates_epic .rate').html((player_purple_epic * 100).toFixed() + '%');
	}

	function PurpleLegendaryFactRate () {
		purple_legendary_info_rate = purple_legendary_info_count / purple_counter;
	}

	function PurpleLegendaryEvent () {
		purple_legendary_info_count = purple_legendary_info_count + 1;
		purple_info_counter = purple_counter;
		PurpleLegendaryFactRate();
		$('.purple .rates_fact-legendary').html((purple_legendary_info_rate * 100).toFixed(1) + '%');
		avShardsBlueLegendary();
		player_purple_legendary = global_purple_legendary;
		$('.purple .actual_rates_legendary .rate').html((player_purple_legendary * 100).toFixed(1) + '%');
	}

	function GoldLegendaryFactRate () {
		gold_legendary_info_rate = gold_legendary_info_count / gold_counter;
	}

	function GoldLegendaryEvent () {
		gold_legendary_info_count = gold_legendary_info_count + 1;
		gold_info_counter = gold_counter;
		GoldLegendaryFactRate();
		$('.gold .rates_fact-legendary').html((gold_legendary_info_rate * 100).toFixed(1) + '%');
		avShardsGoldLegendary();
		player_gold_legendary = global_gold_legendary;
		$('.gold .actual_rates_legendary .rate').html((player_gold_legendary * 100).toFixed(1) + '%');
	}

	$('.blue .event-epic').on('click', BlueEpicEvent);
	$('.blue .event-legendary').on('click', BlueLegendaryEvent);
	$('.purple .event-epic').on('click', PurpleEpicEvent);
	$('.purple .event-legendary').on('click', PurpleLegendaryEvent);
	$('.gold .event-legendary').on('click', GoldLegendaryEvent);

	/* Актуальные коэффиценты */

	function BlueActualRatesEpic () {
		if (global_blue_epic == 0.08 && blue_counter > (20 + blue_info_counter) && blue_counter < (67 + blue_info_counter)) {
			player_blue_epic = global_blue_epic + (blue_counter - blue_info_counter - 20) * 0.02;
			$('.blue .actual_rates_epic .rate').html((player_blue_epic * 100).toFixed() + '%');
		}
		else if (global_blue_epic == 0.16 && blue_counter > (20 + blue_info_counter) && blue_counter < (63 + blue_info_counter)) {
			player_blue_epic = global_blue_epic + (blue_counter - blue_info_counter - 20) * 0.02;
			$('.blue .actual_rates_epic .rate').html((player_blue_epic * 100).toFixed() + '%');
		}
		else if (blue_counter <= (20 + blue_info_counter)) {
			player_blue_epic = global_blue_epic;
			$('.blue .actual_rates_epic .rate').html((player_blue_epic * 100).toFixed() + '%');
		}
		else {
			false;
		}
	}

	function PurpleActualRatesEpic () {
		if (global_purple_epic == 0.08 && purple_counter > (20 + purple_info_counter) && purple_counter < (67 + purple_info_counter)) {
			player_purple_epic = global_purple_epic + (purple_counter - purple_info_counter - 20) * 0.02;
			$('.purple .actual_rates_epic .rate').html((player_purple_epic * 100).toFixed() + '%');
		}
		else if (global_purple_epic == 0.16 && purple_counter > (20 + purple_info_counter) && purple_counter < (63 + purple_info_counter)) {
			player_purple_epic = global_purple_epic + (purple_counter - purple_info_counter - 20) * 0.02;
			$('.purple .actual_rates_epic .rate').html((player_purple_epic * 100).toFixed() + '%');
		}
		else if (purple_counter <= (20 + purple_info_counter)) {
			player_purple_epic = global_purple_epic;
			$('.purple .actual_rates_epic .rate').html((player_purple_epic * 100).toFixed() + '%');
		}
		else {
			false;
		}
	}

	function BlueActualRatesLegendary () {
		if (global_blue_legendary == 0.005 && blue_counter > (200 + blue_info_counter) && blue_counter < (220 + blue_info_counter)) {
			player_blue_legendary = global_blue_legendary + (blue_counter - blue_info_counter - 200) * 0.05;
			$('.blue .actual_rates_legendary .rate').html((player_blue_legendary * 100).toFixed() + '%');
		}
		else if (global_blue_legendary == 0.01 && blue_counter > (200 + blue_info_counter) && blue_counter < (219 + blue_info_counter)) {
			player_blue_legendary = global_blue_legendary + (blue_counter - blue_info_counter - 200) * 0.05;
			$('.blue .actual_rates_legendary .rate').html((player_blue_legendary * 100).toFixed() + '%');
		}
		else if (blue_counter <= (200 + blue_info_counter)) {
			player_blue_legendary = global_blue_legendary;
			$('.blue .actual_rates_legendary .rate').html((player_blue_legendary * 100).toFixed(1) + '%');
		}
		else {
			false;
		}
	}

	function PurpleActualRatesLegendary () {
		if (global_purple_legendary == 0.005 && purple_counter > (200 + purple_info_counter) && purple_counter < (220 + purple_info_counter)) {
			player_purple_legendary = global_purple_legendary + (purple_counter - purple_info_counter - 200) * 0.05;
			$('.purple .actual_rates_legendary .rate').html((player_purple_legendary * 100).toFixed() + '%');
		}
		else if (global_purple_legendary == 0.01 && purple_counter > (200 + purple_info_counter) && purple_counter < (219 + purple_info_counter)) {
			player_purple_legendary = global_purple_legendary + (purple_counter - purple_info_counter - 200) * 0.05;
			$('.purple .actual_rates_legendary .rate').html((player_purple_legendary * 100).toFixed() + '%');
		}
		else if (purple_counter <= (200 + purple_info_counter)) {
			player_purple_legendary = global_purple_legendary;
			$('.purple .actual_rates_legendary .rate').html((player_purple_legendary * 100).toFixed(1) + '%');
		}
		else {
			false;
		}
	}

	function GoldActualRatesLegendary () {
		if (global_gold_legendary == 0.06 && gold_counter > (12 + gold_info_counter) && gold_counter < (46 + gold_info_counter)) {
			player_gold_legendary = global_gold_legendary + (gold_counter - gold_info_counter - 12) * 0.02;
			$('.gold .actual_rates_legendary .rate').html((player_gold_legendary * 100).toFixed() + '%');
		}
		else if (global_gold_legendary == 0.12 && gold_counter > (12 + gold_info_counter) && gold_counter < (43	+ gold_info_counter)) {
			player_gold_legendary = global_gold_legendary + (gold_counter - gold_info_counter - 12) * 0.02;
			$('.gold .actual_rates_legendary .rate').html((player_gold_legendary * 100).toFixed() + '%');
		}
		else if (gold_counter <= (12 + gold_info_counter)) {
			player_gold_legendary = global_gold_legendary;
			$('.gold .actual_rates_legendary .rate').html((player_gold_legendary * 100).toFixed(1) + '%');
		}
		else {
			false;
		}
	}

	/* Расчётное кол-во осколков */

	function avShardsBlueEpic () {
		avShards_blue_epic =  100 / player_blue_epic / 100;
		$('.blue .actual_rates_epic .av_shards').html(avShards_blue_epic.toFixed());
	}

	function avShardsBlueLegendary () {
		avShards_blue_legendary = 100 / player_blue_legendary / 100;
		$('.blue .actual_rates_legendary .av_shards').html(avShards_blue_legendary.toFixed());
	}

	function avShardsPurpleEpic () {
		avShards_purple_epic = 100 / player_purple_epic / 100;
		$('.purple .actual_rates_epic .av_shards').html(avShards_purple_epic.toFixed());
	}

	function avShardsPurpleLegendary () {
		avShards_purple_legendary = 100 / player_purple_legendary / 100;
		$('.purple .actual_rates_legendary .av_shards').html(avShards_purple_legendary.toFixed());
	}

	function avShardsGoldLegendary () {
		avShards_gold_legendary = 100 / player_gold_legendary / 100;
		$('.gold .actual_rates_legendary .av_shards').html(avShards_gold_legendary.toFixed());
	}

	/* Сохранение значений переменных при изменении */

	function SaveVariablesBC () {
		if (blue_counter == 0 && blue_epic_info_count == 0 && blue_legendary_info_count == 0) {
			false;
		}
		else if (blue_counter == 0 && blue_epic_info_count >0 && blue_legendary_info_count == 0) {
			localStorage.setItem('BEIC', blue_epic_info_count);
		}
		else if (blue_counter == 0 && blue_epic_info_count == 0 && blue_legendary_info_count > 0) {
			localStorage.setItem('BLIC', blue_legendary_info_count);
		}
		else if (blue_counter == 0 && blue_epic_info_count > 0 && blue_legendary_info_count > 0) {
			localStorage.setItem('BEIC', blue_epic_info_count);
			localStorage.setItem('BLIC', blue_legendary_info_count);
		}
		else if (blue_counter > 0 && blue_epic_info_count == 0 && blue_legendary_info_count == 0){
			localStorage.setItem('BC', blue_counter);
		}
		else if (blue_counter > 0 && blue_epic_info_count > 0 && blue_legendary_info_count == 0){
			localStorage.setItem('BC', blue_counter);
			localStorage.setItem('BEIC', blue_epic_info_count);
		}
		else if (blue_counter > 0 && blue_epic_info_count == 0 && blue_legendary_info_count > 0){
			localStorage.setItem('BC', blue_counter);
			localStorage.setItem('BLIC', blue_legendary_info_count);
		}
		else {
			localStorage.setItem('BC', blue_counter);
			localStorage.setItem('BEIC', blue_epic_info_count);
			localStorage.setItem('BLIC', blue_legendary_info_count);
		}
	}

	function SaveVariablesPC () {
		if (purple_counter == 0 && purple_epic_info_count == 0 && purple_legendary_info_count == 0) {
			false;
		}
		else if (purple_counter == 0 && purple_epic_info_count >0 && purple_legendary_info_count == 0) {
			localStorage.setItem('PEIC', purple_epic_info_count);
		}
		else if (purple_counter == 0 && purple_epic_info_count == 0 && purple_legendary_info_count > 0) {
			localStorage.setItem('PLIC', purple_legendary_info_count);
		}
		else if (purple_counter == 0 && purple_epic_info_count > 0 && purple_legendary_info_count > 0) {
			localStorage.setItem('PEIC', purple_epic_info_count);
			localStorage.setItem('PLIC', purple_legendary_info_count);
		}
		else if (purple_counter > 0 && purple_epic_info_count == 0 && purple_legendary_info_count == 0){
			localStorage.setItem('PC', purple_counter);
		}
		else if (purple_counter > 0 && purple_epic_info_count > 0 && purple_legendary_info_count == 0){
			localStorage.setItem('PC', purple_counter);
			localStorage.setItem('PEIC', purple_epic_info_count);
		}
		else if (purple_counter > 0 && purple_epic_info_count == 0 && purple_legendary_info_count > 0){
			localStorage.setItem('PC', purple_counter);
			localStorage.setItem('PLIC', purple_legendary_info_count);
		}
		else {
			localStorage.setItem('PC', purple_counter);
			localStorage.setItem('PEIC', purple_epic_info_count);
			localStorage.setItem('PLIC', purple_legendary_info_count);
		}
	}

	function SaveVariablesGC () {
		if (gold_counter == 0) {
			false;
		}
		else if (gold_counter > 0 && gold_legendary_info_count == 0){
			localStorage.setItem('GC', gold_counter);
		}
		else {
			localStorage.setItem('GC', gold_counter);
			localStorage.setItem('GLIC', gold_legendary_info_count);
		}
	}

	$('.blue button').on('click', function(){
		$(this).animate({opacity: '0.8'}, 200, SaveVariablesBC());
		$(this).animate({opacity: '1'}, 100);
		});

	$('.purple button').on('click', function(){
		$(this).animate({opacity: '0.8'}, 200, SaveVariablesPC());
		$(this).animate({opacity: '1'}, 100);
		});

	$('.gold button').on('click', function(){
		$(this).animate({opacity: '0.8'}, 200, SaveVariablesGC());
		$(this).animate({opacity: '1'}, 100);
		});

	/* Загрузка значений переменных */
	
	function LoadVariablesBC () {
		if (localStorage.getItem('BC') == null) {
			false;
		}
		else if (localStorage.getItem('BC') !== null && localStorage.getItem('BEIC') == null && localStorage.getItem('BLIC') == null) {
			blue_counter = blue_counter + parseInt(localStorage.getItem('BC'),10);
			$('.blue .counter').html(blue_counter);
		}
		else if (localStorage.getItem('BEIC') !== null && localStorage.getItem('BLIC') == null) {
			blue_counter = blue_counter + parseInt(localStorage.getItem('BC'),10);
			$('.blue .counter').html(blue_counter);
			blue_epic_info_count = blue_epic_info_count + parseInt(localStorage.getItem('BEIC'),10);
			BlueEpicFactRate ();
			$('.blue .rates_fact-epic').html((blue_epic_info_rate * 100).toFixed(1) + '%');
		}
		else if (localStorage.getItem('BEIC') == null && localStorage.getItem('BLIC') !== null) {
			blue_counter = blue_counter + parseInt(localStorage.getItem('BC'),10);
			$('.blue .counter').html(blue_counter);
			blue_legendary_info_count = blue_legendary_info_count + parseInt(localStorage.getItem('BLIC'),10);
			BlueLegendaryFactRate ();
			$('.blue .rates_fact-legendary').html((blue_legendary_info_rate * 100).toFixed(1) + '%');
		}
		else if (localStorage.getItem('BEIC') == null && localStorage.getItem('BLIC') == null) {
			false;
		}
		else {
			blue_counter = blue_counter + parseInt(localStorage.getItem('BC'),10);
			$('.blue .counter').html(blue_counter);
			blue_epic_info_count = blue_epic_info_count + parseInt(localStorage.getItem('BEIC'),10);
			BlueEpicFactRate ();
			$('.blue .rates_fact-epic').html((blue_epic_info_rate * 100).toFixed(1) + '%');
			blue_legendary_info_count = blue_legendary_info_count + parseInt(localStorage.getItem('BLIC'),10);
			BlueLegendaryFactRate ();
			$('.blue .rates_fact-legendary').html((blue_legendary_info_rate * 100).toFixed(1) + '%');
		}
	}

	function LoadVariablesPC () {
		if (localStorage.getItem('PC') == null) {
			false;
		}
		else if (localStorage.getItem('PC') !== null && localStorage.getItem('PEIC') == null && localStorage.getItem('PLIC') == null) {
			purple_counter = purple_counter + parseInt(localStorage.getItem('PC'),10);
			$('.purple .counter').html(purple_counter);
		}
		else if (localStorage.getItem('PEIC') !== null && localStorage.getItem('PLIC') == null) {
			purple_counter = purple_counter + parseInt(localStorage.getItem('PC'),10);
			$('.purple .counter').html(purple_counter);
			purple_epic_info_count = purple_epic_info_count + parseInt(localStorage.getItem('PEIC'),10);
			PurpleEpicFactRate ();
			$('.purple .rates_fact-epic').html((purple_epic_info_rate * 100).toFixed(1) + '%');
		}
		else if (localStorage.getItem('PEIC') == null && localStorage.getItem('PLIC') !== null) {
			purple_counter = purple_counter + parseInt(localStorage.getItem('PC'),10);
			$('.purple .counter').html(purple_counter);
			purple_legendary_info_count = purple_legendary_info_count + parseInt(localStorage.getItem('PLIC'),10);
			PurpleLegendaryFactRate ();
			$('.purple .rates_fact-legendary').html((purple_legendary_info_rate * 100).toFixed(1) + '%');
		}
		else if (localStorage.getItem('PEIC') == null && localStorage.getItem('PLIC') == null) {
			false;
		}
		else {
			purple_counter = purple_counter + parseInt(localStorage.getItem('PC'),10);
			$('.purple .counter').html(purple_counter);
			purple_epic_info_count = purple_epic_info_count + parseInt(localStorage.getItem('PEIC'),10);
			PurpleEpicFactRate ();
			$('.purple .rates_fact-epic').html((purple_epic_info_rate * 100).toFixed(1) + '%');
			purple_legendary_info_count = purple_legendary_info_count + parseInt(localStorage.getItem('PLIC'),10);
			PurpleLegendaryFactRate ();
			$('.purple .rates_fact-legendary').html((purple_legendary_info_rate * 100).toFixed(1) + '%');

		}
	}

	function LoadVariablesGC () {
		if (localStorage.getItem('GC') == null) {
			false;
		}
		else if (localStorage.getItem('GC') !== null && localStorage.getItem('GLIC') == null) {
			gold_counter = gold_counter + parseInt(localStorage.getItem('GC'),10);
			$('.gold .counter').html(gold_counter);
		}
		else {
			gold_counter = gold_counter + parseInt(localStorage.getItem('GC'),10);
			$('.gold .counter').html(gold_counter);
			gold_legendary_info_count = gold_legendary_info_count + parseInt(localStorage.getItem('GLIC'),10);
			GoldLegendaryFactRate ();
			$('.gold .rates_fact-legendary').html((gold_legendary_info_rate * 100).toFixed(1) + '%');
		}
	}

	$(document).ready(LoadVariablesBC());
	$(document).ready(LoadVariablesPC());
	$(document).ready(LoadVariablesGC());
	$(window).ready(function(){
		alert('Калькулятор шардов RSL \n Actual Rates - текущие шансы на Эпика/Легу \n в заивисимости от кол-ва открытых осколков \n Counter - счётчик открытых осколков \n Event - нажимайте, когда вам выпадет Эпик/Лега \n R.Fact - реальные шансы на Эпика/Легу');
	});

});