({
    setMessage : function(component,event,helper){
        var args = event.getParam("arguments");
        component.find('errorToast').showToast({
            "variant":"success",
            "mode":"pester",
            "message": args.message
        });  
    }
})