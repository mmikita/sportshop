({
    doInit : function(component, event, helper) { 
 		helper.getProducts(component, ''); 
    },
    searchProducts : function(component, event, helper) {
        var searchKeyword = component.get("v.searchKeyword");
        if(searchKeyword == undefined){
            searchKeyword = '';
        }
 		helper.getProducts(component, searchKeyword); 
    }
})