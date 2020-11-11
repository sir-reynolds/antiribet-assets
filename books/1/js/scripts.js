document.querySelector('.toggle-search').addEventListener('click', function() {
    document.querySelector('#menu > div > div').style.display = 'none';
    document.querySelector('.search-form').style.display = 'flex';
});

document.querySelector('.close-search').addEventListener('click', function() {
    document.querySelector('#menu > div > div').style.display = 'flex';
    document.querySelector('.search-form').style.display = 'none';
});

var images = document.getElementsByTagName('img');

window.onload = function() {
    scrolling();

    addEventListener('scroll', scrolling);
};

var scrolling = function() {
    lazy_images();
};

function lazy_images()
{
    for (var i = 0 ; i < images.length; i++) {
        if (element_in_viewport(images[i])) {
            if ( ! images[i].classList.contains('lazy-loaded') && images[i].getAttribute('data-src')) {
                var error_src = '';

                if (images[i].getAttribute('data-error')) {
                    error_src = images[i].getAttribute('data-error');
                }

                images[i].classList.add('lazy-hide');
                images[i].setAttribute('src', images[i].getAttribute('data-src'));

                if (images[i].getAttribute('data-srcset')) {
                    images[i].setAttribute('srcset', images[i].getAttribute('data-srcset'));
                }

                images[i].onload = function() {
                    this.classList.remove('lazy-hide');
                    this.classList.add('lazy-show', 'lazy-loaded');
                    this.onload = null;
                };

                images[i].onerror = function() {
                    if (error_src) {
                        this.setAttribute('src', error_src);
                    }

                    this.classList.remove('lazy-hide');
                    this.classList.add('lazy-show', 'lazy-loaded');
                };
            }
        }
    }
}

function element_in_viewport(el)
{
    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

    return (vertInView && horInView);
}