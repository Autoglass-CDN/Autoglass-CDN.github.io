(function ($) {
  // function enableSlide() {
  //   $(
  //     "footer .footer-qd-v1-content .container .row > div:nth-child(2) ul.footer-qd-v1-menu-grid > li p"
  //   ).click(function () {
  //     toggleSlide(this);
  //   });
  //   closeSlides();
  // }

  // function closeSlides() {
  //   $(
  //     "footer .footer-qd-v1-content .container .row > div:nth-child(2) ul.footer-qd-v1-menu-grid > li p"
  //   ).each(function () {
  //     toggleSlide(this);
  //   });
  // }

  // function toggleSlide(t) {
  //   if (isMobile()) {
  //     $(t).next().slideToggle();
  //   }
  // }

  // function isMobile() {
  //   const MOBILE_SIZE = 769;
  //   return window.innerWidth <= MOBILE_SIZE;
  // }

  // enableSlide();
   function adjustFooterLayout() {
      let footerMobile = document.querySelector('.footer-qd-v1 .footer-qd-v1-content .container.footer .row');
      
      if (footerMobile) {
        if (window.innerWidth <= 1024) {
          footerMobile.style.flexDirection = 'row';
          footerMobile.style.flexWrap = 'wrap';
        } else {
          footerMobile.style.flexDirection = '';
          footerMobile.style.flexWrap = '';
        }
      }
    }

    adjustFooterLayout();

    window.addEventListener('resize', adjustFooterLayout);
})(jQueryNew);