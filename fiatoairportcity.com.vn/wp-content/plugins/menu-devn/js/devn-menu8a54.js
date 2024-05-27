;(function($){
    "use strict";
	jQuery(document).ready(function($){
		var timer;

		function NavClick() {
			TweenLite.set($(".navigation .nav li"), {
				x: "150%",
				opacity: 0
			}), $(".nav-click").on("click", function() {
				return $(".show-box-pic").hasClass("showup") && $(".show-box-pic").removeClass("showup"), $(".nav-click").hasClass("active") ? ($(".navigation").scrollTop(0), $(".nav-click").removeClass("active"), $(".overlay-menu, .navigation").removeClass("show"), $("html, body").removeClass("no-scroll"), $(".video-full, .youtube-video iframe").length && $(".home-video").hasClass("show-text") && StartPlay(), TweenLite.set($(".navigation .nav li"), {
					x: "150%",
					opacity: 0
				}), clearTimeout(timer)) : ($(".navigation").scrollTop(0), $(".nav-click").addClass("active"), $(".overlay-menu, .navigation").addClass("show"), $("html, body").addClass("no-scroll"), clearTimeout(timer), $(".nav li").each(function(e, t) {
					var i = $(this);
					timer = setTimeout(function() {
						TweenLite.to($(i), .0, {
							x: "0%",
							opacity: 1,
							delay: .0,
							ease: Quad.easeOut
						})
					}, 80 * (e + 1))
				})), $(".subscribe").hasClass("active") && $(".register-form .close").trigger("click"), !1
			}), $(".overlay-menu, .navigation span").on("click", function() {
				$(".nav-click").hasClass("active") && $(" .navigation .nav-click").trigger("click")
			})
		}
		NavClick();
	});
})(jQuery);
