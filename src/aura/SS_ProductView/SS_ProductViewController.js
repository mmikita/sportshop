({
    doInit : function(component, event, helper) {
        var getProduct=component.get("c.getProduct");
        var productId = component.get("v.recordId");
        getProduct.setParams({"productId": productId});
        getProduct.setCallback(this,function(response) {
            var state= response.getState();
            if(state==='SUCCESS'){ 
                var temp=response.getReturnValue();
                component.set("v.productItem",temp);
                var imagesURLs = component.get("v.productItem").Product2.productImages__c.split(";");
                component.set("v.images", imagesURLs);
            }
            else {
                let errors = response.getError();
                let message = $A.get('$Label.c.SS_unknowError'); 
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
                console.log('message' + message);
                component.find("errorsNotify").setErrorToast(message);
            }
        });
        $A.enqueueAction(getProduct);  
    },
    incrementQuant : function(component, event, helper) {
        var quantField = component.find("quantity")
        var quant = quantField.get("v.value");
        var newQuant = parseInt(quant) + 1;
        quantField.set("v.value", newQuant);        
    },
    decrementQuant : function(component, event, helper) {
        var quantField = component.find("quantity");
        var quant = quantField.get("v.value");
        var newQuant = parseInt(quant) - 1;
        if(newQuant <= 0){
            component.find("errorsNotify").setErrorToast($A.get('$Label.c.SS_QuantityLessThanOne'));
        }else{
            quantField.set("v.value", newQuant);
        } 
    },
    addProductToCart : function(component, event, helper) {
        var quant = parseFloat(component.find("quantity").get("v.value"), 10);
        if(!Number.isInteger(quant) || quant < 1){
            component.find("errorsNotify").setErrorToast($A.get('$Label.c.SS_WrognQuantity'));
        }else{            
            var productId = component.get("v.recordId");
            var userId = $A.get("$SObjectType.CurrentUser.Id");
            var getProducts=component.get("c.addToCart");
            getProducts.setParams({"userId": userId,"productId": productId,"quantity": quant});
            getProducts.setCallback(this,function(response) {
                var state= response.getState();
                if(state==='SUCCESS'){ 
                    component.find("successNotify").setErrorToast($A.get('$Label.c.SS_success_add_item_to_cart'));
                } 
                else {
                    let errors = response.getError();
                    let message = $A.get('$Label.c.SS_unknowError'); 
                    if (errors && Array.isArray(errors) && errors.length > 0) {
                        message = errors[0].message;
                    }
                    component.find("errorsNotify").setErrorToast(message);
                }
            });
            $A.enqueueAction(getProducts);             
        }
    }
})