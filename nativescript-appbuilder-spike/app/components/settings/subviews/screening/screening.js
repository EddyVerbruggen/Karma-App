var dialogs = require("ui/dialogs");

exports.onTap = function(){
 	dialogs.action({
		message: "Edit",
      	actions: ["No, never ask for references", "Atleast 1 references", "Atleast 2 references", "3 references"]
    }).then(function (result) {
      	if(result) alert(result);
    });   
}