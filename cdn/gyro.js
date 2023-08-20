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
$(document).ready(function() {
    // Function to update the indicator position and width for each tab bar
    function updateIndicatorPosition(indicator, activeTab) {
      const activeTabPosition = activeTab.position().left;
      const activeTabWidth = activeTab.outerWidth();
      indicator.css({
        left: activeTabPosition,
        width: activeTabWidth,
      });
    }

    // Create the tab-bar-indicator for each tab-bar
    $(".tab-bar").each(function() {
      const tabBar = $(this);
      const tabItems = tabBar.find(".tab-bar-item");
      const activeTab = tabBar.find(".tab-bar-item.tab-is-active");
      const indicator = $("<div class='tab-bar-indicator'></div>");

      // Add the tab-bar-indicator to the tab bar
      tabBar.append(indicator);

      // Initialize the indicator position and width on page load for each tab bar
      $(window).on("load", function() {
        updateIndicatorPosition(indicator, activeTab);

        // Show the content of the initially active tab on page load for each tab bar
        const targetTab = activeTab.attr("data-tab-target");
        $(".tab-content .tab-item").removeClass("tab-is-active");
        $("#" + targetTab).addClass("tab-is-active");
      });

      tabItems.click(function() {
        const clickedTab = $(this); // Update the active tab on click

        // Move the border indicator to the clicked tab for each tab bar
        updateIndicatorPosition(indicator, clickedTab);

        // Show the corresponding tab content for each tab bar
        const targetTab = clickedTab.attr("data-tab-target");
        $(".tab-content .tab-item").removeClass("tab-is-active");
        $("#" + targetTab).addClass("tab-is-active");
      });

      // Handle window resize event for each tab bar
      let resizeTimeout;
      $(window).resize(function() {
        clearTimeout(resizeTimeout);
        // Delay updating indicator position and width to reduce frequent updates during resizing
        resizeTimeout = setTimeout(function() {
          updateIndicatorPosition(indicator, activeTab);
        }, 250);
      });

      // Handle tab-bar scroll event for each tab bar (if there's a horizontal scrollbar)
      tabBar.on("scroll", function() {
        updateIndicatorPosition(indicator, activeTab);
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
  // Add 'textfield-active' class when input is focused
  $('.basic-input').on('focus', function() {
    $(this).prev('label').addClass('textfield-active');
    $(this).parent('.normal-textfield').addClass('textfield-active');
  });

  // Remove 'textfield-active' class when input is blurred and has no value
  $('.basic-input').on('blur', function() {
    if (!$(this).val()) {
      $(this).prev('label').removeClass('textfield-active');
      $(this).parent('.normal-textfield').removeClass('textfield-active');
    }
  });

  // Add 'textfield-active' class to inputs with values on page load
  $('.basic-input').each(function() {
    if ($(this).val()) {
      $(this).prev('label').addClass('textfield-active');
      $(this).parent('.normal-textfield').addClass('textfield-active');
    }
  });

  // Create label dynamically based on data-placeholder attribute
  $('.normal-textfield').each(function() {
    var placeholderText = $(this).find('.basic-input').attr('data-placeholder');
    $(this).prepend('<label class="textfield-label">' + placeholderText + '</label>');
  });
});




//dropdown js
$(document).ready(function() {
  $("[data-toggle-menu]").on("click", function(event) {
    event.stopPropagation();
    var menuId = $(this).data("toggle-menu");
    var autocloseType = $(this).data("autoclose");
    $(".menu-content").not("[data-menu='" + menuId + "']").parent().removeClass("active");
    $("[data-menu='" + menuId + "']").parent().toggleClass("active");
    if (autocloseType === "inside") {
      $("[data-menu='" + menuId + "']").parent().find(".menu-content").on("click", function(event) {
        event.stopPropagation();
      });
      $(document).on("click", function(event) {
        if (!$(event.target).closest("[data-menu='" + menuId + "']").length) {
          $("[data-menu='" + menuId + "']").parent().removeClass("active");
        }
      });
    } else {
      $(document).on("click", function(event) {
        if (!$(event.target).closest(".menu.active").length) {
          $(".menu").removeClass("active");
        }
      });
      $("[data-menu='" + menuId + "']").parent().find(".menu-content").on("click", function(event) {
        event.stopPropagation();
        $(".menu").removeClass("active");
      });
    }
  });
});



//ripple js
let rippleTimer = null;

$(".ripple-effect").on("mousedown touchstart", function(e) {
    let rect = this.getBoundingClientRect();
    let radius = findFurthestPoint(e.clientX || e.originalEvent.touches[0].clientX, this.offsetWidth, rect.left, e.clientY || e.originalEvent.touches[0].clientY, this.offsetHeight, rect.top);

    let circle =  document.createElement("div");
    circle.classList.add("ripple");

    circle.style.left = (e.clientX || e.originalEvent.touches[0].clientX) - rect.left - radius + "px";
    circle.style.top = (e.clientY || e.originalEvent.touches[0].clientY) - rect.top - radius + "px";
    circle.style.width = circle.style.height = radius * 2 + "px";

    $(this).append(circle);

    // Set the timer for the ripple effect
    rippleTimer = setTimeout(() => {
        rippleTimer = null;
    }, 300);
});

$(".ripple-effect").on("mouseup mouseleave touchend touchcancel", function() {
    // Clear the timer if the trigger is released
    clearTimeout(rippleTimer);

    let ripple = $(this).find(".ripple");
    if (ripple.length != 0) {
        ripple.css("transition", "opacity 300ms linear");
        ripple.css("opacity", "0");
        setTimeout(() => {
            ripple.remove();
        }, 300);
    }
});

function findFurthestPoint(clickPointX, elementWidth, offsetX, clickPointY, elementHeight, offsetY) {
    let x = clickPointX - offsetX > elementWidth / 2 ? 0 : elementWidth;
    let y = clickPointY - offsetY > elementHeight / 2 ? 0 : elementHeight;
    let d = Math.hypot(x - (clickPointX - offsetX), y - (clickPointY - offsetY));
    return d;
}

//drawer
$(document).ready(function() {
  $('[data-drawer]').click(function() {
    var drawerID = $(this).data('drawer');
    $(drawerID).toggleClass('open');
    if ($(drawerID).hasClass('open')) {
      $('body').css('overflow', 'hidden');
      $('<div class="backdrop"></div>').appendTo('body').fadeIn();
    } else {
      $('body').css('overflow', 'auto');
      $('.backdrop').fadeOut(function() {
        $(this).remove();
      });
    }
  });
  $('body').on('click', '.backdrop', function() {
    $('.drawer').removeClass('open');
    $('body').css('overflow', 'auto');
    $(this).fadeOut(function() {
      $(this).remove();
    });
  });
});
