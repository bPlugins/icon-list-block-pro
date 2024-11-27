import { registerBlockType } from '@wordpress/blocks';

import metadata from '../src/block.json';
import Edit from './Components/Backend/Edit';
import './editor.scss';
import { iconListIcon } from './utils/icons';

registerBlockType(metadata, {
	icon: iconListIcon,

	// Build in Functions
	edit: Edit,

	save: () => null
});