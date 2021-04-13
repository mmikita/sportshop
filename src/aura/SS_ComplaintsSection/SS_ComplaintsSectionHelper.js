({
    sendError : function(component, errors) {
        console.log(errors);
        let message = $A.get('$Label.c.SS_unknowError'); 
        if (errors && Array.isArray(errors) && errors.length > 0) {
            message = errors[0].pageErrors[0].message;
        }
        component.find("errorsNotify").setErrorToast(message);
    },
    getComplaints : function(component, event, helper) {
        console.log('taki ID' + component.get("v.orderId"));
        var getComs = component.get("c.getOrderComplaints");
        getComs.setParams({"orderId": component.get("v.orderId")});
        getComs.setCallback(this,function(response) {
            var state= response.getState();
            if(state==='SUCCESS'){ 
                var temp=response.getReturnValue();
                component.set("v.complaints",temp);  
            }
            else {
                console.log('fail');
                let errors = response.getError();
                helper.sendError(component, errors);
            }
        });
        $A.enqueueAction(getComs); 
    }
})