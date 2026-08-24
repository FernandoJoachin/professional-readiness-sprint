@IsTest
private class AccountSearchControllerTest {
    @TestSetup
    static void setup() {
        insert new List<Account>{
            new Account(Name = 'Zeta Corp', Industry = 'Banking', Phone = '111-111-1111'),
            new Account(Name = 'Acme Inc', Industry = 'Technology', Phone = '222-222-2222'),
            new Account(Name = 'Mid Systems', Industry = 'Technology', Phone = '333-333-3333')
        };
    }

    @IsTest
    static void returnsAllAccountsSortedByNameWhenNoFilters() {
        Test.startTest();
        List<Account> results = AccountSearchController.searchAccounts('', null);
        Test.stopTest();

        System.assertEquals(3, results.size());
        System.assertEquals('Acme Inc', results[0].Name);
        System.assertEquals('Mid Systems', results[1].Name);
        System.assertEquals('Zeta Corp', results[2].Name);
    }

    @IsTest
    static void matchesByName() {
        Test.startTest();
        List<Account> results = AccountSearchController.searchAccounts('Acme', null);
        Test.stopTest();

        System.assertEquals(1, results.size());
        System.assertEquals('Acme Inc', results[0].Name);
    }

    @IsTest
    static void matchesByPhone() {
        Test.startTest();
        List<Account> results = AccountSearchController.searchAccounts('333-333-3333', null);
        Test.stopTest();

        System.assertEquals(1, results.size());
        System.assertEquals('Mid Systems', results[0].Name);
    }

    @IsTest
    static void doesNotMatchByIndustryInSearchTerm() {
        Test.startTest();
        List<Account> results = AccountSearchController.searchAccounts('Technology', null);
        Test.stopTest();

        System.assertEquals(0, results.size());
    }

    @IsTest
    static void filtersByIndustryOnly() {
        Test.startTest();
        List<Account> results = AccountSearchController.searchAccounts('', 'Technology');
        Test.stopTest();

        System.assertEquals(2, results.size());
        System.assertEquals('Acme Inc', results[0].Name);
        System.assertEquals('Mid Systems', results[1].Name);
    }

    @IsTest
    static void combinesSearchTermAndIndustryFilter() {
        Test.startTest();
        List<Account> results = AccountSearchController.searchAccounts('Acme', 'Technology');
        Test.stopTest();

        System.assertEquals(1, results.size());
        System.assertEquals('Acme Inc', results[0].Name);
    }

    @IsTest
    static void returnsNoResultsWhenSearchMatchesButIndustryDoesNot() {
        Test.startTest();
        List<Account> results = AccountSearchController.searchAccounts('Acme', 'Banking');
        Test.stopTest();

        System.assertEquals(0, results.size());
    }

    @IsTest
    static void returnsNoResultsWhenNoMatch() {
        Test.startTest();
        List<Account> results = AccountSearchController.searchAccounts('NoSuchTerm', null);
        Test.stopTest();

        System.assertEquals(0, results.size());
    }

    @IsTest
    static void returnsActiveIndustryOptions() {
        Test.startTest();
        List<String> options = AccountSearchController.getIndustryOptions();
        Test.stopTest();

        System.assert(!options.isEmpty());
    }
}
