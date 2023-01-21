"use strict";

function heightToggleElement(toggler, blocks) {
    toggler.addEventListener("click", (e) => {
        e.preventDefault();
        if (blocks instanceof NodeList) {
            blocks.forEach(function (block) {
                addFunctionality(toggler, block);
            });
        } else {
            addFunctionality(toggler, blocks);
        }
    });

    function addFunctionality(toggler, block) {
        if (block.style.height === "0px" || !block.style.height) {
            block.style.height = `${block.scrollHeight}px`;
            toggler.classList.add("is-active");
            block.classList.add("is-expanded");
        } else {
            block.style.height = `${block.scrollHeight}px`;
            window.getComputedStyle(block, null).getPropertyValue("height");
            block.style.height = "0";
            toggler.classList.remove("is-active");
            block.classList.remove("is-expanded");
        }
        block.addEventListener("transitionend", () => {
            if (block.style.height !== "0px") {
                block.style.height = "auto";
            }
        });
    }
}

window.addEventListener("DOMContentLoaded", () => {

    //*<Search panel>================================================================================================

    const searchPanel = document.querySelector('.search-panel');

    let searchPanelOpen;

    if (document.documentElement.clientWidth > 1200) {
        searchPanelOpen = document.querySelector('.site-header__search > span')
    } else { }

    function addTopOnSearchPanel() {
        searchPanel.style.top = document.querySelector('.site-header__top').getBoundingClientRect().height + 4 + 'px';
    }


    if (searchPanel && searchPanelOpen) {

        const searchPanelClose = searchPanel.querySelector('.search-panel__close'),
            searchPanelInput = searchPanel.querySelector('input')

        searchPanelClose.addEventListener('click', (e) => { searchPanel.classList.remove('open'); })

        addTopOnSearchPanel();

        searchPanelInput.addEventListener('focus', (e) => {
            searchPanel.classList.add('focus');
        })

        searchPanelInput.addEventListener('blur', (e) => {
            searchPanel.classList.remove('focus');
        })

        searchPanelOpen.addEventListener('click', (e) => {
            searchPanel.classList.toggle('open');
        })
    }

    //*</Search panel=================================================================================================

    //*<Add focus search input>================================================================================================

    document.querySelectorAll('input[type="search"]').forEach(input => {

        input.addEventListener('focus', (e) => {
            input.closest('.form__item').classList.add('focus');
        })

        input.addEventListener('blur', (e) => {
            input.closest('.form__item').classList.remove('focus');
        })
    })

    //*</Add focus searc input>=================================================================================================

    //*<Count gifts>================================================================================================

    const gifts = document.querySelector('.gifts');

    if (gifts) {
        const giftsAmount = gifts.querySelectorAll('ul li').length,
            giftsCount = gifts.querySelector('.gifts__count');

        giftsCount.textContent = giftsAmount;
    }

    //*</Count gifts>=================================================================================================

    //*<More notifications articles>================================================================================================
    const notificationsMore = document.querySelector('.notifications__more');


    if (notificationsMore) {
        document.querySelectorAll('.notifications__list li.hidden').forEach(article => {
            heightToggleElement(notificationsMore, article);

            notificationsMore.addEventListener('click', (e) => {
                if (notificationsMore.classList.contains('is-active')) {
                    notificationsMore.textContent = notificationsMore.dataset.close;
                } else {
                    notificationsMore.textContent = notificationsMore.dataset.open;
                }
            })
        })
    }

    //*</More notifications articles>=================================================================================================

    // Delete



    function initStickyWidget() {
        $(document).ready(function () {
            const content = document.querySelector('.content');
            const adminBar = document.querySelector('#wpadminbar');
            const siteHeader = document.querySelector('.site-header');
            const brandReview = document.querySelector('.brand-review-box');
            let stickyContentCurrentOffset = document.querySelector('.sticky-contents-current') ? document.querySelector('.sticky-contents-current').offsetHeight : 0;
            let offsetTop = 0;
            if (adminBar) {
                offsetTop += adminBar.offsetHeight;
            }
            if (siteHeader) {
                offsetTop += siteHeader.offsetHeight;
            }
            if (brandReview) {
                offsetTop += brandReview.offsetHeight;
            }
            $(".widget-sticky").sticky({
                topSpacing: offsetTop + stickyContentCurrentOffset,
                bottomSpacing: getBottomSpacing(content),
            });
            $('.widget-sticky').on('sticky-start', function () {
                $('.sidebar').addClass('active-sticky')
            });
            $('.widget-sticky').on('sticky-end', function () {
                $('.sidebar').removeClass('active-sticky')
            });
            if (brandReview) {
                $(".site-header").sticky({
                    topSpacing: offsetTop - siteHeader.offsetHeight - brandReview.offsetHeight,
                });
            } else {
                $(".site-header").sticky({
                    topSpacing: offsetTop - siteHeader.offsetHeight,
                });
            }
            if (brandReview) {
                $(".brand-review-box").sticky({
                    topSpacing: offsetTop - brandReview.offsetHeight,
                    wrapperClassName: 'brand-review-sticky-wrapper'
                });
            }
        });
    }

    function getBottomSpacing(el) {
        const pageHeight = $(document).height();
        if (!el) {
            return 0
        }
        return pageHeight - ($(el).offset().top + $(el).height());
    }

    function initMobileMenu(btn, box) {
        if (!btn || !box) {
            return
        }
        const onDocumentClick = (evt) => {
            if (evt.target.closest('.nav-panel') || evt.target.closest('.burger-menu')) {
                return
            }
            close();
        };
        function onDropdownClick(evt) {
            evt.preventDefault();
            const dropdown = evt.target.closest('.dropdown');
            dropdown.classList.toggle('is-open');
            const list = dropdown.querySelector('ul');
            const maxHeight = getHiddenElementHeight(list);
            if (list.getAttribute('style')) {
                list.removeAttribute('style');
            } else {
                list.style.maxHeight = maxHeight + 'px';
            }
        }
        function open() {
            btn.classList.add('is-open');
            box.classList.add('is-open');
            addBlackout();
            const dropdowns = box.querySelectorAll('.dropdown .open-sub');
            dropdowns.forEach(dropdown => {
                dropdown.addEventListener('click', onDropdownClick);
            });
            document.addEventListener('click', onDocumentClick);
        }
        function close() {
            btn.classList.remove('is-open');
            box.classList.remove('is-open');
            const dropdowns = box.querySelectorAll('.dropdown');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('is-open');
                const list = dropdown.querySelector('ul');
                list.removeAttribute('style');
                dropdown.removeEventListener('click', onDropdownClick);
            });
            removeBlackout();
            document.removeEventListener('click', onDocumentClick);
        }
        function addBlackout() {
            const blackout = document.createElement('div');
            blackout.classList.add('blackout');
            document.querySelector('body').append(blackout);
        }
        function removeBlackout() {
            const el = document.querySelector('.blackout');
            if (el) {
                el.remove();
            }
        }
        btn.addEventListener('click', function () {
            btn.classList.contains('is-open') ? close() : open();
        });
    }

    function initLangPanel() {
        const langs = document.querySelectorAll('.lang');
        langs.forEach(function (lang) {
            const currentBox = lang.querySelector('.lang-current');
            if (!lang) {
                return
            }
            const onDocumentClick = (evt) => {
                if (evt.target.closest('.lang')) {
                    return
                }
                lang.classList.remove('is-open');
                document.removeEventListener('click', onDocumentClick);
            };
            currentBox.addEventListener('click', function () {
                lang.classList.toggle('is-open');
                document.addEventListener('click', onDocumentClick);
            });
        });
    }

    function onDropdownClick(evt) {
        evt.preventDefault();
        const dropdown = evt.target.closest('.dropdown');
        dropdown.classList.toggle('is-open');
        const list = dropdown.querySelector('ul');
        const maxHeight = getHiddenElementHeight(list);
        if (list.getAttribute('style')) {
            list.removeAttribute('style');
        } else {
            list.style.maxHeight = maxHeight + 'px';
        }
    }

    function getHiddenElementHeight(el) {
        var clone = el.cloneNode(true);
        el.parentElement.append(clone);
        clone.style.zIndex = '-100';
        clone.style.color = 'transparent';
        clone.style.maxHeight = '5000px';
        var height = clone.offsetHeight;
        clone.remove();
        return height;
    }

    initStickyWidget();
    initLangPanel();
    initMobileMenu(document.querySelector('.burger-menu'), document.querySelector('.site-header__bottom'));

})

$(document).ready(function () {

    //*<Hipples>================================================================================================

    var engine = new Bloodhound({
        remote: {
            url: '/find?q=%QUERY%',
            wildcard: '%QUERY%'
        },
        datumTokenizer: Bloodhound.tokenizers.whitespace('q'),
        queryTokenizer: Bloodhound.tokenizers.whitespace
    });

    $("[data-search]").typeahead({
        hint: true,
        highlight: true,
        minLength: 0
    }, {
        source: engine.ttAdapter(),

        name: 'usersList',

        templates: {
            empty: [
                '<div class="search-dropdown"><div class="search-dropdown__item"><span>Nothing found.</span></div></div>'
            ],
            header: [
                '<div class="search-dropdown">'
            ],
            suggestion: function (data) {
                return '<a href="' + data.profile.username + '" class="search-dropdown__item">' + '<span>' + data.name + '</span>' + '- @' + data.profile.username + '</a>'
            }
        }
    });


    //*</Hipples>=================================================================================================

})