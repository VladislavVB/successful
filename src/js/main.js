if (!window.jQuery) {
  document.write('<script type="text/javascript" src="/js/lib/jquery.js"></script>')
}

$(document).ready(function () {

  var modal = $('.modal');
  var modalUp = $('.modal-up');

  var modalForm = $('.modal__form');
  var controlForm = $('.control__form');
  var footerForm = $('.footer__form');

  onSubmitForm(modalForm)
  onSubmitForm(controlForm)
  onSubmitForm(footerForm)

  $('[data-toggle=modal]').on('click', function () {
    modal.toggleClass('modal--visible');
  });

  $('.modal__close').on('click', function () {
    modal.toggleClass('modal--visible');
  });

  $('.modal-up__close').on('click', function () {
    modalUp.removeClass('modal-up--visible');
  });

  $(document).keydown(function () {
    if (event.keyCode == 27) {
      modal.removeClass('modal--visible');
      modalUp.removeClass('modal-up--visible');
    }
  });

  // slider
  var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
  var next = $('.swiper-button-next');
  var prev = $('.swiper-button-prev');
  var bullets = $('.swiper-pagination');

  next.css('left', prev.width() + 20 + bullets.width() + 20)
  bullets.css('left', prev.width() + 20)

  new WOW().init();

  modalForm.validate({
    errorClass: "invalid",
    errorElement: "div",
    errorPlacement: function (error, element) {
      if (element.attr("type") == "checkbox") {
        return element.next('label').append(error);
      }
      error.insertAfter($(element));
    },
    rules: {

      userName: {
        required: true,
        minlength: 2
      },

      userPhone: {
        required: true,
        minlength: 17
      },

      userEmail: {
        required: true,
        email: true
      },

      policyCheckbox: "required",
    },
    messages: {
      userName: {
        required: "Имя обязательно для заполнения",
        minlength: "Имя не короче 2-х букв"
      },
      userPhone: "Телефон обязателен для заполнения",
      userEmail: {
        required: "Обязательно укажите Email",
        email: "Введите в формате: name@domain.com"
      },
      policyCheckbox: "Обязательно для заполнения",
    }
  });

  function onSubmitForm(form) {
    form.submit(function (event) {
      if (form.valid()) {
        event.preventDefault();
        $.ajax({
          type: "POST",
          url: "send.php",
          data: $(this).serialize(),
          success: function (response) {
            form[0].reset();
            $('.modal').removeClass('modal--visible');
            $('.modal-up').addClass('modal-up--visible');
            console.log(response)
            ym('56835025', 'reachGoal', 'submit'); return true

          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error(jqXHR + " " + textStatus);

          }
        });
      }
    });
  }

  var $page = $('html, body');
  $('a[href*="#"]').click(function () {
    $page.animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 400);
    return false;
  });

  controlForm.validate({
    errorClass: "invalid",
    errorElement: "div",
    errorPlacement: function (error, element) {
      if (element.attr("type") == "checkbox") {
        return element.next('label').append(error);
      }
      error.insertAfter($(element));
    },
    rules: {
      userName: {
        required: true,
        minlength: 2
      },
      userPhone: {
        required: true,
        minlength: 17
      },
      policyTick: "required",
    },
    messages: {
      userName: {
        required: "Имя обязательно для заполнения",
        minlength: "Имя не короче 2-х букв"
      },
      userPhone: "Телефон обязателен для заполнения",
      policyTick: "Обязательно для заполнения",
    }
  });

  footerForm.validate({
    errorClass: "invalid",
    errorElement: "div",
    errorPlacement: function (error, element) {
      if (element.attr("type") == "checkbox") {
        return element.next('label').append(error);
      }
      error.insertAfter($(element));
    },
    rules: {

      userName: {
        required: true,
        minlength: 2
      },
      userPhone: {
        required: true,
        minlength: 17
      },
      userQuestion: "required",
      policyMark: "required",

    },
    messages: {
      userName: {
        required: "Имя обязательно для заполнения",
        minlength: "Имя не короче 2-х букв"
      },
      userPhone: "Телефон обязателен для заполнения",
      userQuestion: "Пожалуйста, напишите Ваш вопрос",
      policyMark: "Обязательно для заполнения",
    }
  });

  $('[type=tel]').mask('+7(000) 000-00-00', { placeholder: "Ваш номер телефона:" });

  //видео

  var player;
  $('.video__play').on('click', function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '465',
      width: '100%',
      videoId: 'ef0JqU-4dOc',
      events: {
        'onReady': videoPlay,
      }
    });
  })

  function videoPlay(event) {
    event.target.playVideo();
  }

});

/*//КАРТА!!!
//Переменная для включения/отключения индикатора загрузки
var spinner = $('.ymap-container').children('.loader');
//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
var check_if_load = false;
//Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
var myMapTemp, myPlacemarkTemp;
 
//Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
function init () {
  var myMapTemp = new ymaps.Map('map', {
    center: [47.244734, 39.723227],
    zoom: 15
  }, {
    searchControlProvider: 'yandex#search'
  }),
    
  myPlacemark = new ymaps.Placemark(myMapTemp.getCenter(), {
    hintContent: 'Наш офис',
    balloonContent: 'Вход со двора'
  }, {
    // Опции.
    // Необходимо указать данный тип макета.
    iconLayout: 'default#image',
    // Своё изображение иконки метки.
    iconImageHref: 'img/marker.png',
    // Размеры метки.
    iconImageSize: [32, 32],
    // Смещение левого верхнего угла иконки относительно
    // её "ножки" (точки привязки).
    iconImageOffset: [-5, -38]
  });

myMapTemp.geoObjects.add(myPlacemark); // помещаем флажок на карту
myMapTemp.behaviors.disable('scrollZoom'); 

// Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
var layer = myMapTemp.layers.get(0).get(0);

// Решение по callback-у для определения полной загрузки карты
waitForTilesLoad(layer).then(function() {
  // Скрываем индикатор загрузки после полной загрузки карты
  spinner.removeClass('is-active');
});
}
 
// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов) 
function waitForTilesLoad(layer) {
  return new ymaps.vow.Promise(function (resolve, reject) {
    var tc = getTileContainer(layer), readyAll = true;
    tc.tiles.each(function (tile, number) {
      if (!tile.isReady()) {
        readyAll = false;
      }
    });
    if (readyAll) {
      resolve();
    } else {
      tc.events.once("ready", function() {
        resolve();
      });
    }
  });
}
 
function getTileContainer(layer) {
  for (var k in layer) {
    if (layer.hasOwnProperty(k)) {
      if (
        layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
        || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
      ) {
        return layer[k];
      }
    }
  }
  return null;
}
// Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
function loadScript(url, callback){
  var script = document.createElement("script");
 
  if (script.readyState){  // IE
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" ||
              script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  // Другие браузеры
    script.onload = function(){
      callback();
    };
  }
 
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
} 
// Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
var ymap = function() {
  $('.ymap-container').mouseenter(function(){
      if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем
 
      // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
        check_if_load = true; 
 
    // Показываем индикатор загрузки до тех пор, пока карта не загрузится
        spinner.addClass('is-active');
 
    // Загружаем API Яндекс.Карт
        loadScript("https://api-maps.yandex.ru/2.1/?apikey=fd888608-1cb5-480b-83f3-03c118516a8e&lang=ru_RU", function(){
           // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
           ymaps.load(init);
        });                
      }
    }
  );  
}
$(function() {
 
  //Запускаем основную функцию
  ymap();
 
});*/
// Yandex карта
YaMapsShown = false;
YaMapsMinShown = false;
$(window).scroll(function () {
  if (!YaMapsShown) {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 700) {
      showYaMaps();
      YaMapsShown = true;
    }
  }
});

function showYaMaps() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ac5bb57cf85273372e734f7def62f256953ad064eedb76e5e5b9827bc18ec6a06&amp;width=100%25&amp;height=465&amp;lang=ru_RU&amp;scroll=false";
  document.getElementById("YaMaps").appendChild(script);
};

$(window).scroll(function () {
  if (!YaMapsMinShown) {
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 500) {
      showYaMapsMin();
      YaMapsMinShown = true;
    }
  }
});

function showYaMapsMin() {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A9a60de6cf27682651fbcaac0fd23aa6bf89d1b64045e88a7b770168feac6baa2&amp;width=100%25&amp;height=255&amp;lang=ru_RU&amp;scroll=false";
  document.getElementById("YaMapsMin").appendChild(script);
}