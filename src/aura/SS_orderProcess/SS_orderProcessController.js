({
    getCartItems : function(component, event, helper) {
        var userId = $A.get("$SObjectType.CurrentUser.Id");
        var getCartItems=component.get("c.initOrder");
        getCartItems.setParams({"userId": userId});
        getCartItems.setCallback(this,function(response) {
            var state= response.getState();
            if(state==='SUCCESS'){    
                var temp=response.getReturnValue();
                component.set("v.cartOpp",temp['opp']);   
                component.set("v.products",temp['opp'].OpportunityLineItems);   
                component.set("v.user",temp['user']);   
                if(temp['paymentsMethods'].length > 0){
                    component.set("v.paymentsMethods",temp['paymentsMethods']); 
                    component.find("payMethod").set("v.value", temp['paymentsMethods'][0]); 
                } 
                let shipsMethods = [];
                for ( var key in temp['shipmentsMethods'] ) {
                    shipsMethods.push({value:temp['shipmentsMethods'][key], key:key});
                }
                component.set("v.shipmentsMethods",shipsMethods); 
                if(shipsMethods.length > 0){
                    component.set("v.finalAmmount", parseFloat(shipsMethods[0].value) + component.get('v.cartOpp').Amount);
                    component.find("shipMethod").set("v.value", shipsMethods[0].key);
                }
            }
            else {
                let errors = response.getError();
                helper.sendError(component, errors);
            }
        });
        $A.enqueueAction(getCartItems);
    },
    handleMakeOrder : function(component, event, helper) {
        helper.validOrderFields(component, event, helper);
        if(!component.get("v.formIsNotValid")){
            var msg =$A.get('$Label.c.SS_confirm_make_order');
            if (!confirm(msg)) {
                return false;
            } else {
                helper.makeOrder(component, event, helper);
            }
        }   
    },
    onChangeDelivery:  function(component, event, helper){        
        let shipmMethod = component.find("shipMethod").get("v.value")
        let map = component.get("v.shipmentsMethods");       
        var shipCost = map.find(x => x.key == shipmMethod).value;
        component.set("v.finalAmmount", parseFloat(shipCost) + component.get('v.cartOpp').Amount);   
    }
})