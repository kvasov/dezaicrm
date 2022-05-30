$(document).ready(function () {
  $('body').on('mouseenter', '.tooltipster:not(.tooltipstered)', function () {
    $(this)
      .tooltipster({
        content: '<div class="tooltip-remove-file">Delete file</div>',
        contentAsHTML: true,
        theme: ['tooltipster-shadow', 'tooltipster-shadow-customized'],
        interactive: true,
        side: 'bottom',
        animationDuration: 200,
        delay: 0,
      })
      .tooltipster('open');
  });
});
