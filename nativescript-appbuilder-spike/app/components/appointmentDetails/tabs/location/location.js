'use strict';

var page;
var parentView;

exports.onLoaded = function(args) {
    page = args.object;
    parentView = page.getViewById("locationModal");
}

exports.toggleRadio = function(args){
    var section = args.object.section;
    var incall = parentView.getViewById("incall");
    var outcall = parentView.getViewById("outcall");

    if(section == "incall"){
        if(incall.src == "~/images/ic_radio_button_checked_white.png"){
            incall.src = "~/images/ic_radio_button_unchecked_white.png";
	        outcall.src = "~/images/ic_radio_button_checked_white.png";   
        }
        
        if(incall.src == "~/images/ic_radio_button_unchecked_white.png"){
            outcall.src = "~/images/ic_radio_button_unchecked_white.png";
	        incall.src = "~/images/ic_radio_button_checked_white.png";   
        }
    }
    
    if(section == "outcall"){
        if(outcall.src == "~/images/ic_radio_button_checked_white.png"){
            incall.src = "~/images/ic_radio_button_unchecked_white.png";
	        outcall.src = "~/images/ic_radio_button_checked_white.png";   
        }
        
        if(outcall.src == "~/images/ic_radio_button_unchecked_white.png"){
            incall.src = "~/images/ic_radio_button_unchecked_white.png";
	        outcall.src = "~/images/ic_radio_button_checked_white.png";   
        }
    }
}

exports.closeModal = function(args){
    page.closeModal();
}