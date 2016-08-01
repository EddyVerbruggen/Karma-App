var dialogs = require("ui/dialogs");

exports.edit = function(){
	dialogs.prompt({
		title: "Edit Service",
      	okButtonText: "Save",
      	cancelButtonText: "Cancel",
      	neutralButtonText: "Delete",
      	defaultText: "",
      	inputType: dialogs.inputType.text
    }).then(function (r) {
      	// console.log("Dialog result: " + r.result + ", text: " + r.text);
        dialogs.alert("Dialog result: " + r.result + ", text: " + r.text).then(function() {

        });
    });
}

exports.fabTap = function(args) {
    dialogs.prompt({
		title: "New Service",
      	okButtonText: "Save",
      	cancelButtonText: "Cancel",
      	defaultText: "",
      	inputType: dialogs.inputType.text
    }).then(function (r) {
      	// console.log("Dialog result: " + r.result + ", text: " + r.text);
        dialogs.alert("Dialog result: " + r.result + ", text: " + r.text).then(function() {

        });
    });
} 