/*
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-eng.html / wet-boew.github.io/wet-boew/Licence-fra.html
 */
/*
 * DataTables
 */
/*global jQuery: false, wet_boew_tables: false*/
(function ($) {
	"use strict";
	var _pe = window.pe || {
		fn: {}
	}; /* local reference */
	_pe.fn.tables = {
		type: 'plugin',
		depends: ['datatables'],
		_exec: function (elm) {
			var i18nSortAscend = function( x, y ) {
					return _pe.string.normalizeDiacritics( x ).localeCompare( _pe.string.normalizeDiacritics( y ) );
				},
				i18nSortDescend = function( x, y ) {
					return _pe.string.normalizeDiacritics( y ).localeCompare( _pe.string.normalizeDiacritics( x ) );
				},
				opts,
				overrides;

			var largeTable = (elm.find('tr').length - 1) > 10;

			//Defaults
			opts = {
				aaSorting:[[1, 'asc']],
				aColumns : [],
				aLengthMenu : largeTable ? [10, 25, 50, 100] : [],
				aMobileColumns : false,
				bInfo: true,
				bPaginate: true && largeTable,
				bProcessing: false,
				bServerSide: false,
				bSearch: true && largeTable,
				bSort : true,
				bStateSave: false,
				bVisible : true,
				bZebra : false,
				iDisplayLength: 10,
				sAjaxSource: '',
				sPaginationType: 'two_button'
			};

			// Class-based overrides - use undefined where no override of defaults or settings.js should occur
			overrides = {};

			// Extend the defaults with settings passed through settings.js (wet_boew_tables), class-based overrides and the data-wet-boew attribute
			$.extend(opts, (typeof wet_boew_tables !== 'undefined' ? wet_boew_tables : {}), overrides, _pe.data.getData(elm, 'wet-boew'));

			// Enable internationalization support in the sorting
			$.fn.dataTableExt.oSort['html-asc'] = i18nSortAscend;
			$.fn.dataTableExt.oSort['html-desc'] = i18nSortDescend;
			$.fn.dataTableExt.oSort['string-case-asc'] = i18nSortAscend;
			$.fn.dataTableExt.oSort['string-case-desc'] = i18nSortDescend;

			/*
			 * Extend sorting support
			 */
			$.extend($.fn.dataTableExt.oSort, {
				// Formatted number sorting
				// Source: datatables.net/plug-ins/sorting#formatted_numbers
				'formatted-num-pre': function(a) {
					a = (a === '-' || a === '') ? 0 : a.replace(/[^\d\-\.]/g, '');
					return parseFloat(a);
				},
				'formatted-num-asc': function(a, b) {
					return a - b;
				},
				'formatted-num-desc': function(a, b) {
					return b - a;
				}
			} );

			/*
			 * Extend type detection
			 */
			// Formatted numbers detection
			// Source: http://datatables.net/plug-ins/type-detection#formatted_numbers
			$.fn.dataTableExt.aTypes.unshift(
				function(sData) {
					// Strip off HTML tags and all non-alpha-numeric characters (except minus sign)
					var deformatted = sData.replace(/<[^>]*>/g, '').replace(/[^\d\-\/a-zA-Z]/g, '');
					if ($.isNumeric(deformatted) || deformatted === '-') {
						return 'formatted-num';
					}
					return null;
				}
			);

			elm.dataTable({
				'aaSorting': opts.aaSorting,
				'aoColumnDefs' : [{
					'bVisible' : (opts.bVisible === true),
					'aTargets' : ((_pe.mobile) ? ((opts.aMobileColumns === false) ? opts.aColumns : opts.aMobileColumns) : opts.aColumns)
				}],
				'asStripeClasses' : ((opts.bZebra === true) ? ['odd', 'even'] : []),
				'bFilter' : (opts.bSearch === true),
				'bInfo' : ((opts.bInfo === true) ? ((opts.bSearch === true || opts.bPaginate === true) ? true : false) : false),
				'bPaginate' : (opts.bPaginate === true),
				'iDisplayLength' : opts.iDisplayLength,
				'aLengthMenu' : opts.aLengthMenu,
				'bSort' : (opts.bSort === true),
				'bStateSave' : (opts.bStateSave === true),
				'sPaginationType' : ((opts.sPaginationType === 'two_button') ? opts.sPaginationType : 'full_numbers'),
				'oLanguage' : {
					'oAria' : {
						'sSortAscending' : _pe.dic.get('%sSortAscending'),
						'sSortDescending' : _pe.dic.get('%sSortDecending')
					},
					'oPaginate' : {
						'sFirst' : _pe.dic.get('%first'),
						'sLast' : _pe.dic.get('%last'),
						'sNext' : _pe.dic.get('%next'),
						'sPrevious' : _pe.dic.get('%previous')
					},
					'sEmptyTable': _pe.dic.get('%sEmptyTable'),
					'sInfo': _pe.dic.get('%sInfo'),
					'sInfoEmpty': _pe.dic.get('%sInfoEmpty'),
					'sInfoFiltered': _pe.dic.get('%sInfoFiltered'),
					'sInfoThousands': _pe.dic.get('%sInfoThousands'),
					'sLengthMenu': _pe.dic.get('%sLengthMenu'),
					'sLoadingRecords': _pe.dic.get('%loading'),
					'sProcessing': _pe.dic.get('%processing'),
					'sSearch': _pe.dic.get('%jqm-filter') + _pe.dic.get('%colon'),
					'sZeroRecords': _pe.dic.get('%no-match-found')
				},
				'fnDrawCallback': function() {
					// Re-equalize element heights if the equalize plugin is active on #wb-main
					if(_pe.main.hasClass('wet-boew-equalize')) {
						_pe.fn.equalize._exec(_pe.main);
					}
				}
			});

			// Disable role="dialog" on table wrapper since it is
			// causing issues with screen readers and is also
			// implemented incorrectly
			// TODO: Remove role="grid" upstream
			elm.parent().removeAttr('role');

		} // end of exec
	};
	window.pe = _pe;
	return _pe;
}(jQuery));
