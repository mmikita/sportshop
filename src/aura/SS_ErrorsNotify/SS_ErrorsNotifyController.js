({
    setMessage : function(component,event,helper){
        var errorMessage = event.getParam("arguments");
        component.find('errorToast').showToast({
            "variant":"error",
            "mode":"pester",
            "message": errorMessage.message
        });  
    }
})