'use strict';
$(init);

function init() {
	tampilPeta();

	var kec = peta.loadFromKML({
		url: 'http://www.gerbong-it.net/kml/sipb/kml_kec2.kml',
		preserveViewport: true,
		//suppressInfoWindows: true,
		zIndex: 1,
		peta: peta
	});
	kec.setMap(null);
	
	var sungai= peta.loadFromKML({
		url: 'http://www.gerbong-it.net/kml/sipb/kml_sungai.kml',
		preserveViewport: true,
		suppressInfoWindows: true,
		zIndex: 2,
		peta: peta
	});
	sungai.setMap(null);
	
	var layerTataRuang = peta.loadFromKML({
		url: 'http://www.gerbong-it.net/kml/sipb/kml_tataruang.kml',
		preserveViewport: true,
		// suppressInfoWindows: true,
		zIndex : 3	
	});
	layerTataRuang.setMap(null);
	
	var layerJalan = peta.loadFromKML({
		url: 'http://www.gerbong-it.net/kml/sipb/kml_jalan.kml',
		preserveViewport: true,
		// suppressInfoWindows: true,
		zIndex : 4	
	});
	layerJalan.setMap(null);
	
	$('#kml_kec2').click(function () {
		toggleLayer(kec);
	});
	$('#kml_sungai').click(function () {
		toggleLayer(sungai);
	});
	$('#kml_tataruang').click(function () {
		toggleLayer(layerTataRuang);
	});
	$('#kml_jalan').click(function () {
		toggleLayer(layerJalan);
	});
	
	var allMark ={};
	$('#rumah').click(function () {
		allMark.rumah?'':loadMarkers('rumah');
		toggleMarker('rumah');
	});
	$('#pendidikan').click(function () {
		allMark.pendidikan?'':loadMarkers('pendidikan');
		toggleMarker('pendidikan');
	});
	$('#kesehatan').click(function () {
		allMark.kesehatan?'':loadMarkers('kesehatan');
		toggleMarker('kesehatan');
	});
	function loadMarkers(q,ico){
		allMark[q]={};
		$.getJSON('peta.php?q='+q,function(data,status){
			for (var i = 0; i < data.length; i++) {
				allMark[q][i] =peta.addMarker({
					lat: data[i].latitude,
					lng: data[i].longtitude,
					title: data[i].nama
				});
			}
		});
	}
	
	function toggleMarker(marker){
		$('#'+marker).is(':checked')?
			$.each(allMark[marker],function(){this.setMap(peta.map);}):
			$.each(allMark[marker],function(){this.setMap(null);});
	}
	
	function toggleLayer(layer) {
		layer.setMap(layer.getMap() ? null : peta.map);
	}
}
var peta;
function tampilPeta() {
	peta = new GMaps({
		zoom: 13,
		el: '#kanvas',
		lat: -0.0283219427481989,
		lng: 109.34670406575606,
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			position: google.maps.ControlPosition.BOTTOM_CENTER
		},
		zoomControlOpt: {
			position: 'CENTER_RIGHT'
		}
	});
}


