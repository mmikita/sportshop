public class SS_OrderHandler {
    
    public static map<String, string> getShippmentsMethods(){
        map<String, string> shipMethodsWithPrice = new map<String, String>();
        Schema.DescribeFieldResult fieldResult = Order.Ship_method__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for( Schema.PicklistEntry pickListVal : ple){
            shipMethodsWithPrice.put(pickListVal.getLabel(), SS_Utils.getSettingValue(pickListVal.getLabel()));  
        }  
        
        return shipMethodsWithPrice;
    }
    
    public static List<String> getPaymentsMethods(){
        List<String> pickListValuesList= new List<String>();
        Schema.DescribeFieldResult fieldResult = Order.Payment_method__c.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        for( Schema.PicklistEntry pickListVal : ple){
            pickListValuesList.add(pickListVal.getLabel());
        }     
        return pickListValuesList;
    }  
    
    public static void createOrder(Opportunity opportunity, User user, String shipMethod, String payMethod) {
        Order  customerOrder = New Order();
        customerOrder.ContractId = opportunity.ContractId;
        decimal finalAm = opportunity.Amount + Decimal.valueOf(SS_Utils.getSettingValue(shipMethod));
        customerOrder.final_amount__c = finalAm;
        customerOrder.customerUser__c = user.Id;
        customerOrder.AccountId = SS_Utils.getSettingValue('acccountCustomersId');
        customerOrder.Ship_method__c = shipMethod;
        customerOrder.Payment_method__c = payMethod;	
        customerOrder.EffectiveDate = date.today();
        customerOrder.Status='Draft';
        customerOrder.EndDate  = date.today()+30;
        customerOrder.ShippingCity = user.City;
        customerOrder.ShippingStreet = user.Street;
        customerOrder.ShippingCountry = user.Country;
        customerOrder.ShipFirstName__c = user.FirstName;
        customerOrder.SS_ShipLastName__c = user.LastName;
        customerOrder.ShippingPostalCode =  user.PostalCode;
        customerOrder.Pricebook2Id = SS_Utils.getSettingValue('standardPriceBookId');
        insert customerOrder;
        List<OrderItem> items = new list<OrderItem>();
        for(OpportunityLineItem item : opportunity.OpportunityLineItems){
            OrderItem oItem = new OrderItem();
            oItem.OrderId = customerOrder.Id;
            oItem.UnitPrice =  item.UnitPrice;
            oItem.Quantity =  item.Quantity;
            oItem.Product2Id = item.PricebookEntry.Product2Id;
            oItem.PricebookEntryId = item.PricebookEntry.Id;
            items.add(oItem); 
        }
        Database.insert(items);  
   		SS_CartHandler.clearCart(opportunity.Id);
        sendConfEmail(user, customerOrder);
    } 
    
    public static void sendConfEmail(User user, Order order){
        List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();     
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        List<String> sendTo = new List<String>();
        sendTo.add(user.Email);
        mail.setToAddresses(sendTo);
        mail.setSubject(System.label.SS_OrderConf);
        String body = System.label.SS_OrderConfimrationEmailMessage;
        body += '<div><ul><li>'+System.label.SS_ShippingMethod+': '+order.Ship_method__c +'</li><li>'+System.label.SS_PaymentMethod+': '+order.Payment_method__c+'</li><li>'+System.label.SS_ShippingAddress+'</br>: </br>'+order.ShippingStreet + '<br/>' +order.ShippingPostalCode + ' ' +order.ShippingCity + '<br/>'+order.ShippingCountry+'</li><li>'+System.label.SS_FinalAmount+': €'+order.final_amount__c+'</li></ul></div>';
        mail.setHtmlBody(body);
        mails.add(mail);
        Messaging.sendEmail(mails);        
    }
}