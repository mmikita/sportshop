public class SS_ProductReviewsController {
    
    @AuraEnabled
    public static List<ProductReview__c> getProductReviews(String productId){
        return [Select Id, Title__c, Description__c, CreatedBy.Name, CreatedDate, CreatedBy.SmallPhotoUrl from ProductReview__c where Product__c = :productId order by CreatedDate desc];
    }
    
    @AuraEnabled
    public static void insertReview(string title, string description, string productId){
        ProductReview__c review = new ProductReview__c();
        review.Title__c = title;
        review.Description__c = description;
        review.Product__c = productId;
        insert review;
    }
}