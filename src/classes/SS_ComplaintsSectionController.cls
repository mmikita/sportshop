public class SS_ComplaintsSectionController {
    @AuraEnabled
    public static void insertComplaint(String title, String description, String orderId){
        Complaint__c comp = new Complaint__c();
        comp.Title__c = title;
        comp.Order__c = orderId;
        comp.D__c = description;
        comp.Status__c = 'In Progress';
        comp.closed__c = false;
        insert comp;
    }
    
    @AuraEnabled
    public static List<Complaint__c> getOrderComplaints(String orderId){
        List<Complaint__c> complaints = [Select id, Status__c, Title__c, D__c, closed__c 
                                         from Complaint__c where Order__c = :orderId order by CreatedDate desc];
        return complaints;  
    }
}