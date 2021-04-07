({
	getProducts : function(component, keyword) {
        var getProducts=component.get("c.getProducts");
        getProducts.setParams({"searchKeyword": keyword});
        getProducts.setCallback(this,function(response) {
            var state= response.getState();
            if(state==='SUCCESS'){ 
                var temp=response.getReturnValue();
                component.set("v.products",temp);
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(getProducts);  
	}
})