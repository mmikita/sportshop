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
})