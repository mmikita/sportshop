({
	findProducts : function(component, event, helper) {
		var searchKeyword = component.get("v.searchText");
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": "/products"
        });
        
        var searchEvent = $A.get("e.c:SS_SearchProductsEvent");
        searchEvent.setParams({
            "keyword" : searchKeyword });
        urlEvent.fire();
        searchEvent.fire();
	}
})