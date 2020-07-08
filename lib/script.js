window.onload = () => {
  const $ = (e) => document.querySelector(e);

  const refs = {
	header:  $('.header'),
	name:    $('.person-name div p')
  };

  const getInitials = () => {
	return refs.name.innerText
	  .split(' ')
	  .map(x => x[0].toUpperCase());
  };

  const createAvatar = () => {
	const [name, surname] = getInitials();

	const avatar =
	  `<div class="avatar">
           <p>
				<span class="name">${name}</span>
				<span class="surname">${surname}</span>
           </p>
	   </div>`;

	refs.header.insertAdjacentHTML('afterbegin', avatar);
  };

  createAvatar();
};
