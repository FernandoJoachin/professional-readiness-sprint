import { LightningElement, api } from 'lwc';

export default class Pagination extends LightningElement {
    @api currentPage = 1;
    @api totalPages = 1;

    get isPreviousDisabled() {
        return this.currentPage <= 1;
    }

    get isNextDisabled() {
        return this.currentPage >= this.totalPages;
    }

    get pageIndicator() {
        return `Page ${this.currentPage} of ${this.totalPages}`;
    }

    handlePrevious() {
        if (!this.isPreviousDisabled) {
            this.dispatchEvent(new CustomEvent('previous'));
        }
    }

    handleNext() {
        if (!this.isNextDisabled) {
            this.dispatchEvent(new CustomEvent('next'));
        }
    }
}
