/**
 * Provides search capabilities over Account records for the Account Explorer UI.
 * Searchable and returned fields are declared as configurable lists so that new
 * fields can be added without changing the query-building logic.
 */
public with sharing class AccountSearchController {
    // Fields matched against the search term. Add/remove entries here to extend the search scope.
    private static final List<String> SEARCHABLE_FIELDS = new List<String>{ 'Name', 'Phone' };

    // Fields returned to the client. Add/remove entries here to change the result shape.
    private static final List<String> RESULT_FIELDS = new List<String>{ 'Id', 'Name', 'Industry', 'Phone' };

    private static final Integer MAX_RESULTS = 200;

    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccounts(String searchTerm, String industry) {
        String term = String.isBlank(searchTerm) ? '' : searchTerm.trim();
        String likeTerm = '%' + String.escapeSingleQuotes(term) + '%';

        List<String> conditions = new List<String>();
        if (term.length() > 0) {
            List<String> searchConditions = new List<String>();
            for (String field : SEARCHABLE_FIELDS) {
                searchConditions.add(field + ' LIKE :likeTerm');
            }
            conditions.add('(' + String.join(searchConditions, ' OR ') + ')');
        }

        if (String.isNotBlank(industry)) {
            conditions.add('Industry = :industry');
        }

        String whereClause = conditions.isEmpty() ? '' : ' WHERE ' + String.join(conditions, ' AND ');

        String query = 'SELECT ' + String.join(RESULT_FIELDS, ', ')
            + ' FROM Account'
            + whereClause
            + ' WITH USER_MODE'
            + ' ORDER BY Name ASC'
            + ' LIMIT ' + MAX_RESULTS;

        return Database.query(query);
    }

    // Active picklist values for the Industry field, used to populate the filter dropdown.
    @AuraEnabled(cacheable=true)
    public static List<String> getIndustryOptions() {
        List<String> values = new List<String>();
        for (Schema.PicklistEntry entry : Account.Industry.getDescribe().getPicklistValues()) {
            if (entry.isActive()) {
                values.add(entry.getValue());
            }
        }
        return values;
    }
}
