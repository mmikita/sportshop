({
    makeOrder:  function(component, event, helper) {
        var cart =component.get("v.cartOpp");
        var user =component.get("v.user");
        var orderTake = component.get("c.takeOrder");
        orderTake.setParams({"opportunity": cart,"user": user,"shipMethod": component.find("shipMethod").get("v.value"),"payMethod": component.find("payMethod").get("v.value")});
        orderTake.setCallback(this,function(response) {
            var state= response.getState();
            if(state==='SUCCESS'){    
                var urlEvent = $A.get("e.force:navigateToURL");
                urlEvent.setParams({
                    "url": "/thankyoupage"
                });
                urlEvent.fire();
            }
            else {
                let errors = response.getError();
                helper.sendError(component, errors);
            }
        });
        $A.enqueueAction(orderTake);
    }, 
    validOrderFields:  function(component, event, helper){
        var user =component.set("v.formIsNotValid", false);
        var checkField = component.find("itemform").reduce(function (validSoFar, inputCmp) {
            if(!inputCmp.get('v.validity').valid){
                var user =component.set("v.formIsNotValid", true);
            }
        }, true);
    },
    sendError : function(component, errors) {
        console.log(errors);
        let message = $A.get('$Label.c.SS_unknowError'); 
        if (errors && Array.isArray(errors) && errors.length > 0) {
            message = errors[0].pageErrors[0].message;
        }
        component.find("errorsNotify").setErrorToast(message);
    }
})