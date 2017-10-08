
	$('body').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', '.favorite-thing.current', function(e) {
		var self = $(e.currentTarget);
		self.removeClass('current');
		if (self.next('.favorite-thing')[0]) {
			self.next().addClass('current');
		} else {
			$('.favorite-thing').first().addClass('current');
		}
	});

  $('body').on('click', '.nav-toggle', function() {

    if ($('.nav-wrapper').hasClass('open')) {
      $('.nav-wrapper').removeClass('open');
      $('body').removeClass('scroll-lock');
    } else {
      $('.nav-wrapper').addClass('open');
      $('body').addClass('scroll-lock');
    }
  });

  $(function() {
	  $('a[href*="#"]:not([href="#"])').click(function() {
	    $('.nav-wrapper').removeClass('open');
	    $('body').removeClass('scroll-lock');
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html, body').animate({
	          scrollTop: target.offset().top - 100
	        }, 600);
	        return false;
	      }
	    }
	  });
	});

	$(function() {
		$('a[href="#"]').click(function() {
		  $('html, body').animate({
		    scrollTop: 0
		  }, 600);
		  return false;
		});
	});

	$(document).on('opened', '.remodal.isVideo', function () {
	  var id = $(this).find('video').attr('id');
		document.getElementById(id).play();
		$(this).find('.video-status').attr('data-status', 'playing');
	});

	$(document).on('closed', '.remodal.isVideo', function () {
	  var id = $(this).find('video').attr('id');
		document.getElementById(id).pause();
	});

	$(document).on('opened', '.remodal.isImage', function () {
	  $(this).find('[data-src]').attr('src', $(this).find('[data-src]').attr('data-src'));
	});

	$('body').on('click', '.isVideo video', function(e) {
		var $status = $(e.currentTarget).next('.video-status')
		e.currentTarget.paused ? (function() { e.currentTarget.play(); $status.attr('data-status', 'playing') })() : (function() {  e.currentTarget.pause(); $status.attr('data-status', 'paused') })();
	})

	$('document').ready(function() {
		affixHeadings();
	})

	var onScroll = throttle(function() {
		affixHeadings();
	}, 50);

	window.addEventListener('scroll', onScroll);

	function affixHeadings() {
		// Make sure the job title moves as designed
		var jobTitle = document.getElementsByClassName('job-title')[0];
		var jobTitleAnchor = document.getElementsByClassName('anchor_job-title')[0];
		var jobTitleAnchorFixed = document.getElementsByClassName('anchor_job-title--fixed')[0];

		// Toggling fixed or not
		if (rect(jobTitleAnchor).top < rect(jobTitle).top + rect(jobTitle).height && hasClass(jobTitle, 'fixed') === true) {
			$('.job-title').removeClass('fixed');
		} else if (rect(jobTitleAnchorFixed).top < rect(jobTitle).top + rect(jobTitle).height && hasClass(jobTitle, 'fixed') === false) {
			$('.job-title').addClass('fixed');
		}

		// Make sure the sticker also moves as designed
		var sticker = document.getElementsByClassName('sticker')[0];
		var stickerAnchor = document.getElementsByClassName('anchor_sticker')[0];
		var stickerAnchorFixed = document.getElementsByClassName('anchor_sticker--fixed')[0];

		// Toggling fixed or not
		if (rect(stickerAnchor).top < rect(sticker).top + rect(sticker).height && hasClass(sticker, 'fixed') === true) {
			$('.sticker').removeClass('fixed');
		} else if (rect(stickerAnchorFixed).top < rect(sticker).top + rect(sticker).height && hasClass(sticker, 'fixed') === false) {
			$('.sticker').addClass('fixed');
		}

		// Navigation
		var siteNav = document.getElementsByClassName('site-nav')[0];
		var siteNavAnchor = document.getElementsByClassName('anchor_site-nav')[0];

		if (rect(siteNavAnchor).top < 0 && hasClass(siteNav, 'fixed') === false) {
			$('.site-nav').addClass('fixed');
		} else if (rect(siteNavAnchor).top > 0 && hasClass(siteNav, 'fixed') === true) {
			$('.site-nav').removeClass('fixed');
		}
	}

	function rect(el) {
		return el.getBoundingClientRect();
	}

	function hasClass(elem, className) {
    return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
	}


	function throttle(func, wait, options) {
	  var context, args, result;
	  var timeout = null;
	  var previous = 0;
	  if (!options) options = {};
	  var later = function() {
	    previous = options.leading === false ? 0 : Date.now();
	    timeout = null;
	    result = func.apply(context, args);
	    if (!timeout) context = args = null;
	  };
	  return function() {
	    var now = Date.now();
	    if (!previous && options.leading === false) previous = now;
	    var remaining = wait - (now - previous);
	    context = this;
	    args = arguments;
	    if (remaining <= 0 || remaining > wait) {
	      if (timeout) {
	        clearTimeout(timeout);
	        timeout = null;
	      }
	      previous = now;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    } else if (!timeout && options.trailing !== false) {
	      timeout = setTimeout(later, remaining);
	    }
	    return result;
	  };
	};
