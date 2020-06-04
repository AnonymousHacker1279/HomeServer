// @ts-check

// Define gauges and such
// Standalone
var Gauge = window.Gauge;


// Create a new Gauge
var cpu_temp_gauge = Gauge(document.getElementById("cpu_temp_display"), {
		max: 200,
		// custom label renderer
		label: function(value) {
			// @ts-ignore
			return Number(Math.round(value +'e'+1)+'e-'+1) + "/" + this.max;
		},
		value: 1,
		// Custom dial colors (Optional)
		color: function(value) {
			if(value < 135) {
				return "#5ee432"; // green
			}else if(value < 145) {
				return "#fffa50"; // yellow
			}else if(value < 170) {
				return "#f7aa38"; // orange
			}else if(value < 200){
				return "#ef4655"; // red
			}
		}
});

var cpu_freq_gauge = Gauge(document.getElementById("cpu_freq_display"), {
		max: 100,
		// custom label renderer
		label: function(value) {
			return Number(Math.round(value+'e'+2)+'e-'+2) + "%";
		},
		value: 1,
		// Custom dial colors (Optional)
		color: function(value) {
			if(value < 40) {
				return "#5ee432"; // green
			}else if(value < 60) {
				return "#fffa50"; // yellow
			}else if(value < 85) {
				return "#f7aa38"; // orange
			}else if(value < 100){
				return "#ef4655"; // red
			}
		}
});

var system_memory_gauge = Gauge(document.getElementById("system_memory_display"), {
	max: 100,
	// custom label renderer
	label: function(value) {
		return Number(Math.round(value+'e'+2)+'e-'+2) + "%";
	},
	value: 1,
	// Custom dial colors (Optional)
	color: function(value) {
		if(value < 40) {
			return "#5ee432"; // green
		}else if(value < 50) {
			return "#fffa50"; // yellow
		}else if(value < 75) {
			return "#f7aa38"; // orange
		}else if(value < 100){
			return "#ef4655"; // red
		}
	}
});

var msg = {};
function getSystemMetrics() {
$.ajax({
		type: "POST",
		url: "/cgi-bin/sysinfo.py",
		cache: false,
		dataType: "html",
		processData: false,
		success: function(msg)
		{        
				// Parse the JSON data into a JS Object
				console.log(msg);
				var metrics = JSON.parse(msg);
				//var metrics = JSON.parse('{"metrics": [{"cpu_temp": "132.44", "cpu_freq": "30.8", "system_memory": "66.6", "network_rx": "3.009765625", "network_tx": "0.064453125"}]}');
				console.log(metrics);

				//Print values to HTML page
				cpu_temp_gauge.setValueAnimated(metrics.metrics[0].cpu_temp, 1);
				cpu_freq_gauge.setValueAnimated(metrics.metrics[0].cpu_freq, 1);
				system_memory_gauge.setValueAnimated(metrics.metrics[0].system_memory, 1);
				document.getElementById("network_tx").innerHTML = Number(Math.round(metrics.metrics[0].network_tx +'e'+2)+'e-'+2) + " KB/s";
				document.getElementById("network_rx").innerHTML = Number(Math.round(metrics.metrics[0].network_rx +'e'+2)+'e-'+2) + " KB/s";

				// Generate notifications when metrics reach warning levels
				if(metrics.metrics[0].cpu_temp >= 155.0) {
						new SnackBar({
							message: "Warning! High CPU temperature detected.",
							dismissable: true,
							timeout: 8000,
							status: "warning"

				});}
				if(metrics.metrics[0].cpu_freq >= 70.0) {
						new SnackBar({
							message: "Warning! High CPU utilization detected.",
							dismissable: true,
							timeout: 8000,
							status: "warning"

				});}
				if(metrics.metrics[0].system_memory >= 70.0) {
						new SnackBar({
							message: "Warning! High system memory usage detected.",
							dismissable: true,
							timeout: 8000,
							status: "warning"

				});}
		},
});
}

getSystemMetrics();
window.setInterval(function() {getSystemMetrics();}, 5000);