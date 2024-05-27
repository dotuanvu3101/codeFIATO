var ios,
    android,
    blackBerry,
    UCBrowser,
    Operamini,
    firefox,
    windows,
    smartphone,
    tablet,
    touchscreen,
    all,
    ua = navigator.userAgent,
    versions = (match = ua.match("MSIE (.)")) && 1 < match.length ? match[1] : "unknown",
    isTouchDevice = "ontouchstart" in window || (window.DocumentTouch && document instanceof DocumentTouch) || 0 < navigator.msMaxTouchPoints || 0 < navigator.maxTouchPoints,
    isDesktop = 0 != $(window).width() && !isTouchDevice,
    IEMobile = ua.match(/IEMobile/i),
    isIE9 = /MSIE 9/i.test(ua),
    isIE10 = /MSIE 10/i.test(ua),
    isIE11 = !(!/rv:11.0/i.test(ua) || IEMobile),
    isEge = /Edge\/12./i.test(navigator.userAgent),
    isOpera = (!!window.opr && !!opr.addons) || !!window.opera || 0 <= ua.indexOf(" OPR/"),
    isFirefox = "undefined" != typeof InstallTrigger,
    isIE = !!document.documentMode,
    isEdge = !isIE && !!window.StyleMedia && !isIE11,
    isChrome = -1 < ua.indexOf("Chrome") || (!!window.chrome && !!window.chrome.webstore),
    isBlink = (isChrome || isOpera) && !!window.CSS,
    isSafari = 0 < Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") || (!isChrome && !isOpera && void 0 !== window.webkitAudioContext),
    AndroidVersion = parseFloat(ua.slice(ua.indexOf("Android") + 8)),
    Version = ua.match(/Android\s([0-9\.]*)/i),
    isMobile = {
        ios: ua.match(/iPhone|iPad|iPod/i),
        android: ua.match(/Android/i),
        blackBerry: ua.match(/BB10|Tablet|Mobile/i),
        UCBrowser: ua.match(/UCBrowser/i),
        Operamini: ua.match(/Opera Mini/i),
        windows: ua.match(/IEMobile/i),
        smartphone: ua.match(/Android|BlackBerry|Tablet|Mobile|iPhone|iPad|iPod|Opera Mini|IEMobile/i) && window.innerWidth <= 440 && window.innerHeight <= 740,
        tablet: ua.match(/Android|BlackBerry|Tablet|Mobile|iPhone|iPad|iPod|Opera Mini|IEMobile/i) && window.innerWidth <= 1366 && window.innerHeight <= 800,
        all: ua.match(/Android|BlackBerry|Tablet|Mobile|iPhone|iPad|iPod|Opera Mini|IEMobile/i),
    };
if((isTouchDevice ? $("html").addClass("touch") : $("html").addClass("no-touch"), isTouchDevice && null !== isMobile.all)) var TouchLenght = !0;
else if((isMobile.tablet && isFirefox) || (isMobile.smartphone && isFirefox)) TouchLenght = !0;
else TouchLenght = !1;
isMobile.Operamini && alert("Please disable Data Savings Mode");
var iOS = isMobile.ios;
if($(".youtube-video").length){
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    var youTubeId,
        match,
        youTubeUrl = $(".youtube-video").attr("data-embed") || $(".view-video").attr("data-embed"),
        regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    youTubeId = (match = youTubeUrl.match(regExp)) && 11 == match[2].length ? match[2] : "no video found";
    var player,
        youTube = $(".youtube-video"),
        Source = "https://img.youtube.com/vi/" + youTubeId + "/sddefault.jpg";
    if(iOS)
        var SRC =
            '<iframe id="VYT"  title="video" src="https://www.youtube.com/embed/' +
            youTubeId +
            "?autoplay=1&enablejsapi=1&controls=1&loop=1&playlist=" +
            youTubeId +
            '" frameborder="0"  allow="autoplay" allowfullscreen></iframe>';
    else
        SRC =
            '<iframe id="VYT"  title="video" src="https://www.youtube.com/embed/' +
            youTubeId +
            "?autoplay=1&enablejsapi=1&controls=0&loop=1&playlist=" +
            youTubeId +
            '" frameborder="0"  allow="autoplay" allowfullscreen></iframe>';
    $(youTube).append(SRC);
    var timer,
        time_update = 0;

    function onYouTubePlayerAPIReady(){
        player = new YT.Player("VYT", {events: {onReady: onPlayerReady, onStateChange: onPlayerStateChange}});
    }

    function onPlayerStateChange(e){
        switch(e.data){
            case YT.PlayerState.PLAYING:
                (0 != TouchLenght && isTouchDevice) || $(".control").removeClass("show"), $(".bg-video").addClass("hide"), $(".play-button").removeClass("show"), $("#playpause").attr("data-state", "pause");
                break;
            case YT.PlayerState.PAUSED:
                (0 != TouchLenght && isTouchDevice) || $(".control").addClass("show"), $(".bg-video").removeClass("hide"), $(".play-button").addClass("show"), $("#playpause").attr("data-state", "play");
                break;
            case YT.PlayerState.ENDED:
        }
        var t = e.target;
        $(t.getIframe()).bind("InView", {Player: t}, function(e, t){
            1 == t && $(".play-button").hasClass("open-video") ? e.data.Player.playVideo() : e.data.Player.pauseVideo();
        });
    }

    function cleanTime(){
        return Math.round(player.getCurrentTime());
    }

    function onPlayerReady(e){
        if(
            (e.target.mute(),
                $("#mutetoggle").attr("data-state", "unmute"),
                updateTimerDisplay(),
                updateProgressBar(),
                player.pauseVideo(),
                $(".play-button").addClass("show"),
                $("#playpause").attr("data-state", "pause"),
            1 < player.getPlayerState())
        ){
            var t = player.getVideoData().title;
            $(".youtube-video iframe").attr("title", t);
        }
    }

    function updateTimerDisplay(){
        $("#current-time").text(formatTime(player.getCurrentTime())), $("#duration").text(formatTime(player.getDuration()));
    }

    function formatTime(e){
        e = Math.round(e);
        var t = Math.floor(e / 60),
            a = e - 60 * t;
        return t + ":" + (a = a < 10 ? "0" + a : a);
    }

    function updateProgressBar(){
        $("#progress-bar").val((player.getCurrentTime() / player.getDuration()) * 100);
    }

    $("#progress-bar").on("mouseup touchend", function(e){
        var t = player.getDuration() * (e.target.value / 100);
        player.seekTo(t), $(".bg-video").hasClass("hide") || $(".bg-video").addClass("hide");
    }),
        $("#playpause").bind("click", function(){
            "play" == $(this).attr("data-state")
                ? (player.playVideo(), $(this).attr("data-state", "pause"), $(".bg-video").addClass("hide"), $(".play-button").removeClass("show"))
                : (player.pauseVideo(), $(this).attr("data-state", "play"), $(".play-button").addClass("show"), $(".bg-video").removeClass("hide"));
        }),
        $("#mutetoggle").bind("click", function(){
            "unmute" == $(this).attr("data-state") ? (player.unMute(), $(this).attr("data-state", "mute")) : (player.mute(), $(this).attr("data-state", "unmute"));
        }),
        $("#fullscreen").bind("click", function(){
            "go-fullscreen" == $(this).attr("data-state")
                ? ($(this).attr("data-state", "cancel-fullscreen"),
                    $(".video-youtube-full").addClass("full-frame"),
                    $("html, body").addClass("no-scroll fullscreen"),
                    iOS ? ($('.hero-story[data-name="home-video"]').addClass("fullmode"), $(".header, .go-top, .footer").addClass("level-index-out")) : screenfull.request($(".video-youtube-full")[0]))
                : ($(this).attr("data-state", "go-fullscreen"),
                    $(".video-youtube-full").removeClass("full-frame"),
                    $("html, body").removeClass("no-scroll fullscreen"),
                    iOS ? ($('.hero-story[data-name="home-video"]').removeClass("fullmode"), $(".header, .go-top, .footer").removeClass("level-index-out")) : screenfull.exit());
        }),
        $(".play-button").on("click", function(e){
            e.preventDefault(),
                player.playVideo(),
                $(this).removeClass("show"),
                $("#playpause").attr("data-state", "pause"),
                $(".bg-video").addClass("hide"),
                $(".control").addClass("show"),
                $(".video-youtube-full").addClass("playing"),
                $(".play-button").addClass("open-video"),
                clearInterval(time_update),
                (time_update = setInterval(function(){
                    updateTimerDisplay(), updateProgressBar();
                }, 500)),
                clearInterval(timer),
                (timer = setInterval(function(){
                    (0 != TouchLenght && isTouchDevice) || $(".control").removeClass("show");
                }, 5e3));
        }),
        $(".pause-button").on("click", function(e){
            e.preventDefault(),
                $(".play-button").addClass("show"),
                $("#playpause").attr("data-state", "play"),
                $(".bg-video, .slogan").removeClass("hide"),
                clearInterval(timer),
            (0 != TouchLenght && isTouchDevice) || $(".control").addClass("show"),
                player.pauseVideo();
        }),
        $(".youtube-video").on("click", function(e){
            e.preventDefault(), $("#playpause").trigger("click");
        }),
        $(".youtube-video, .control").on("mouseenter mousemove", function(e){
            e.preventDefault(), (0 != TouchLenght && isTouchDevice) || $(".control").hasClass("show") || $(".control").addClass("show");
        });
}

setTimeout(function(){
    $('.loading').remove();
}, 2500);
setTimeout(function(){
    $('.hero-story:first-child').find('.animated').addClass('go');
    $('header').find('.animated').addClass('go');
    $('#scroll-menu').find('.animated').addClass('go');
}, 1000)


/* scroll*/
var e, l = $(".hero-story").index(),
    a = $(".hero-story").length,
    o = !1,
    timer,
    doWheel = !0,
    doTouch = !0,
    windscroll = $(document).scrollTop();
$(document).ready(function(){
    if(1024 < $(window).width()){
        TweenLite.set($(".hero-story").not($(".hero-story")[l]), {y: "100%"})
    }

    $(".scrollA").getNiceScroll().remove();
    setTimeout(function(){
        if($('.show-text .scrollA').length){
            niceScrollA()
        }
    }, 500);
    /* onScroll */
    $(".fullpage:not(.single)").on("mousewheel", function(e){
        var delta = e.originalEvent.deltaY;
        $(".scrollA").getNiceScroll().remove();
        if(1024 < $(window).width() && $(".hero-story")[l] != null && !1 === o){
            //down
            if(delta > 0){
                a - 1 <= l ? (l = 0) : l++,
                    scrolUp();
            }else{
                l <= 0 ? (l = a - 1) : l--,
                    scrollDown();
            }
        }
    });


    setTimeout(() => {
        if($(window).width() <= 1024) return;

        var myElement = document.querySelector('#fullPage');

        var mc = new Hammer(myElement);


        mc.get('swipe').set({
            direction: Hammer.DIRECTION_VERTICAL,
            threshold: 1,
            velocity: 0.1
        });
        mc.get('pan').set({
            direction: Hammer.DIRECTION_VERTICAL,
            threshold: 1,
            velocity: 0.1
        });

// listen to events...
        mc.on("swipeup swipedown pan", function(ev){
            if(window.animating || $(window).width() <= 1024) return;
            if(ev.type === 'swipeup' || ev.additionalEvent === 'panup'){
                a - 1 <= l ? (l = 0) : l++;
                scrolUp();
                console.log(ev.type, ev.additionalEvent)
                window.animating = true;
            }
            if(ev.type === 'swipedown' || ev.additionalEvent === 'pandown'){
                l <= 0 ? (l = a - 1) : l--;
                scrollDown();
                console.log(ev.type, ev.additionalEvent)
                window.animating = true;
            }
        });
    }, 1000)

    //  $('.fullpage').on('swipeup',function(){
    //     a - 1 <= l ? (l = 0) : l++,
    //     scrolUp();
    //     console.log('swipedown..');
    // });
    // $('.fullpage:not(.single)').on('swipedown',function(){
    //     l <= 0 ? (l = a - 1) : l--,
    //     scrollDown();
    //     console.log('swipeup..');
    // });


    setTimeout(function(){
        $("body #fp-nav").addClass("show");
        $("body .logo").addClass("show");
        $("body .menu-devn").addClass("show");
        $("body.single .menu-devn").addClass("show");
        $("body .post-category-uxbuilder-fullwidth").addClass("show-text");
        $("body #scroll-menu").addClass("show");
        $("body .bt-contact-right").addClass("show");
        $("body .social").addClass("show");
    }, 500);
	setTimeout(function(){
        $("body.page-template-fullPage-page .hero-story:first-child").addClass("show-text")
    }, 500);
    setTimeout(function(){
        $("body.home .hero-story:first-child").addClass("show-text"),
            $("body.home .scroll-menu li:first-child").addClass("current");
    }, 1000);
    setTimeout(function(){
        $("body.page-id-2 .hero-story:first-child").addClass("show-text"),
            $("body.page-id-2 .scroll-menu li:first-child").addClass("current");
    }, 1000);
    $(".scroll-menu li").on("click", function(){
        var e = $(this).index();
        return o || (!o && l < e ? ((l = e), scrolUp()) : !o && e < l && ((l = e), scrollDown())), !1;
    });
    $(".wheel").on("click", function(){
        return $(".scroll-menu li.current").next().trigger("click"), !1;
    });
    $(".go-top").on("click", function(){
        return $(".scroll-menu li.current").prev().trigger("click"), !1;
    });
    setTimeout(function(){
        $('#Play').trigger('click');
    }, 2000);


});
if($(window).width() > 700){
    function scrollDown(){
        (o = !0),
            TweenLite.set($(".hero-story"), {zIndex: ""}),
            $(".scroll-menu li").removeClass("current"),
        $(".youtube-video iframe").length && ($(".pause-button").trigger("click"), clearInterval(timer)),
            TweenLite.fromTo(
                $(".hero-story")[l],
                0.8,
                {y: "-100%", zIndex: 2},
                {
                    y: "0%",
                    ease: Quad.easeOut,
                    emulatetouch: true,
                    cursordragontouch: true,
                    onComplete: function(){
                        $(".wheel").addClass("show");
                        if((".youtube-video iframe").length && $(".hero-story").eq(l).find('.play-button').trigger("click")) ;
						if($(".hero-story").eq(l).hasClass('mb123')){
							$('.imp-tooltips-container').addClass('scrolled');
						}else{
							$('.imp-tooltips-container').removeClass('scrolled');
						}
                        $(".hero-story").removeClass("show-text"),
                        $(".hero-story").eq(l).addClass("show-text"),
						$(".scroll-menu li").eq(l).addClass("current"),
                        $(".hero-story:last-child").hasClass("show-text") && ($(".wheel").removeClass("show"), $(".go-top").addClass("show")),
                            updateEnd(), niceScrollA();
                        window.animating = false;
                    },
                }
            );
    }

    function scrolUp(){
        (o = !0);
        TweenLite.set($(".hero-story"), {zIndex: ""}),
            $(".scroll-menu li").removeClass("current"),
        $(".youtube-video iframe").length && ($(".pause-button").trigger("click"), clearInterval(timer)),
            TweenLite.fromTo(
                $(".hero-story")[l],
                0.8,
                {zIndex: 2},
                {
                    y: "0%",
                    ease: Quad.easeOut,
                    emulatetouch: true,
                    cursordragontouch: true,
                    onComplete: function(){
                        $(".wheel").addClass("show");
                        if((".youtube-video iframe").length && $(".hero-story").eq(l).find('.play-button').trigger("click")) ;
						if($(".hero-story").eq(l).hasClass('mb123')){
							$('.imp-tooltips-container').addClass('scrolled');
						}else{
							$('.imp-tooltips-container').removeClass('scrolled');
						}
                        $(".hero-story").removeClass("show-text"),
                            $(".hero-story").eq(l).addClass("show-text"),
                            $(".scroll-menu li").eq(l).addClass("current"),
                        $(".hero-story:last-child").hasClass("show-text") && ($(".wheel").removeClass("show"), $(".go-top").addClass("show")),
                            updateEnd(), niceScrollA();
                        window.animating = false;
                    },
                }
            );
    }

    function updateEnd(){
        if($(".hero-story").eq(l).hasClass('light')){
            $('#scroll-menu').addClass('light');
            $('header').addClass('light');
        }else{
            $('#scroll-menu').removeClass('light');
            $('header').removeClass('light');
        }
        // add effect
        $('.hero-story').find('.animated').removeClass('go');
        $('.hero-story').eq(l).find('.animated').addClass('go');
        setTimeout(function(){
            TweenLite.set($(".hero-story").not($(".hero-story")[l]), {y: "100%"}), (o = !1);
        }, 1e3);
    }
}

function niceScrollA(){
    $(".show-text .scrollA").getNiceScroll().show(),
        $(".show-text .scrollA").niceScroll({
            touchbehavior: !0,
            horizrailenabled: !1,
            cursordragontouch: !0,
            grabcursorenabled: !1,
            cursorfixedheight: 200,
            background: "transparent",
            cursorcolor: "#e0b990",
            cursorborder: "none",
            cursorborderradius: "0px",
            cursorwidth: "2px",
            autohidemode: false

        }),
        $(".show-text .scrollA").animate({
            scrollTop: "0px"
        })
}

$(".go-top, #scroll-menu ul li:not(:last-child)").on("click", function(){
    $(".go-top").removeClass("show");

});

/* on wipe*/
$(window).scroll(function(){
    var scroll = $(window).scrollTop();
    var height = $(window).height();
    if($(window).width() <= 1024){
        var animate = $('div.hero-story');
        animate.each(function(n){
            var ani = $(this).find('.animated');
            if(scroll > $(this).offset().top - height / 2){
                ani.addClass('go');
                $(".go-top").removeClass("show");
            }else{
                ani.removeClass('go').removeClass('active-loop');
                $(".go-top").removeClass("show");
            }

        });
    }
});


var supportTouch = ua.match(/Android|BlackBerry|Tablet|iPad|iPod|Opera Mini|IEMobile/i) && isTouchDevice,
    scrollEvent = "touchmove scroll",
    touchStartEvent = supportTouch ? "touchstart" : "mousedown",
    touchStopEvent = supportTouch ? "touchend" : "mouseup",
    touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
$.event.special.swipeupdown = {
    setup: function(){
        var thisObject = this;
        var $this = $(thisObject);
        $this.bind(touchStartEvent, function(event){
            var data = event.originalEvent.touches ?
                    event.originalEvent.touches[0] :
                    event,
                start = {
                    time: (new Date).getTime(),
                    coords: [data.pageX, data.pageY],
                    origin: $(event.target)
                },
                stop;

            function moveHandler(event){
                if(!start){
                    return;
                }
                var data = event.originalEvent.touches ?
                    event.originalEvent.touches[0] :
                    event;
                stop = {
                    time: (new Date).getTime(),
                    coords: [data.pageX, data.pageY]
                };

                // prevent scrolling
//                     if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
//                         event.preventDefault();
//                     }
            }

            $this
                .bind(touchMoveEvent, moveHandler)
                .one(touchStopEvent, function(event){
                    $this.unbind(touchMoveEvent, moveHandler);
                    if(start && stop){
                        if(stop.time - start.time < 1000 &&
                            Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                            Math.abs(start.coords[0] - stop.coords[0]) < 75){
                            start.origin
                                .trigger("swipeupdown")
                                .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                        }
                    }
                    start = stop = undefined;
                });
        });
    }
};
$.each({
    swipedown: "swipeupdown",
    swipeup: "swipeupdown"
}, function(event, sourceEvent){
    $.event.special[event] = {
        setup: function(){
            $(this).bind(sourceEvent, $.noop);
        }
    };
});