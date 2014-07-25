/*
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-eng.html / wet-boew.github.io/wet-boew/Licence-fra.html
 */
/*
 * TinyMCE
 */
/*global jQuery: false, wet_boew_editor: false*/
(function ($) {
	"use strict";
	var _pe = window.pe || {
		fn: {}
	}; /* local reference */
	_pe.fn.editor = {
		type: 'plugin',
		depends: ['tinymce'],
		mobile: function (elm) {
			return elm;
		},
		_exec: function (elm) {
			if (_pe.mobile) {
				return;
			}
			
			var opts,
				overrides,
				menuBar,
				toolBar;	
				
			var buttonNames = [];
			var buttonTitles = [];
			var buttonTexts = []; 
			var buttonCallBackFunctions = [];

			//Defaults
			opts = {
				aaaaCustomButton:[], // [0] Button Name (Must be Unique), [1] Button Title, [2] Button Text, [3] Callback Function
				iHeight : 300,
				iWidth : 'auto',
				bEditorIsPrintOnly : false, //if this option is true, all other option become redundant
				bFileMenu : true,
				bEditMenu : true,
				bInsertMenu : true,
				bViewMenu : true,
				bFormatMenu : true,
				bTableMenu : true,
				bToolsMenu : true,
				bShowMenuBar : true, //if this is false all menu values above become redundant
				bShowToolBar : true,
				bShowStatusBar : true,			
				sLanguage : pe.language,
			};
			
			// Class-based overrides - use undefined where no override of defaults or settings.js should occur
			overrides = {};

			// Extend the defaults with settings passed through settings.js (wet_boew_editor), class-based overrides and the data-wet-boew attribute
			$.extend(opts, (typeof wet_boew_editor !== 'undefined' ? wet_boew_editor : {}), overrides, _pe.data.getData(elm, 'wet-boew'));
			
			//
			menuBar = opts.bFileMenu ? "file " : "";
			menuBar += opts.bEditMenu ? "edit " : "";
			menuBar += opts.bInsertMenu ? "insert " : "";
			menuBar += opts.bViewMenu ? "view " : "";
			menuBar += opts.bFormatMenu ? "format " : "";
			menuBar += opts.bTableMenu ? "table " : "";
			menuBar += opts.bToolsMenu ? "tools " : "";	
			
			//
			if(opts.aaaaCustomButton.length > 0)
			{
				toolBar = "";
				for(var i = 0; i < opts.aaaaCustomButton.length; i++)
				{			
					buttonNames[i] = opts.aaaaCustomButton[i][0];	
					buttonTitles[i] = opts.aaaaCustomButton[i][1];
					buttonTexts[i] = opts.aaaaCustomButton[i][2];
					buttonCallBackFunctions[i] = opts.aaaaCustomButton[i][3];
					toolBar += opts.aaaaCustomButton[i][0] + " ";	
				}		
			}
			
			//Initializing editor		
			if(!opts.bEditorIsPrintOnly)
			{
				tinymce.init({
					mode: "none",
					theme: "modern",
					entity_encoding : "raw",
					plugins: "pagebreak,textcolor,table,hr,link,preview,searchreplace,print,paste,visualchars,nonbreaking,template,wordcount,code,contextmenu", 
					menubar: opts.bShowMenuBar ? menuBar.trim() : false,	
					statusbar: opts.bShowStatusBar,
					toolbar: opts.bShowToolBar ? toolBar + '" | undo redo | forecolor backcolor | bold italic underline strikethrough | outdent alignleft aligncenter alignright alignjustify indent | bullist numlist hr |",' : false,
					contextmenu: 'undo redo | cut copy paste |',
					height: opts.iHeight,
					width: opts.iWidth,
					language : opts.sLanguage, 
					setup: function (ed) {								   
						for(var k = 0; k < buttonNames.length; k++)
						{
							ed.addButton(buttonNames[k], {
								title: buttonTitles[k],
								text: buttonTexts[k],
								onclick: eval(buttonCallBackFunctions[k])
							});	
						}						
					}			
				});				
			}
			else //A non editable for printing
			{
				tinymce.init({
					mode: "none",
					theme: "modern",
					entity_encoding : "raw",
					plugins: "print,wordcount,noneditable,autoresize",
					menubar: false,
					toolbar: "print",
					contextmenu: false,
					statusbar: false,		
					language : opts.sLanguage, 
					setup: function (ed) {
						ed.on('PreInit', function (event) {
							var ed = event.target, dom = ed.dom;
							dom.setAttrib(ed.getBody(), 'contenteditable', 'false');
						});
					}
				}); 
			}
			
			tinymce.execCommand("mceAddEditor", true, elm.attr('id'));						
		} // end of exec
	};
	window.pe = _pe;
	return _pe;
}(jQuery));
