window.onload = () => {
  const $ = (e) => document.querySelector(e);

  const refs = () => {
	return {
	  header:          $('.header'),
	  name:            $('.person-name div p'),
	  content:         $('#content'),
	  scrollbar:       $('.scrollbar'),
	  scrollbar_thumb: $('.scrollbar-thumb')
	};
  }

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

	refs().content.insertAdjacentHTML('afterbegin', template);
	callback(refs().scrollbar_thumb);
  };

  createAvatar();

  createScrollbar((thumb) => {
	refs().content.onscroll = (e) => {
	  let { scrollTop, scrollHeight, clientHeight } = e.target;
	  let maxScroll = scrollHeight - clientHeight;

	  thumb.setAttribute('style', `top: ${(scrollTop * 100) / maxScroll}%`)
	}
  });
};
