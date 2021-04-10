({
    getCartItems : function(component, event, helper) {
        var userId = $A.get("$SObjectType.CurrentUser.Id");
        var getCartItems=component.get("c.getItemsInCart");
        getCartItems.setParams({"userId": userId});
        getCartItems.setCallback(this,function(response) {
            var state= response.getState();
            if(state==='SUCCESS'){                 
                var temp=response.getReturnValue();
                component.set("v.cart",temp);
                component.set("v.products",temp.OpportunityLineItems);   
            }
            else {
                let errors = response.getError();
                helper.sendError(component, errors);
            }
        });
        $A.enqueueAction(getCartItems);
    }, deleteLineItem: function(component, event, helper){
        var ctarget = event.currentTarget;
        var opLineId = ctarget.dataset.lineitem;
        var getCartItems=component.get("c.deleteOppLineItem");
        getCartItems.setParams({"lineId": opLineId});
        getCartItems.setCallback(this,function(response) {
            var state= response.getState();
            if(state==='SUCCESS'){   
                helper.getCartItems(component, event, helper);                
            }
            else {
                let errors = response.getError();
                helper.sendError(component, errors);
            }
        });
        $A.enqueueAction(getCartItems);    
    },
    sendError : function(component, errors) {
        console.log(errors);
        let message = $A.get('$Label.c.SS_unknowError'); 
        if (errors && Array.isArray(errors) && errors.length > 0) {
            message = errors[0].pageErrors[0].message;
        }
        component.find("errorsNotify").setErrorToast(message);
    },
    clearCartItems : function(component, event, helper) {
        var getCartItems=component.get("c.clearCart");
        getCartItems.setParams({"opId": component.get("v.cart").Id});
        getCartItems.setCallback(this,function(response) {
            var state= response.getState();
            if(state==='SUCCESS'){                 
                helper.getCartItems(component, event, helper);
            }
            else {
                let errors = response.getError();
                helper.sendError(component, errors);
            }
        });
        $A.enqueueAction(getCartItems); 
    }
})