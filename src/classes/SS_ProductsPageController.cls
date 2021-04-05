public class SS_ProductsPageController {
    
    @AuraEnabled
    public static List<PricebookEntry> getProducts(string searchKeyword) {
          List<PricebookEntry> productsForSell = [select id, product2.ImageURL__c, product2.Name,Unitprice from Pricebookentry 
                                                  where pricebook2.name = 'Standard' 
                                                  and pricebook2.IsActive = true
                                                  and product2.IsActive = true 
                                                  and product2.Name like :searchKeyword +'%']; 
        return productsForSell;
    } 
    
}