import {Component,Fragment} from "@wordpress/element";
import preview from "../components/preview/events.png";
import {Inspector} from "./inspector.js";
import apiFetch from '@wordpress/api-fetch';
import {ServerSideRender,Spinner} from '@wordpress/components';
import Layout from "./layout.js";
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose'
import contentEventStyle from './styling.js';


const {__} = wp.i18n



class EventBlocks extends Component{

    constructor() {
	    super( ...arguments );

		this.state = {
			categoriesList: [],
		};

	}

    
    // Apply style attribute and fetch category
    componentDidMount() {
        const $style = document.createElement( "style" )
		$style.setAttribute( "id", "event-block-style-" + this.props.clientId )
		document.head.appendChild( $style )
        let categoryList=[];
        apiFetch( { path: '/wp/v2/tribe_events_cat?page=1&per_page=100' } ).then( ( data ) => {
            if(typeof(data)!=undefined && data != null){
            categoryList=data.map(function(val,key){
            return  val.slug;
            });
            }
            categoryList.push('all');
            this.setState( { categoriesList: categoryList } );
        } ); 

        this.props.setAttributes( { ebec_block_id: this.props.clientId } )
}
   
    render(){
        var element = document.getElementById( "event-block-style-" + this.props.clientId )
		if( element ) {
			element.innerHTML = contentEventStyle( this.props )
		}
        const {attributes,setAttributes,events}= this.props
        const{ebec_ev_category,
              ebec_max_events,
			  ebec_venue,
			  ebec_display_cate,
			  ebec_display_desc,
			  ebec_type,              
			  ebec_hide_read_more_link,
			  ebec_date_formats,
			  ebec_order,
              ebec_event_source,
              ebec_date_range_start,
              ebec_date_range_end,
              main_skin_color,
              event_date_color,
              event_title_color,
              event_venue_color,
              event_description_color,
              event_link_color,
              event_date_font,
              event_title_font,
              event_venue_font,
              event_description_font,
              event_link_font,
              event_date_family,
              event_date_weight,
              event_date_transform,
              event_date_style,
              event_date_decoration,
              event_date_line_height,
              event_date_letter_spacing,
              event_title_family,
              event_title_weight,
              event_title_transform,
              event_title_style,
              event_title_decoration,
              event_title_line_height,
              event_title_letter_spacing,
              event_venue_family,
              event_venue_weight,
              event_venue_transform,
              event_venue_style,
              event_venue_decoration,
              event_venue_line_height,
              event_venue_letter_spacing,
              event_description_family,
              event_description_weight,
              event_description_transform,
              event_description_style,
              event_description_decoration,
              event_description_line_height,
              event_description_letter_spacing,
              event_link_family,
              event_link_weight,
              event_link_transform,
              event_link_style,
              event_link_decoration,
              event_link_line_height,
              event_link_letter_spacing,
              event_link_name,
              no_event_text,
              isPreview,
              event_layout,
              event_desc_type
        } = attributes;
        let display_month = "";
        let display_year = "";
        let display_header = true;
        let category=Array.isArray(ebec_ev_category) ? ebec_ev_category.join(" ") : ebec_ev_category
        return( 
            isPreview ? <img width='100%' src={ preview } alt=''/>:
            <Fragment>
            <Inspector category={this.state.categoriesList}
                categorySelect={ebec_ev_category}
                categorySelectHandle={(v)=> setAttributes({ebec_ev_category:v})}
                eventsLimit={ebec_max_events}
                eventsLimitHandle={(v)=> setAttributes({ebec_max_events:v})}
                venue={ebec_venue}
                venueHandle={(v)=>setAttributes({ebec_venue:v})}
                displayCat={ebec_display_cate}
                displayCatHandle={(v)=>setAttributes({ebec_display_cate:v})}
                displayDesc={ebec_display_desc}
                displayDescHandle={(v)=>setAttributes({ebec_display_desc:v})}
                eventType={ebec_type}
                eventTypeHandle={(v)=>setAttributes({ebec_type:v})}
                dateFormats={ebec_date_formats}
                dateFormatHandle={(v)=>setAttributes({ebec_date_formats:v})}
                eventOrder={ebec_order}
                eventOrderHandle={(v)=>setAttributes({ebec_order:v})}
                eventTime={ebec_event_source}
                eventTimeHandle={(v)=>setAttributes({ebec_event_source:v})}
                eventRangeStart={ebec_date_range_start}
                eventRangeStartHandle={(v)=>setAttributes({ebec_date_range_start:v})}
                eventRangeEnd={ebec_date_range_end}
                eventRangeEndHandle={(v)=>setAttributes({ebec_date_range_end:v})}
                skinColor={main_skin_color}
                skinColorHandle={(v)=>setAttributes({main_skin_color:v.hex})}
                noEventText={no_event_text}
                noEventTextHandle={(v)=>setAttributes({no_event_text:v})}

                //Date Style
                eventDateColor={event_date_color}
                eventDateColorHandle={(v)=>setAttributes({event_date_color:v.hex})}
                eventDateFont={event_date_font}
                eventDateFontHandle={(v)=>setAttributes({event_date_font:v})}
                eventDateFamilyFont={event_date_family}
                eventDateFamilyFontHandle={(v)=>setAttributes({event_date_family:v})}
                eventDateWeight={event_date_weight}
                eventDateWeightHandle={(v)=>setAttributes({event_date_weight:v})}
                eventDateTransform={event_date_transform}
                eventDateTransformHandle={(v)=>setAttributes({event_date_transform:v})}
                eventDateStyle={event_date_style}
                eventDateStyleHandle={(v)=>setAttributes({event_date_style:v})}
                eventDateDecoration={event_date_decoration}
                eventDateDecorationHandle={(v)=>setAttributes({event_date_decoration:v})}
                eventDateLineHeight={event_date_line_height}
                eventDateLineHeightHandle={(v)=>setAttributes({event_date_line_height:v})}
                eventDateLetterSpacing={event_date_letter_spacing}
                eventDateLetterSpacingHandle={(v)=>setAttributes({event_date_letter_spacing:v})}
                //Title Style

                eventTitleColor={event_title_color}
                eventTitleColorHandle={(v)=>setAttributes({event_title_color:v.hex})}
                eventTitleFont={event_title_font}
                eventTitleFontHandle={(v)=>setAttributes({event_title_font:v})}
                eventTitleFamilyFont={event_title_family}
                eventTitleFamilyFontHandle={(v)=>setAttributes({event_title_family:v})}
                eventTitleWeight={event_title_weight}
                eventTitleWeightHandle={(v)=>setAttributes({event_title_weight:v})}
                eventTitleTransform={event_title_transform}
                eventTitleTransformHandle={(v)=>setAttributes({event_title_transform:v})}
                eventTitleStyle={event_title_style}
                eventTitleStyleHandle={(v)=>setAttributes({event_title_style:v})}
                eventTitleDecoration={event_title_decoration}
                eventTitleDecorationHandle={(v)=>setAttributes({event_title_decoration:v})}
                eventTitleLineHeight={event_title_line_height}
                eventTitleLineHeightHandle={(v)=>setAttributes({event_title_line_height:v})}
                eventTitleLetterSpacing={event_title_letter_spacing}
                eventTitleLetterSpacingHandle={(v)=>setAttributes({event_title_letter_spacing:v})}

                //Venue Style
                eventVenueColor={event_venue_color}
                eventVenueColorHandle={(v)=>setAttributes({event_venue_color:v.hex})}
                eventVenueFont={event_venue_font}
                eventVenueFontHandle={(v)=>setAttributes({event_venue_font:v})}
                eventVenueFamilyFont={event_venue_family}
                eventVenueFamilyFontHandle={(v)=>setAttributes({event_venue_family:v})}
                eventVenueWeight={event_venue_weight}
                eventVenueWeightHandle={(v)=>setAttributes({event_venue_weight:v})}
                eventVenueTransform={event_venue_transform}
                eventVenueTransformHandle={(v)=>setAttributes({event_venue_transform:v})}
                eventVenueStyle={event_venue_style}
                eventVenueStyleHandle={(v)=>setAttributes({event_venue_style:v})}
                eventVenueDecoration={event_venue_decoration}
                eventVenueDecorationHandle={(v)=>setAttributes({event_venue_decoration:v})}
                eventVenueLineHeight={event_venue_line_height}
                eventVenueLineHeightHandle={(v)=>setAttributes({event_venue_line_height:v})}
                eventVenueLetterSpacing={event_venue_letter_spacing}
                eventVenueLetterSpacingHandle={(v)=>setAttributes({event_venue_letter_spacing:v})}

                //Description Style
                eventDescriptionColor={event_description_color}
                eventDescriptionColorHandle={(v)=>setAttributes({event_description_color:v.hex})}
                eventDescriptionFont={event_description_font}
                eventDescriptionFontHandle={(v)=>setAttributes({event_description_font:v})}
                eventDescriptionFamilyFont={event_description_family}
                eventDescriptionFamilyFontHandle={(v)=>setAttributes({event_description_family:v})}
                eventDescriptionWeight={event_description_weight}
                eventDescriptionWeightHandle={(v)=>setAttributes({event_description_weight:v})}
                eventDescriptionTransform={event_description_transform}
                eventDescriptionTransformHandle={(v)=>setAttributes({event_description_transform:v})}
                eventDescriptionStyle={event_description_style}
                eventDescriptionStyleHandle={(v)=>setAttributes({event_description_style:v})}
                eventDescriptionDecoration={event_description_decoration}
                eventDescriptionDecorationHandle={(v)=>setAttributes({event_description_decoration:v})}
                eventDescriptionLineHeight={event_description_line_height}
                eventDescriptionLineHeightHandle={(v)=>setAttributes({event_description_line_height:v})}
                eventDescriptionLetterSpacing={event_description_letter_spacing}
                eventDescriptionLetterSpacingHandle={(v)=>setAttributes({event_description_letter_spacing:v})}

                //Link Style
                eventLinkColor={event_link_color}
                eventLinkColorHandle={(v)=>setAttributes({event_link_color:v.hex})}
                eventLinkFont={event_link_font}
                eventLinkFontHandle={(v)=>setAttributes({event_link_font:v})}
                eventLinkFamilyFont={event_link_family}
                eventLinkFamilyFontHandle={(v)=>setAttributes({event_link_family:v})}
                eventLinkWeight={event_link_weight}
                eventLinkWeightHandle={(v)=>setAttributes({event_link_weight:v})}
                eventLinkTransform={event_link_transform}
                eventLinkTransformHandle={(v)=>setAttributes({event_link_transform:v})}
                eventLinkStyle={event_link_style}
                eventLinkStyleHandle={(v)=>setAttributes({event_link_style:v})}
                eventLinkDecoration={event_link_decoration}
                eventLinkDecorationHandle={(v)=>setAttributes({event_link_decoration:v})}
                eventLinkLineHeight={event_link_line_height}
                eventLinkLineHeightHandle={(v)=>setAttributes({event_link_line_height:v})}
                eventLinkLetterSpacing={event_link_letter_spacing}
                eventLinkLetterSpacingHandle={(v)=>setAttributes({event_link_letter_spacing:v})}
                eventLinkName={event_link_name}
                eventLinkNameHandle={(v)=>setAttributes({event_link_name:v})}
                eventLayoutHandle={(v)=>{setAttributes({event_layout: v})}}
                eventLayout={event_layout}
                eventDescTypeHandle={(v)=>setAttributes({event_desc_type: v})}
                eventDescType={event_desc_type}
              />
                 
              <div id="ebec-events-list-content" className = "ebec-list-wrapper">
              <div id={`ebec-${event_layout}-list-wrp`} className={`ebec-${event_layout}-list-wrapper ${category}`}>
              {events !== false ?
              (events.length !== 0) 
               ? 
               <div>
               {events.map((event,index)=>{
                if(ebec_max_events>index){
                    if(display_year == event.start_date_details.year ){
                        if(display_month == event.start_date_details.month){
                            display_header = false
                        }
                        else{
                            display_month = event.start_date_details.month
                            display_header = true
                        }
                    }
                    else{
                        display_year = event.start_date_details.year
                        display_month = event.start_date_details.month
                        display_header = true
                    }

                  return( 
                               
                  <Layout 
                    id={event.id}
                    title={event.title}
                    venue={event.venue}
                    start_date = {event.start_date}
                    start_date_year={event.start_date_details.year}
                    start_date_month={event.start_date_details.month}
                    start_date_day={event.start_date_details.day}
                    end_date_year={event.end_date_details.year}
                    end_date_month={event.end_date_details.month}
                    end_date_day={event.end_date_details.day}
                    end_date = {event.end_date}
                    venue_name = {event.venue.venue}
                    venue_address={event.venue.address !== undefined ? event.venue.address : ''}
                    venue_city={event.venue.city !== undefined ? event.venue.city : ''}
                    venue_zip={event.venue.zip !== undefined ? event.venue.zip : ''}
                    venue_state={event.venue.state ? event.venue.state : event.venue.province ? event.venue.province:""}
                    venue_country={event.venue.country}
                    venue_url={event.venue.url}
                    description={event.description}
                    excerpt={event.excerpt}
                    image_url={event.image.url}
                    category={event.categories}
                    feature={event.featured}
                    url={event.url}
                    allDay={event.all_day}
                    display_header = {display_header}
                    hide_venue = {ebec_venue}
                    display_category ={ebec_display_cate}
                    display_description ={ebec_display_desc}
                    date_format = {ebec_date_formats} 
                    event_cost ={event.cost}
                    main_col = {main_skin_color}
                    date_col ={event_date_color}
                    title_col ={event_title_color}
                    venue_col ={event_venue_color}
                    description_col={event_description_color}
                    link_col={event_link_color}
                    date_font={event_date_font}
                    title_font={event_title_font}
                    venue_font={event_venue_font}
                    description_font={event_description_font}
                    link_font={event_link_font} 
                    date_family_font={event_date_family}
                    date_weight={event_date_weight}
                    date_transform={event_date_transform}
                    date_style={event_date_style}
                    date_decoration={event_date_decoration}
                    date_line_height={event_date_line_height}
                    date_letter_spacing={event_date_letter_spacing}
                    title_family_font={event_title_family}
                    title_weight={event_title_weight}
                    title_transform={event_title_transform}
                    title_style={event_title_style}
                    title_decoration={event_title_decoration}
                    title_line_height={event_title_line_height}
                    title_letter_spacing={event_title_letter_spacing}
                    venue_family_font={event_venue_family}
                    venue_weight={event_venue_weight}
                    venue_transform={event_venue_transform}
                    venue_style={event_venue_style}
                    venue_decoration={event_venue_decoration}
                    venue_line_height={event_venue_line_height}
                    venue_letter_spacing={event_venue_letter_spacing}
                    description_family_font={event_description_family}
                    description_weight={event_description_weight}
                    description_transform={event_description_transform}
                    description_style={event_description_style}
                    description_decoration={event_description_decoration}
                    description_line_height={event_description_line_height}
                    description_letter_spacing={event_description_letter_spacing}
                    link_family_font={event_link_family}
                    link_weight={event_link_weight}
                    link_transform={event_link_transform}
                    link_style={event_link_style}
                    link_decoration={event_link_decoration}
                    link_line_height={event_link_line_height}
                    link_letter_spacing={event_link_letter_spacing}
                    link_name={event_link_name}
                    eventLayout={event_layout}
                    eventDescType={event_desc_type}
                  />
            
                  )
                }
              })
            }
              </div>:<Spinner />:<h2>{__(no_event_text)}</h2>}
                </div>
                </div>
            </Fragment> 
        )
    }
}

export default compose([ withSelect( ( select, props ) => {
    const {attributes} = props;
    const{ebec_ev_category,ebec_date_range_start,ebec_date_range_end,ebec_type,ebec_event_source,ebec_order} = attributes
    let start_range_date = !ebec_event_source ? new Date('0000-01-01 00:00:00') : new Date(ebec_date_range_start);
    let end_range_date = !ebec_event_source ? new Date('9999-12-31 23:59:59') : new Date(ebec_date_range_end);
    let filterEvents = "";
    let startTimeFilter = [];
    let endTimeFilter = [];
    let categoryFilter = [];
    let allEvents = select('ebec/events_data').getTodos();
    if(allEvents != 'error' && allEvents != 'zero'){
        if(allEvents.length !== 0){
            allEvents.map(event=>{
            let category_flag = false;
            if(ebec_ev_category !== null ){
                const ebecCateArr=ebec_ev_category.length > 0 ? ebec_ev_category : ['all'];
                ebecCateArr.map(event_cat=>{
                    if(category_flag !== true){
                        if(event_cat !== 'all'){
                            event.categories.map(category=>{
                                if(category.slug == event_cat){
                                    category_flag =true;
                                    return categoryFilter.push(event)  
                                }
                            })
                        }
                        else{
                            category_flag =true;
                            return categoryFilter.push(event)
                        }
                    }
                }) 
            }   
        })
        if(categoryFilter.length !== 0){
            categoryFilter.map(categoryEvent=>{
                let event_start_date = categoryEvent.start_date
                if(start_range_date < new Date(event_start_date)){
                    startTimeFilter.push(categoryEvent);
                }
            })
            if(startTimeFilter.length !== 0 ){
                startTimeFilter.map(startTimeEvent=>{
                    let event_end_date = startTimeEvent.end_date
                    if(end_range_date > new Date(event_end_date)){
                        endTimeFilter.push(startTimeEvent);
                    }
                })
                if(endTimeFilter.length !== 0 ){
                    filterEvents = (ebec_order == "ASC") ? endTimeFilter.sort(function(a, b){return b.start_date - a.start_date}) : endTimeFilter.sort(function(a, b){return a.start_date - b.start_date}).reverse();
                }
                else{
                    filterEvents = false
                }
            }
            else{
                filterEvents = false
            }
        }
        else {
            filterEvents = false
        }
    }
}
else{
    filterEvents = false
}
    return {
        events:filterEvents
    }

}),


])
(EventBlocks);