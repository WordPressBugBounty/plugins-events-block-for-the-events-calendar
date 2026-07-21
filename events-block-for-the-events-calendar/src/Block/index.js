import edit from "./edit.js";
import EctIcon from "../Components/icons.js"
const {registerBlockType} = wp.blocks;
const {__} = wp.i18n;

registerBlockType('ebec/event-list',
{
    apiVersion:3,
    title:__("Events Block","events-block-for-the-events-calendar"),
    category:'common',
    // Block Icon
	icon: EctIcon,
    keywords: [
        __( 'event'),__('calendar'),__('events')
    ],
    example: {
        attributes: {
                'preview' : true,
                isPreview: true,
            },
        },
    edit:edit,
    save(){
        return null;
    }
}
)