(function(aLoad){var state=true;$(document).ready(function(){var b=$(".morelink");c=function(){};if(b.data("num")){var e=b.data("num").split("-"),i=parseInt(e[0])+1,g=parseInt(e[1])+1;b.on("click",function(p){if(!state){return false}state=false;p.preventDefault();$.ajax({url:$(this).attr("href"),data:{page:g},beforeSend:function(){b.html('<span class="listload">'+language.loading+'</span>')},success:function(l){if(l){if(b.data("order")){g--}else{g++}$(".pagelist").append($("#alist",l).html());popup.init()}if(g==i||(b.data("order")&&g==0)){b.remove();$("#ajaxpost").after('<div class="allsreply">'+language.view_content+'</div>')}else{b.html('<span>'+language.view_more+'</span>')}if(post_new){post_new.parentNode.removeChild(post_new);var newMask=document.createElement('div');newMask.id='post_new';ajaxpost.appendChild(newMask)}state=true}});return false})}})})(jQuery);$(window).scroll(function(){if($('.moremedia').attr('disable')=='true'){if($(window).scrollTop()>=$('.mm-page').height()-$(window).height()-20){$('.morelink').trigger("click")}}});