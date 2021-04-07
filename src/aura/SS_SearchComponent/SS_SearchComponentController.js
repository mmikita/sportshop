({
    searchProducts : function(component, event, helper) {
        helper.findProducts(component, event, helper);
    },
    onKeyUp: function(component, event, helper){
        var keycode = event.getParam('keyCode');
        if(keycode == 13){
            helper.findProducts(component, event, helper);
        }
    }
})