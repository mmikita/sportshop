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
                console.log(temp);
                var line = component.get("v.productItem");
                console.log('liine' + line.Product2.Name);
            }
            else {
                var errors = response.getError();                       
                console.log("Failed with state: " + errors[0].message);
            }
        });
        $A.enqueueAction(getProduct);  
	}
})