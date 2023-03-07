// dialog js
$(document).ready(function() {
    $('.open-dialog-btn').click(function() {
      var dialogId = $(this).attr('mui-data-target');
      var dialogEl = $('#' + dialogId);
      dialogEl.addClass('active');
      $('body').addClass('dialog-active');
      setTimeout(function() {
        dialogEl.addClass('dialog-enter');
        dialogEl.addClass('dialog-enter-active');
      }, 10);

      dialogEl.click(function(event) {
        if ($(event.target).hasClass('dialog')) {
          closeDialog(dialogEl);
        }
      });
    });

    $('.close-dialog-btn').click(function() {
      var dialogEl = $(this).closest('.dialog');
      closeDialog(dialogEl);
    });

    function closeDialog(dialogEl) {
      dialogEl.removeClass('active');
      dialogEl.addClass('dialog-exit');
      dialogEl.addClass('dialog-exit-active');
      $('body').removeClass('dialog-active');
      setTimeout(function() {
        dialogEl.removeClass('dialog-enter');
        dialogEl.removeClass('dialog-enter-active');
        dialogEl.removeClass('dialog-exit');
        dialogEl.removeClass('dialog-exit-active');
      }, 300);

      dialogEl.off('click');
    }
  });

// tabs js
  document.addEventListener("DOMContentLoaded", function() {
      const tabLinks = document.querySelectorAll(".mui__tab-item");
      const animatedBorder = document.querySelector(".animated-border");

      // Get the active tab
      const activeTab = document.querySelector(".mui--is-active");

      // Set the initial width and left position of the animated border
      animatedBorder.style.width = `${activeTab.offsetWidth}px`;
      animatedBorder.style.left = `${activeTab.offsetLeft}px`;

      tabLinks.forEach(link => {
        link.addEventListener("click", e => {
          tabLinks.forEach(link => link.classList.remove("mui--is-active"));
          e.target.classList.add("mui--is-active");

          // Update the width and left position of the animated border
          animatedBorder.style.width = `${e.target.offsetWidth}px`;
          animatedBorder.style.left = `${e.target.offsetLeft}px`;
        });
      });
    });


// tooltip js
    $(document).ready(function() {
    var tooltipTimeout;

    $(document).on('mouseenter', '[data-tooltip]', function() {
      var $this = $(this);
      var position = $this.data('tooltip-position') || 'bottom';
      var align = $this.data('tooltip-align') || 'center';
      var spacing = parseInt($this.data('tooltip-spacing')) || 0;
      var tooltipHtml = $this.data('tooltip-html');
      var tooltipText = $this.data('tooltip');
      var tooltip = $('<div class="tooltip"></div>');
      var tooltipArrow = $('<div class="tooltip-arrow"></div>');

      if (tooltipHtml === true) {
        tooltip.html(tooltipText);
      } else {
        tooltip.text(tooltipText);
      }

      tooltip.append(tooltipArrow);
      $('body').append(tooltip);
      var triggerOffset = $this.offset();
      var triggerWidth = $this.outerWidth();
      var triggerHeight = $this.outerHeight();
      var tooltipWidth = tooltip.outerWidth();
      var tooltipHeight = tooltip.outerHeight();
      var top, left, arrowTop, arrowLeft;

      switch (position) {
        case 'top':
          top = triggerOffset.top - tooltipHeight - spacing;
          left = triggerOffset.left + (triggerWidth / 2) - (tooltipWidth / 2);
          arrowTop = tooltipHeight - 1;
          arrowLeft = (tooltipWidth / 2) - 6;
          tooltipArrow.addClass('arrow-bottom');
          break;
        case 'left':
          top = triggerOffset.top + (triggerHeight / 2) - (tooltipHeight / 2);
          left = triggerOffset.left - tooltipWidth - spacing;
          arrowTop = (tooltipHeight / 2) - 6;
          arrowLeft = tooltipWidth - 1;
          tooltipArrow.addClass('arrow-right');
          break;
        case 'right':
          top = triggerOffset.top + (triggerHeight / 2) - (tooltipHeight / 2);
          left = triggerOffset.left + triggerWidth + spacing;
          arrowTop = (tooltipHeight / 2) - 6;
          arrowLeft = -11;
          tooltipArrow.addClass('arrow-left');
          break;
        default: // 'bottom'
          top = triggerOffset.top + triggerHeight + spacing;
          left = triggerOffset.left + (triggerWidth / 2) - (tooltipWidth / 2);
          arrowTop = -11;
          arrowLeft = (tooltipWidth / 2) - 6;
          tooltipArrow.addClass('arrow-top');
          break;
      }

      switch (align) {
        case 'start':
          if (position === 'top' || position === 'bottom') {
            left = triggerOffset.left;
          } else if (position === 'left' || position === 'right') {
            top = triggerOffset.top;
          }
          break;
        case 'end':
          if (position === 'top' || position === 'bottom') {
            left = triggerOffset.left + triggerWidth - tooltipWidth;
          } else if (position === 'left' || position === 'right') {
            top = triggerOffset.top + triggerHeight - tooltipHeight;
          }
          break;
          if (position === 'top' || position === 'bottom') {
            left = triggerOffset.left;
          } else if (position === 'left' || position === 'right') {
            top = triggerOffset.top;
          }
          break;
        case 'end':
          if (position === 'top' || position === 'bottom') {
            left = triggerOffset.left + triggerWidth - tooltipWidth;
          } else if (position === 'left' || position === 'right') {
            top = triggerOffset.top + triggerHeight - tooltipHeight;
          }
          break;
        default: // 'center'
          if (position === 'top' || position === 'bottom') {
            left = triggerOffset.left + (triggerWidth / 2) - (tooltipWidth / 2);
          } else if (position === 'left' || position === 'right') {
            top = triggerOffset.top + (triggerHeight / 2) - (tooltipHeight / 2);
          }
          break;
        }

        tooltip.css({
          top: top,
          left: left
        });

        tooltipArrow.css({
          top: arrowTop,
      left: arrowLeft
    });

    tooltip.addClass('show');
  });

  $(document).on('mouseleave', '[data-tooltip]', function() {
    var tooltip = $('.tooltip');
    tooltip.removeClass('show');
    tooltipTimeout = setTimeout(function() {
      tooltip.addClass('hide');
      setTimeout(function() {
        tooltip.remove();
      }, 200);
    }, 200);
  })

  $(document).on('mouseenter', '.tooltip', function() {
    clearTimeout(tooltipTimeout);
  });
});


//textfield mod
$(document).ready(function() {
  $('.mui__basic-input').on('focus', function() {
    $(this).prev('label').addClass('mui__textfield-active');
    $(this).parent('.mui-normal-textfield').addClass('mui__textfield-active');
  });

  $('.mui__basic-input').on('blur', function() {
    if (!$(this).val()) {
      $(this).prev('label').removeClass('mui__textfield-active');
      $(this).parent('.mui-normal-textfield').removeClass('mui__textfield-active');
    }
  });

  $('.mui__basic-input').each(function() {
    if ($(this).val()) {
      $(this).prev('label').addClass('mui__textfield-active');
      $(this).parent('.mui-normal-textfield').addClass('mui__textfield-active');
    }
  });
});
