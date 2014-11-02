var HAOest = {
    browser: {
        userAgent: navigator.userAgent,
        webkitVersion: function () {
            var u = navigator.userAgent;
            var matchIndex = u.indexOf('AppleWebKit/');
            if (matchIndex > -1) {
                var num = u.substring(matchIndex + 12, matchIndex + 18).replace(' ', '');
                return parseFloat(num);
            }
            return '';
        }(),
        isQQBrowser: function () {
            if (navigator.userAgent.indexOf("MQQBrowser") > -1) {
                return true;
            }
            return false;
        }(),
        versions: function () {
            var u = navigator.userAgent;
            //ÒÆ¶¯ÖÕ¶Ëä¯ÀÀÆ÷°æ±¾ÐÅÏ¢
            return {
                trident: u.indexOf('Trident') > -1, //IEÄÚºË
                presto: u.indexOf('Presto') > -1, //operaÄÚºË
                webKit: u.indexOf('AppleWebKit') > -1, //Æ»¹û¡¢¹È¸èÄÚºË
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //»ðºüÄÚºË
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //ÊÇ·ñÎªÒÆ¶¯ÖÕ¶Ë
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //iosÖÕ¶Ë
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //androidÖÕ¶Ë»òÕßucä¯ÀÀÆ÷
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //ÊÇ·ñÎªiPhone»òÕßQQHDä¯ÀÀÆ÷
                iPad: u.indexOf('iPad') > -1, //ÊÇ·ñiPad
                weixin: u.indexOf('MicroMessenger') > -1
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase(),
        screen: function () {
            var width = document.documentElement.clientWidth || document.body.clientWidth;
            var height = document.documentElement.clientHeight || document.body.clientHeight;
            var ratio = width / height;
            return { width: width, height: height, ratio: ratio };
        }()
    }
};
