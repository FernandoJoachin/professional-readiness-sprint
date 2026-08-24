import { LightningElement } from 'lwc';
import searchAccounts from '@salesforce/apex/AccountSearchController.searchAccounts';
import getIndustryOptions from '@salesforce/apex/AccountSearchController.getIndustryOptions';
import { getTotalPages, getPageSlice } from 'c/paginationUtils';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Industry', fieldName: 'Industry' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' }
];

const SEARCH_DELAY = 300;
const PAGE_SIZE = 5;
const ALL_INDUSTRIES_OPTION = { label: 'All Industries', value: '' };

export default class AccountSearch extends LightningElement {
    columns = COLUMNS;
    errorMessage;
    isLoading = false;
    hasSearched = false;

    searchTerm = '';
    selectedIndustry = '';
    industryOptions = [ALL_INDUSTRIES_OPTION];

    allAccounts = [];
    currentPage = 1;
    pageSize = PAGE_SIZE;

    searchTimeoutId;

    connectedCallback() {
        this.loadIndustryOptions();
        this.runSearch();
    }

    loadIndustryOptions() {
        getIndustryOptions()
            .then((values) => {
                this.industryOptions = [
                    ALL_INDUSTRIES_OPTION,
                    ...values.map((value) => ({ label: value, value }))
                ];
            })
            .catch((error) => {
                this.errorMessage = error?.body?.message ?? 'An error occurred while loading industries.';
            });
    }

    handleSearchTermChange(event) {
        this.searchTerm = event.target.value;

        window.clearTimeout(this.searchTimeoutId);
        this.searchTimeoutId = window.setTimeout(() => {
            this.currentPage = 1;
            this.runSearch();
        }, SEARCH_DELAY);
    }

    handleIndustryChange(event) {
        this.selectedIndustry = event.detail.value;
        this.currentPage = 1;
        this.runSearch();
    }

    handleClearFilters() {
        window.clearTimeout(this.searchTimeoutId);
        this.searchTerm = '';
        this.selectedIndustry = '';
        this.currentPage = 1;
        this.runSearch();
    }

    runSearch() {
        this.isLoading = true;
        this.errorMessage = undefined;

        searchAccounts({ searchTerm: this.searchTerm, industry: this.selectedIndustry })
            .then((results) => {
                this.allAccounts = results;
            })
            .catch((error) => {
                this.allAccounts = [];
                this.errorMessage = error?.body?.message ?? 'An error occurred while searching accounts.';
            })
            .finally(() => {
                this.isLoading = false;
                this.hasSearched = true;
            });
    }

    get totalPages() {
        return getTotalPages(this.allAccounts.length, this.pageSize);
    }

    get accounts() {
        return getPageSlice(this.allAccounts, this.currentPage, this.pageSize);
    }

    get hasResults() {
        return this.allAccounts.length > 0;
    }

    get hasActiveFilters() {
        return this.searchTerm.trim().length > 0 || this.selectedIndustry.length > 0;
    }

    get showEmptyState() {
        return this.hasSearched && !this.isLoading && !this.errorMessage && !this.hasResults;
    }

    get emptyStateTitle() {
        return this.hasActiveFilters ? 'No matching accounts' : 'No accounts yet';
    }

    get emptyStateMessage() {
        return this.hasActiveFilters
            ? 'Try a different name, phone number or industry.'
            : 'Accounts you create will show up here.';
    }

    get showPagination() {
        return this.totalPages > 1;
    }

    handlePrevious() {
        this.currentPage -= 1;
    }

    handleNext() {
        this.currentPage += 1;
    }
}


