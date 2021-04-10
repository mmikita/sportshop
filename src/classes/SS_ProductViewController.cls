public class SS_ProductViewController {
    
    @AuraEnabled
    public static PricebookEntry getProduct(string productId) {
        PricebookEntry product = [select id, product2.ImageURL__c, product2.productImages__c, product2.Description, product2.Name,Unitprice
                                  from Pricebookentry 
                                  where pricebook2.name = 'Standard' 
                                  and pricebook2.IsActive = true
                                  and product2.IsActive = true 
                                  and product2.id = :productId];
        
        return product;
    } 
    
    @AuraEnabled
    public static void addToCart(string userId, string productId, string quantity){
        User user = SS_UserHandler.getUserById(userId);
        SS_CartHandler.addItemToCart(productId, decimal.valueOf(quantity), user.ContactId);
    }
    
}