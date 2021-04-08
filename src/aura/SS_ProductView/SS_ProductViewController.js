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
    }
})