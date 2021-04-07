global class SS_GoogleEmailHandler implements Auth.RegistrationHandler {
    final string TIMEZONE = SS_Utils.getSettingValue('timezone');
    final string locale = SS_Utils.getSettingValue('locale');

    global User createUser(Id portalId, Auth.UserData data) {
        Account a = [SELECT Id FROM account WHERE name = :SS_Utils.getSettingValue('sportshopCustomersAccount')];
        Contact c = new Contact();
        c.accountId = a.Id;
        c.email = data.email;
        c.firstName = data.firstName;
        c.lastName = data.lastName;
        insert(c);
        User u = new User();
        Profile p = [SELECT Id FROM profile WHERE name = :SS_Utils.getSettingValue('sportshopCustomerProfile')];
        u.username = data.lastName + SS_Utils.getSettingValue('sportshopUsernameEnd');
        u.email = data.email;
        u.lastName = data.lastName;
        u.firstName = data.firstName;
        String alias = data.fullName;
        if (alias.length() > 8) {
            alias = alias.substring(0, 8);
        }
        u.alias = alias;
        u.emailEncodingKey = SS_Utils.getSettingValue('emailEncoding');
        u.languagelocalekey = locale;
        u.localesidkey = locale;
        u.timeZoneSidKey = TIMEZONE;
        u.profileId = p.Id;
        u.contactId = c.id;
        return u;
    }

    global void updateUser(Id userId, Id portalId, Auth.UserData data) {
        User u = new User(id = userId);
        u.email = data.email;
        u.lastName = data.lastName;
        u.firstName = data.firstName;
        u.username = data.firstName + SS_Utils.getSettingValue('sportshopUsernameEnd');
        update(u);
    }
}