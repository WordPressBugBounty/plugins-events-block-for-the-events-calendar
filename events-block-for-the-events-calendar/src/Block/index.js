import edit from './edit.js';
import EctIcon from '../Components/icons.js';
import metadata from '../../block.json';

const { registerBlockType } = wp.blocks;

registerBlockType( metadata, {
	icon: EctIcon,
	example: {
		attributes: {
			preview: true,
			isPreview: true,
		},
	},
	edit,
	save() {
		return null;
	},
} );
