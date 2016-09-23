var hora,bakaze,jicha,haishi,haishiTable,fu,fuBefore;
var data = [];
var milkcocoa = new MilkCocoa('アプリID.mlkcca.com');
var fungo = milkcocoa.dataStore('fungo');

var qCnt = 0;

$(function(){
  $(window).on('load',function(){
    fungoStream();
  });
});

function fungoStream(){
  fungo.stream().size(999).sort('desc').next(function(err, dataList) {
    data = dataList;
  });
  setTimeout(function(){$('#loading').css('display','none');},3000);
}

function fungoGet(){
  
  var num = Math.floor( Math.random() * data.length );

  hora = data[num].value.hora;
  bakaze = data[num].value.bakaze;
  jicha = data[num].value.jicha;
  haishi = data[num].value.haishi;
  haishiTable = data[num].value.haishiTable;
  fu = data[num].value.fu;
  fuBefore = data[num].value.fuBefore;

  $('#haishi').html(haishi);
  $('#result-haishi-table').html(haishiTable);

  //和了
  switch(hora){
    case '01':$('[data-settings="hora"]').html('<button data-hora="hora01">ロン</button>');break;
    case '02':$('[data-settings="hora"]').html('<button data-hora="hora02">ツモ</button>');break;
  };
  //場風
  switch(bakaze){
    case '01':$('[data-settings="bakaze"]').html('<button data-bakaze="bakaze01">場風：東</button>');break;
    case '02':$('[data-settings="bakaze"]').html('<button data-bakaze="bakaze02">場風：南</button>');break;
    case '03':$('[data-settings="bakaze"]').html('<button data-bakaze="bakaze03">場風：西</button>');break;
    case '04':$('[data-settings="bakaze"]').html('<button data-bakaze="bakaze04">場風：北</button>');break;
  };
  //自家
  switch(jicha){
    case '01':$('[data-settings="jicha"]').html('<button data-jicha="jicha01">自家：東</button>');break;
    case '02':$('[data-settings="jicha"]').html('<button data-jicha="jicha02">自家：南</button>');break;
    case '03':$('[data-settings="jicha"]').html('<button data-jicha="jicha03">自家：西</button>');break;
    case '04':$('[data-settings="jicha"]').html('<button data-jicha="jicha04">自家：北</button>');break;
  };
  
  data.splice(num,1);

}

$(function(){

  $('.count').on('touchstart', function(e){
    e.preventDefault();
    if($(this).is('#start')){
      $('#loading').css('display', 'block');
    };
  });
  $('.count').on('touchend', function(e){
    e.preventDefault();
    if($(this).is('#start')){
      qCnt++;
      $('[data-settings="qnum"]').html('001');
      $('#answer').css('display', 'block');
      $('#tenkey').css('display', 'block');
      $('#settings-haishi').css('display', 'block');
      $(this).remove();
      fungoGet();
      $('#loading').css('display', 'none');
    }
    else if(qCnt==100){
      qCnt = 0;
      $('#social').css('display','block');
      fungoStream();
    }
    else{
      qCnt++;
      $('[data-settings="qnum"]').html(("00"+qCnt).slice(-3));
      $('#haishi').html('');
      $('#answer').html('');
      $('[data-settings="hora"]').html('');
      $('[data-settings="bakaze"]').html('');
      $('[data-settings="jicha"]').html('');
      window.location.href = '#';
      fungoGet();
      $('#loading').css('display', 'none');
    };
  });
  
  //テンキー
  $('[data-key]').on('touchstart', function(e){
    e.preventDefault();
    $(this).addClass('hover');
  });
  $('[data-key]').on('touchend', function(e){
    e.preventDefault();
    $(this).removeClass('hover');
    $(this).trigger('touched');
  });
  $('[data-key]').on('touched', function(e){
    if($('#answer').html().length<3){
      $('#answer').append($(this).data('key'));
    }
  });
  
  //delete
  $('#key-delete').on('touchstart', function(e){
    e.preventDefault();
    $(this).addClass('hover');
  });
  $('#key-delete').on('touchend', function(e){
    e.preventDefault();
    $(this).removeClass('hover');
    $(this).trigger('touched');
  });
  $('#key-delete').on('touched', function(e){
    if($('#answer').html().length>0){
      $('#answer').html($('#answer').html().substr(0,$('#answer').html().length-1));
    }
  });

  //enter
  $('#key-enter').on('touchstart', function(e){
    e.preventDefault();
    $(this).addClass('hover');
  });
  $('#key-enter').on('touchend', function(e){
    e.preventDefault();
    $(this).removeClass('hover');
    $(this).trigger('touched');
  });
  $('#key-enter').on('touched', function(e){
    if($('#answer').html().length<1){alert('答えを入力してください');}
    else {
      if($('#answer').html()==fu){
        $('#result-scores strong').html('正解！！');
      }
      else {
        $('#result-scores strong').html('不正解');        
      };
      window.location.href = '#result';
    };
  });

});
