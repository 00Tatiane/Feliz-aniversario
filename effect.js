$(window).load(function(){
  $('.loading').fadeOut('fast');
  $('.container').fadeIn('fast');
});

$('document').ready(function(){

  var vw;

  $(window).resize(function(){
    vw = $(window).width()/2;
    $('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
    $('#b11').animate({top:240, left: vw-350},500);
    $('#b22').animate({top:240, left: vw-250},500);
    $('#b33').animate({top:240, left: vw-150},500);
    $('#b44').animate({top:240, left: vw-50},500);
    $('#b55').animate({top:240, left: vw+50},500);
    $('#b66').animate({top:240, left: vw+150},500);
    $('#b77').animate({top:240, left: vw+250},500);
  });

  $('#turn_on').click(function(){
    $('#bulb_yellow').addClass('bulb-glow-yellow');
    $('#bulb_red').addClass('bulb-glow-red');
    $('#bulb_blue').addClass('bulb-glow-blue');
    $('#bulb_green').addClass('bulb-glow-green');
    $('#bulb_pink').addClass('bulb-glow-pink');
    $('#bulb_orange').addClass('bulb-glow-orange');
    $('body').addClass('peach');
    $(this).fadeOut('slow').delay(5000).promise().done(function(){
      $('#play').fadeIn('slow');
    });
  });

  $('#play').click(function(){
    var audio = $('.song')[0];
    audio.play();
    $('#bulb_yellow').addClass('bulb-glow-yellow-after');
    $('#bulb_red').addClass('bulb-glow-red-after');
    $('#bulb_blue').addClass('bulb-glow-blue-after');
    $('#bulb_green').addClass('bulb-glow-green-after');
    $('#bulb_pink').addClass('bulb-glow-pink-after');
    $('#bulb_orange').addClass('bulb-glow-orange-after');
    $('body').addClass('peach-after');
    $(this).fadeOut('slow').delay(6000).promise().done(function(){
      $('#bannar_coming').fadeIn('slow');
    });
  });

  $('#bannar_coming').click(function(){
    $('.bannar').addClass('bannar-come');
    $(this).fadeOut('slow').delay(6000).promise().done(function(){
      $('#balloons_flying').fadeIn('slow');
    });
  });

  function loopOne()   { var r=1000*Math.random(),t=500*Math.random(); $('#b1').animate({left:r,bottom:t},10000,function(){ loopOne(); }); }
  function loopTwo()   { var r=1000*Math.random(),t=500*Math.random(); $('#b2').animate({left:r,bottom:t},10000,function(){ loopTwo(); }); }
  function loopThree() { var r=1000*Math.random(),t=500*Math.random(); $('#b3').animate({left:r,bottom:t},10000,function(){ loopThree(); }); }
  function loopFour()  { var r=1000*Math.random(),t=500*Math.random(); $('#b4').animate({left:r,bottom:t},10000,function(){ loopFour(); }); }
  function loopFive()  { var r=1000*Math.random(),t=500*Math.random(); $('#b5').animate({left:r,bottom:t},10000,function(){ loopFive(); }); }
  function loopSix()   { var r=1000*Math.random(),t=500*Math.random(); $('#b6').animate({left:r,bottom:t},10000,function(){ loopSix(); }); }
  function loopSeven() { var r=1000*Math.random(),t=500*Math.random(); $('#b7').animate({left:r,bottom:t},10000,function(){ loopSeven(); }); }

  $('#balloons_flying').click(function(){
    $('.balloon-border').animate({top:-500},8000);
    $('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
    $('#b2,#b3,#b6').addClass('balloons-rotate-behaviour-two');
    loopOne(); loopTwo(); loopThree(); loopFour(); loopFive(); loopSix(); loopSeven();
    $(this).fadeOut('slow').delay(5000).promise().done(function(){
      $('#cake_fadein').fadeIn('slow');
    });
  });

  $('#cake_fadein').click(function(){
    $('.cake').fadeIn('slow');
    $(this).fadeOut('slow').delay(3000).promise().done(function(){
      $('#light_candle').fadeIn('slow');
    });
  });

  $('#light_candle').click(function(){
    $('.fuego').fadeIn('slow');
    $(this).fadeOut('slow').promise().done(function(){
      $('#wish_message').fadeIn('slow');
    });
  });

  $('#wish_message').click(function(){
    vw = $(window).width()/2;
    $('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
    $('#b1').attr('id','b11');
    $('#b2').attr('id','b22');
    $('#b3').attr('id','b33');
    $('#b4').attr('id','b44');
    $('#b5').attr('id','b55');
    $('#b6').attr('id','b66');
    $('#b7').attr('id','b77');
    $('#b11').animate({top:240, left: vw-350},500);
    $('#b22').animate({top:240, left: vw-250},500);
    $('#b33').animate({top:240, left: vw-150},500);
    $('#b44').animate({top:240, left: vw-50},500);
    $('#b55').animate({top:240, left: vw+50},500);
    $('#b66').animate({top:240, left: vw+150},500);
    $('#b77').animate({top:240, left: vw+250},500);
    $('.balloons').css('opacity','0.9');
    $('.balloons h2').fadeIn(3000);
    $(this).fadeOut('slow').delay(3000).promise().done(function(){
      $('#story').fadeIn('slow');
    });
  });

  // Mensagem: seta manual, um bloco por vez
  $('#story').click(function(){
    $(this).fadeOut('slow');
    $('.cake').fadeOut('fast');
    $('.navbar').hide();

    var blocks  = $('.msg-block');
    var total   = blocks.length;
    var current = 0;
    var busy    = false;

    blocks.hide();
    $('.message').show();

    if ($('#next_phrase').length === 0) {
      $('<button id="next_phrase">&#8594;</button>').appendTo('body');
      $('<div id="phrase_counter"></div>').appendTo('body');
    }

    $('#phrase_counter').text('1 / ' + total).show();
    $('#next_phrase').show();
    blocks.eq(0).fadeIn(800);

    $('#next_phrase').off('click').on('click', function(){
      if (busy) return;
      busy = true;
      blocks.eq(current).fadeOut(500, function(){
        current++;
        if (current >= total) {
          $('#next_phrase').fadeOut(400);
          $('#phrase_counter').fadeOut(400);
          $('.message').fadeOut('slow', function(){
            $('.navbar').show();
            $('.cake').fadeIn('fast');
          });
          return;
        }
        $('#phrase_counter').text((current+1) + ' / ' + total);
        blocks.eq(current).fadeIn(800, function(){ busy = false; });
      });
    });
  });

});
