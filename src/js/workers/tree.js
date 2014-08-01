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
		depends: ['jstree'],
		_exec: function (elm) {
			var opts,
			overrides;

			//Defaults
			opts = {
				bCheckBoxes: false,
				bDisplayIcons: false,
				bOpenAllNodes: false,
				bDisableAllNodes: false,

				bCallBackFunction: "wetTreeCheckEvent"
			};

			// Class-based overrides - use undefined where no override of defaults or settings.js should occur
			overrides = {};

			// Extend the defaults with settings passed through settings.js (wet_boew_chosen), class-based overrides and the data-wet-boew attribute
			$.extend(opts, (typeof wet_boew_jstree !== 'undefined' ? wet_boew_jstree : {}), overrides, _pe.data.getData(elm, 'wet-boew'));

			if (opts.bCheckBoxes)
			{
				elm.jstree({ 
					"core": {
						"themes":{
							"icons": opts.bDisplayIcons,
							"stripes" : true
						}
					},
					"checkbox" : {
						"keep_selected_style" : false
					},
					"search" : {
						"case_insensitive" : false, 
					},
					"plugins": ["themes","ui","html_data", "checkbox", "sort", "search", "types"] 
				});
			}
			else
			{
				elm.jstree({ 
					"core": {
						"themes":{
							"icons":opts.bDisplayIcons
						}
					},
					"plugins": ["themes","ui","html_data"] 
				});
			}

			// Will expand all nodes~
			if(!opts.bOpenAllNodes)
			{
				elm.jstree("close_all");
			}

			elm.on("select_node.jstree", function (event, data) {
			
				var fn = window[opts.bCallBackFunction]; 
				
				if(typeof fn === 'function') {
					fn(event, data, true);
				}	
				else {
					alert('The callback function was not implemented correctly... You can implement this function by assigning a function name to bCallBackFunction property. For Example: \"bCallBackFunction\": \"ACallBackFunctionName\"');
				}										 
			});

			elm.on("deselect_node.jstree", function (event, data) {
			
				var fn = window[opts.bCallBackFunction]; 
				
				if(typeof fn === 'function') {
					fn(event, data, false);
				}
				else
				{
					alert('The callback function was not implemented correctly... You can implement this function by assigning a function name to bCallBackFunction property. For Example: \"bCallBackFunction\": \"ACallBackFunctionName\"');
				}	 
			});

			if(opts.bDisableAllNodes)
			{
				elm.on("ready.jstree", function(e, data) {
					$('.wet-boew-tree a').click(function () { return false; });
				});

				elm.on("open_node.jstree", function(e, data) {
					$('.wet-boew-tree a').click(function () { return false; });
				});
			}

		} // end of exec
	};
	window.pe = _pe;
	return _pe;
} (jQuery));
