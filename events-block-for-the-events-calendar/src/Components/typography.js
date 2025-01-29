import {Component,Fragment} from "@wordpress/element";
import Fonts from "../font.json";
const {PanelBody,DateTimePicker,TextControl,ColorPicker,SelectControl,ToggleControl,RangeControl,RadioControl} = wp.components;
const {__} = wp.i18n
export class Typography extends Component{
    render()
    {   let fontFamilyOption=[];
        for (const property in Fonts.fonts) {
            fontFamilyOption.push({label:property,value:Fonts.fonts[property]})
          }
        let fontWeightOption =[
            {label:"100",value:"100"},
            {label:"200",value:"200"},
            {label:"300",value:"300"},
            {label:"400",value:"400"},
            {label:"500",value:"500"},
            {label:"600",value:"600"},
            {label:"700",value:"700"},
            {label:"800",value:"800"},
            {label:"900",value:"900"},
            {label:"Normal",value:"normal"},
            {label:"Bold",value:"bold"}
        ]
        let fontTransformOption = [
            {label:'Uppercasse',value:'uppercase'},
            {label:'Lowercase',value:'lowercase'},
            {label:'Capitalize',value:'capitalize'},
            {label:'Normal',value:'normal'},
            {label:'Default',value:'none'},
        ]
        let fontStyleOption = [
            {label:'Normal',value:'normal'},
            {label:'Italic',value:'italic'},
            {label:'Oblique',value:'oblique'},
            {label:'Default',value:'initial'},
        ]
        let textDecorationOption = [
            {label:'None',value:'none'},
            {label:'Overline',value:'overline'},
            {label:'Underline',value:'underline'},
            {label:'Line-Through',value:'line-through'},
            {label:'Default',value:'initial'},
        ]
        return(
            <Fragment>
                <RangeControl
                label={__("Font Size (in Pixel)","ebec")}
                value={this.props.fontSize}
                onChange={this.props.fontSizeHandle}
                min={0}
                max={100}
                />

                <SelectControl
                    label={ __( 'Family','ebec' ) }
                    options={fontFamilyOption}
                    value={this.props.fontFamily}
                    onChange={this.props.fontFamilyHandle}
				/>
                <SelectControl
                    label={ __( 'Weight','ebec' ) }
                    options={fontWeightOption}
                    value={this.props.fontWeight}
                    onChange={this.props.fontWeightHandle}
				/>
                <SelectControl
                    label={ __( 'Transform','ebec' ) }
                    options={fontTransformOption}
                    value={this.props.fontTransform}
                    onChange={this.props.fontTransformHandle}
				/>
                <SelectControl
                    label={ __( 'Style','ebec' ) }
                    options={fontStyleOption}
                    value={this.props.fontStyle}
                    onChange={this.props.fontStyleHandle}
				/>
                <SelectControl
                    label={ __( ' Decoration','ebec' ) }
                    options={textDecorationOption}
                    value={this.props.textDecoration}
                    onChange={this.props.textDecorationHandle}
				/>
                <RangeControl
                    label={__("Line Height (in Pixel)","ebec")}
                    value={this.props.eventLineHeight}
                    onChange={this.props.eventLineHeightHandle}
                    min={0}
                    max={100}
                />
                <RangeControl
                    label={__("Letter Spacing (in Pixel)","ebec")}
                    value={this.props.eventLetterSpacing}
                    onChange={this.props.eventLetterSpacingHandle}
                    min={-5}
                    max={10}
                    step={0.1}
                />
            </Fragment>
        )
    }
}