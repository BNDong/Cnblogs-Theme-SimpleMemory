/**
 * UPDATES AND DOCS AT: https://github.com/BNDong
 * https://www.cnblogs.com/bndong/
 * @author: BNDong, dbnuo@foxmail.com
 * ----------------------------------------------
 * @describe: 侧边栏处理
 */
import resources from '../../../core/resources';
import cla from './classie';
import Snap from 'snapsvg-cjs';
import optiscroll from 'optiscroll';
import 'optiscroll/dist/optiscroll.css'

export default function main(_ = {}) {

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

	let myOptiscrollInstance;

	function init() {

		initEvents();

		// 初始化滚动条
		myOptiscrollInstance = new optiscroll(document.querySelector('#menuWrap'), {
			preventParentScroll: true,
			forceScrollbars: true
		});
	}

	function initEvents() {
		resources(_).on( openbtn, 'click', toggleMenu );
		if( closebtn ) {
			resources(_).on( closebtn, 'click', toggleMenu );
		}

		resources(_).on( content, 'click', function(ev) {
			let target = ev.target;
			if( isOpen && target !== openbtn ) {
				toggleMenu();
			}
		} );
	}

	function toggleMenu() {
		$('.menu-wrap').show();

		let homeMarginLeft = $('#home').css('margin-left');
		homeMarginLeft = parseFloat(homeMarginLeft.replace(/px/g,''));

		if( isOpen ) {

			$(bodyEl).removeClass('show-menu');

			$('#content-wrap').fadeOut(300);
			$(bodyEl).css('overflow', 'auto');
			$("#mainContent").off("touchmove");

			path.attr( 'd', initialPath );
			isAnimating = false;
		}
		else {
			classie.add( bodyEl, 'show-menu' );

			$('#content-wrap').show();
			$('body').css('overflow', 'hidden');

			// 初始化滚动条到顶部位置
			myOptiscrollInstance.scrollTo(false, 'top');

		}
		isOpen = !isOpen;
	}

	init();
	resources(_).add(() => myOptiscrollInstance.destroy());

	return {
		myOptiscrollInstance: myOptiscrollInstance
	}
}
