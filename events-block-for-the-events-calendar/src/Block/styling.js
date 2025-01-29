/**
 * Returns Dynamic Generated CSS
 */

 import generateCSS from "../Components/css/generateCSS.js"
 import generateCSSUnit from "../Components/css/generateCSSUnit.js"

function contentEventStyle( props ) {
    const {main_skin_color
        ,event_date_color,event_title_color,
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
        event_link_letter_spacing
    } = props.attributes

    var selectors = {
        " .ebec-header-year" : {
            "color":main_skin_color
        },
        " .ebec-header-line" : {
            "background-color":main_skin_color
        },
        " .ebec-event-datetimes .ev-mo" : {
            "color":main_skin_color
        },
        " .ebec-event-datetimes .ebec-ev-day" : {
            "color":main_skin_color
        },
        " .ebec-list-wrapper>:not(.ebec-minimal-list-wrapper) .ebec-list-posts" : {
            "border-left-color":main_skin_color
        },
        " .ebec-event-details" : {
            "border-left-color":main_skin_color
        },
        " .ebec-events-title" : {
            "color":event_title_color,
            "font-size":event_title_font+'px',
            "font-family":event_title_family,
            "font-weight":event_title_weight,
            "text-transform":event_title_transform,
            "font-style":event_title_style,
            "text-decoration":event_title_decoration,
            "line-height":"initial" === event_title_line_height ? 'initial' : event_title_line_height+'px',
            "letter-spacing":event_title_letter_spacing+'px'
        },
        " .ebec-date-area" : {
            "color":event_date_color,
            "font-size":event_date_font+'px',
            "font-family":event_date_family,
            "font-weight":event_date_weight,
            "text-transform":event_date_transform,
            "font-style":event_date_style,
            "text-decoration":event_date_decoration,
            "line-height":"initial" === event_date_line_height ? 'initial' : event_date_line_height+'px',
            "letter-spacing":event_date_letter_spacing+'px'
        },
        " .ebec-list-venue" : {
            "color":event_venue_color,
            "font-size":event_venue_font+'px',
            "font-family":event_venue_family,
            "font-weight":event_venue_weight,
            "text-transform":event_venue_transform,
            "font-style":event_venue_style,
            "text-decoration":event_venue_decoration,
            "line-height":"initial" === event_venue_line_height ? 'initial' : event_venue_line_height+'px',
            "letter-spacing":event_venue_letter_spacing+'px'
        },
        " .ebec-event-content" : {
            "color":event_description_color,
            "font-family":event_description_family,
            "font-weight":event_description_weight,
            "text-transform":event_description_transform,
            "font-style":event_description_style,
            "text-decoration":event_description_decoration,
            "letter-spacing":event_description_letter_spacing+'px'
        },
        " .ebec-event-content p":{
            "font-size":event_description_font+'px',
            "line-height":"initial" === event_description_line_height ? 'initial' : event_description_line_height+'px',
        },

        " .ebec-events-read-more" : {
            "color":event_link_color,
            "font-size":event_link_font+'px',
            "font-family":event_link_family,
            "font-weight":event_link_weight,
            "text-transform":event_link_transform,
            "font-style":event_link_style,
            "text-decoration":event_link_decoration,
            "line-height":"initial" === event_link_line_height ? 'initial' : event_link_line_height+'px',
            "letter-spacing":event_link_letter_spacing+'px'
        },
        " .ebec-list-venue a ":{
            "color":event_venue_color,
        }
    }

    var styling_css = ""
    var id = `#block-${ props.clientId }`
 
    styling_css = generateCSS( selectors, id )
 
    return styling_css

}
export default contentEventStyle