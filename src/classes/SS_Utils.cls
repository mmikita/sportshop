public class SS_Utils {
    
    public static string getSettingValue(String settingName){
        SS_Settings__c settingItem =  SS_Settings__c.getInstance(settingName);
        return settingItem.Value__c;
    }
    
}