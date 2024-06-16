var newIndex=0;
var newInter;
var img_index=0;
var page=1;

var prefixModel = function (items) {
    var result = {}
    for (var i in items) {
      result[items[i]] ="mModel"+items[i]
    }
    return result;
}

var modelList=prefixModel(['url',"cover","title","price","dateline"]);

var modelHtml="<div class='case_onpo03'><a href='' id='"+modelList.url+"' target='_blank'><img src='' id='"+modelList.cover+"' class='sy_img'></a><div class='zc poiuyt_cion'><p class='dian poiuyt_q z fz14 zq' id='"+modelList.title+"'></p><span class='y las yj4' id='"+modelList.price+"'></span></div><p class='qc case_user_a zc pt10 fz12 dian hz' id='"+modelList.dateline+"'></p></div>";

var modelListHtml=function(params){
	jQuery("#modelList").append(modelHtml);
	jQuery("#"+modelList.url).attr("href",params.url);
	jQuery("#"+modelList.cover).attr("src",params.cover);
	jQuery("#"+modelList.title).html(params.title);
	jQuery("#"+modelList.dateline).html(params.dateline);
	jQuery("#"+modelList.url).attr("id","");
	jQuery("#"+modelList.cover).attr("id","");
	jQuery("#"+modelList.title).attr("id","");
	jQuery("#"+modelList.dateline).attr("id","");
}

var onIndexPage=function(_this){
	 var page=jQuery(_this).attr("data-page");
	 jQuery("#listIndexPage").children("li").each(function(index,val){
		  if(jQuery(this).hasClass("first_page_on")){
			  jQuery(this).removeClass("first_page_on");
		  }
	 });
	 jQuery(_this).addClass("first_page_on");
	 jQuery.ajax({type:"POST",url:"plugin.php?id=iscwo_pc_model:ajax",
		   data: {"page":page,"rec":"index"},
		   dataType:'json',
		   success:function(arry) { 
			   if(arry["error"]!=""){
			   }else{
				   jQuery("#modelList").html("");
				   if(arry["data"]["list"].length>0){
				     jQuery.each(arry["data"]["list"], function (index, file) {
				    	 modelListHtml(
				    		{
				    		   "url":"forum.php?mod=viewthread&tid="+file["tid"]+"",
				    		   "cover":file["src"],
				    		   "title":file["subject"],
				    		   "dateline":file["dateline"]
				    		}	
				 		);
					 })
				   }else{
					   jQuery("#modelList").html("没有数据了");
				   }
				   jQuery("#listIndexPage").children("li").bind("click",function(){
					   var y = jQuery('#modelList').parent().offset().top;
					   y = y - 142;
					   jQuery('html,body').animate({scrollTop:y},500);
				   });
			   }
		   }
	  });
}

var blankIndex=0;
var blankImg=0;
var showTming;
var heidTming;

var initBlank=function(){
	clearInterval(showTming);
	clearInterval(heidTming);
	jQuery("#listBlank").children("li").each(function (index,value){
		var img=jQuery(this).attr("data-img");
		var title=jQuery(this).attr("data-title");
		var url=jQuery(this).attr("data-url");
		var index=parseInt(jQuery(this).attr("data-index"));
		if(jQuery(this).hasClass("index_pitch_on")){
			jQuery(this).removeClass("index_pitch_on");
		}
		if(blankIndex==index){
			jQuery(this).addClass("index_pitch_on");
			var blankIH=jQuery("#listIndex li").eq(0).children("a");
			var imgSrc = new Image();
			imgSrc.src = img;
			imgSrc.onload = function(){
				blankIH.children("img").attr("src",img);
			};
			blankIH.attr("href",url);
			jQuery("#listIndexTitle").children("p").html(title);
		}
	});
	blankImg=jQuery("#listBlank").children("li").length;
	blankImg=blankImg+1;
	heidTming=setInterval("heidImg()",2700);
	showTming=setInterval("nextBlankImg()",3000);
}

var nextBlankImg=function(){
	blankIndex++;
	if(blankIndex>=blankImg){
		blankIndex=0;
	}
	jQuery("#listIndex li").eq(0).fadeTo(300,1);
	initBlank();
}

var heidImg=function(){
	jQuery("#listIndex li").eq(0).fadeTo(300,0.7);
}

var onModelDigDown=function(_this){
	if(jQuery("#modeldiog").length>0){
		
	}else{
		jQuery("body").append("<div id='modeldiog'></div>");
	}
	var model=jQuery(_this).attr("data-model");
	jQuery("#modeldiog").load("plugin.php?id=iscwo_pc_model:download&tid="+model);
}

var imgThumb=function (src){
	jQuery("#imgmain").attr("src","");
	var srcC=src.replace('cover','big');
	if(srcC){ src=srcC;  }
	var img = new Image();
	img.src = src;
	img.onload = function(){
		jQuery("#imgmain").attr("src",src);
		jQuery(".model_magnifier").attr("href",src);
	};
};

var nexImgThumb=function (){
	if(img_index<=0){ img_index=0;  }
	var img_index_b=img_index+1;
	var thumb=jQuery("#listImgthumb").children("li").length;
	if(img_index>=thumb){  
		img_index=thumb-1;  
	}else if(img_index<=0){
		img_index=0;
	}
	
	var imgW=137;
	var imgMargin=5;
	
	if(img_index_b==5){
		if(thumb>img_index){
			var mleft=0-(img_index_b-2)*(imgW+imgMargin);
			jQuery("#listImgthumb").css("margin-left",mleft);
			page++;
		}
	}else if(img_index_b>5){
		var starPage=(page-1)*3+1;
		var endPage=starPage+4;
		
		if(img_index_b==endPage){
			if(thumb>endPage){
				var mleft=0-(img_index_b-2)*(imgW+imgMargin);
				jQuery("#listImgthumb").css("margin-left",mleft);
				page++;
			}
		}else if(img_index_b==starPage){
			if(thumb>starPage){
				var mleft=0-(img_index_b-4)*(imgW+imgMargin);
				jQuery("#listImgthumb").css("margin-left",mleft);
				page--;
			}
		}
	}else{
		page=1;
		var mleft=0;
		jQuery("#listImgthumb").css("margin-left",mleft);
	}
	
	var imgsrc="";
	imgThumbClear();
	if(img_index<=0){
		var _this=jQuery("#listImgthumb").children("li").eq(0);
		_this.addClass("put_on");
		imgsrc=_this.attr("data-rel");
	}else{
		var _this=jQuery("#listImgthumb").children("li").eq(img_index);
		_this.addClass("put_on");
		imgsrc=_this.attr("data-rel");
	}
	imgThumb(imgsrc);
}

var imgThumbClear=function (){
	jQuery("#listImgthumb").children("li").each(function(){
		 if(jQuery(this).hasClass("put_on")){
			 jQuery(this).removeClass("put_on");
		 }
	});
}

jQuery(document).ready(function() {
	jQuery("#modelDownLoad").bind("click",function(){
		onModelDigDown(this);
	});
	jQuery("#listImgthumb").children("li").bind("click",function(){	
		var _this=jQuery(this);
		img_index=parseInt(_this.attr("data-index"));
		nexImgThumb();
	});
	jQuery("#imgmain").bind("click",function(){
		var imgSrc=jQuery(this).attr("src");
		window.open(imgSrc);    
	});
	jQuery("#imgpre").bind("click",function(){
		img_index=img_index-1;
		nexImgThumb();
	});	
	jQuery("#imgnext").bind("click",function(){
		img_index++;
		nexImgThumb();
	});
	jQuery(".left_jt").bind("click",function(){
		img_index=img_index-1;
		nexImgThumb();
	});
	jQuery(".right_jt").bind("click",function(){
		img_index++;
		nexImgThumb();
	});
	onIndexPage(this);
	jQuery("#listIndexPage li:first").addClass("first_page_on");
	jQuery("#listIndexPage").children("li").bind("click",function(){
		onIndexPage(this);
	});
	jQuery("#listBlank").children("li").mouseover(function (e) {
		var index=parseInt(jQuery(this).attr("data-index"));
		blankIndex=index;
		initBlank();
    });
	jQuery(".index_prev").bind("click",function(){
		blankIndex--;
		if(blankIndex<0){
			blankIndex=blankImg-1;
		}
		initBlank();
	});
	jQuery(".index_next").bind("click",function(){
		nextBlankImg();
	});
	jQuery('.subnav_content li').hover(function() {
		var i = jQuery(this).index();
		jQuery(this).addClass('current').siblings().removeClass('current');
		jQuery('.text_center').eq(i).show().siblings().hide();
	});
	jQuery('#controlModel .poiuyt_q_k').click(function() {
		var i = jQuery(this).index();
		jQuery(this).addClass('act_oui').siblings().removeClass('act_oui');
	});
	jQuery('#c1').click(function() {
		jQuery('#modeldeals').removeClass("hide");
	});
	jQuery('#c2').click(function() {
		jQuery('#modeldeals').addClass("hide");
	});
	jQuery("#returnTop").click(function(){
		jQuery('html,body').animate({scrollTop: '0px'},500);
	});	
	jQuery('.recur_top').css('display','none'); 
	jQuery(window).scroll(function() { 
		if(jQuery(window).scrollTop() >600){
			jQuery('.recur_top').show();   
		}else{
			jQuery('.recur_top').hide();
		}  
	});
});