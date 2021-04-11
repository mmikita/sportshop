({
    getCart : function(component, event, helper) {
        helper.getCartItems(component, event, helper);
    }, 
    handleDeleteItem : function(component, event, helper) {
        var msg = $A.get('$Label.c.SS_ConfirmDelete');
        if (!confirm(msg)) {
            console.log('No');
            return false;
        } else {
            helper.deleteLineItem(component, event, helper);
        }
    },
    handleClearCart : function(component, event, helper) {
        var msg =$A.get('$Label.c.SS_ConfirmDelete');
        if (!confirm(msg)) {
            console.log('No');
            return false;
        } else {
            helper.clearCartItems(component, event, helper);
        }
    },
    changeLineItemQuantity : function(component, event, helper) {
        var ctarget = event.currentTarget;
        var opLineId = ctarget.dataset.lineitem;
        var unitPrice = ctarget.dataset.unitprice;
        var opLineQuant = ctarget.dataset.linequant;
        var getCartItems=component.get("c.setQuantity");
        getCartItems.setParams({"lineId": opLineId,"quantity": opLineQuant,"unitPrice": unitPrice});
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
    },goToOrder : function(component, event, helper) {
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": "/order"
        });
        urlEvent.fire();
    }
})