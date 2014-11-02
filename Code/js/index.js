var SEG = {
    fixedForOldWebkit: [],

    currentPageNumber: 0,

    effects: { moveUp: 1, moveDown: 2, fade: 3 },

    directions: { up: 1, down: -1 },

    isAnimating: false,

    selectedProduct: 0,

    currentWoman: 0,

    currentWomanOpacity: 1,

    pageMove: function (effect, direction, pageCount) {
        var nextPageNumber = SEG.currentPageNumber + direction * pageCount;
        var fromPage = ".page-" + SEG.currentPageNumber;
        var toPage = ".page-" + nextPageNumber;
        SEG.currentPageNumber = nextPageNumber;

        switch (effect) {
            case SEG.effects.fade:
                outClass = 'ani-fadeOut';
                inClass = 'ani-fadeIn';
                break;
        }
        SEG.isAnimating = true;
        $(toPage).removeClass("hide");
        $(fromPage).addClass(outClass);
        $(toPage).addClass(inClass);

        setTimeout(function () {
            $(fromPage).removeClass('page-current');
            $(fromPage).removeClass(outClass);
            $(fromPage).addClass("hide");
            $(fromPage).find("*").addClass("hide");

            $(toPage).addClass('page-current');
            $(toPage).removeClass(inClass);
            $(toPage).find("*").removeClass("hide");

            SEG.isAnimating = false;
            SEG.fixForOldWebkit();
        }, 600);
    },
    resizeScreen: function () {
        var isEqual = function (num1, num2) {
            if (num1 - num2 > -0.001 && num1 - num2 < 0.001) {
                return true;
            }
            return false;
        };

        var isRatioWithWeixinBar = function (ratio) {
            if (isEqual(ratio, 0.666666667) || isEqual(ratio, 0.75) || isEqual(ratio, 0.8)) {
                return true;
            }
            return false;
        };
        //屏幕比例大于0.65后，会影响显示效果，需要做缩放处理，缩放到模板比例
        var screenRatio = HAOest.browser.screen.ratio;
        if (screenRatio > 0.65) {
            var standard = 0.63;
            if (isRatioWithWeixinBar(screenRatio)) {
                standard = 0.5;
            }
            $('.wrap').css('-webkit-transform', 'scale(' + standard / screenRatio + ',' + standard / screenRatio + ')');
            $('.wrap').css('transform', 'scale(' + standard / screenRatio + ',' + standard / screenRatio + ')');
        }

        $(".page.hide").find("*").addClass("hide");
        $("body").css("font-size", 100 * HAOest.browser.screen.width / 424 + "px");
    },

    fixForOldWebkit: function () {
        //fix for old webkit bug
        if ((HAOest.browser.webkitVersion <= 536.28 || HAOest.browser.isQQBrowser) && !SEG.fixedForOldWebkit["page-'" + SEG.currentPageNumber + "'"]) {
            $(".page-" + SEG.currentPageNumber).find("*").each(function () {
                var suffix = "%";
                if ($(this).css("margin-top").indexOf("px") > -1) {
                    suffix = "px";
                }
                var marginTop = parseFloat($(this).css("margin-top"));
                if (marginTop != 0) {
                    $(this).css("margin-top", marginTop * HAOest.browser.screen.ratio + suffix);
                }
            });

            SEG.fixedForOldWebkit["page-'" + SEG.currentPageNumber + "'"] = true;
        }
    },

    loadComplete: function () {
        SEG.pageMove(SEG.effects.fade, SEG.directions.up, 1);
    }
};

$(function () {
    document.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);

    $(".page-1 .button").singleTap(function () {
        SEG.pageMove(SEG.effects.fade, SEG.directions.up, 1);
        SEG.currentWoman = 1;
        $(".page-2 .text-1").show();
    });

    $(".page-2 .product-1").singleTap(function () {
        $(".page-2 .product").removeClass("selected");
        $(".page-2 .product.product-1").addClass("selected");
        SEG.selectedProduct = 1;
    });
    $(".page-2 .product-2").singleTap(function () {
        $(".page-2 .product").removeClass("selected");
        $(".page-2 .product.product-2").addClass("selected");
        SEG.selectedProduct = 2;
    });
    $(".page-2 .product-3").singleTap(function () {
        $(".page-2 .product").removeClass("selected");
        $(".page-2 .product.product-3").addClass("selected");
        SEG.selectedProduct = 3;
    });
    $(".page-2 .product-4").singleTap(function () {
        $(".page-2 .product").removeClass("selected");
        $(".page-2 .product.product-4").addClass("selected");
        SEG.selectedProduct = 4;
    });

    $(".page-2 .woman").swipe(function () {
        if (SEG.currentWoman == SEG.selectedProduct) {
            SEG.currentWomanOpacity -= 0.3;
            $(".page-2 .woman-" + SEG.currentWoman).css("opacity", SEG.currentWomanOpacity);
            console.log("currentWoman:" + SEG.currentWoman + ", selectedProduct:" + SEG.selectedProduct);
        }
        if (SEG.currentWomanOpacity < 0.3) {
            $(".page-2 .woman-" + SEG.currentWoman).addClass("nec-ani-rotateRemove");
            SEG.currentWoman++;
            SEG.currentWomanOpacity = 1;
            $(".page-2 .text-" + (SEG.currentWoman - 1)).hide();
            $(".page-2 .text-" + SEG.currentWoman).show();
        }
        if (SEG.currentWoman == 4) {
            SEG.pageMove(SEG.effects.fade, SEG.directions.up, 1);
        }
    });

    SEG.resizeScreen();
    SEG.fixForOldWebkit();
});
