import {baseObj, check, each} from './helper-function';
import smartySelect from '../vendors/smarty-select';

const filter = {
    filter: '[data-js-filter]',
    more:   '[data-js-showMoreArticles]',
    init() {
        this.filteringAction();
    },

    initFilterSelect() {
        const select = document.querySelector('[data-js-blogFilterSelect]');
        return select
                ? smartySelect('[data-js-blogFilterSelect]')
                : undefined;
    },

    setCurrentFilter(filters, activeFilter) {
        each(filters, (filter) => {
            if(filter.getAttribute('data-state') === 'active') {
                filter.setAttribute('data-state', 'inactive');
            } else if(typeof activeFilter === 'string' && filter.getAttribute('data-id') === activeFilter) {
                filter.setAttribute('data-state', 'active');
            }
        });
        if(typeof activeFilter !== 'string') { activeFilter.setAttribute('data-state', 'active'); }
    },

    filteringAction() {
        const filterSelect = this.initFilterSelect();
        const filters = document.querySelectorAll(this.filter);
        const blogContent = document.querySelector('[data-js-blogContent]');
        const more = document.querySelector(this.more);

        const changeCategory = (value, activeFilter) => {
            if(blogContent) {
                more.setAttribute('data-category', value);
                more.setAttribute('data-page', 1);
                this.filtering(value);
                this.setCurrentFilter(filters, activeFilter);
            }
        };

        if(filterSelect) {
            filterSelect.change((index, val) => {
                changeCategory(val, val);
            });
        }

        if(filters) {
            each(filters, (filter) => {
                filter.addEventListener('click', (event) => {
                    const target = event.currentTarget;
                    const activeId = target.getAttribute('data-id');
                    const isActive = target.getAttribute('data-state') === 'active';

                    if(isActive) {return;}
                    changeCategory(activeId, target);
                });
            });
        }
    },

    filtering: function(cat) {
        const formData = {
            action: 'filterArticles',
            data:   {
                category: cat
            }
        };

        baseObj.ajaxAction(formData, this._success);
    },

    _success: function(success) {
        const showButton = document.querySelector('[data-js-showMoreArticles]');
        const articles = document.querySelector('[data-js-articles]');
        const blogContent = document.querySelector('[data-js-blogContent]');
        const more_text_data = document.querySelector('[data-js-more-text-data]');
        const notEmpty = success !== '';

        check(notEmpty, () => {

            success = JSON.parse(success);

            if(!success['next']) {
                showButton.style.display = 'none';
            } else {
                showButton.removeAttribute('style');
            }

            if(success['articles']) {
                articles.innerHTML = success['articles'];
            }

            more_text_data.textContent = success['more_text_data'];
        });
    }
};

const more = {
    init: function() {
        this.moreNewsAction();
    },

    moreNewsAction: function() {
        const that = this;
        const showArticlesBtn = document.querySelector('[data-js-showMoreArticles]');

        function showArticles(e) {
            const page = +e.currentTarget.getAttribute('data-page');
            const cat = e.currentTarget.getAttribute('data-category');
            const newPage = page + 1;

            e.currentTarget.setAttribute('data-page', newPage);
            that.moreArticles(newPage, cat);
        }

        if(showArticlesBtn) { showArticlesBtn.addEventListener('click', showArticles); }
    },

    moreArticles: function(page, cat) {
        const formData = {
            action: 'moreArticles',
            data:   {
                page:     page,
                category: cat
            }
        };

        baseObj.ajaxAction(formData, this._success);
    },

    _success: function(success) {
        const showButton = document.querySelector('[data-js-showMoreArticles]');
        const articles = document.querySelector('[data-js-articles]');
        const notEmpty = success !== '';

        check(notEmpty, () => {
            success = JSON.parse(success);
            if(!success['next']) { showButton.style.display = 'none'; }

            if(success['articles']) { articles.innerHTML += success['articles']; }

        });
    }
};

filter.init();
more.init();

