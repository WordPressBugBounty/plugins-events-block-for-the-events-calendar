import { Component, Fragment } from '@wordpress/element';
import { SelectControl, RangeControl } from '@wordpress/components';
import Fonts from '../font.json';

const { __ } = wp.i18n;

const fontFamilyOption = Object.keys( Fonts.fonts ).map( ( property ) => ( {
	label: property,
	value: Fonts.fonts[ property ],
} ) );

const fontWeightOption = [
	{ label: '100', value: '100' },
	{ label: '200', value: '200' },
	{ label: '300', value: '300' },
	{ label: '400', value: '400' },
	{ label: '500', value: '500' },
	{ label: '600', value: '600' },
	{ label: '700', value: '700' },
	{ label: '800', value: '800' },
	{ label: '900', value: '900' },
	{ label: 'Normal', value: 'normal' },
	{ label: 'Bold', value: 'bold' },
];

const fontTransformOption = [
	{ label: __( 'Uppercase', 'events-block-for-the-events-calendar' ), value: 'uppercase' },
	{ label: __( 'Lowercase', 'events-block-for-the-events-calendar' ), value: 'lowercase' },
	{ label: __( 'Capitalize', 'events-block-for-the-events-calendar' ), value: 'capitalize' },
	{ label: __( 'Normal', 'events-block-for-the-events-calendar' ), value: 'normal' },
	{ label: __( 'Default', 'events-block-for-the-events-calendar' ), value: 'none' },
];

const fontStyleOption = [
	{ label: __( 'Normal', 'events-block-for-the-events-calendar' ), value: 'normal' },
	{ label: __( 'Italic', 'events-block-for-the-events-calendar' ), value: 'italic' },
	{ label: __( 'Oblique', 'events-block-for-the-events-calendar' ), value: 'oblique' },
	{ label: __( 'Default', 'events-block-for-the-events-calendar' ), value: 'initial' },
];

const textDecorationOption = [
	{ label: __( 'None', 'events-block-for-the-events-calendar' ), value: 'none' },
	{ label: __( 'Overline', 'events-block-for-the-events-calendar' ), value: 'overline' },
	{ label: __( 'Underline', 'events-block-for-the-events-calendar' ), value: 'underline' },
	{ label: __( 'Line-Through', 'events-block-for-the-events-calendar' ), value: 'line-through' },
	{ label: __( 'Default', 'events-block-for-the-events-calendar' ), value: 'initial' },
];

export class Typography extends Component {
	render() {
		return (
			<Fragment>
				<RangeControl
					__next40pxDefaultSize={ true }
					label={ __( 'Font Size (in Pixel)', 'events-block-for-the-events-calendar' ) }
					value={ this.props.fontSize }
					onChange={ this.props.fontSizeHandle }
					min={ 0 }
					max={ 100 }
				/>

				<SelectControl
					__next40pxDefaultSize={ true }
					label={ __( 'Family', 'events-block-for-the-events-calendar' ) }
					options={ fontFamilyOption }
					value={ this.props.fontFamily }
					onChange={ this.props.fontFamilyHandle }
				/>
				<SelectControl
					__next40pxDefaultSize={ true }
					label={ __( 'Weight', 'events-block-for-the-events-calendar' ) }
					options={ fontWeightOption }
					value={ this.props.fontWeight }
					onChange={ this.props.fontWeightHandle }
				/>
				<SelectControl
					__next40pxDefaultSize={ true }
					label={ __( 'Transform', 'events-block-for-the-events-calendar' ) }
					options={ fontTransformOption }
					value={ this.props.fontTransform }
					onChange={ this.props.fontTransformHandle }
				/>
				<SelectControl
					__next40pxDefaultSize={ true }
					label={ __( 'Style', 'events-block-for-the-events-calendar' ) }
					options={ fontStyleOption }
					value={ this.props.fontStyle }
					onChange={ this.props.fontStyleHandle }
				/>
				<SelectControl
					__next40pxDefaultSize={ true }
					label={ __( 'Decoration', 'events-block-for-the-events-calendar' ) }
					options={ textDecorationOption }
					value={ this.props.textDecoration }
					onChange={ this.props.textDecorationHandle }
				/>
				<RangeControl
					__next40pxDefaultSize={ true }
					label={ __( 'Line Height (in Pixel)', 'events-block-for-the-events-calendar' ) }
					value={ this.props.eventLineHeight }
					onChange={ this.props.eventLineHeightHandle }
					min={ 0 }
					max={ 100 }
				/>
				<RangeControl
					__next40pxDefaultSize={ true }
					label={ __( 'Letter Spacing (in Pixel)', 'events-block-for-the-events-calendar' ) }
					value={ this.props.eventLetterSpacing }
					onChange={ this.props.eventLetterSpacingHandle }
					min={ -5 }
					max={ 10 }
					step={ 0.1 }
				/>
			</Fragment>
		);
	}
}
