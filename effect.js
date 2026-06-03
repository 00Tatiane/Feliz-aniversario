$(window).on('load', function () {
  $('.loading').fadeOut('fast');
  $('.container').fadeIn('fast');
});

$(document).ready(function () {

  // Esconde todos os botões exceto o primeiro ao carregar
  $('#play, #bannar_coming, #balloons_flying, #cake_fadein, #light_candle, #wish_message, #story').hide();
  $('.cake').hide();
  $('.fuego').hide();
  $('.message').hide();
  $('.balloons h2').hide();

  // Injeta seta e contador no HTML diretamente no body com position fixed
  $('<button id="next_phrase">→</button>').css({
    display: 'none',
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    zIndex: 100000,
    background: 'rgba(200,80,80,0.85)',
    border: 'none',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    fontSize: '28px',
    color: '#fff',
    cursor: 'pointer',
    lineHeight: '60px',
    textAlign: 'center',
    padding: '0',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
}).appendTo('.message');

  var vw;

  $(window).on('resize', function () {
    vw = $(window).width() / 2;
    $('#b11, #b22, #b33, #b44, #b55, #b66, #b77').stop();
    $('#b11').animate({ top: 240, left: vw - 350 }, 500);
    $('#b22').animate({ top: 240, left: vw - 250 }, 500);
    $('#b33').animate({ top: 240, left: vw - 150 }, 500);
    $('#b44').animate({ top: 240, left: vw - 50  }, 500);
    $('#b55').animate({ top: 240, left: vw + 50  }, 500);
    $('#b66').animate({ top: 240, left: vw + 150 }, 500);
    $('#b77').animate({ top: 240, left: vw + 250 }, 500);
  });

  // 1. Acender as luzes
  $('#turn_on').on('click', function () {
    $('#bulb_yellow').addClass('bulb-glow-yellow');
    $('#bulb_red').addClass('bulb-glow-red');
    $('#bulb_blue').addClass('bulb-glow-blue');
    $('#bulb_green').addClass('bulb-glow-green');
    $('#bulb_pink').addClass('bulb-glow-pink');
    $('#bulb_orange').addClass('bulb-glow-orange');
    $('body').addClass('peach');
    $(this).fadeOut('slow', function () {
      $('#play').fadeIn('slow');
    });
  });

  // 2. Tocar música
  $('#play').on('click', function () {
    var audio = $('.song')[0];
    audio.play();
    $('#bulb_yellow').addClass('bulb-glow-yellow-after');
    $('#bulb_red').addClass('bulb-glow-red-after');
    $('#bulb_blue').addClass('bulb-glow-blue-after');
    $('#bulb_green').addClass('bulb-glow-green-after');
    $('#bulb_pink').addClass('bulb-glow-pink-after');
    $('#bulb_orange').addClass('bulb-glow-orange-after');
    $('body').addClass('peach-after');
    $(this).fadeOut('slow', function () {
      $('#bannar_coming').fadeIn('slow');
    });
  });

  // 3. Decorar o ambiente (banner)
  $('#bannar_coming').on('click', function () {
    $('.bannar').addClass('bannar-come');
    $(this).fadeOut('slow', function () {
      $('#balloons_flying').fadeIn('slow');
    });
  });

  // 4. Soltar os balões
  function loopBalloon(id) {
    var randleft = 1000 * Math.random();
    var randtop  = 500  * Math.random();
    $('#' + id).animate({ left: randleft, bottom: randtop }, 10000, function () {
      loopBalloon(id);
    });
  }

  $('#balloons_flying').on('click', function () {
    $('.balloon-border').animate({ top: -500 }, 8000);
    $('#b1, #b4, #b5, #b7').addClass('balloons-rotate-behaviour-one');
    $('#b2, #b3, #b6').addClass('balloons-rotate-behaviour-two');
    loopBalloon('b1');
    loopBalloon('b2');
    loopBalloon('b3');
    loopBalloon('b4');
    loopBalloon('b5');
    loopBalloon('b6');
    loopBalloon('b7');
    $(this).fadeOut('slow', function () {
      $('#cake_fadein').fadeIn('slow');
    });
  });

  // 5. Trazer o bolo
  $('#cake_fadein').on('click', function () {
    $('.cake').fadeIn('slow');
    $(this).fadeOut('slow', function () {
      $('#light_candle').fadeIn('slow');
    });
  });

  // 6. Acender a vela
  $('#light_candle').on('click', function () {
    $('.fuego').fadeIn('slow');
    $(this).fadeOut('slow', function () {
      $('#wish_message').fadeIn('slow');
    });
  });

  // 7. Feliz aniversário! — balões sobem com letras
  $('#wish_message').on('click', function () {
    vw = $(window).width() / 2;

    $('#b1, #b2, #b3, #b4, #b5, #b6, #b7').stop();
    $('#b1').attr('id', 'b11');
    $('#b2').attr('id', 'b22');
    $('#b3').attr('id', 'b33');
    $('#b4').attr('id', 'b44');
    $('#b5').attr('id', 'b55');
    $('#b6').attr('id', 'b66');
    $('#b7').attr('id', 'b77');

    $('#b11').animate({ top: 240, left: vw - 350 }, 500);
    $('#b22').animate({ top: 240, left: vw - 250 }, 500);
    $('#b33').animate({ top: 240, left: vw - 150 }, 500);
    $('#b44').animate({ top: 240, left: vw - 50  }, 500);
    $('#b55').animate({ top: 240, left: vw + 50  }, 500);
    $('#b66').animate({ top: 240, left: vw + 150 }, 500);
    $('#b77').animate({ top: 240, left: vw + 250 }, 500);

    $('.balloons').css('opacity', '0.9');
    $('.balloons h2').fadeIn(3000);

    $(this).fadeOut('slow', function () {
      $('#story').fadeIn('slow');
    });
  });

  // 8. Mensagem — navegação manual com seta
  $('#story').on('click', function () {
    $(this).fadeOut('slow');
    $('.cake').fadeOut('fast');
    
    var paragraphs = $('.message .col-md-12 p');
    var total      = paragraphs.length;
    var current    = 0;
    var busy       = false;

   paragraphs.hide();

$('.message').css({
    position: 'relative',
    minHeight: '500px',
    zIndex: '100001'
});

$('.message').show();

    // Mostra contador e seta
    $('#phrase_counter').text('1 / ' + total).fadeIn(400);
    $('#next_phrase').fadeIn(400);

    // Mostra primeira frase
    paragraphs.eq(0).fadeIn(600);

    // Clique na seta
    $('#next_phrase').off('click').on('click', function () {
      if (busy) return;
      busy = true;

      paragraphs.eq(current).fadeOut(400, function () {
        current++;

        if (current >= total) {
          // Acabou
          $('#next_phrase').fadeOut(400);
          $('#phrase_counter').fadeOut(400);
          $('.message').fadeOut('slow', function () {
            $('.cake').fadeIn('fast');
          });
          return;
        }

        $('#phrase_counter').text((current + 1) + ' / ' + total);
        paragraphs.eq(current).fadeIn(600, function () {
          busy = false;
        });
      });
    });
  });

});
