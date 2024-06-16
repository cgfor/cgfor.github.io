
function showdistrict(container, elems, totallevel, changelevel, containertype, showdefault) {
	var getdid = function(elem) {
		var op = elem.options[elem.selectedIndex];
		return op['did'] || op.getAttribute('did') || '0';
	};
	showdefault = showdefault==0 ? showdefault : 1;
	var pid = changelevel >= 1 && elems[0] && document.getElementById(elems[0]) ? getdid(document.getElementById(elems[0])) : 0;
	var cid = changelevel >= 2 && elems[1] && document.getElementById(elems[1]) ? getdid(document.getElementById(elems[1])) : 0;
	var did = changelevel >= 3 && elems[2] && document.getElementById(elems[2]) ? getdid(document.getElementById(elems[2])) : 0;
	var coid = changelevel >= 4 && elems[3] && document.getElementById(elems[3]) ? getdid(document.getElementById(elems[3])) : 0;
	var url = "home.php?mod=misc&ac=ajax&op=district&container="+container+"&containertype="+containertype
		+"&province="+elems[0]+"&city="+elems[1]+"&district="+elems[2]+"&community="+elems[3]
		+"&pid="+pid + "&cid="+cid+"&did="+did+"&coid="+coid+'&level='+totallevel+'&handlekey='+container+'&inajax=1'+(!changelevel ? '&showdefault='+showdefault : '');
	$.get(url,function(s){
		document.getElementById(container).innerHTML = s.lastChild.firstChild.nodeValue;
	});
}
