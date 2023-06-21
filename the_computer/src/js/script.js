jQuery(function($) {
//
// 変数を定義  
//------------------------------------
	var $body = $('body'),
		$header = $('l-header'),
		$menuButton = $('.l-menu__button'),
		$headerNav = $('.l-header__nav'),
		desktopMode = ($menuButton.css('display') != 'none');
		function headerHeight() {
			$headerHeight = $header.outerHeight();   
		}       

//  
// viewport resize 
//------------------------------------	
$(window).on('resize orientationchange', function() {
	if ($menuButton.css('display') == 'none') {
		if (!desktopMode) {   
			desktopMode = true;
			$('head').find('meta[name="viewport"]').attr('content', 'width=1240');
		}
	} else {
		if (desktopMode) {
			desktopMode = false;
			$('head').find('meta[name="viewport"]').attr('content', 'width=device-width,initial-scale=1,user-scalable=yes');
		}
	} 
	$(this).trigger('scroll'); 
}).trigger('resize');  


//
// header-menu 
//------------------------------------
	//ハンバーガーボタンクリック   
	$menuButton.click(function() {
		if ( $(this).hasClass('is-open') ) {
			$(this).removeClass('is-open');
			$('.l-header__item.is-hover').removeClass('is-open');
			$('.l-header__subitem').slideUp(500);
			$headerNav.fadeOut(300); 
		} else {
			$(this).addClass('is-open');  
			$headerNav.fadeIn(300); 
		}
	});
	
	//SPメニュー内アコーディオン 
	$(".l-header__item.is-hover").click(function (e) { 
		if(!desktopMode){
			if ( $(this).hasClass('is-open') ) {
				$(this).removeClass('is-open');
				$(this).children('.l-header__subitem').slideUp(500)
			} else {  
				$(this).addClass('is-open'); 
				$(this).children('.l-header__subitem').slideDown(500)
			}
		} 
	}); 
//  
// pagetop 
//------------------------------------	
	var $pagetop = $('.js-pagetop');
	$pagetop.click(function() {
		console.log('a')
		$('body,html').stop().animate({scrollTop: 0}, 500);
		return false;  
	});


// 
// スムーススクロール関係js ここから
//------------------------------------
	// ページ内リンク要
	$('a[href^="#"], area[href^="#"]').not('a[href="#"], area[href="#"]').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname && this.hash.replace(/#/, '')) {
			headerHeight();
			var $targetId = $(this.hash), $targetAnchor = $('[name=' + this.hash.slice(1) + ']');
			var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
			if ($target) {
				var targetOffset = $target.offset().top - $headerHeight;
				$('body,html').stop().animate({
					scrollTop: targetOffset
				}, 500);          
				return false;  
			}
		}
	});
	$(window).on('resize orientationchange', function() {
		// ページ外リンクで#の位置へ飛ぶ
		if (location.hash) {
			var targetOffset = $(location.hash).offset().top - $headerHeight;
			$('body,html').stop().animate({
				scrollTop: targetOffset
			}, 0);
		}
	})


});
