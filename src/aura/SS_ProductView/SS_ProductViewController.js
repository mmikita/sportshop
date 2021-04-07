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
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(getProduct);  
	}
})