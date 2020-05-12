var isClassic = true;

function toggleAero() {
		document.body.style.setProperty("--header-color", "rgba(255, 255, 255, /15)");
		document.body.style.setProperty("--page-background", "url('/img/aero-bg.jpg')");
		document.body.style.setProperty("--button-shelf", "rgba(255, 255, 255, .15");
		document.body.style.setProperty("--status-container-elements", "rgba(102, 113, 122, .45)");
		document.getElementById("footer-content").innerHTML = "AnonymousHacker1279, 2020  -  Home Management Software Hub  -  <a class='theme_toggle_text' href='javascript:toggle_theme();'>Change Page Theme</a>  -  Current Theme: Aero  -  Kiosk Mode <label class='switch'><input id='kiosk-switch' type='checkbox'><span class='slider round'></span></label>";
		isClassic = false;
};

function toggleClassic() {
		document.body.style.setProperty("--header-color", "linear-gradient(270deg, rgba(0,0,25,1) 0%, rgba(9,9,121,1) 35%, rgba(119,181,240,1) 100%)")
		document.body.style.setProperty("--page-background", "url('/img/classic-bg.jpg");
		document.body.style.setProperty("--button-shelf", "rgb(52, 76, 167, 0.9)");
		document.body.style.setProperty("--status-container-elements", "rgb(102, 113, 122, 0.5)");
		document.getElementById("footer-content").innerHTML = "AnonymousHacker1279, 2020  -  Home Management Software Hub  -  <a class='theme_toggle_text' href='javascript:toggle_theme();'>Change Page Theme</a>  -  Current Theme: Classic  -  Kiosk Mode <label class='switch'><input id='kiosk-switch' type='checkbox'><span class='slider round'></span></label>";
		isClassic = true;
};

function toggle_theme() {
	if (isClassic) {
		toggleAero();
	}
	else {
		toggleClassic();
	}
}

window.onload = function() {
	this.toggle_theme();
}