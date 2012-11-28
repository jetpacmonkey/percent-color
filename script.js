$(function() {
	var perc = $("#colorPercent"),
		val = $("#colorVal"),
		colorIn = $("#color"),
		samples = {
			base: $("#baseColorSample"),
			rgba: $("#rgbaColorSample"),
			hex: $("#hexColorSample")
		};

	perc.on("change", function() {
		val.val(Math.round($(this).val()*100));
		genSamples();
	});

	val.on("change", function() {
		perc.val($(this).val()/100);
		genSamples();
	}).on("keyup", function() {
		$(this).change();
	});

	colorIn.on("change", function() {
		genSamples();
	}).on("keyup", function() {
		$(this).change();
	});

	function shiftByPerc(val, perc) {
		return val + (255 - val) * (1 - perc);
	}

	function genSamples() {
		var hexVal = colorIn.val(),
			percVal = perc.val(),
			r = parseInt(hexVal.substr(0, 2), 16),
			g = parseInt(hexVal.substr(2, 2), 16),
			b = parseInt(hexVal.substr(4, 2), 16),
			newR = shiftByPerc(r, percVal),
			newG = shiftByPerc(g, percVal),
			newB = shiftByPerc(b, percVal),
			vals = {
				base: "#" + hexVal,
				rgba: "rgba(" + r + "," + g + "," + b + "," + percVal + ")",
				hex: "#" + newR.toString(16).substr(0,2) + newG.toString(16).substr(0,2) + newB.toString(16).substr(0,2)
			};

		for (var key in samples) {
			samples[key].css("background-color", vals[key]);
			samples[key].next().text(vals[key]);
		}
	}
});