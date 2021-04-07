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
    }
})