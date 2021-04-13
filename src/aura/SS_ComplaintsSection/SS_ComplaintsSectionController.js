({
    onSave : function(component, event, helper) {
        var title  = component.find("title").get("v.value");
        var description  = component.find("description").get("v.value");
        var insertComp = component.get("c.insertComplaint");
        insertComp.setParams({"title": title, "description": description, "orderId": component.get("v.orderId")});
        insertComp.setCallback(this,function(response) {
            var state= response.getState();
            if(state==='SUCCESS'){                 
               component.find("successNotify").setErrorToast($A.get('$Label.c.SS_ComplaintAdded'));
               helper.getComplaints(component, event, helper); 
            }
            else {
                let errors = response.getError();
                helper.sendError(component, errors);
            }
        });
        $A.enqueueAction(insertComp); 
    }
})