({
    handleClick : function(component, event, helper) {
        var source = event.getSource();
        var label = source.get("v.label");
        var urlEvent = $A.get("e.force:navigateToURL");
        var userId = $A.get("$SObjectType.CurrentUser.Id");
        console.log(label+'tes');
        if(label=='LogOut'){
            var logout =  $A.get("e.force:logout");
            logout.fire();
        }else if(label=='My Profile'){
            urlEvent.setParams({
                "url": "/profile/" + userId
            });
            urlEvent.fire();
        }else if(label=='My Orders'){
            urlEvent.setParams({
                "url": "/myorders/"
            });
            urlEvent.fire();  
        }
    }, cartPage : function(component, event, helper) {
        var urlEvent = $A.get("e.force:navigateToURL");
              urlEvent.setParams({
                "url": "/cart"
            });
            urlEvent.fire();
    }
})