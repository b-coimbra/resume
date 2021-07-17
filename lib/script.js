window.onload = () => {
  setTimeout(() => document.body.classList.remove('loading'), 100);

  const $ = (e) => {
	const elems = document.querySelectorAll(e);
	return elems.length > 1 ? elems : elems[0];
  };

  const refs = () => {
	return {
	  header:          $('.header'),
	  name:            $('.person-name > div:first-of-type p'),
	  content:         $('#content'),
	  main:            $('#main'),
	  scrollbar:       $('.scrollbar'),
	  scrollbar_thumb: $('.scrollbar-thumb'),
	  social:          $('.social'),
	  links:           $('.info-description.link'),
      crypto:          $('.eth')
    };
  };

  const templates = {
    avatar: (name, surname) =>
      `<div class="avatar">
           <p>
                <span class="name">${name}</span>
                <span class="surname">${surname}</span>
           </p>
       </div>`,
    scrollbar:
      `<div class="scrollbar">
            <div class="scrollbar-thumb"></div>
        </div>`
  };

  const getInitials = () => {
    return refs().name.innerText
      .split(' ')
      .map(x => x[0].toUpperCase());
  };

  const createAvatar = () => {
    const [name, surname] = getInitials();
    const template = templates.avatar(name, surname);

    refs().header.insertAdjacentHTML('afterbegin', template);
  };

  const createScrollbar = (callback) => {
    const template = templates.scrollbar;

    refs().main.insertAdjacentHTML('afterbegin', template);
    callback(refs().scrollbar_thumb);
  };

  const launchLinks = () => {
    refs().links.forEach(link => {
      link.onclick = () => {
        const url = link
          .childNodes[3]
          .childNodes[1]
          .getAttribute('link');

        if (url != undefined)
          window.open(url, '_blank');
      };
    });
  };

  const moveContents = () => {
    const main = Object.assign(document.createElement('div'), {
      'id': 'main'
    });

    document.body.insertBefore(main, refs().content);
    refs().main.appendChild(refs().content);
  };

  createAvatar();
  launchLinks();
  moveContents();

  createScrollbar((thumb) => {
    let scrollPos = { top: 0, y: 0 };

    const mouseMoveHandler = (e) => {
      const dy = e.clientY - scrollPos.y;

      let { scrollHeight, clientHeight } = refs().content;
      let maxScroll = scrollHeight - clientHeight;
      let scrollBy = Math.floor((dy * maxScroll) / 100);

      scrollBy = scrollPos.top - scrollBy;

      if (scrollBy > 0) return;

      refs().content.scrollTop = Math.abs(scrollBy);
    };

    const mouseUpHandler = () => {
      thumb.style.cursor = 'grab';
      document.onmousemove = null;
    };

    thumb.onmousedown = (e) => {
      thumb.style.cursor = 'grabbing';

      scrollPos = {
        top: -refs().content.scrollTop,
        y: e.clientY
      };

      document.onmousemove = mouseMoveHandler;
      document.onmouseup = mouseUpHandler;
    };

    refs().content.onscroll = (e) => {
      let { scrollTop, scrollHeight, clientHeight } = e.target;
      let maxScroll = scrollHeight - clientHeight;
      let scrollBy = Math.floor((scrollTop * 100) / maxScroll);

      thumb.style.top = scrollBy + 'px';
    };
  });
};
