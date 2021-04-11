public class SS_CartPageController {
    
    @AuraEnabled
    public static Opportunity getItemsInCart(string userId) { 
        User user = SS_UserHandler.getUserById(userId);
        Opportunity opportunity = SS_CartHandler.getItemsInCart(user.ContactId);
        return opportunity;
    }
    
    @AuraEnabled
    public static void deleteOppLineItem(String lineId){
        SS_CartHandler.deleteLineItem(lineId);
    }
    
    @AuraEnabled
    public static void clearCart(String opId){
        SS_CartHandler.clearCart(opId);
    }
    
    @AuraEnabled
    public static void setQuantity(String lineId, Integer quantity, Decimal unitPrice){
        SS_CartHandler.setLineItemQuantity(lineId, quantity, unitPrice);
    }
}