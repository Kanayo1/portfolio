
$(function(){
  /** jQueryの処理 */
  //drawer
	$('.drawer').drawer();

  // smoothscroll
    // #から始まるURLがクリックされた時
    jQuery('a[href^="#"]').click(function() {
      // 移動速度を指定（ミリ秒）
      let speed = 300;
      // hrefで指定されたidを取得
      let id = jQuery(this).attr("href");
      // idの値が#のみだったらターゲットをhtmlタグにしてトップへ戻るようにする
      let target = jQuery("#" == id ? "html" : id);
      // ページのトップを基準にターゲットの位置を取得
      let position = jQuery(target).offset().top;
      // ターゲットの位置までspeedの速度で移動
      jQuery("html, body").animate({
        scrollTop: position - $('#js-header' ).outerHeight()
      },
        speed
      );
      return false;
    });

    //wowjs
    new WOW().init()

    //googleform
    let $form = $( '#js-form' )
      $form.submit(function(e) { 

        $.ajax({ 
          url: $form.attr('action'), 
          data: $form.serialize(), 
          type: "POST", 
          dataType: "xml", 
          statusCode: { 
            0: function() { 
              //送信に成功したときの処理 
              $form.slideUp()
              $('#js-success').slideDown()
            }, 
            200: function() { 
              alert('200')
              //送信に失敗したときの処理 
              $form.slideUp()
              $('#js-error').slideDown()
            }
          } 
        });
      return false; 
      }); 

    //formの入力確認
    let $submit = $( '#js-submit')
    $( '#js-form input, #js-form textare').on ('change', function(){
      if(
        $('#js-form input[type="text"]').val() !==""&&
        $('#js-form input[type="email"]').val() !==""&&
        $('#js-form input[name="entry.1171369937"]').prop( 'checked' ) === true
      ) {
      //全て入力された時
      $submit.prop( 'disabled', false)
      $submit.addClass('-active')
      } 
      else {
      //入力されていない時
      $submit.prop( 'disabled', true)
      $submit.removeClass('-active')
      }
    })

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
} )
