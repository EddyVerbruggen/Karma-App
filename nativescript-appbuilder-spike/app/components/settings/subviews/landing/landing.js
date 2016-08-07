var dialogs = require("ui/dialogs");
var saveSetting = require('')

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

exports.delete = function(){
	dialogs.confirm("Are you sure ?").then(function (result) {
      	alert(result);
    });
}

exports.upload = function(){

}