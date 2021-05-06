/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 侧边栏处理
 */
import cla from './classie';
import Snap from 'snapsvg-cjs';
import optiscroll from 'optiscroll';
import 'optiscroll/dist/optiscroll.css'

export default function main() {

	let bodyEl = document.body,
		content = document.querySelector( '.content-wrap' ),
		openbtn = document.getElementById( 'open-button' ),
		closebtn = document.getElementById( 'close-button' ),
		isOpen = false,
		classie = cla(),

		morphEl = document.getElementById( 'morph-shape' ),
		s = Snap( morphEl.querySelector( 'svg' ) ),
		path = s.select( 'path' ),
		initialPath = path.attr('d'),
		steps = morphEl.getAttribute( 'data-morph-open' ).split(';'),
		stepsTotal = steps.length,
		isAnimating = false;

	// 初始化滚动条
	let myOptiscrollInstance = new optiscroll(document.querySelector('#menuWrap'), {
		preventParentScroll: true,
		forceScrollbars: true
	});

	function init() {
		// 防止移动端滚动
		// $("#mainContent").on("touchmove",function(event){
		// 	event.preventDefault;
		// }, false)
		// $("#content-wrap").on("touchmove",function(event){
		// 	event.preventDefault;
		// }, false)

		initEvents();
	}

	function initEvents() {
		openbtn.addEventListener( 'click', toggleMenu );
		if( closebtn ) {
			closebtn.addEventListener( 'click', toggleMenu );
		}

		// close the menu element if the target it麓s not the menu element or one of its descendants..
		content.addEventListener( 'click', function(ev) {
			let target = ev.target;
			if( isOpen && target !== openbtn ) {
				toggleMenu();
			}
		} );
	}

	function toggleMenu() {
		if( isAnimating ) return false;
		isAnimating = true;
		$('.menu-wrap').show();

		let homeMarginLeft = $('#home').css('margin-left');
		homeMarginLeft = parseFloat(homeMarginLeft.replace(/px/g,''));

		if( isOpen ) {

			$(bodyEl).removeClass('show-menu');

			//setTimeout( "$('body').removeClass('show-menu');", 25);

			$('#content-wrap').fadeOut(300);
			$(bodyEl).css('overflow', 'auto');
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
			let pos = 0,
				nextStep = function( pos ) {
					if( pos > stepsTotal - 1 ) {
						isAnimating = false;
						return;
					}
					path.animate( { 'path' : steps[pos] }, pos === 0 ? 400 : 500, pos === 0 ? mina.easein : mina.elastic, function() { nextStep(pos); } );
					pos++;
				};

			$('#content-wrap').fadeIn(300);
			$('body').css('overflow', 'hidden');

			// 初始化滚动条到顶部位置
			myOptiscrollInstance.scrollTo(false, 'top');

			nextStep(pos);
		}
		isOpen = !isOpen;
	}

	init();
}