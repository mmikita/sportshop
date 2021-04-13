public class SS_MyOrdersController {
    
    @AuraEnabled
    public static List<Order> getMyOrders(String userId){
        List<Order> myOrders = [select Id, OrderNumber, Ship_method__c, Payment_method__c, final_amount__c, CreatedDate,
                                ShippingCity, ShippingStreet, ShippingCountry, ShippingPostalCode,ShippingAddress,
                                (Select id, Status__c, Title__c, D__c, closed__c from Complaints__r),
                                (Select id, Quantity, UnitPrice, TotalPrice, Product2Id, PricebookEntry.Product2.Name from OrderItems)
                                from Order where customerUser__c =  :userId Order by OrderNumber desc];
        return myOrders;
    }
    
}