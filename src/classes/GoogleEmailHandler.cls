global class GoogleEmailHandler implements Auth.RegistrationHandler {
    final string TIMEZONE = 'America/Los_Angeles';
    final string locale = 'pl';

    global User createUser(Id portalId, Auth.UserData data) {
        Account a = [SELECT Id FROM account WHERE name = 'Customers'];
        System.debug(a.Id + '1' + '2' + data.email + '3' + data.firstName + '4' + data.lastName);
        Contact c = new Contact();
        c.accountId = a.Id;
        c.email = data.email;
        c.firstName = data.firstName;
        c.lastName = data.lastName;
        insert(c);
        User u = new User();
        Profile p = [SELECT Id FROM profile WHERE name = 'Customer Community User'];
        u.username = data.firstName + '@customer.com';
        u.email = data.email;
        u.lastName = data.lastName;
        u.firstName = data.firstName;
        String alias = data.fullName;
        if (alias.length() > 8) {
            alias = alias.substring(0, 8);
        }
        u.alias = alias;
        u.emailEncodingKey = 'UTF-8';
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
        u.username = data.firstName + '@customer.comp';
        update(u);
    }
}