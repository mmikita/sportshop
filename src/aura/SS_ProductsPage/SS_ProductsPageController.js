({
    getAllProducts : function(component, event, helper) { 
        helper.getProducts(component, ''); 
    },
    searchProducts : function(component, event, helper) {
        var searchKeyword = event.getParam('keyword'); 
        if(searchKeyword == undefined){
            searchKeyword = '';
        }
        helper.getProducts(component, searchKeyword);
    },
    addProductToCart : function(component, event, helper) {
        var ctarget = event.currentTarget;
        var prodId = ctarget.dataset.prod;
        var userId = $A.get("$SObjectType.CurrentUser.Id");
        var getProducts=component.get("c.addToCart");
        getProducts.setParams({"userId": userId,"productId": prodId});
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
    
    
    
})