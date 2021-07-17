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
	refs().content.onscroll = (e) => {
	  let { scrollTop, scrollHeight, clientHeight } = e.target;
	  let maxScroll = scrollHeight - clientHeight;
	  let scrollBy = Math.floor((scrollTop * 100) / maxScroll);

	  thumb.setAttribute('style', `top: ${scrollBy}px`);
	};
  });
};
