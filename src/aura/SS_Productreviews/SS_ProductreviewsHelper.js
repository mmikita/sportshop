({
    getReviews : function(component, event, helper){
        var action = component.get("c.getProductReviews");
        action.setParams({"productId":component.get("v.productId")});
        action.setCallback(this,function(response) {
            var state= response.getState();
            if(state==='SUCCESS'){ 
                console.log('sukces');
                var temp=response.getReturnValue();
                component.set("v.reviews",temp);
            }
            else {
                let errors = response.getError();
                let message = $A.get('$Label.c.SS_unknowError'); 
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
                console.log('message' + message);
                component.find("errorsNotify").setErrorToast(message);
            }
        });
        $A.enqueueAction(action); 
    }
})