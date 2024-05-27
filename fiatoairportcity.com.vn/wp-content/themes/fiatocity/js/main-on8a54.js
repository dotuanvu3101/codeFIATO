jQuery(document).ready(function($){
	window.onload = function() {
  var sections = document.querySelectorAll('section');
  for (var i = 0; i < sections.length; i++) {
    sections[i].style.opacity = 1;
  }
}
	setTimeout(function (){$('body.page-id-2').addClass("no-scroll-top");});
	setTimeout(function (){
		$('body.page-id-2 .loading-page').addClass("hidden-load");
	},3800);
		setTimeout(function(){
	$("body.page-id-2 .logo-center").addClass("show");
	},);setTimeout(function(){$("body.page-id-2 .d-fex-img").addClass("none-tran");
	},3000);
		setTimeout(function(){$("body.page-id-2 #fp-nav").addClass("show");$("body.page-id-2 .logo").addClass("show");$("body.page-id-2 .menu-devn").addClass("show");$("body.page-id-2 .post-category-uxbuilder-fullwidth").addClass("show-text");$("body.page-id-2 #scroll-menu").addClass("show");$("body.page-id-2").removeClass("no-scroll-top");$("body.page-id-2").removeClass("fix-top");$("body.page-id-2 .bt-contact-right").addClass("show");$("body.page-id-2 .social").addClass("show");},4000);
		setTimeout(function(){
	$("body.page-id-2 .img-6").addClass("show");
	},3000);setTimeout(function(){
	$("body.page-id-2 .bg-home").addClass("op")
	},3500);
	setTimeout(function (){
		$('.loading-page').remove();
	},4000);
	
	$(document).on('click', '.squares-button[href^="#"]', function(e) {
		e.preventDefault();
		var id_popup = $(this).attr('href');
		$.ajax({
			type : "post",
			dataType : "html",
			url : ajaxurl,
			data : {
				action: "popup_squares_ajax",
				id_popup: id_popup,
			},
			beforeSend: function(){
			},
			success: function(response) {
                $.magnificPopup.open({
                    items: {
                        src: response,
                        type: 'inline'
                    }
                });
			},
			error: function( jqXHR, textStatus, errorThrown ){
				console.log( 'The following error occured.' );
			}
		});
	});
	
	let svg = document.querySelector("svg");
	let rects = document.querySelectorAll("polygon");

	rects.forEach(rect => {
	  rect.addEventListener("mouseenter", e => {
		svg.appendChild(rect);
	  });
	});
	
});