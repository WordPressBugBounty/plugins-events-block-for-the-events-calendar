import {Component,Fragment} from "@wordpress/element";
import {Typography} from "../Components/typography.js";
const { InspectorControls,PanelColorSettings } = wp.blockEditor;
const {PanelBody,DateTimePicker,TextControl,ColorPicker,SelectControl,ToggleControl,RangeControl,RadioControl,FormTokenField } = wp.components;
import { CardBody,ColorPalette, __experimentalNumberControl as NumberControl   } from '@wordpress/components';
const {__} = wp.i18n
export class Inspector extends Component{
    render(){
        const dateFormatsOptions = [
			{label:"Default (01 January 2019)",value:"default"},
			{label:"Md,Y (Jan 01, 2019)",value:"MD,Y"},
			{label:"Fd,Y (January 01, 2019)",value:"FD,Y"},
			{label:"dM (01 Jan)",value:"DM"},
			{label:"dF (01 January)",value:"DF"},
			{label:"Md (Jan 01)",value:"MD"},
			{label:"Fd (January 01)",value:"FD"},
			{label:"Md,YT (Jan 01, 2019 8:00am-5:00pm)",value:"MD,YT"},
			{label:"Full (01 January 2019 8:00am-5:00pm)",value:"full"},
			{label: "jMl (1 Jan Monday)", value: "jMl" },
            {label: "d.FY (01. January 2019)", value: "d.FY" },
            {label: "d.F (01. January)", value: "d.F" },
            {label: "ldF (Monday 01 January)", value: "ldF" },
            {label: "Mdl (Jan 01 Monday)", value: "Mdl" },
            {label: "d.Ml (01. Jan Monday)", value: "d.Ml" },
            {label: "dFT (01 January 8:00am-5:00pm)", value: "dFT" }
		 ];
         const orderOptions=[
			{label:"ASC",value:"ASC"},
			{label:"DESC",value:"DESC"}		
		];
        const timeOptions = [
            {label: 'Upcoming', value: 'future'},
			{label: 'Past', value: 'past'},
			{label: 'All', value: 'all'}
		];
        const Options = [
            {label: 'NO', value: 'no'},
			{label: 'YES', value: 'yes'}
		];
        const eventTimeOptions = [
            {label: 'All Event', value:'all'},
			{label: 'Event in between Date Range', value:'date_range'}
		];

    
        
        return(
            <Fragment>
            <InspectorControls>
                <PanelBody title={__("Event Panel","ebec")}>    
                    <SelectControl
						label={ __( 'Layout','ebec' ) }
						description={ __( 'Select events layout' ) }
						options={ 
                            [
                                {label: 'Default' , value:'default'},
                                {label: 'Minimal' , value:'minimal'},
                            ]
                         }
						value= {this.props.eventLayout}
						onChange={this.props.eventLayoutHandle}
					/>
                    <div className="ebec-impressum-select-multiple">
                        <FormTokenField
                        label={__( 'Select Category','ebec' )}
                    value={this.props.categorySelect}
                    suggestions={ this.props.category }
                    onChange={ this.props.categorySelectHandle}
                    __experimentalExpandOnFocus = {true}
                    __experimentalShowHowTo ={false}
                    />
                  
                    </div>
                    <SelectControl
						label={ __( 'Date Formats','ebec' ) }
						description={ __( 'yes/no' ) }
						options={ dateFormatsOptions }
						value= {this.props.dateFormats}
						onChange={this.props.dateFormatHandle}
					/>
                    <NumberControl
						label={ __( 'Limit the events','ebec' ) }
                        isShiftStepEnabled={ true }
                        shiftStep={1}
						value={this.props.eventsLimit}
						onChange={this.props.eventsLimitHandle }
                        required={true}
                        min={1}
					/>
                    <br></br>
                    <SelectControl
                        label={ __( 'Events Order','ebec' ) }
                        description={ __( ' Events Order' ) }
                        options={ orderOptions }
                        value={this.props.eventOrder}
						onChange={this.props.eventOrderHandle}
						/>
                    {'minimal' !== this.props.eventLayout &&
                        <>
                            <SelectControl
                            label={ __( 'Hide Venue' ,'ebec') }
                            description={ __( 'Hide Venue Settings' ) }
                            options={ Options }
                            value={this.props.venue}
                            onChange={this.props.venueHandle}
                            />
                            <SelectControl
                                label={ __( 'Display Description','ebec' ) }
                                description={ __( 'Display Description Settings' ) }
                                options={ Options }
                                value={this.props.displayDesc}
                                onChange={this.props.displayDescHandle}
                                />
                            {'yes' === this.props.displayDesc &&
                                <SelectControl
                                label={ __( 'Event Description?','ebec' ) }
                                description={ __( 'Event Description Settings' ) }
                                options={ [
                                    {label: 'Short', value: 'short'},
                                    {label: 'Full', value: 'full'},
                                ] }
                                value={this.props.eventDescType}
                                onChange={this.props.eventDescTypeHandle}
                                />
                            }
                        </>
                    }
                    {/* <SelectControl
                        label={ __( 'Display Category','ebec' ) }
                        description={ __( 'Display Category Settings' ) }
                        options={ Options }
                        value={this.props.displayCat}
						onChange={this.props.displayCatHandle}
                    /> */}

                    <ToggleControl 
                    label={ __('Enable this option if you want to Show Events in between date range','ebec') }
                    checked={ this.props.eventTime}
                    onChange={this.props.eventTimeHandle}
                    />
                    <p style={{color:"red"}}>Selet Event Date option only works on front-end side</p>
                    <SelectControl
                        label={ __( 'Events Type (Past/Future Events)','ebec' ) }
                        description={ __( 'Events Type' ) }
                        options={ timeOptions }
                        value={this.props.eventType}
                        onChange={this.props.eventTypeHandle}
                    />
                     <p style={{color:"red"}}>Events Type option only works on front-end side</p>
                </PanelBody>
                        { this.props.eventTime === true &&
                        <PanelBody title={__("Start Event Panel","ebec")}>
                        <DateTimePicker
                        label = {__('Start Date','ebec')}
                        currentDate={this.props.eventRangeStart}
                        onChange={this.props.eventRangeStartHandle}
                        is12Hour={ true }
                        />
                        </PanelBody>
                     } 
                    { this.props.eventTime == true &&
                        <PanelBody title={__("End Event Panel","ebec")}>
                        <DateTimePicker
                        currentDate={this.props.eventRangeEnd}
                        onChange={this.props.eventRangeEndHandle}
                        is12Hour={ true }
                        />
                        </PanelBody>
                     } 
                     <TextControl 
                         label="No Event Text (Message to show if no event will available)"
                         value={this.props.noEventText}
                         onChange={this.props.noEventTextHandle}
                     />
                <PanelBody title={__("Main Skin Color","ebec")} initialOpen={ false }>           
                    <ColorPicker 
                        color={this.props.skinColor}
                        onChangeComplete={this.props.skinColorHandle}
                        disableAlpha
                    />  
                </PanelBody>  

                 {/* Date Panel Style Setting */}     
                <PanelBody title={__("Event Date Style","ebec")} initialOpen={ false }>           
                    <ColorPicker 
                        color={this.props.eventDateColor}
                        onChangeComplete={this.props.eventDateColorHandle}
                        disableAlpha
                    />  
                      <Typography fontSize={this.props.eventDateFont} fontSizeHandle={this.props.eventDateFontHandle}  fontFamily={this.props.eventDateFamilyFont} fontFamilyHandle={this.props.eventDateFamilyFontHandle} 
                    fontWeight={this.props.eventDateWeight} fontWeightHandle={this.props.eventDateWeightHandle} 
                    fontTransform={this.props.eventDateTransform} fontTransformHandle={this.props.eventDateTransformHandle} fontStyle={this.props.eventDateStyle} fontStyleHandle={this.props.eventDateStyleHandle} textDecoration={this.props.eventDateDecoration} textDecorationHandle={this.props.eventDateDecorationHandle} eventLineHeight={this.props.eventDateLineHeight} eventLineHeightHandle={this.props.eventDateLineHeightHandle} eventLetterSpacing={this.props.eventDateLetterSpacing} eventLetterSpacingHandle={this.props.eventDateLetterSpacingHandle}/>
                </PanelBody> 

                   {/* Title Panel Style Setting */}    
                <PanelBody title={__("Event Title Style","ebec")} initialOpen={ false }>           
                    <ColorPicker 
                        color={this.props.eventTitleColor}
                        onChangeComplete={this.props.eventTitleColorHandle}
                        disableAlpha
                    />  
                    <Typography fontSize={this.props.eventTitleFont} fontSizeHandle={this.props.eventTitleFontHandle}  fontFamily={this.props.eventTitleFamilyFont} fontFamilyHandle={this.props.eventTitleFamilyFontHandle} 
                    fontWeight={this.props.eventTitleWeight} fontWeightHandle={this.props.eventTitleWeightHandle} 
                    fontTransform={this.props.eventTitleTransform} fontTransformHandle={this.props.eventTitleTransformHandle} fontStyle={this.props.eventTitleStyle} fontStyleHandle={this.props.eventTitleStyleHandle} textDecoration={this.props.eventTitleDecoration} textDecorationHandle={this.props.eventTitleDecorationHandle} eventLineHeight={this.props.eventTitleLineHeight} eventLineHeightHandle={this.props.eventTitleLineHeightHandle} eventLetterSpacing={this.props.eventTitleLetterSpacing} eventLetterSpacingHandle={this.props.eventTitleLetterSpacingHandle}/>
                </PanelBody>  
                   {/* Venue Panel Style Setting */}
                     {'minimal' !== this.props.eventLayout &&
                        <>
                            <PanelBody title={__("Event Venue Style","ebec")} initialOpen={ false }>           
                                <ColorPicker 
                                    color={this.props.eventVenueColor}
                                    onChangeComplete={this.props.eventVenueColorHandle}
                                    disableAlpha
                                />  
                                <Typography fontSize={this.props.eventVenueFont} fontSizeHandle={this.props.eventVenueFontHandle}  fontFamily={this.props.eventVenueFamilyFont} fontFamilyHandle={this.props.eventVenueFamilyFontHandle} 
                                fontWeight={this.props.eventVenueWeight} fontWeightHandle={this.props.eventVenueWeightHandle} 
                                fontTransform={this.props.eventVenueTransform} fontTransformHandle={this.props.eventVenueTransformHandle} fontStyle={this.props.eventVenueStyle} fontStyleHandle={this.props.eventVenueStyleHandle} textDecoration={this.props.eventVenueDecoration} textDecorationHandle={this.props.eventVenueDecorationHandle} eventLineHeight={this.props.eventVenueLineHeight} eventLineHeightHandle={this.props.eventVenueLineHeightHandle} eventLetterSpacing={this.props.eventVenueLetterSpacing} eventLetterSpacingHandle={this.props.eventVenueLetterSpacingHandle}/>
                            </PanelBody> 

                            {/* Description Panel Style Setting */} 
                            <PanelBody title={__("Event Desciption Style","ebec")} initialOpen={ false }>           
                                <ColorPicker 
                                    color={this.props.eventDescriptionColor}
                                    onChangeComplete={this.props.eventDescriptionColorHandle}
                                    disableAlpha
                                />  
                                <Typography fontSize={this.props.eventDescriptionFont} fontSizeHandle={this.props.eventDescriptionFontHandle}  fontFamily={this.props.eventDescriptionFamilyFont} fontFamilyHandle={this.props.eventDescriptionFamilyFontHandle} 
                                fontWeight={this.props.eventDescriptionWeight} fontWeightHandle={this.props.eventDescriptionWeightHandle} 
                                fontTransform={this.props.eventDescriptionTransform} fontTransformHandle={this.props.eventDescriptionTransformHandle} fontStyle={this.props.eventDescriptionStyle} fontStyleHandle={this.props.eventDescriptionStyleHandle} textDecoration={this.props.eventDescriptionDecoration} textDecorationHandle={this.props.eventDescriptionDecorationHandle} eventLineHeight={this.props.eventDescriptionLineHeight} eventLineHeightHandle={this.props.eventDescriptionLineHeightHandle} eventLetterSpacing={this.props.eventDescriptionLetterSpacing} eventLetterSpacingHandle={this.props.eventDescriptionLetterSpacingHandle}/>
                                
                            </PanelBody> 
                        </>
                     }

                     {/* Link Panel Style Setting */}
                <PanelBody title={__("Find out More Style","ebec")} initialOpen={ false }>           
                <TextControl 
                    label="Find out More Text"
                    value={this.props.eventLinkName}
                    onChange={this.props.eventLinkNameHandle}
                />
                    <ColorPicker 
                        color={this.props.eventLinkColor}
                        onChangeComplete={this.props.eventLinkColorHandle}
                        disableAlpha
                    />  
                    <Typography fontSize={this.props.eventLinkFont} fontSizeHandle={this.props.eventLinkFontHandle}  fontFamily={this.props.eventLinkFamilyFont} fontFamilyHandle={this.props.eventLinkFamilyFontHandle} 
                    fontWeight={this.props.eventLinkWeight} fontWeightHandle={this.props.eventLinkWeightHandle} 
                    fontTransform={this.props.eventLinkTransform} fontTransformHandle={this.props.eventLinkTransformHandle} fontStyle={this.props.eventLinkStyle} fontStyleHandle={this.props.eventLinkStyleHandle} textDecoration={this.props.eventLinkDecoration} textDecorationHandle={this.props.eventLinkDecorationHandle} eventLineHeight={this.props.eventLinkLineHeight} eventLineHeightHandle={this.props.eventLinkLineHeightHandle} eventLetterSpacing={this.props.eventLinkLetterSpacing} eventLetterSpacingHandle={this.props.eventLinkLetterSpacingHandle}/>
                </PanelBody>
                <PanelBody title={__("Please Share Your Valuable Feedback.","ebec")}>
                    <CardBody className={"ebec-review-tab"}>{__("We hope you liked our plugin created events. Please share your valuable feedback.","ebec")}<br></br><a className="components-button is-primary is-small" href="https://wordpress.org/support/plugin/events-block-for-the-events-calendar/#new-post" target="_blank" >Rate Us ★★★★★</a>
                    </CardBody>
                </PanelBody>
            </InspectorControls>
            </Fragment>
        )
    }
}