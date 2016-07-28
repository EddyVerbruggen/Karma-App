var dialogs = require("ui/dialogs");

exports.edit = function(){
    dialogs.prompt({
		title: "Edit Text",
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

exports.browse = function(){

    // dialogs.action({
    //   message: "Your message",
    //   cancelButtonText: "Cancel text",
    //   actions: ["Option1", "Option2"]
    // }).then(function (result) {
    //   console.log("Dialog result: " + result)
    // });
    
    dialogs.prompt({
    title: "Edit Background",
      	okButtonText: "Upload...",
      	cancelButtonText: "Cancel",
      	neutralButtonText: "Delete"
    }).then(function (r) {
      	// console.log("Dialog result: " + r.result + ", text: " + r.text);
        dialogs.alert("Dialog result: " + r.result + ", text: " + r.text).then(function() {

        });
    });
}