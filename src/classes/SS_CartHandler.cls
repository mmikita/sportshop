public class SS_CartHandler {
    public static void deleteLineItem(String lineItemId){
        delete new OpportunityLineItem(Id = lineItemId);
    }  
    
    public static Opportunity getItemsInCart(String userId){
    Opportunity cartWithItems = [select Id, Amount, ContractId, (Select Id, PricebookEntry.Id, PricebookEntry.Product2Id, ProductName__c, Product2Id, Quantity, UnitPrice, TotalPrice, Subtotal, Name
                                                       FROM OpportunityLineItems) from Opportunity 
                                   where isCart__c = true and Contact__c =  :userId];
        return cartWithItems;
    }
    
    public static void clearCart(String oppId){
        List<OpportunityLineItem> lineItems = [Select id from OpportunityLineItem where OpportunityId = :oppId];
        Database.delete(lineItems);
    }
    
    public static void setLineItemQuantity(String lineItemId, integer quantity, Decimal unitPrice){
        update new OpportunityLineItem(Id = lineItemId, Quantity = quantity, UnitPrice = unitPrice);
    }
    
    public static decimal getStandardPriceForProduct(string productId){
               PricebookEntry product = [select Unitprice
                                    			  from Pricebookentry 
                                                  where pricebook2.name = 'Standard' 
                                                  and pricebook2.IsActive = true
                                                  and product2.IsActive = true 
                                    		      and product2.id = :productId];
        return product.Unitprice;
    }
    
    public static void addItemToCart(String productId, decimal quantity, string contactId){
        Opportunity cart;
        List<Opportunity> oppsList = [Select id from Opportunity where isCart__c = true and Contact__c = :contactId];
        System.debug('1' + oppsList);
        if(!oppsList.isEmpty() && oppsList.size()==1){
            cart = oppsList[0];
        }else if(oppsList.isEmpty()){
            cart = SS_CartHandler.createNewCart(contactId);
        }
        OpportunityLineItem opLineItem;
        List<OpportunityLineItem> opLineItems = [Select id, Quantity from OpportunityLineItem where Product2.Id = :productId and OpportunityId = :cart.id];
        if(!opLineItems.isEmpty() && opLineItems.size()==1){
            opLineItem = opLineItems[0];
            decimal newQuant = opLineItem.Quantity + quantity;
            opLineItem.Quantity = newQuant;
            opLineItem.UnitPrice = getStandardPriceForProduct(productId);
            update opLineItem;
        }
        else if(opLineItems.isEmpty()){
            opLineItem = new OpportunityLineItem();
            opLineItem.OpportunityId = cart.Id;
            opLineItem.Product2Id = productId;
            opLineItem.Quantity = quantity;
            opLineItem.UnitPrice = getStandardPriceForProduct(productId);
            insert opLineItem;
        }
    }
    
    public static Opportunity createNewCart(string contactId){
        Contract contForCart = new Contract();
        contForCart.AccountId = SS_Utils.getSettingValue('acccountCustomersId');
        insert contForCart;
        Opportunity cart = new Opportunity();    
        cart.Contact__c = contactId;
        cart.isCart__c = true;
        cart.ContractId = contForCart.Id;
        cart.CloseDate = Date.Today() + 365;
        cart.Name = SS_Utils.getSettingValue('cartOppName');
        cart.StageName = 'Prospecting';
        cart.Pricebook2Id = SS_Utils.getSettingValue('standardPriceBookId');
        insert cart;
        return cart;
    }
    
    public static void createNewCartItem(String ProductId, integer quantity, string oppId){
        OpportunityLineItem cartItem = new OpportunityLineItem();
        cartItem.Quantity = quantity;
        cartItem.Product2Id = ProductId;
        cartItem.OpportunityId = oppId;
    }    
}