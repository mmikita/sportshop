public class SS_OrderProcessController {
    
    @AuraEnabled
    public static Map<String, Object> initOrder(string userId) { 
        Map<String, Object> wraperToReturn = new Map<String, Object>();
        User userFromId = SS_UserHandler.getUserById(userId);
        Opportunity opportunity = SS_CartHandler.getItemsInCart(userFromId.ContactId);
        Map<string, string> shipmentsMethods = SS_OrderHandler.getShippmentsMethods();
        List<String>paymentsMethods = SS_OrderHandler.getPaymentsMethods();
        wraperToReturn.put('user', userFromId);
        wraperToReturn.put('opp', opportunity);
        wraperToReturn.put('shipmentsMethods', shipmentsMethods);
        wraperToReturn.put('paymentsMethods', paymentsMethods);
        return wraperToReturn;
    }
    
    @AuraEnabled
    public static void takeOrder(User user, String shipMethod, String payMethod){ 
        User userFromId = SS_UserHandler.getUserById(user.Id);
        Opportunity cart = SS_CartHandler.getItemsInCart(userFromId.ContactId);
        SS_OrderHandler.createOrder(cart, user, shipMethod, payMethod);
    }
}