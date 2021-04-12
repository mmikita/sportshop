({
    getOrders : function(component, event, helper) {
        var userId = $A.get("$SObjectType.CurrentUser.Id");
        var getCartItems=component.get("c.getMyOrders");
        getCartItems.setParams({"userId": userId});
        getCartItems.setCallback(this,function(response) {
            var state= response.getState();
            if(state==='SUCCESS'){                 
                var temp=response.getReturnValue();
                component.set("v.orders",temp);  
            }
            else {
                let errors = response.getError();
                helper.sendError(component, errors);
            }
        });
        $A.enqueueAction(getCartItems);
    }
})