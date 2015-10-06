var app = angular.module('theApp', ['slick', 'duScroll']);


var bgimgs = [];

$(function(){
/*################################################*/
  /*################################################*/
    /*################################################*/
      /*################################################*/
  /* framework plugins */

  if( $('[data-scroll]').length>0 ){
    smoothScroll.init();
  }


  // FORMULARIO SIMPLE

  if($('form.simple').length>0){
    var resultado;
    $('form.simple').submit(function(e){
      var _this = $(this);
      e.preventDefault();
      var datos = $(this).serialize();
      _this.find('.resultado').html('<i class="fa fa-circle-o-notch fa-spin"></i>');
      $.get('http://www.dragonbarbudo.com/api/email.php?'+datos, function(result){
        resultado = JSON.parse(result);
        if( resultado[0].status === "sent" ){
          _this.find('.resultado').html('Mensaje correctamente enviado.');
        } else {
          _this.find('.resultado').html('Ocurrió un error. Inténtelo de nuevo más tarde.');
        }
      });
    });
  }


  // SCROLLREVEAL
  if($('[data-sr]').length>0){
    window.sr = new scrollReveal({
      reset:true,
      mobile:true
    });
  }


  // BACKSTRETCH

  if($('.bgslider').length>0){

      $('.bgslider').each(function(index){
        bgimgs[index] = [];
        $(this).children('div').each(function(){
          bgimgs[index].push($(this).attr('data'));
        });
        $( $(this).attr('data') ).backstretch(bgimgs[index], {duration: 3000, fade: 750});
      });

   }

  // MODALBOX

  if($('.box').length>0){
    $('.box').swipebox();
  }

  // SLIDERS
  if($('.slider.one').length>0){
    $('.slider.one').slick({
      prevArrow: '<button class="slick-prev fa fa-caret-left"></button>',
      nextArrow: '<button class="slick-next fa fa-caret-right"></button>',
      autoplay: true
    });
  }

  sliderMultiple();

      /*################################################*/
    /*################################################*/
  /*################################################*/
/*################################################*/
  /* custom */



$('header[role="main"] a').click(function(){
  $('.active').removeClass('active');
  $(this).addClass('active');
});


  map = new GMaps({
     div: '.gmap',
     lat: 19.4142777,
     lng:  -99.1585195,
     zoom: 5
  });


  var adds = []
  adds.push([[19.4142777, -99.1585195], 'Oficina Matriz', 'San Luis Potosí 96 Col. Roma<br> C.P. 06700, México, D.F.<br>Tel. (+5255) 55841516', 'info@ddm.com.mx'])
  adds.push([[25.6732109, -100.309201], 'Sucursal Monterrey, N.L.', 'Tel. 8183478730', 'lauras@ddm.com.mx'])
  adds.push([[20.67359,-103.343803], 'Sucursal Gdl, Jalisco', 'Tel. 3336304794', 'normag@ddm.com.mx'])
  adds.push([[22.1564699, -100.9855409], 'San Luis Potosí, S.L.P.', 'Tel. 4441271515', 'disermed@ddm.com.mx'])
  adds.push([[29.0891857,-110.9613299], 'Hermosillo, Son.', 'Dispositivos Médicos y Catéteres, S.A. de C.V. <br>Tel. 6622170037', 'hector@dimedica.com.mx'])
  adds.push([[19.1902778,-96.1533333], 'Veracruz, Ver.', 'Tel. (55) 5555841355', 'ddm@ddm.com.mx'])
  adds.push([[25.5428443,-103.4067861], 'Torreón, Coah.', 'Tel. 8712338239', 'cristinat@ddm.com.mx'])
  adds.push([[20.97,-89.62], 'Mérida, Yuc.', 'ATSA del Sureste, S.A. de C.V. <br>Tel. 9999435555', 'felipeg@gargom.com.mx'])
  adds.push([[32.5551524,-115.5510556], 'Mexicali, B.C.', 'Medigrup, S.A. de C.V. <br>Tel. 6865528720', 'franfer2@prodigy.net.mx'])
  adds.push([[21.1326654,-101.6782926], 'León, Gto.', 'Tel. 4777676344', 'monicar@ddm.com.mx'])
  adds.push([[19.0413068,-98.2061934], 'Puebla, Pue.', 'Suministros Médicos de México S.A. de C.V. <br>Tel. 2226044913', 'luism@sumed.com.mx'])
  adds.push([[17.987557,-92.929147], 'Villahermosa, Tab.', 'Tel. 9932933533', 'juanma@ddm.com.mx'])
  adds.push([[27.4938889,-109.9388889], 'Cd. Obregón, Son.', 'Tel. 6441329504', 'franciscov@ddm.com.mx'])
  adds.push([[28.6329957,-106.0691004], 'Chihuahua, Chi.', 'Cardioactiva SC <br>Tel. 6142368007', 'uliseschairez@mmeusa.com.mx'])
  var markers = [];
  for(var i = 0; i<adds.length; i++){
    markers.push({
      lat : adds[i][0][0],
      lng : adds[i][0][1],
      infoWindow: { content: '<p><strong>'+adds[i][1]+'</strong></p><p>'+adds[i][2]+'</p>'}
    });
  }
map.addMarkers(markers);

$('.see, a[role="contentinfo"], .cerrar').click(function(e){
  e.preventDefault();
});




}); // JQUERY END



// scrollMonitor
/*
var s_inicio = scrollMonitor.create($('#inicio'), 200);
var s_productos = scrollMonitor.create($('productos'), 200);
s_productos.enterViewport(function(){
  console.log('productos');
});
*/



  /* PRODUCTOS */

//CONTROLLERS
app.controller('loadCardiologia', function($scope, $http){
  $scope.sintesisShow = [];
  $http.get('productos/cardiologia.json').
    success(function(data, status, headers, config){
      $scope.productos = data;
    }).error(function(data, status, headers, config){
      //Error en la carga
    });
  $scope.slideUpd = function(){
    //sliderMultiple();
  }
  $scope.mostrarSinstesis = function(show, $index){
    $scope.sintesisShow[$index] = show;
  }
});


app.controller('loadVascular', function($scope, $http){
  $scope.sintesisShow = [];
  $http.get('productos/vascular.json').
    success(function(data, status, headers, config){
      $scope.productos = data;
    }).error(function(data, status, headers, config){
      //Error en la carga
    });
  $scope.slideUpd = function(){
    //sliderMultiple();
  }
  $scope.mostrarSinstesis = function(show, $index){
    $scope.sintesisShow[$index] = show;
  }
});


app.controller('loadVascular', function($scope, $http){
  $scope.sintesisShow = [];
  $http.get('productos/vascular.json').
    success(function(data, status, headers, config){
      $scope.productos = data;
    }).error(function(data, status, headers, config){
      //Error en la carga
    });
  $scope.slideUpd = function(){
    //sliderMultiple();
  }
  $scope.mostrarSinstesis = function(show, $index){
    $scope.sintesisShow[$index] = show;
  }
});

app.controller('loadNeuro', function($scope, $http){
  $scope.sintesisShow = [];
  $http.get('productos/neurovascular.json').
    success(function(data, status, headers, config){
      $scope.productos = data;
    }).error(function(data, status, headers, config){
      //Error en la carga
    });
  $scope.slideUpd = function(){
    //sliderMultiple();
  }
  $scope.mostrarSinstesis = function(show, $index){
    $scope.sintesisShow[$index] = show;
  }
});


app.controller('loadCCol', function($scope, $http){
  $scope.sintesisShow = [];
  $http.get('productos/cirugiacolumna.json').
    success(function(data, status, headers, config){
      $scope.productos = data;
    }).error(function(data, status, headers, config){
      //Error en la carga
    });
  $scope.slideUpd = function(){
    //sliderMultiple();
  }
  $scope.mostrarSinstesis = function(show, $index){
    $scope.sintesisShow[$index] = show;
  }
});


app.controller('loadCGen', function($scope, $http){
  $scope.sintesisShow = [];
  $http.get('productos/cirugiageneral.json').
    success(function(data, status, headers, config){
      $scope.productos = data;
    }).error(function(data, status, headers, config){
      //Error en la carga
    });
  $scope.slideUpd = function(){
    sliderMultiple();
  }
  $scope.mostrarSinstesis = function(show, $index){
    $scope.sintesisShow[$index] = show;
  }
});






app.directive('onFinishRender', function($timeout){
  return {
    restrict: 'A',
    link: function(scope, element, attr){
      if(scope.$last === true){
        scope.$evalAsync(attr.onFinishRender);
      }
    }
  }
});





function sliderMultiple(){
  if($('.slider.multiple, .slider.multiplebox').length>0){

    $('.slider.multiple, .slider.multiplebox').slick({
      prevArrow: '<button class="slick-prev fa fa-caret-left"></button>',
      nextArrow: '<button class="slick-next fa fa-caret-right"></button>',
      autoplay: false,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        { breakpoint: 960, settings: { slidesToShow: 2,   slidesToScroll: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
      ]
    });
  }
}
