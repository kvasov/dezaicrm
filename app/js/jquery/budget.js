$(document).ready(function () {
  if ($('section.step-budget').length) {
    setTimeout(function () {
      $('.tooltipster').tooltipster({
        theme: ['tooltipster-shadow', 'tooltipster-shadow-customized'],
        interactive: true,
        side: 'bottom',
      });
    }, 5000);

    $(document).on(
      'click',
      'section.step-budget .room-right a.hide',
      function () {
        console.log($(this));
        $(this).parents('.room').addClass('minimized');
        $(this).parents('.room').find('.in').slideUp();
      }
    );

    $(document).on(
      'click',
      'section.step-budget .room-right a.show',
      function () {
        $('section.step-budget .right .room').addClass('minimized');
        $('section.step-budget .right .room').find('.in').slideUp();
        $(this).parents('.room').removeClass('minimized');
        $(this).parents('.room').find('.in').slideDown();
        if (!$('body').hasClass('mobile-version')) {
          $('.tooltipster').tooltipster({
            theme: ['tooltipster-shadow', 'tooltipster-shadow-customized'],
            interactive: true,
            side: 'bottom',
          });
        }
      }
    );

    $(document).on('click', '.tooltip-m span', function () {
      var $tooltipMob;
      $tooltipMob = $(this).parent().siblings('.tooltip-m-content');
      if ($tooltipMob.is(':visible')) {
        $tooltipMob.hide();
      } else {
        $tooltipMob.show();
      }
    });

    $(document).on('click', 'section.step-budget .actions a.save', function () {
      $('section.step-budget .actions .saved').show();
      setTimeout(function () {
        $('section.step-budget .actions .saved').hide();
      }, 10000);
    });

    $(document).on('click', '.save-draft-mobile .btn', function () {
      $('.save-draft-mobile .saved').css({
        display: 'flex',
      });
      setTimeout(function () {
        $('.save-draft-mobile .saved').hide();
      }, 10000);
    });

    $(window).scroll(function () {
      if ($(window).scrollTop() > 100) {
        $('.progress-mobile').addClass('active');
      } else {
        $('.progress-mobile').removeClass('active');
      }
    });
  }
});
