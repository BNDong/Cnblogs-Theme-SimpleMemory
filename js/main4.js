/**
 * main4.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
(function() {

	var bodyEl = document.body,
		content = document.querySelector( '.content-wrap' ),
		openbtn = document.getElementById( 'open-button' ),
		closebtn = document.getElementById( 'close-button' ),
		isOpen = false,

		morphEl = document.getElementById( 'morph-shape' ),
		s = Snap( morphEl.querySelector( 'svg' ) );
		path = s.select( 'path' );
		initialPath = this.path.attr('d'),
		steps = morphEl.getAttribute( 'data-morph-open' ).split(';');
		stepsTotal = steps.length;
		isAnimating = false;

	function init() {
		initEvents();
	}

	function initEvents() {
		openbtn.addEventListener( 'click', toggleMenu );
		if( closebtn ) {
			closebtn.addEventListener( 'click', toggleMenu );
		}

		// close the menu element if the target it麓s not the menu element or one of its descendants..
		content.addEventListener( 'click', function(ev) {
			var target = ev.target;
			if( isOpen && target !== openbtn ) {
				toggleMenu();
			}
		} );
	}

	function toggleMenu() {
		if( isAnimating ) return false;
		isAnimating = true;
		$('.menu-wrap').show();
		
		var homeMarginLeft = $('#home').css('margin-left');
		homeMarginLeft = parseFloat(homeMarginLeft.replace(/px/g,''));
		
		if( isOpen ) {
			
			$('body').removeClass('show-menu');
			
			// 头部图片偏移
			//$('.main-header').animate({left:'0px'}, 300);
	
			// 主体内容偏移
			//for (var i = 0; i <= 250; i++) {
			//	setTimeout( '$("#home").css("margin-left", (' + homeMarginLeft + ' - ' + i + ') + "px");', 40 );
			//}
			
			//setTimeout( "$('body').removeClass('show-menu');", 25);
			
			$('#content-wrap').fadeOut(300);
			$('body').css('overflow', 'auto');
			$("#mainContent").off("touchmove");

			// animate path
			setTimeout( function() {
				// reset path
				path.attr( 'd', initialPath );
				isAnimating = false; 
			}, 300 );
		}
		else {
			classie.add( bodyEl, 'show-menu' );
			
			// animate path
			var pos = 0,
				nextStep = function( pos ) {
					if( pos > stepsTotal - 1 ) {
						isAnimating = false; 
						return;
					}
					path.animate( { 'path' : steps[pos] }, pos === 0 ? 400 : 500, pos === 0 ? mina.easein : mina.elastic, function() { nextStep(pos); } );
					pos++;
				};
	
			// 头部图片偏移
			//setTimeout("$('.main-header').animate({left:'250px'}, 250);", 300);
			// 主体内容偏移
			//for (var i = 0; i <= 250; i++) {
			//	setTimeout( '$("#home").css("margin-left", (' + homeMarginLeft + ' + ' + i + ') + "px");', 40 );
			//}
			
			$('#content-wrap').fadeIn(300);
			$('body').css('overflow', 'hidden');
			
			// 防止移动端滚动
			$("#mainContent").on("touchmove",function(event){
				event.preventDefault;
			}, false)
			$("#content-wrap").on("touchmove",function(event){
				event.preventDefault;
			}, false)
			
			// 初始化滚动条到顶部
			$('#menuWrap').optiscroll('scrollTo', false, 'top', 'auto');
			
			nextStep(pos);
		}
		isOpen = !isOpen;
	}

	init();

})();