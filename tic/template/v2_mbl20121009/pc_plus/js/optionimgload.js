// JavaScript Document

var JSLOADED = [];

function insert_id(id) {
	return !id ? null : document.getElementById(id);
}
function uploadWindow(fid, recall, type) {		
	var type = isUndefined(type) ? 'image' : type;
	UPLOADWINRECALL = recall;	
	$('#floatpost').load('./forum.php?mod=misc&action=upload&fid=' + fid + '&type=' + type + '');	
}

function hideWindow(k) {
 	$("#"+k).remove();
	popup.close();
}

function updatetradeattach(aid, url, attachurl) {
	insert_id('tradeaid').value = aid;
	insert_id('tradeattach_image').innerHTML = '<div class="post_imgbox"><a href="javascript:;"><img src="' + attachurl + '/' + url + '" /></a></div>';
	ATTACHORIMAGE = 1;
}

function updateactivityattach(aid, url, attachurl) {
	insert_id('activityaid').value = aid;
	insert_id('activityattach_image').innerHTML = '<div class="post_imgbox"><a href="javascript:;"><img src="' + attachurl + '/' + url + '" /></a></div>';
	ATTACHORIMAGE = 1;
}

function updatesortattach(aid, url, attachurl, identifier) {	
	insert_id('sortaid_' + identifier).value = aid;
	insert_id('sortattachurl_' + identifier).value = attachurl + '/' + url;
	insert_id('sortattach_image_' + identifier).innerHTML = '<div class="post_imgbox"><a href="javascript:;"><img src="' + attachurl + '/' + url + '" /></a></div>';
	ATTACHORIMAGE = 1;
}

function uploadWindowstart() {
	alert();
	insert_id('uploadwindowing').style.visibility = 'visible';
}

function uploadWindowload() {
	insert_id('uploadwindowing').style.visibility = 'hidden';
	var str = insert_id('uploadattachframe').contentWindow.document.body.innerHTML;	
	if(str == '') return;
	var arr = str.split('|');
	if(arr[0] == 'DISCUZUPLOAD' && arr[2] == 0) {		
		UPLOADWINRECALL(arr[3], arr[5], arr[6]);		
		hideWindow('upload_img');			
	} else {
		var sizelimit = '';
		if(arr[7] == 'ban') {
			sizelimit = '(' + cannot_files + ')';
		} else if(arr[7] == 'perday') {
			sizelimit = cannot_kb + Math.ceil(arr[8]/1024) + 'K)';
		} else if(arr[7] > 0) {
			sizelimit = cannot_kb + Math.ceil(arr[7]/1024) + 'K)';
		}		
		popup.open(STATUSMSG[arr[2]] + sizelimit, 'alert');		
	}	
	if(insert_id('attachlimitnotice')) {
		ajaxget('forum.php?mod=ajax&action=updateattachlimit&fid=' + fid, 'attachlimitnotice');			
	}
	
}