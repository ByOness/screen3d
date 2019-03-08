"use strict";

$.fn.isOnScreen = function (shift) {
  if (!shift) {
    shift = 0;
  }

  var viewport = {};
  viewport.top = $(window).scrollTop();
  viewport.bottom = viewport.top + $(window).height();
  var bounds = {};
  bounds.top = this.offset().top + shift;
  bounds.bottom = bounds.top + this.outerHeight() - shift;
  return bounds.top <= viewport.bottom && bounds.bottom >= viewport.top;
};

var _bxInnit = function _bxInnit(elem, opt) {
  if (!$(elem).length) return false;
  var defaultOptions = {
    view: 'all'
  };
  var currentOpt = $.extend(defaultOptions, opt);
  var init = {
    breakPoint: 992,
    sliderActive: false,
    initBreakpoint: null,
    resizeBreakpointMore: null,
    resizeBreakpointLess: null,
    windowWidht: window.innerWidth
  };
  var flag = false;
  var slider;
  var sliderClone = $(elem).clone(); // Объект с параметрами для слайдера

  var options = opt; // Создаем слайдер

  function createSlider() {
    slider = $(elem).bxSlider(options);
    return true;
  }

  if (flag) {
    createSlider();
    init.sliderActive = true;
  }

  function createBreakpoints() {
    switch (currentOpt.view) {
      case 'mobile':
        init.initBreakpoint = init.windowWidht < init.breakPoint;
        init.resizeBreakpointMore = init.windowWidht >= init.breakPoint;
        init.resizeBreakpointLess = init.windowWidht < init.breakPoint;
        break;

      case 'desktop':
        init.initBreakpoint = init.windowWidht >= init.breakPoint;
        init.resizeBreakpointMore = init.windowWidht < init.breakPoint;
        init.resizeBreakpointLess = init.windowWidht >= init.breakPoint;
        init.resizeBreakpointLess;
        break;

      case 'all':
        init.initBreakpoint = true;
        init.resizeBreakpointMore = false;
        init.resizeBreakpointLess = false;
        break;
    }
  }

  createBreakpoints(); // Загрузка страницы

  if (init.initBreakpoint) {
    createSlider();
    init.sliderActive = true;
  } // Отслеживаем события при ресайзе


  $(window).resize(function () {
    // Если окно больше или равено breakPoint
    // Вырубаем слайдер и ставим ФЛАГ в false
    // Вставляем начальный вариант html разметки (без лишнего кода от слайдера)
    init.windowWidht = window.innerWidth;
    createBreakpoints();

    if (init.resizeBreakpointMore) {
      if (init.sliderActive) {
        slider.destroySlider();
        init.sliderActive = false;
        slider.replaceWith(sliderClone.clone());
      }
    } // Если окно меньше breakPoint
    // Вырубаем слайдер и ставим ФЛАГ в true


    if (init.resizeBreakpointLess) {
      if (!init.sliderActive) {
        createSlider();
        init.sliderActive = true;
      }
    }
  });
  var a, b;
  a = 1;
  b = 0;
  $(window).on('scroll', function () {
    if (init.sliderActive == true) {
      if (slider.isOnScreen()) {
        b = 1;
      } else {
        b = 0;
      }

      if (a == b) {
        slider.startAuto();
      } else {
        slider.stopAuto();
      }
    }
  });
  return slider;
};

var _toForm = function _toForm() {
  $('.pre_toform').click(function (e) {
    e.preventDefault();
    var a = $('.js_submit');
    var b = a.closest('form');

    if ($('form#toform').length) {
      a = $('#toform .js_submit');
      b = a.closest('form#toform');
    }

    if (b.length && a.is(':visible')) {
      $("html,body").animate({
        scrollTop: b.last().offset().top
      }, 1000);
    }

    return false;
  });
};

var _countDown = function _countDown(elem) {
  var timerTime = 5000;
  var minutes = 15;
  var counter = $('.counter__num');
  var value = counter.text();
  var date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);

  if ($.cookie('counter') == undefined) {
    $.cookie('counter', value, {
      expires: date
    });
  }

  num = $.cookie('counter');

  if ($.cookie('counter') == null) {
    num = value;
  }

  counter.text(num);

  if (num < 8) {
    counter.text(7);
  }

  var count = counter.text();
  var setTimer = setInterval(function () {
    if (num > 7) {
      var rand = random(0, 1);
      num = num - rand;
      counter.text(num);
    }

    $.cookie('counter', num, {
      expires: date
    });

    if (num < 8) {
      clearInterval(setTimer);
      $.cookie('counter', 7, {
        expires: date
      });
    }
  }, timerTime);
};

var _timer = function _timer(timer) {
  var _currentDate = new Date();

  var count = 15;

  var _toDate = new Date(_currentDate.getFullYear(), _currentDate.getMonth(), _currentDate.getDate(), _currentDate.getHours(), _currentDate.getMinutes() + count, 1);

  timer.countdown(_toDate, function (e) {
    var $this = $(this);
    var hours = $this.find('.timer__hours');
    var min = $this.find('.timer__minutes');
    var sec = $this.find('.timer__seconds');
    hours.text('' + e.strftime('%H'));
    min.text('' + e.strftime('%M'));
    sec.text('' + e.strftime('%S'));
  });
};

$(document).ready(function() {

    $('[name="country"]').on('change', function() {
        var geoKey = $(this).find('option:selected').val();
        var data = $jsonData.prices[geoKey];
        var price = data.price;
        var oldPrice = data.old_price;
        var currency = data.currency
        $("[value = "+geoKey+"]").attr("selected", true).siblings().attr('selected', false);

        $('.price_land_s1').text(price);
        $('.price_land_s2').text(oldPrice);
        $('.price_land_curr').text(currency);
    });
    
    $('.toform').click(function(){
      $("html, body").animate({scrollTop: $("form").offset().top-300}, 1000);
      return false;
    });
  _bxInnit('.why__list', {
    view: "mobile",
    adaptiveHeight: true,
    swipeThreshold: 40,
    controls: false,
    pager: true,
    auto: true,
    pause: 10000,
    autoHover: true,
    infiniteLoop: true,
    slideMargin: 3
  });

  _bxInnit('.reviews__list', {
    view: "mobile",
    adaptiveHeight: true,
    swipeThreshold: 40,
    controls: false,
    pager: true,
    auto: true,
    pause: 10000,
    autoHover: true,
    infiniteLoop: true,
    slideMargin: 3
  });

  _toForm();

  _timer($('.timer__nums'));
});