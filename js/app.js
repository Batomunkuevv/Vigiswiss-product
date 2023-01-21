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

function slideDown(toggler, blocks) {
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
        block.style.height = `${block.scrollHeight}px`;
        toggler.classList.add("is-active");
        block.classList.add("is-expanded");

        block.addEventListener("transitionend", () => {
            if (block.style.height !== "0px") {
                block.style.height = "auto";
            }
        });
    }


}

function slideUp(toggler, blocks) {
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
        block.style.height = `${block.scrollHeight}px`;
        window.getComputedStyle(block, null).getPropertyValue("height");
        block.style.height = "0";
        toggler.classList.remove("is-active");
        block.classList.remove("is-expanded");

        block.addEventListener("transitionend", () => {
            if (block.style.height !== "0px") {
                block.style.height = "auto";
            }
        });
    }
}


window.addEventListener("DOMContentLoaded", () => {



    //*<Mobile notifications>================================================================================================

    if (document.documentElement.clientWidth < 768) {
        const notifications = document.querySelectorAll('[data-notifications]'),
            overlay = document.querySelector('.overlay');

        notifications.forEach(item => {

            const notificationOpen = item.querySelector('[data-notifications-open]'),
                notificationClose = item.querySelector('[data-notifications-close]'),
                notificationBody = item.querySelector('[data-notifications-body]');

            notificationOpen.addEventListener('click', (e) => {
                openNotification(notificationBody);
            })

            notificationClose.addEventListener('click', (e) => {
                closeNotification(notificationBody);
            })

            overlay.addEventListener('click', (e) => {
                closeNotification(notificationBody);
            })

        })

        function openNotification(notificationBody) {
            overlay.classList.add('visible');
            notificationBody.classList.add('visible');
        }

        function closeNotification(notificationBody) {
            overlay.classList.remove('visible');
            notificationBody.classList.remove('visible');
        }
    }

    //*</Mobile notifications>=================================================================================================

    //*<Popups>================================================================================================

    const overlay = document.querySelector('.overlay');

    if (overlay) {
        setTimeout(function () { overlay.style.paddingTop = document.querySelector('.site-header').getBoundingClientRect().height + 32 + 'px'; }, 200)

        overlay.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('overlay')) {
                closeAllPopups();
            }
        })

        document.querySelectorAll('[data-close-modal]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                btn.closest('div.popup').classList.add('hidden');
                document.body.classList.remove('lock');
                overlay.classList.remove('visible');
                overlay.querySelectorAll('.popup__succesful').forEach(item => {
                    item.style.height = 0;
                    item.classList.remove('is-expanded')
                })
            })
        })

        document.querySelectorAll('[data-open-modal]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                overlay.classList.add('visible');
                document.body.classList.add('lock');
                document.querySelector(`[data-modal='${btn.dataset.openModal}']`).classList.remove('hidden');
            })
        })

        function closeAllPopups() {
            overlay.classList.remove('visible');
            document.body.classList.remove('lock');
            if (document.querySelector('.search-panel')) {
                searchPanel.classList.remove('open');
            }

            overlay.querySelectorAll('.popup').forEach(popup => {
                popup.classList.add('hidden');
            })
            overlay.querySelectorAll('.popup__succesful').forEach(item => {
                item.style.height = 0;
                item.classList.remove('is-expanded')
            })
        }

    }

    //?==============<Resend email>==============

    const resend = document.querySelector('[data-resend-email]');

    if (resend && !resend.classList.contains('is-active')) {
        slideDown(resend, resend.closest('div.popup').querySelector('.popup__succesful'));
    }

    //?==============</Resend email>=============



    //*</Popups>=================================================================================================

    //*<Search panel>================================================================================================

    const searchPanel = document.querySelector('.search-panel');

    let searchPanelOpen;

    if (document.documentElement.clientWidth > 1200) {
        searchPanelOpen = document.querySelector('.site-header__search > span');
    } else {
        searchPanelOpen = document.querySelector('.hero .form__item input');
    }

    if (searchPanel && searchPanelOpen) {

        const searchPanelClose = searchPanel.querySelector('.search-panel__close'),
            searchPanelInput = searchPanel.querySelector('input')

        searchPanelClose.addEventListener('click', (e) => {
            hideSearchPanel();
        })

        setTimeout(function () {
            searchPanel.style.top = document.querySelector('.site-header__top').getBoundingClientRect().height + 'px';
        }, 300)

        searchPanelInput.addEventListener('focus', (e) => {
            searchPanel.classList.add('focus');
        })

        searchPanelInput.addEventListener('blur', (e) => {
            searchPanel.classList.remove('focus');
        })

        searchPanelOpen.addEventListener('click', (e) => {
            e.preventDefault();
            openSearchPanel();
        })

        function openSearchPanel() {
            searchPanel.classList.toggle('open');
            if (searchPanelOpen.nodeName === 'INPUT') {
                searchPanelOpen.blur();
                overlay.classList.add('visible');
                searchPanelInput.focus();
            }
        }

        function hideSearchPanel() {
            searchPanel.classList.remove('open');
            if (document.querySelector('.overlay') && document.querySelector('.overlay').classList.contains('visible')) {
                overlay.classList.remove('visible');
            }
        }
    }

    //*</Search panel=================================================================================================

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

    //*<Review slider>================================================================================================

    if (document.querySelector('.reviews-slider')) {
        const reviewsCount = document.querySelector('.reviews__count');

        const reviewSlider = new Swiper('.reviews-slider', {
            direction: 'horizontal',
            slidesPerView: 'auto',
            speed: 1000,
            spaceBetween: 16,

            pagination: {
                el: '.reviews-slider__bullets',
                clickable: true,
            },

            navigation: {
                prevEl: '.reviews__prev',
                nextEl: '.reviews__next',
            },


            scrollbar: {
                el: '.reviews__scrollbar',
                draggable: true,
            },

            breakpoints: {

                992: {
                    pagination: {
                        el: '.reviews__count',
                        type: 'custom',
                        renderCustom: function (reviewSlider, current, total) {
                            return '<span>' + (current + '').padStart(2, "0") + '</span>' + ' /' + (total + '').padStart(2, "0");
                        }
                    }
                },



            }
        })

        if (document.documentElement.clientWidth < 992) {
            reviewsCount.innerHTML = `<span>${addZero(reviewSlider.realIndex + 1)}</span>/${addZero(reviewSlider.slides.length)}`;

            reviewSlider.on('slideChange', function () {
                reviewsCount.innerHTML = `<span>${addZero(reviewSlider.realIndex + 1)}</span>/${addZero(reviewSlider.slides.length)}`;
            });
        }

    }

    function addZero(num) {
        if (num > 9) {
            return;
        }
        return `0${num}`;
    }


    //*</Review slide>=================================================================================================

    //*<Spoilers>================================================================================================

    document.querySelectorAll('.spoiler__btn').forEach(btn => {
        const spoilerContent = btn.nextElementSibling;

        heightToggleElement(btn, spoilerContent);

        btn.addEventListener('click', (e) => {
            closeOtherSpoilers(btn);
        })
    })

    function closeOtherSpoilers(btn) {
        const btnParent = btn.parentNode.parentNode,
            btnOtherSpoilers = btnParent.querySelectorAll('.spoiler__btn');

        btnOtherSpoilers.forEach(otherBtn => {
            if (otherBtn !== btn && otherBtn.classList.contains('is-active')) {
                const otherBtnContent = otherBtn.nextElementSibling;
                otherBtn.classList.remove('is-active');
                otherBtn.nextElementSibling.style.height = `${otherBtnContent.scrollHeight}px`;
                window.getComputedStyle(otherBtnContent, null).getPropertyValue("height");
                otherBtnContent.style.height = "0";
                otherBtnContent.classList.remove("is-expanded");
                otherBtnContent.addEventListener("transitionend", () => {
                    if (otherBtnContent.style.height !== "0px") {
                        otherBtnContent.style.height = "auto";
                    }
                });
            }
        })
    }

    //*</Spoilers>=================================================================================================

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

    //*<Add hover on article>================================================================================================

    document.querySelectorAll('article > a').forEach(input => {

        input.addEventListener('focus', (e) => {
            input.closest('.form__item').classList.add('focus');
        })

        input.addEventListener('blur', (e) => {
            input.closest('.form__item').classList.remove('focus');
        })

    })

    //*</Add hover on article>=================================================================================================

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
            $('body').toggleClass('lock');
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

});

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