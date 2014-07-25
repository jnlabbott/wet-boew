/*
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-eng.html / wet-boew.github.io/wet-boew/Licence-fra.html
 */
/*
 * jsTree
 */
/*global jQuery: false, wet_boew_tree: false*/
(function ($) {
	"use strict";
	var _pe = window.pe || {
		fn: {}
	}; /* local reference */
	_pe.fn.tree = {
		type: 'plugin',
		depends: ['jquery.jstree'],
		_exec: function (elm) {
			var opts, overrides;

			//Defaults
			opts = {
				bCheckBoxes: false,
				bDisplayIcons: false,
				bOpenAllNodes: false
			};

			// Class-based overrides - use undefined where no override of defaults or settings.js should occur
			overrides = {};

			// Extend the defaults with settings passed through settings.js (wet_boew_chosen), class-based overrides and the data-wet-boew attribute
			$.extend(opts, (typeof wet_boew_jstree !== 'undefined' ? wet_boew_jstree : {}), overrides, _pe.data.getData(elm, 'wet-boew'));

			if (opts.bCheckBoxes)
			{
				elm.jstree({ 
					"themes" : {
						"theme" : "default",	   
						"dots" : true,
						"icons": opts.bDisplayIcons
					},
					"checkbox" : {
						"keep_selected_style" : false
					},
					"plugins": ["themes","ui","html_data", "checkbox"] 
				})
			   ;
			}
			else
			{
				elm.jstree({ 
					"themes" : {
									"theme" : "default",	   
									"dots" : true,
									"icons": opts.bDisplayIcons
									},
					"plugins": ["themes","ui","html_data"] 
				});
			}

			elm.bind("check_node.jstree", function (event, data) {													  

				var node = data.rslt.obj;

				node.find(".loaderImg").show("slow");

				window.wetTreeCheckEvent(event, data, true);												 

			 });

			 elm.bind("uncheck_node.jstree", function (event, data) {													 

				var node = data.rslt.obj;

				node.find(".loaderImg").show("slow");

				window.wetTreeCheckEvent(event, data, false)
				
			 });
				
			elm.bind("loaded.jstree", function (event, data) {
//													  //Onload this will loop through each li item with the that data attr and add the jstree-checked class
				$('.wet-boew-tree').find('[data-wet-tree-checked="true"]').each(function () {
						$(this).removeClass('jstree-unchecked').addClass('jstree-checked');
				});
				//Will expand all nodes~
				if(opts.bOpenAllNodes)
				{
					$(this).jstree("open_all");
				}

			});
														
		} // end of exec
	};
	window.pe = _pe;
	return _pe;
} (jQuery));
