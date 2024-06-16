(function() {
    var dgebd = function(dd) {
        return document.getElementById(dd)
    };
    if ($('input[name=seccodehash]').length) {
        var idhash = $('input[name=seccodehash]').val();
        var onloadid = 'grecol_' + idhash;
        var data = dgebd('recptc').innerText;
        var l9 = document.createElement('script');
        l9.src = 'https://www.recaptcha.net/recaptcha/api.js?onload=grec_ol';
        document.body.appendChild(l9);
        var string = '<input name="seccodehash" type="hidden" value="' + idhash + '" /><span id="checkseccodeverify_' + idhash + '" style="display:none"><img src="static/image/common/check_right.gif" width="16" height="16" class="vm"></span><input name="seccodeverify" id="seccodeverify_' + idhash + '" type="hidden" value="' + idhash + '" /><div class="g-recaptcha" data-sitekey="6Lc9ncYZAAAAAGixx4tGz6CYcD4wwqcg1FH3VzuG"></div><span id="' + onloadid + '"><img src="static/image/common/loading.gif" class="vm"></span>';
        $('input[name=seccodeverify]').parent().html(string);
        setTimeout(function() {
            dgebd(onloadid).innerHTML = data;
        },
        2000);
        window.grec_ol = function() {
            $('#' + onloadid).toggle();
        };
        $('input[type=submit],form input[type=button],form button').click(function() {
            setTimeout(function() {
                grecaptcha.reset()
            },
            2000)
        });
    }
})()
