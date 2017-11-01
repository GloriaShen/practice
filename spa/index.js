/* JsLint settings */
/*jslint browser:true, continue: true, devel:true, indent: 2, maxerr:50, newcap: true, nomen: true, plusplus: true, regexp: true, sloppy: true, vars: true, white: true  */
// Module /spa/
// provides chat slider capability
var spa = (function ($){
	//Module scope variables
		//set constants
		var configMap = {
			extended_height: 434,
			extended_title: 'Click to retract',
			retracted_height: 50,
			retracted_title: 'Click to extend',
			template_html: '<div class="spa-slider"><\/div>'
		},
		//Declare all other module scope variables
			$chatSlider, 
			toggleSlider, onClickSlider, initModule;
	// DOM method /toggleSlider/
		toggleSlider = function () {
		// alternates slider height
			var slider_height = $chatSlider.height();
			if ( slider_height === configMap.retracted_height ) {
				$chatSlider.animate({ height: configMap.extended_height })
					.text(configMap.extended_title);
				return true;
			}else if( slider_height === configMap.extended_height ) {
				$chatSlider.animate({ height: configMap.retracted_height })
					.text( configMap.retracted_title);
				return true;
			}
			return false;
		};
	// Event handler /onClickSlider/
		onClickSlider = function (event) {
		//receive click event and call toggleSlider
			toggleSlider();
			return false;
		};
	//Public method /initModule/
		initModule = function ($container){
		//sets init state and provides feature
			//render html
			$container.html( configMap.template_html );
			$chatSlider = $container.find('.spa-slider');
			//initialize slider height and title
			//bind the user click to the event handler
			$chatSlider.text( configMap.retracted_title )
				.click( onClickSlider );
			return true;
		};
		return { initModule: initModule };
}( jQuery ));
	// Start spa once DOM is ready
jQuery(function(){
	spa.initModule( jQuery('#spa') );
});