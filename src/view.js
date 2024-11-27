import { createRoot } from 'react-dom/client';

import './style.scss';
import Style from './Components/Common/Style';
import IconList from './Components/FrontEnd/IconList';

// Icon List block
document.addEventListener('DOMContentLoaded', () => {
	const iconListEls = document.querySelectorAll('.wp-block-ilb-icon-list');
	iconListEls.forEach(iconListEl => {
		const attributes = JSON.parse(iconListEl.dataset.attributes);

		createRoot(iconListEl).render(<>
			<Style attributes={attributes} id={iconListEl.id} />

			<IconList attributes={attributes} />
		</>);

		iconListEl?.removeAttribute('data-attributes');
	});
});