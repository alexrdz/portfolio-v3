(function() {
  'use strict'

  //- jquery-style selectors
  window.$ = function (selector) {
    return document.querySelector(selector)
  }
  //- multiple selectors
  window.$$ = function (tagElement) {
    return document.querySelectorAll(tagElement)
  }

  //- classList functions
  function hasClass(el, className) {
      return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
  }
  function addClass(el, className) {
      if (el.classList) el.classList.add(className);
      else if (!hasClass(el, className)) el.className += ' ' + className;
  }
  function removeClass(el, className) {
      if (el.classList) el.classList.remove(className);
      else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
  }

  //- load function, jquery-style load() method
  function load (fileName, domNode) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', '/'+fileName+'.html');
    xhr.onload = function() {
      if (xhr.status === 200) {
        domNode.innerHTML=xhr.responseText
      }
      else {
          console.log('Request failed.  Returned status of ' + xhr.status)
      }
    }
    xhr.send()
  }



  //- cache DOM
  var body = $('body')
  var wrapper = $('.page-wrapper')
  var navbar = $('.Navigation-trigger')
  var navTrigger = $('.js-navTrigger')
  var menu = $('.Navigation')
  var navLinks = $$('.Navigation a')


  //- handle show/hide menu
  navTrigger.addEventListener('click', function () {
    this.classList.toggle('is-visible')
    menu.classList.toggle('is-visible')
    if (hasClass(navbar, 'is-scrolling'))
      navbar.classList.toggle('is-scrolling')
    navLinks.forEach(function (link) {
      link.classList.toggle('slideInLeft')
    })

  })

  //- handle nav links
  navLinks.forEach(function (link) {
    var page = link.getAttribute('href')
    link.addEventListener('click', function (e) {
      e.preventDefault()
      var loc = location.pathname
      if (page === loc) return
      // retract navigation
      removeClass(menu, 'is-visible')
      setTimeout(function () {
        addClass(wrapper, 'fadeOutUp')
      }, 500)
      // transition then go to page
      setTimeout(function () {
        window.location.href = page
      }, 1000)
    })
  })

  //- window scroll
  window.onscroll = function() {navBar()};
  function navBar () {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      addClass(navbar, 'is-scrolling')
    } else {
      removeClass(navbar, 'is-scrolling')
    }
  }
  function myFunction() {
      console.log('is scrolling...')
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
          body.className = "test";
      } else {
          body.className = "";
      }
  }
  
  //- fadeInUp after page loads
  Pace.on('done', function () {
    addClass(wrapper, 'fadeInUp')
  })

  
})();
