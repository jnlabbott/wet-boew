/*
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-eng.html / wet-boew.github.io/wet-boew/Licence-fra.html
 */
/*
 * Chosen
 */
/*global jQuery: false, wet_boew_chosen: false*/
(function ($) {
	"use strict";
	var _pe = window.pe || {
		fn: {}
	}; /* local reference */
	_pe.fn.chosen = {
		type: 'plugin',
		depends: ['chosen'],
		mobile: function (elm) {
			return elm;
		},
		_exec: function (elm) {
			if (_pe.mobile) {
				return;
			}
			
			var opts,
				overrides;

			//Defaults
			opts = {
				bAllowSingleDeselect: true,
				bDisableSearch: false,
				iDisableSearchThreshold: 0,
				bEnableSplitWordSearch: true,
				bInheritSelectClasses: false,
				iMaxSelectedOptions: Infinity,
				sNoResultsText: "No results match",
				sPlaceholderTextMultiple: "Select Some Options",
				sPlaceholderTextSingle: "Select an Option",
				bSearchContains: false,
				bSingleBackstrokeDelete: true,
				bDisplayDisabledOptions: true,
				bDisplaySelectedOptions: true
			};

			// Class-based overrides - use undefined where no override of defaults or settings.js should occur
			overrides = {};

			// Extend the defaults with settings passed through settings.js (wet_boew_chosen), class-based overrides and the data-wet-boew attribute
			$.extend(opts, (typeof wet_boew_chosen !== 'undefined' ? wet_boew_chosen : {}), overrides, _pe.data.getData(elm, 'wet-boew'));

			elm.chosen({
				allow_single_deselect: opts.bAllowSingleDeselect,
				disable_search: opts.bDisableSearch,
				disable_search_threshold: opts.iDisableSearchThreshold,
				enable_split_word_search: opts.bEnableSplitWordSearch,
				inherit_select_classes: opts.bInheritSelectClasses,
				max_selected_options: opts.iMaxSelectedOptions,
				no_results_text: opts.sNoResultsText,
				placeholder_text_multiple: opts.sPlaceholderTextMultiple,
				placeholder_text_single: opts.sPlaceholderTextSingle,
				search_contains: opts.bSearchContains,
				single_backstroke_delete: opts.bSingleBackstrokeDelete,
				display_disabled_options: opts.bDisplayDisabledOptions,
				display_selected_options: opts.bDisplaySelectedOptions
			});
			//{ 'no_results_text': opts.sNoResultsText });
		} // end of exec
	};
	window.pe = _pe;
	return _pe;
} (jQuery));
