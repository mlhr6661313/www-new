define(['./helper-function', '../vendors/smarty-select'], function (_helperFunction, _smartySelect) {
    'use strict';

    var _smartySelect2 = _interopRequireDefault(_smartySelect);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var filter = {
        filter: '[data-js-filter]',
        more: '[data-js-showMoreArticles]',
        init: function init() {
            this.filteringAction();
        },
        initFilterSelect: function initFilterSelect() {
            var select = document.querySelector('[data-js-blogFilterSelect]');
            return select ? (0, _smartySelect2.default)('[data-js-blogFilterSelect]') : undefined;
        },
        setCurrentFilter: function setCurrentFilter(filters, activeFilter) {
            (0, _helperFunction.each)(filters, function (filter) {
                if (filter.getAttribute('data-state') === 'active') {
                    filter.setAttribute('data-state', 'inactive');
                } else if (typeof activeFilter === 'string' && filter.getAttribute('data-id') === activeFilter) {
                    filter.setAttribute('data-state', 'active');
                }
            });
            if (typeof activeFilter !== 'string') {
                activeFilter.setAttribute('data-state', 'active');
            }
        },
        filteringAction: function filteringAction() {
            var _this = this;

            var filterSelect = this.initFilterSelect();
            var filters = document.querySelectorAll(this.filter);
            var blogContent = document.querySelector('[data-js-blogContent]');
            var more = document.querySelector(this.more);

            var changeCategory = function changeCategory(value, activeFilter) {
                if (blogContent) {
                    more.setAttribute('data-category', value);
                    more.setAttribute('data-page', 1);
                    _this.filtering(value);
                    _this.setCurrentFilter(filters, activeFilter);
                }
            };

            if (filterSelect) {
                filterSelect.change(function (index, val) {
                    changeCategory(val, val);
                });
            }

            if (filters) {
                (0, _helperFunction.each)(filters, function (filter) {
                    filter.addEventListener('click', function (event) {
                        var target = event.currentTarget;
                        var activeId = target.getAttribute('data-id');
                        var isActive = target.getAttribute('data-state') === 'active';

                        if (isActive) {
                            return;
                        }
                        changeCategory(activeId, target);
                    });
                });
            }
        },


        filtering: function filtering(cat) {
            var formData = {
                action: 'filterArticles',
                data: {
                    category: cat
                }
            };

            _helperFunction.baseObj.ajaxAction(formData, this._success);
        },

        _success: function _success(success) {
            var showButton = document.querySelector('[data-js-showMoreArticles]');
            var articles = document.querySelector('[data-js-articles]');
            var blogContent = document.querySelector('[data-js-blogContent]');
            var more_text_data = document.querySelector('[data-js-more-text-data]');
            var notEmpty = success !== '';

            (0, _helperFunction.check)(notEmpty, function () {

                success = JSON.parse(success);

                if (!success['next']) {
                    showButton.style.display = 'none';
                } else {
                    showButton.removeAttribute('style');
                }

                if (success['articles']) {
                    articles.innerHTML = success['articles'];
                }

                more_text_data.textContent = success['more_text_data'];
            });
        }
    };

    var more = {
        init: function init() {
            this.moreNewsAction();
        },

        moreNewsAction: function moreNewsAction() {
            var that = this;
            var showArticlesBtn = document.querySelector('[data-js-showMoreArticles]');

            function showArticles(e) {
                var page = +e.currentTarget.getAttribute('data-page');
                var cat = e.currentTarget.getAttribute('data-category');
                var newPage = page + 1;

                e.currentTarget.setAttribute('data-page', newPage);
                that.moreArticles(newPage, cat);
            }

            if (showArticlesBtn) {
                showArticlesBtn.addEventListener('click', showArticles);
            }
        },

        moreArticles: function moreArticles(page, cat) {
            var formData = {
                action: 'moreArticles',
                data: {
                    page: page,
                    category: cat
                }
            };

            _helperFunction.baseObj.ajaxAction(formData, this._success);
        },

        _success: function _success(success) {
            var showButton = document.querySelector('[data-js-showMoreArticles]');
            var articles = document.querySelector('[data-js-articles]');
            var notEmpty = success !== '';

            (0, _helperFunction.check)(notEmpty, function () {
                success = JSON.parse(success);
                if (!success['next']) {
                    showButton.style.display = 'none';
                }

                if (success['articles']) {
                    articles.innerHTML += success['articles'];
                }
            });
        }
    };

    filter.init();
    more.init();
});