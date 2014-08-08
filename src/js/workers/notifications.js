/*
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-eng.html / wet-boew.github.io/wet-boew/Licence-fra.html
 */
/*
 * Notifications using Toastr
 */
/*global jQuery: false, wet_boew_chosen: false*/
(function ($) {
	"use strict";
	var _pe = window.pe || {
		fn: {}
	}; /* local reference */
	_pe.fn.notifications = {
		type: 'plugin',
		depends: ['toastr'],
		mobile: function (elm) {
			return elm;
		},
		_exec: function (elm) {
			if (_pe.mobile) {
				return;
			}			
		} // end of exec
	};
	var _custom;
	
	_custom = {
		/*
		* Triggers the notification plug-in
		* @memberof pe
		* @function
		* @param {string} sType: the type of notification you wish to display. 
		*		 {string} sTitle: the title of the notification, displays above the message in bold.
		*		 {string} sMessage: the message to display, may include HTML mark-up. 
		* @return {void}
		* @todo the options code should move to a worker and use data attribute to set options.
		*		though we still have the issue of dependency specific reference.
		*/
		notify: function (sType, sTitle, sMessage)
		{	
			//Title null check
			sTitle = sTitle || "";		
			
			//Toaster Options
			toastr.options = {
				"closeButton": true,
				"debug": false,
				"positionClass": "toast-top-right",
				"onclick": null,
				"showDuration": "10",
				"hideDuration": "1000",
				"timeOut": "0",
				"extendedTimeOut": "1000",
				"showEasing": "swing",
				"hideEasing": "linear",
				"showMethod": "fadeIn",
				"hideMethod": "fadeOut"
			};
			
			//Different notification types
			switch(sType) {
			case "success":
			case "Success":
				toastr.success(sMessage, sTitle );
				break;
			case "info":
			case "Info":
				toastr.info(sMessage, sTitle);
				break;
			case "alert":
			case "Alert":
				toastr.warning(sMessage, sTitle);
				break;
			case "error":
			case "Error":
				toastr.error(sMessage, sTitle);
				break;
			default:
				toastr.warning("The creator of this notification failed to specify a type.", "Notification Warning");
			} 
			
		}
	}
	_pe = $.extend(true, _pe, _custom);
	window.pe = _pe;
	return _pe;
} (jQuery));
