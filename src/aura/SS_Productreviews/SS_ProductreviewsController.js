({
    doInit : function(component, event, helper) {
        helper.getReviews(component, event, helper);
    },
    addReview : function(component, event, helper) {
        var title = component.find("title").get("v.value");
        var description = component.find("description").get("v.value");
        var insReview = component.get("c.insertReview");
        insReview.setParams({"title":title,"description":description,"productId":component.get("v.productId")});
        insReview.setCallback(this,function(response) {
            var state= response.getState();
            if(state==='SUCCESS'){ 
                console.log('sukces');
                helper.getReviews(component, event, helper);
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
        $A.enqueueAction(insReview); 
    }
})