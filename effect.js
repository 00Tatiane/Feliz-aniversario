$(window).on('load', function () {
  $('.loading').fadeOut('fast');
  $('.container').fadeIn('fast');
});

$(document).ready(function () {

  $('#play, #bannar_coming, #balloons_flying, #cake_fadein, #light_candle, #wish_message, #story').hide();
  $('.cake').hide();
  $('.fuego').hide();
  $('.message').hide();
  $('.balloons h2').hide();

  var vw;

  function reposicionarBaloes() {
    vw = $(window).width() / 2;
    var spacing = $(window).width() < 480 ? 35 : $(window).width() < 768 ? 50 : 100;
    $('#b11').animate({ top: 240, left: vw - spacing * 3 }, 500);
    $('#b22').animate({ top: 240, left: vw - spacing * 2 }, 500);
    $('#b33').animate({ top: 240, left: vw - spacing     }, 500);
    $('#b44').animate({ top: 240, left: vw               }, 500);
    $('#b55').animate({ top: 240, left: vw + spacing     }, 500);
    $('#b66').animate({ top: 240, left: vw + spacing * 2 }, 500);
    $('#b77').animate({ top: 240, left: vw + spacing * 3 }, 500);
  }

  $(window).on('resize', function () {
    $('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
    reposicionarBaloes();
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
    $(this).fadeOut('slow', function () { $('#play').fadeIn('slow'); });
  });

  // 2. Tocar música
  $('#play').on('click', function () {
    $('.song')[0].play();
    $('#bulb_yellow').addClass('bulb-glow-yellow-after');
    $('#bulb_red').addClass('bulb-glow-red-after');
    $('#bulb_blue').addClass('bulb-glow-blue-after');
    $('#bulb_green').addClass('bulb-glow-green-after');
    $('#bulb_pink').addClass('bulb-glow-pink-after');
    $('#bulb_orange').addClass('bulb-glow-orange-after');
    $('body').addClass('peach-after');
    $(this).fadeOut('slow', function () { $('#bannar_coming').fadeIn('slow'); });
  });

  // 3. Decorar o ambiente
  $('#bannar_coming').on('click', function () {
    $('.bannar').addClass('bannar-come');
    $(this).fadeOut('slow', function () { $('#balloons_flying').fadeIn('slow'); });
  });

  // 4. Soltar os balões
  function loopBalloon(id) {
    var randleft = $(window).width()  * Math.random();
    var randtop  = $(window).height() * 0.6 * Math.random();
    $('#' + id).animate({ left: randleft, bottom: randtop }, 10000, function () {
      loopBalloon(id);
    });
  }

  $('#balloons_flying').on('click', function () {
    $('.balloon-border').animate({ top: -500 }, 8000);
    $('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
    $('#b2,#b3,#b6').addClass('balloons-rotate-behaviour-two');
    ['b1','b2','b3','b4','b5','b6','b7'].forEach(loopBalloon);
    $(this).fadeOut('slow', function () { $('#cake_fadein').fadeIn('slow'); });
  });

  // 5. Trazer o bolo
  $('#cake_fadein').on('click', function () {
    // Para animação dos balões e os esconde para o bolo aparecer limpo
    $('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop().fadeOut('fast');
    $('.cake').fadeIn('slow');
    $(this).fadeOut('slow', function () { $('#light_candle').fadeIn('slow'); });
  });

  // 6. Acender a vela
  $('#light_candle').on('click', function () {
    $('.fuego').fadeIn('slow');
    $(this).fadeOut('slow', function () { $('#wish_message').fadeIn('slow'); });
  });

  // 7. Feliz aniversário!
  $('#wish_message').on('click', function () {
    // Para todos os balões e recoloca em ordem J-E-S-S-Y-C-A
    $('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
    $('#b1').attr('id','b11'); $('#b2').attr('id','b22'); $('#b3').attr('id','b33');
    $('#b4').attr('id','b44'); $('#b5').attr('id','b55'); $('#b6').attr('id','b66');
    $('#b7').attr('id','b77');

    // Garante que estão visíveis antes de posicionar
    $('.balloons').fadeIn('fast');

    reposicionarBaloes();
    $('.balloons').css('opacity','0.9');
    $('.balloons h2').fadeIn(3000);
    $(this).fadeOut('slow', function () { $('#story').fadeIn('slow'); });
  });

  // 8. Mensagem com seta manual
  $('#story').on('click', function () {
    $(this).fadeOut('slow');
    $('.cake').fadeOut('fast');
    $('.navbar').hide();

    var paragraphs = $('.message .col-md-12 p');
    var total   = paragraphs.length;
    var current = 0;
    var busy    = false;

    paragraphs.hide();
    $('.message').show();

    // Cria a seta e o contador UMA VEZ, direto no body
    if ($('#next_phrase').length === 0) {
      $('<button id="next_phrase">&#8594;</button>').appendTo('body');
      $('<div id="phrase_counter"></div>').appendTo('body');
    }

    $('#phrase_counter').text('1 / ' + total).show();
    $('#next_phrase').show();

    paragraphs.eq(0).fadeIn(600);

    $('#next_phrase').off('click').on('click', function () {
      if (busy) return;
      busy = true;

      paragraphs.eq(current).fadeOut(400, function () {
        current++;
        if (current >= total) {
          $('#next_phrase').fadeOut(400);
          $('#phrase_counter').fadeOut(400);
          $('.message').fadeOut('slow', function () {
            $('.navbar').show();
            $('.cake').fadeIn('fast');
          });
          return;
        }
        $('#phrase_counter').text((current + 1) + ' / ' + total);
        paragraphs.eq(current).fadeIn(600, function () { busy = false; });
      });
    });
  });

});
