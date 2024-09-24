/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/preview/events.png":
/*!*******************************************!*\
  !*** ./src/components/preview/events.png ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/events.bb8bdf7c.png";

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "./src/Block/edit.js":
/*!***************************!*\
  !*** ./src/Block/edit.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _components_preview_events_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/preview/events.png */ "./src/components/preview/events.png");
/* harmony import */ var _inspector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inspector.js */ "./src/Block/inspector.js");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _layout_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./layout.js */ "./src/Block/layout.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _styling_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./styling.js */ "./src/Block/styling.js");









const {
  __
} = wp.i18n;
class EventBlocks extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor() {
    super(...arguments);
    this.state = {
      categoriesList: []
    };
  }

  // Apply style attribute and fetch category
  componentDidMount() {
    const $style = document.createElement("style");
    $style.setAttribute("id", "event-block-style-" + this.props.clientId);
    document.head.appendChild($style);
    let categoryList = [];
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__({
      path: '/wp/v2/tribe_events_cat?page=1&per_page=100'
    }).then(data => {
      if (typeof data != undefined && data != null) {
        categoryList = data.map(function (val, key) {
          return val.slug;
        });
      }
      categoryList.push('all');
      this.setState({
        categoriesList: categoryList
      });
    });
    this.props.setAttributes({
      ebec_block_id: this.props.clientId
    });
  }
  render() {
    var element = document.getElementById("event-block-style-" + this.props.clientId);
    if (element) {
      element.innerHTML = (0,_styling_js__WEBPACK_IMPORTED_MODULE_8__["default"])(this.props);
    }
    const {
      attributes,
      setAttributes,
      events
    } = this.props;
    const {
      ebec_ev_category,
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
    let category = Array.isArray(ebec_ev_category) ? ebec_ev_category.join(" ") : ebec_ev_category;
    return isPreview ? /*#__PURE__*/React.createElement("img", {
      width: "100%",
      src: _components_preview_events_png__WEBPACK_IMPORTED_MODULE_1__,
      alt: ""
    }) : /*#__PURE__*/React.createElement(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/React.createElement(_inspector_js__WEBPACK_IMPORTED_MODULE_2__.Inspector, {
      category: this.state.categoriesList,
      categorySelect: ebec_ev_category,
      categorySelectHandle: v => setAttributes({
        ebec_ev_category: v
      }),
      eventsLimit: ebec_max_events,
      eventsLimitHandle: v => setAttributes({
        ebec_max_events: v
      }),
      venue: ebec_venue,
      venueHandle: v => setAttributes({
        ebec_venue: v
      }),
      displayCat: ebec_display_cate,
      displayCatHandle: v => setAttributes({
        ebec_display_cate: v
      }),
      displayDesc: ebec_display_desc,
      displayDescHandle: v => setAttributes({
        ebec_display_desc: v
      }),
      eventType: ebec_type,
      eventTypeHandle: v => setAttributes({
        ebec_type: v
      }),
      dateFormats: ebec_date_formats,
      dateFormatHandle: v => setAttributes({
        ebec_date_formats: v
      }),
      eventOrder: ebec_order,
      eventOrderHandle: v => setAttributes({
        ebec_order: v
      }),
      eventTime: ebec_event_source,
      eventTimeHandle: v => setAttributes({
        ebec_event_source: v
      }),
      eventRangeStart: ebec_date_range_start,
      eventRangeStartHandle: v => setAttributes({
        ebec_date_range_start: v
      }),
      eventRangeEnd: ebec_date_range_end,
      eventRangeEndHandle: v => setAttributes({
        ebec_date_range_end: v
      }),
      skinColor: main_skin_color,
      skinColorHandle: v => setAttributes({
        main_skin_color: v.hex
      }),
      noEventText: no_event_text,
      noEventTextHandle: v => setAttributes({
        no_event_text: v
      })

      //Date Style
      ,
      eventDateColor: event_date_color,
      eventDateColorHandle: v => setAttributes({
        event_date_color: v.hex
      }),
      eventDateFont: event_date_font,
      eventDateFontHandle: v => setAttributes({
        event_date_font: v
      }),
      eventDateFamilyFont: event_date_family,
      eventDateFamilyFontHandle: v => setAttributes({
        event_date_family: v
      }),
      eventDateWeight: event_date_weight,
      eventDateWeightHandle: v => setAttributes({
        event_date_weight: v
      }),
      eventDateTransform: event_date_transform,
      eventDateTransformHandle: v => setAttributes({
        event_date_transform: v
      }),
      eventDateStyle: event_date_style,
      eventDateStyleHandle: v => setAttributes({
        event_date_style: v
      }),
      eventDateDecoration: event_date_decoration,
      eventDateDecorationHandle: v => setAttributes({
        event_date_decoration: v
      }),
      eventDateLineHeight: event_date_line_height,
      eventDateLineHeightHandle: v => setAttributes({
        event_date_line_height: v
      }),
      eventDateLetterSpacing: event_date_letter_spacing,
      eventDateLetterSpacingHandle: v => setAttributes({
        event_date_letter_spacing: v
      })
      //Title Style
      ,

      eventTitleColor: event_title_color,
      eventTitleColorHandle: v => setAttributes({
        event_title_color: v.hex
      }),
      eventTitleFont: event_title_font,
      eventTitleFontHandle: v => setAttributes({
        event_title_font: v
      }),
      eventTitleFamilyFont: event_title_family,
      eventTitleFamilyFontHandle: v => setAttributes({
        event_title_family: v
      }),
      eventTitleWeight: event_title_weight,
      eventTitleWeightHandle: v => setAttributes({
        event_title_weight: v
      }),
      eventTitleTransform: event_title_transform,
      eventTitleTransformHandle: v => setAttributes({
        event_title_transform: v
      }),
      eventTitleStyle: event_title_style,
      eventTitleStyleHandle: v => setAttributes({
        event_title_style: v
      }),
      eventTitleDecoration: event_title_decoration,
      eventTitleDecorationHandle: v => setAttributes({
        event_title_decoration: v
      }),
      eventTitleLineHeight: event_title_line_height,
      eventTitleLineHeightHandle: v => setAttributes({
        event_title_line_height: v
      }),
      eventTitleLetterSpacing: event_title_letter_spacing,
      eventTitleLetterSpacingHandle: v => setAttributes({
        event_title_letter_spacing: v
      })

      //Venue Style
      ,
      eventVenueColor: event_venue_color,
      eventVenueColorHandle: v => setAttributes({
        event_venue_color: v.hex
      }),
      eventVenueFont: event_venue_font,
      eventVenueFontHandle: v => setAttributes({
        event_venue_font: v
      }),
      eventVenueFamilyFont: event_venue_family,
      eventVenueFamilyFontHandle: v => setAttributes({
        event_venue_family: v
      }),
      eventVenueWeight: event_venue_weight,
      eventVenueWeightHandle: v => setAttributes({
        event_venue_weight: v
      }),
      eventVenueTransform: event_venue_transform,
      eventVenueTransformHandle: v => setAttributes({
        event_venue_transform: v
      }),
      eventVenueStyle: event_venue_style,
      eventVenueStyleHandle: v => setAttributes({
        event_venue_style: v
      }),
      eventVenueDecoration: event_venue_decoration,
      eventVenueDecorationHandle: v => setAttributes({
        event_venue_decoration: v
      }),
      eventVenueLineHeight: event_venue_line_height,
      eventVenueLineHeightHandle: v => setAttributes({
        event_venue_line_height: v
      }),
      eventVenueLetterSpacing: event_venue_letter_spacing,
      eventVenueLetterSpacingHandle: v => setAttributes({
        event_venue_letter_spacing: v
      })

      //Description Style
      ,
      eventDescriptionColor: event_description_color,
      eventDescriptionColorHandle: v => setAttributes({
        event_description_color: v.hex
      }),
      eventDescriptionFont: event_description_font,
      eventDescriptionFontHandle: v => setAttributes({
        event_description_font: v
      }),
      eventDescriptionFamilyFont: event_description_family,
      eventDescriptionFamilyFontHandle: v => setAttributes({
        event_description_family: v
      }),
      eventDescriptionWeight: event_description_weight,
      eventDescriptionWeightHandle: v => setAttributes({
        event_description_weight: v
      }),
      eventDescriptionTransform: event_description_transform,
      eventDescriptionTransformHandle: v => setAttributes({
        event_description_transform: v
      }),
      eventDescriptionStyle: event_description_style,
      eventDescriptionStyleHandle: v => setAttributes({
        event_description_style: v
      }),
      eventDescriptionDecoration: event_description_decoration,
      eventDescriptionDecorationHandle: v => setAttributes({
        event_description_decoration: v
      }),
      eventDescriptionLineHeight: event_description_line_height,
      eventDescriptionLineHeightHandle: v => setAttributes({
        event_description_line_height: v
      }),
      eventDescriptionLetterSpacing: event_description_letter_spacing,
      eventDescriptionLetterSpacingHandle: v => setAttributes({
        event_description_letter_spacing: v
      })

      //Link Style
      ,
      eventLinkColor: event_link_color,
      eventLinkColorHandle: v => setAttributes({
        event_link_color: v.hex
      }),
      eventLinkFont: event_link_font,
      eventLinkFontHandle: v => setAttributes({
        event_link_font: v
      }),
      eventLinkFamilyFont: event_link_family,
      eventLinkFamilyFontHandle: v => setAttributes({
        event_link_family: v
      }),
      eventLinkWeight: event_link_weight,
      eventLinkWeightHandle: v => setAttributes({
        event_link_weight: v
      }),
      eventLinkTransform: event_link_transform,
      eventLinkTransformHandle: v => setAttributes({
        event_link_transform: v
      }),
      eventLinkStyle: event_link_style,
      eventLinkStyleHandle: v => setAttributes({
        event_link_style: v
      }),
      eventLinkDecoration: event_link_decoration,
      eventLinkDecorationHandle: v => setAttributes({
        event_link_decoration: v
      }),
      eventLinkLineHeight: event_link_line_height,
      eventLinkLineHeightHandle: v => setAttributes({
        event_link_line_height: v
      }),
      eventLinkLetterSpacing: event_link_letter_spacing,
      eventLinkLetterSpacingHandle: v => setAttributes({
        event_link_letter_spacing: v
      }),
      eventLinkName: event_link_name,
      eventLinkNameHandle: v => setAttributes({
        event_link_name: v
      }),
      eventLayoutHandle: v => {
        setAttributes({
          event_layout: v
        });
      },
      eventLayout: event_layout,
      eventDescTypeHandle: v => setAttributes({
        event_desc_type: v
      }),
      eventDescType: event_desc_type
    }), /*#__PURE__*/React.createElement("div", {
      id: "ebec-events-list-content",
      className: "ebec-list-wrapper"
    }, /*#__PURE__*/React.createElement("div", {
      id: `ebec-${event_layout}-list-wrp`,
      className: `ebec-${event_layout}-list-wrapper ${category}`
    }, events !== false ? events.length !== 0 ? /*#__PURE__*/React.createElement("div", null, events.map((event, index) => {
      if (ebec_max_events > index) {
        if (display_year == event.start_date_details.year) {
          if (display_month == event.start_date_details.month) {
            display_header = false;
          } else {
            display_month = event.start_date_details.month;
            display_header = true;
          }
        } else {
          display_year = event.start_date_details.year;
          display_month = event.start_date_details.month;
          display_header = true;
        }
        return /*#__PURE__*/React.createElement(_layout_js__WEBPACK_IMPORTED_MODULE_5__["default"], {
          id: event.id,
          title: event.title,
          venue: event.venue,
          start_date: event.start_date,
          start_date_year: event.start_date_details.year,
          start_date_month: event.start_date_details.month,
          start_date_day: event.start_date_details.day,
          end_date_year: event.end_date_details.year,
          end_date_month: event.end_date_details.month,
          end_date_day: event.end_date_details.day,
          end_date: event.end_date,
          venue_name: event.venue.venue,
          venue_address: event.venue.address !== undefined ? event.venue.address : '',
          venue_city: event.venue.city !== undefined ? event.venue.city : '',
          venue_zip: event.venue.zip !== undefined ? event.venue.zip : '',
          venue_state: event.venue.state ? event.venue.state : event.venue.province ? event.venue.province : "",
          venue_country: event.venue.country,
          venue_url: event.venue.url,
          description: event.description,
          excerpt: event.excerpt,
          image_url: event.image.url,
          category: event.categories,
          feature: event.featured,
          url: event.url,
          allDay: event.all_day,
          display_header: display_header,
          hide_venue: ebec_venue,
          display_category: ebec_display_cate,
          display_description: ebec_display_desc,
          date_format: ebec_date_formats,
          event_cost: event.cost,
          main_col: main_skin_color,
          date_col: event_date_color,
          title_col: event_title_color,
          venue_col: event_venue_color,
          description_col: event_description_color,
          link_col: event_link_color,
          date_font: event_date_font,
          title_font: event_title_font,
          venue_font: event_venue_font,
          description_font: event_description_font,
          link_font: event_link_font,
          date_family_font: event_date_family,
          date_weight: event_date_weight,
          date_transform: event_date_transform,
          date_style: event_date_style,
          date_decoration: event_date_decoration,
          date_line_height: event_date_line_height,
          date_letter_spacing: event_date_letter_spacing,
          title_family_font: event_title_family,
          title_weight: event_title_weight,
          title_transform: event_title_transform,
          title_style: event_title_style,
          title_decoration: event_title_decoration,
          title_line_height: event_title_line_height,
          title_letter_spacing: event_title_letter_spacing,
          venue_family_font: event_venue_family,
          venue_weight: event_venue_weight,
          venue_transform: event_venue_transform,
          venue_style: event_venue_style,
          venue_decoration: event_venue_decoration,
          venue_line_height: event_venue_line_height,
          venue_letter_spacing: event_venue_letter_spacing,
          description_family_font: event_description_family,
          description_weight: event_description_weight,
          description_transform: event_description_transform,
          description_style: event_description_style,
          description_decoration: event_description_decoration,
          description_line_height: event_description_line_height,
          description_letter_spacing: event_description_letter_spacing,
          link_family_font: event_link_family,
          link_weight: event_link_weight,
          link_transform: event_link_transform,
          link_style: event_link_style,
          link_decoration: event_link_decoration,
          link_line_height: event_link_line_height,
          link_letter_spacing: event_link_letter_spacing,
          link_name: event_link_name,
          eventLayout: event_layout,
          eventDescType: event_desc_type
        });
      }
    })) : /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Spinner, null) : /*#__PURE__*/React.createElement("h2", null, __(no_event_text)))));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_7__.compose)([(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.withSelect)((select, props) => {
  const {
    attributes
  } = props;
  const {
    ebec_ev_category,
    ebec_date_range_start,
    ebec_date_range_end,
    ebec_type,
    ebec_event_source,
    ebec_order
  } = attributes;
  let start_range_date = !ebec_event_source ? new Date('0000-01-01 00:00:00') : new Date(ebec_date_range_start);
  let end_range_date = !ebec_event_source ? new Date('9999-12-31 23:59:59') : new Date(ebec_date_range_end);
  let filterEvents = "";
  let startTimeFilter = [];
  let endTimeFilter = [];
  let categoryFilter = [];
  let allEvents = select('ebec/events_data').getTodos();
  if (allEvents != 'error' && allEvents != 'zero') {
    if (allEvents.length !== 0) {
      allEvents.map(event => {
        let category_flag = false;
        if (ebec_ev_category !== null) {
          const ebecCateArr = ebec_ev_category.length > 0 ? ebec_ev_category : ['all'];
          ebecCateArr.map(event_cat => {
            if (category_flag !== true) {
              if (event_cat !== 'all') {
                event.categories.map(category => {
                  if (category.slug == event_cat) {
                    category_flag = true;
                    return categoryFilter.push(event);
                  }
                });
              } else {
                category_flag = true;
                return categoryFilter.push(event);
              }
            }
          });
        }
      });
      if (categoryFilter.length !== 0) {
        categoryFilter.map(categoryEvent => {
          let event_start_date = categoryEvent.start_date;
          if (start_range_date < new Date(event_start_date)) {
            startTimeFilter.push(categoryEvent);
          }
        });
        if (startTimeFilter.length !== 0) {
          startTimeFilter.map(startTimeEvent => {
            let event_end_date = startTimeEvent.end_date;
            if (end_range_date > new Date(event_end_date)) {
              endTimeFilter.push(startTimeEvent);
            }
          });
          if (endTimeFilter.length !== 0) {
            filterEvents = ebec_order == "ASC" ? endTimeFilter.sort(function (a, b) {
              return b.start_date - a.start_date;
            }) : endTimeFilter.sort(function (a, b) {
              return a.start_date - b.start_date;
            }).reverse();
          } else {
            filterEvents = false;
          }
        } else {
          filterEvents = false;
        }
      } else {
        filterEvents = false;
      }
    }
  } else {
    filterEvents = false;
  }
  return {
    events: filterEvents
  };
})])(EventBlocks));

/***/ }),

/***/ "./src/Block/index.js":
/*!****************************!*\
  !*** ./src/Block/index.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _edit_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit.js */ "./src/Block/edit.js");
/* harmony import */ var _Components_icons_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Components/icons.js */ "./src/Components/icons.js");


const {
  registerBlockType
} = wp.blocks;
const {
  __
} = wp.i18n;
registerBlockType('ebec/event-list', {
  title: __("Events Block", "ebec"),
  category: 'common',
  // Block Icon
  icon: _Components_icons_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  keywords: [__('event'), __('calendar'), __('events')],
  example: {
    attributes: {
      'preview': true,
      isPreview: true
    }
  },
  edit: _edit_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  save() {
    return null;
  }
});

/***/ }),

/***/ "./src/Block/inspector.js":
/*!********************************!*\
  !*** ./src/Block/inspector.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Inspector: () => (/* binding */ Inspector)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _Components_typography_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Components/typography.js */ "./src/Components/typography.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");


const {
  InspectorControls,
  PanelColorSettings
} = wp.blockEditor;
const {
  PanelBody,
  DateTimePicker,
  TextControl,
  ColorPicker,
  SelectControl,
  ToggleControl,
  RangeControl,
  RadioControl,
  FormTokenField
} = wp.components;

const {
  __
} = wp.i18n;
class Inspector extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Component {
  render() {
    const dateFormatsOptions = [{
      label: "Default (01 January 2019)",
      value: "default"
    }, {
      label: "Md,Y (Jan 01, 2019)",
      value: "MD,Y"
    }, {
      label: "Fd,Y (January 01, 2019)",
      value: "FD,Y"
    }, {
      label: "dM (01 Jan)",
      value: "DM"
    }, {
      label: "dF (01 January)",
      value: "DF"
    }, {
      label: "Md (Jan 01)",
      value: "MD"
    }, {
      label: "Fd (January 01)",
      value: "FD"
    }, {
      label: "Md,YT (Jan 01, 2019 8:00am-5:00pm)",
      value: "MD,YT"
    }, {
      label: "Full (01 January 2019 8:00am-5:00pm)",
      value: "full"
    }, {
      label: "jMl (1 Jan Monday)",
      value: "jMl"
    }, {
      label: "d.FY (01. January 2019)",
      value: "d.FY"
    }, {
      label: "d.F (01. January)",
      value: "d.F"
    }, {
      label: "ldF (Monday 01 January)",
      value: "ldF"
    }, {
      label: "Mdl (Jan 01 Monday)",
      value: "Mdl"
    }, {
      label: "d.Ml (01. Jan Monday)",
      value: "d.Ml"
    }, {
      label: "dFT (01 January 8:00am-5:00pm)",
      value: "dFT"
    }];
    const orderOptions = [{
      label: "ASC",
      value: "ASC"
    }, {
      label: "DESC",
      value: "DESC"
    }];
    const timeOptions = [{
      label: 'Upcoming',
      value: 'future'
    }, {
      label: 'Past',
      value: 'past'
    }, {
      label: 'All',
      value: 'all'
    }];
    const Options = [{
      label: 'NO',
      value: 'no'
    }, {
      label: 'YES',
      value: 'yes'
    }];
    const eventTimeOptions = [{
      label: 'All Event',
      value: 'all'
    }, {
      label: 'Event in between Date Range',
      value: 'date_range'
    }];
    return /*#__PURE__*/React.createElement(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/React.createElement(InspectorControls, null, /*#__PURE__*/React.createElement(PanelBody, {
      title: __("Event Panel", "ebec")
    }, /*#__PURE__*/React.createElement(SelectControl, {
      label: __('Layout', 'ebec'),
      description: __('Select events layout'),
      options: [{
        label: 'Default',
        value: 'default'
      }, {
        label: 'Minimal',
        value: 'minimal'
      }],
      value: this.props.eventLayout,
      onChange: this.props.eventLayoutHandle
    }), /*#__PURE__*/React.createElement("div", {
      className: "ebec-impressum-select-multiple"
    }, /*#__PURE__*/React.createElement(FormTokenField, {
      label: __('Select Category', 'ebec'),
      value: this.props.categorySelect,
      suggestions: this.props.category,
      onChange: this.props.categorySelectHandle,
      __experimentalExpandOnFocus: true,
      __experimentalShowHowTo: false
    })), /*#__PURE__*/React.createElement(SelectControl, {
      label: __('Date Formats', 'ebec'),
      description: __('yes/no'),
      options: dateFormatsOptions,
      value: this.props.dateFormats,
      onChange: this.props.dateFormatHandle
    }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalNumberControl, {
      label: __('Limit the events', 'ebec'),
      isShiftStepEnabled: true,
      shiftStep: 1,
      value: this.props.eventsLimit,
      onChange: this.props.eventsLimitHandle,
      required: true,
      min: 1
    }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(SelectControl, {
      label: __('Events Order', 'ebec'),
      description: __(' Events Order'),
      options: orderOptions,
      value: this.props.eventOrder,
      onChange: this.props.eventOrderHandle
    }), 'minimal' !== this.props.eventLayout && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SelectControl, {
      label: __('Hide Venue', 'ebec'),
      description: __('Hide Venue Settings'),
      options: Options,
      value: this.props.venue,
      onChange: this.props.venueHandle
    }), /*#__PURE__*/React.createElement(SelectControl, {
      label: __('Display Description', 'ebec'),
      description: __('Display Description Settings'),
      options: Options,
      value: this.props.displayDesc,
      onChange: this.props.displayDescHandle
    }), 'yes' === this.props.displayDesc && /*#__PURE__*/React.createElement(SelectControl, {
      label: __('Event Description?', 'ebec'),
      description: __('Event Description Settings'),
      options: [{
        label: 'Short',
        value: 'short'
      }, {
        label: 'Full',
        value: 'full'
      }],
      value: this.props.eventDescType,
      onChange: this.props.eventDescTypeHandle
    })), /*#__PURE__*/React.createElement(ToggleControl, {
      label: __('Enable this option if you want to Show Events in between date range', 'ebec'),
      checked: this.props.eventTime,
      onChange: this.props.eventTimeHandle
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        color: "red"
      }
    }, "Selet Event Date option only works on front-end side"), /*#__PURE__*/React.createElement(SelectControl, {
      label: __('Events Type (Past/Future Events)', 'ebec'),
      description: __('Events Type'),
      options: timeOptions,
      value: this.props.eventType,
      onChange: this.props.eventTypeHandle
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        color: "red"
      }
    }, "Events Type option only works on front-end side")), this.props.eventTime === true && /*#__PURE__*/React.createElement(PanelBody, {
      title: __("Start Event Panel", "ebec")
    }, /*#__PURE__*/React.createElement(DateTimePicker, {
      label: __('Start Date', 'ebec'),
      currentDate: this.props.eventRangeStart,
      onChange: this.props.eventRangeStartHandle,
      is12Hour: true
    })), this.props.eventTime == true && /*#__PURE__*/React.createElement(PanelBody, {
      title: __("End Event Panel", "ebec")
    }, /*#__PURE__*/React.createElement(DateTimePicker, {
      currentDate: this.props.eventRangeEnd,
      onChange: this.props.eventRangeEndHandle,
      is12Hour: true
    })), /*#__PURE__*/React.createElement(TextControl, {
      label: "No Event Text (Message to show if no event will available)",
      value: this.props.noEventText,
      onChange: this.props.noEventTextHandle
    }), /*#__PURE__*/React.createElement(PanelBody, {
      title: __("Main Skin Color", "ebec"),
      initialOpen: false
    }, /*#__PURE__*/React.createElement(ColorPicker, {
      color: this.props.skinColor,
      onChangeComplete: this.props.skinColorHandle,
      disableAlpha: true
    })), /*#__PURE__*/React.createElement(PanelBody, {
      title: __("Event Date Style", "ebec"),
      initialOpen: false
    }, /*#__PURE__*/React.createElement(ColorPicker, {
      color: this.props.eventDateColor,
      onChangeComplete: this.props.eventDateColorHandle,
      disableAlpha: true
    }), /*#__PURE__*/React.createElement(_Components_typography_js__WEBPACK_IMPORTED_MODULE_1__.Typography, {
      fontSize: this.props.eventDateFont,
      fontSizeHandle: this.props.eventDateFontHandle,
      fontFamily: this.props.eventDateFamilyFont,
      fontFamilyHandle: this.props.eventDateFamilyFontHandle,
      fontWeight: this.props.eventDateWeight,
      fontWeightHandle: this.props.eventDateWeightHandle,
      fontTransform: this.props.eventDateTransform,
      fontTransformHandle: this.props.eventDateTransformHandle,
      fontStyle: this.props.eventDateStyle,
      fontStyleHandle: this.props.eventDateStyleHandle,
      textDecoration: this.props.eventDateDecoration,
      textDecorationHandle: this.props.eventDateDecorationHandle,
      eventLineHeight: this.props.eventDateLineHeight,
      eventLineHeightHandle: this.props.eventDateLineHeightHandle,
      eventLetterSpacing: this.props.eventDateLetterSpacing,
      eventLetterSpacingHandle: this.props.eventDateLetterSpacingHandle
    })), /*#__PURE__*/React.createElement(PanelBody, {
      title: __("Event Title Style", "ebec"),
      initialOpen: false
    }, /*#__PURE__*/React.createElement(ColorPicker, {
      color: this.props.eventTitleColor,
      onChangeComplete: this.props.eventTitleColorHandle,
      disableAlpha: true
    }), /*#__PURE__*/React.createElement(_Components_typography_js__WEBPACK_IMPORTED_MODULE_1__.Typography, {
      fontSize: this.props.eventTitleFont,
      fontSizeHandle: this.props.eventTitleFontHandle,
      fontFamily: this.props.eventTitleFamilyFont,
      fontFamilyHandle: this.props.eventTitleFamilyFontHandle,
      fontWeight: this.props.eventTitleWeight,
      fontWeightHandle: this.props.eventTitleWeightHandle,
      fontTransform: this.props.eventTitleTransform,
      fontTransformHandle: this.props.eventTitleTransformHandle,
      fontStyle: this.props.eventTitleStyle,
      fontStyleHandle: this.props.eventTitleStyleHandle,
      textDecoration: this.props.eventTitleDecoration,
      textDecorationHandle: this.props.eventTitleDecorationHandle,
      eventLineHeight: this.props.eventTitleLineHeight,
      eventLineHeightHandle: this.props.eventTitleLineHeightHandle,
      eventLetterSpacing: this.props.eventTitleLetterSpacing,
      eventLetterSpacingHandle: this.props.eventTitleLetterSpacingHandle
    })), 'minimal' !== this.props.eventLayout && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PanelBody, {
      title: __("Event Venue Style", "ebec"),
      initialOpen: false
    }, /*#__PURE__*/React.createElement(ColorPicker, {
      color: this.props.eventVenueColor,
      onChangeComplete: this.props.eventVenueColorHandle,
      disableAlpha: true
    }), /*#__PURE__*/React.createElement(_Components_typography_js__WEBPACK_IMPORTED_MODULE_1__.Typography, {
      fontSize: this.props.eventVenueFont,
      fontSizeHandle: this.props.eventVenueFontHandle,
      fontFamily: this.props.eventVenueFamilyFont,
      fontFamilyHandle: this.props.eventVenueFamilyFontHandle,
      fontWeight: this.props.eventVenueWeight,
      fontWeightHandle: this.props.eventVenueWeightHandle,
      fontTransform: this.props.eventVenueTransform,
      fontTransformHandle: this.props.eventVenueTransformHandle,
      fontStyle: this.props.eventVenueStyle,
      fontStyleHandle: this.props.eventVenueStyleHandle,
      textDecoration: this.props.eventVenueDecoration,
      textDecorationHandle: this.props.eventVenueDecorationHandle,
      eventLineHeight: this.props.eventVenueLineHeight,
      eventLineHeightHandle: this.props.eventVenueLineHeightHandle,
      eventLetterSpacing: this.props.eventVenueLetterSpacing,
      eventLetterSpacingHandle: this.props.eventVenueLetterSpacingHandle
    })), /*#__PURE__*/React.createElement(PanelBody, {
      title: __("Event Desciption Style", "ebec"),
      initialOpen: false
    }, /*#__PURE__*/React.createElement(ColorPicker, {
      color: this.props.eventDescriptionColor,
      onChangeComplete: this.props.eventDescriptionColorHandle,
      disableAlpha: true
    }), /*#__PURE__*/React.createElement(_Components_typography_js__WEBPACK_IMPORTED_MODULE_1__.Typography, {
      fontSize: this.props.eventDescriptionFont,
      fontSizeHandle: this.props.eventDescriptionFontHandle,
      fontFamily: this.props.eventDescriptionFamilyFont,
      fontFamilyHandle: this.props.eventDescriptionFamilyFontHandle,
      fontWeight: this.props.eventDescriptionWeight,
      fontWeightHandle: this.props.eventDescriptionWeightHandle,
      fontTransform: this.props.eventDescriptionTransform,
      fontTransformHandle: this.props.eventDescriptionTransformHandle,
      fontStyle: this.props.eventDescriptionStyle,
      fontStyleHandle: this.props.eventDescriptionStyleHandle,
      textDecoration: this.props.eventDescriptionDecoration,
      textDecorationHandle: this.props.eventDescriptionDecorationHandle,
      eventLineHeight: this.props.eventDescriptionLineHeight,
      eventLineHeightHandle: this.props.eventDescriptionLineHeightHandle,
      eventLetterSpacing: this.props.eventDescriptionLetterSpacing,
      eventLetterSpacingHandle: this.props.eventDescriptionLetterSpacingHandle
    }))), /*#__PURE__*/React.createElement(PanelBody, {
      title: __("Find out More Style", "ebec"),
      initialOpen: false
    }, /*#__PURE__*/React.createElement(TextControl, {
      label: "Find out More Text",
      value: this.props.eventLinkName,
      onChange: this.props.eventLinkNameHandle
    }), /*#__PURE__*/React.createElement(ColorPicker, {
      color: this.props.eventLinkColor,
      onChangeComplete: this.props.eventLinkColorHandle,
      disableAlpha: true
    }), /*#__PURE__*/React.createElement(_Components_typography_js__WEBPACK_IMPORTED_MODULE_1__.Typography, {
      fontSize: this.props.eventLinkFont,
      fontSizeHandle: this.props.eventLinkFontHandle,
      fontFamily: this.props.eventLinkFamilyFont,
      fontFamilyHandle: this.props.eventLinkFamilyFontHandle,
      fontWeight: this.props.eventLinkWeight,
      fontWeightHandle: this.props.eventLinkWeightHandle,
      fontTransform: this.props.eventLinkTransform,
      fontTransformHandle: this.props.eventLinkTransformHandle,
      fontStyle: this.props.eventLinkStyle,
      fontStyleHandle: this.props.eventLinkStyleHandle,
      textDecoration: this.props.eventLinkDecoration,
      textDecorationHandle: this.props.eventLinkDecorationHandle,
      eventLineHeight: this.props.eventLinkLineHeight,
      eventLineHeightHandle: this.props.eventLinkLineHeightHandle,
      eventLetterSpacing: this.props.eventLinkLetterSpacing,
      eventLetterSpacingHandle: this.props.eventLinkLetterSpacingHandle
    })), /*#__PURE__*/React.createElement(PanelBody, {
      title: __("Please Share Your Valuable Feedback.", "ebec")
    }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.CardBody, {
      className: "ebec-review-tab"
    }, __("We hope you liked our plugin created events. Please share your valuable feedback.", "ebec"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("a", {
      className: "components-button is-primary is-small",
      href: "https://wordpress.org/support/plugin/events-block-for-the-events-calendar/#new-post",
      target: "_blank"
    }, "Rate Us \u2605\u2605\u2605\u2605\u2605")))));
  }
}

/***/ }),

/***/ "./src/Block/layout.js":
/*!*****************************!*\
  !*** ./src/Block/layout.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");

const {
  __
} = wp.i18n;
const Layout = props => {
  const regex = /(<([^>]+)>)/gi;
  let FontFamily = props.title_family_font + "|" + props.venue_family_font + "|" + props.description_family_font + "|" + props.date_family_font + "|" + props.link_family_font;
  let title_link = document.createElement('link');
  title_link.href = 'https://fonts.googleapis.com/css?family=' + FontFamily;
  title_link.rel = "stylesheet";
  title_link.type = "text/css";
  document.head.appendChild(title_link);
  let event_type = props.feature == false ? 'ebec-simple-event' : 'ebec-featured-event';
  let event_time = "";
  let date_start = new Date(props.start_date);
  let date_end = new Date(props.end_date);
  let longMonthStart = date_start.toLocaleString('en-us', {
    month: 'long'
  });
  let shortMonthStart = date_start.toLocaleString('en-us', {
    month: 'short'
  });
  let longDayStart = date_start.toLocaleDateString('en-us', {
    weekday: 'long'
  });
  let longMonthEnd = date_end.toLocaleString('en-us', {
    month: 'long'
  });
  let start_time = date_start.toLocaleString('en-us', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).toLowerCase();
  let end_time = date_end.toLocaleString('en-us', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).toLowerCase();
  let desc = '' !== props.description ? props.description : props.excerpt;
  if (props.eventDescType !== 'full') {
    const excerpt = props.excerpt || props.description;
    const excerptArr = excerpt.replace(regex, " ").split(' ');
    const descJoin = excerptArr.slice(0, 55).join(' ');
    desc = excerptArr.length > 53 ? `${descJoin}[...]` : descJoin;
  }
  let date_style = "";
  if (date_end && date_start) {
    if (props.allDay) {
      event_time = /*#__PURE__*/React.createElement("span", null, "All Day");
    } else if (props.start_date_day == props.end_date_day && longMonthStart == longMonthEnd) {
      event_time = /*#__PURE__*/React.createElement("span", null, start_time, " - ", end_time);
    } else {
      const currentYear = new Date().getFullYear();
      const startYear = parseInt(props.start_date_year) !== currentYear ? `, ${props.start_date_year}` : '';
      const endYear = parseInt(props.end_date_year) !== currentYear ? `, ${props.end_date_year}` : '';
      event_time = /*#__PURE__*/React.createElement("span", null, longMonthStart, " ", props.start_date_day, startYear, " \u2013 ", longMonthEnd, " ", props.end_date_day, endYear);
    }
  }
  if (props.date_format != null) {
    if (props.date_format == "DM") {
      date_style = /*#__PURE__*/React.createElement("div", {
        className: "ebec-date-area default-schedule",
        itemprop: "startDate",
        content: props.start_date
      }, /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-day"
      }, " ", props.start_date_day, " "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-month"
      }, shortMonthStart));
    } else if (props.date_format == "MD") {
      date_style = /*#__PURE__*/React.createElement("div", {
        className: "ebec-date-area default-schedule",
        itemprop: "startDate",
        content: props.start_date
      }, /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-month"
      }, shortMonthStart, " "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-day"
      }, " ", props.start_date_day));
    } else if (props.date_format == "FD") {
      date_style = /*#__PURE__*/React.createElement("div", {
        className: "ebec-date-area default-schedule",
        itemprop: "startDate",
        content: props.start_date
      }, /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-month"
      }, longMonthStart, " "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-day"
      }, " ", props.start_date_day));
    } else if (props.date_format == "DF") {
      date_style = /*#__PURE__*/React.createElement("div", {
        className: "ebec-date-area default-schedule",
        itemprop: "startDate",
        content: props.start_date
      }, /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-day"
      }, " ", props.start_date_day, " "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-month"
      }, longMonthStart));
    } else if (props.date_format == "FD,Y") {
      date_style = /*#__PURE__*/React.createElement("div", {
        className: "ebec-date-area default-schedule",
        itemprop: "startDate",
        content: props.start_date
      }, /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-month"
      }, longMonthStart), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-day"
      }, " ", props.start_date_day, ", "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-yr"
      }, props.start_date_year));
    } else if (props.date_format == "MD,Y") {
      date_style = /*#__PURE__*/React.createElement("div", {
        className: "ebec-date-area default-schedule",
        itemprop: "startDate",
        content: props.start_date
      }, /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-month"
      }, shortMonthStart), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-day"
      }, " ", props.start_date_day, ", "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-yr"
      }, props.start_date_year));
    } else if (props.date_format == "MD,YT") {
      date_style = /*#__PURE__*/React.createElement("div", {
        className: "ebec-date-area default-schedule",
        itemprop: "startDate",
        content: props.start_date
      }, /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-month"
      }, shortMonthStart), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-day"
      }, " ", props.start_date_day, ", "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-yr"
      }, props.start_date_year), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-time"
      }, /*#__PURE__*/React.createElement("span", {
        class: "ebec-icon"
      }, /*#__PURE__*/React.createElement("i", {
        class: "ebec-icon-clock",
        "aria-hidden": "true"
      })), event_time));
    } else if (props.date_format == "jMl") {
      date_style = /*#__PURE__*/React.createElement("div", {
        className: "ebec-date-area default-schedule",
        itemprop: "startDate",
        content: props.start_date
      }, /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-day"
      }, " ", props.start_date_day, " "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-month"
      }, shortMonthStart, " "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-weekday"
      }, longDayStart));
    } else if (props.date_format == "full") {
      date_style = /*#__PURE__*/React.createElement("div", {
        className: "ebec-date-area default-schedule",
        itemprop: "startDate",
        content: props.start_date
      }, /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-day"
      }, " ", props.start_date_day, " "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-month"
      }, longMonthStart, " "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-yr"
      }, props.start_date_year), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-time"
      }, /*#__PURE__*/React.createElement("span", {
        class: "ebec-icon"
      }, /*#__PURE__*/React.createElement("i", {
        class: "ebec-icon-clock",
        "aria-hidden": "true"
      })), event_time));
    } else if (props.date_format == "d.FY") {
      date_style = /*#__PURE__*/React.createElement("div", {
        className: "ebec-date-area default-schedule",
        itemprop: "startDate",
        content: props.start_date
      }, /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-day"
      }, " ", props.start_date_day, ". "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-month"
      }, longMonthStart, " "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-yr"
      }, props.start_date_year));
    } else if (props.date_format == "d.F") {
      date_style = /*#__PURE__*/React.createElement("div", {
        className: "ebec-date-area default-schedule",
        itemprop: "startDate",
        content: props.start_date
      }, /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-day"
      }, " ", props.start_date_day, ". "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-month"
      }, longMonthStart));
    } else if (props.date_format == "d.Ml") {
      date_style = /*#__PURE__*/React.createElement("div", {
        className: "ebec-date-area default-schedule",
        itemprop: "startDate",
        content: props.start_date
      }, /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-day"
      }, " ", props.start_date_day, ". "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-month"
      }, shortMonthStart, " "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-weekday"
      }, longDayStart));
    } else if (props.date_format == "ldF") {
      date_style = /*#__PURE__*/React.createElement("div", {
        className: "ebec-date-area default-schedule",
        itemprop: "startDate",
        content: props.start_date
      }, /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-weekday"
      }, longDayStart, " "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-day"
      }, " ", props.start_date_day, " "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-month"
      }, longMonthStart));
    } else if (props.date_format == "Mdl") {
      date_style = /*#__PURE__*/React.createElement("div", {
        className: "ebec-date-area default-schedule",
        itemprop: "startDate",
        content: props.start_date
      }, /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-month"
      }, shortMonthStart, " "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-day"
      }, " ", props.start_date_day, " "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-weekday"
      }, longDayStart));
    } else if (props.date_format == "dFT") {
      date_style = /*#__PURE__*/React.createElement("div", {
        className: "ebec-date-area default-schedule",
        itemprop: "startDate",
        content: props.start_date
      }, /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-day"
      }, " ", props.start_date_day, " "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-month"
      }, longMonthStart, " "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-time"
      }, /*#__PURE__*/React.createElement("span", {
        class: "ebec-icon"
      }, /*#__PURE__*/React.createElement("i", {
        class: "ebec-icon-clock",
        "aria-hidden": "true"
      })), event_time));
    } else {
      date_style = /*#__PURE__*/React.createElement("div", {
        className: "ebec-date-area default-schedule",
        itemprop: "startDate",
        content: props.start_date
      }, /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-day"
      }, " ", props.start_date_day, " "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-month"
      }, longMonthStart, " "), /*#__PURE__*/React.createElement("span", {
        className: "ebec-ev-yr"
      }, props.start_date_year));
    }
  }
  return /*#__PURE__*/React.createElement(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, props.display_header === true && props.eventLayout !== 'minimal' && /*#__PURE__*/React.createElement("div", {
    className: 'ebec-month-header ' + event_type + ''
  }, /*#__PURE__*/React.createElement("span", {
    className: "ebec-header-year"
  }, longMonthStart, " ", props.start_date_year), /*#__PURE__*/React.createElement("span", {
    className: "ebec-header-line"
  })), /*#__PURE__*/React.createElement("div", {
    id: "event-" + props.id + "",
    className: "ebec-list-posts style-1 " + event_type + ""
  }, /*#__PURE__*/React.createElement("div", {
    className: "ebec-event-date-tag"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ebec-event-datetimes"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ev-mo"
  }, shortMonthStart), /*#__PURE__*/React.createElement("span", {
    className: "ebec-ev-day"
  }, props.start_date_day))), /*#__PURE__*/React.createElement("div", {
    className: "ebec-event-details"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ebec-event-datetime"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ebec-minimal-list-time"
  }, date_style, /*#__PURE__*/React.createElement("meta", {
    itemprop: "endDate",
    content: props.end_date
  }))), /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: 'ebec-events-title'
  }, props.title), props.eventLayout !== 'minimal' && /*#__PURE__*/React.createElement(React.Fragment, null, props.hide_venue == "no" && props.venue.length !== 0 && /*#__PURE__*/React.createElement("div", {
    className: "ebec-list-venue"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ebec-icon"
  }, /*#__PURE__*/React.createElement("i", {
    className: "ebec-icon-location",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("a", {
    href: "#",
    title: "Kiehn"
  }, props.venue_name), ",", /*#__PURE__*/React.createElement("span", {
    className: "tribe-address"
  }, props.venue_address !== '' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "tribe-street-address"
  }, props.venue_address)), '' !== props.venue_zip && (props.venue_address !== '' || '' !== props.venue_city) && /*#__PURE__*/React.createElement("br", null), '' !== props.venue_city ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "tribe-locality"
  }, props.venue_city), /*#__PURE__*/React.createElement("span", {
    className: "tribe-delimiter"
  }, ", ")) : ' ', '' !== props.venue_state && /*#__PURE__*/React.createElement("abbr", {
    className: "tribe-region tribe-events-abbr",
    title: ""
  }, props.venue_state, " "), props.venue_zip && '' !== props.venue_zip && undefined != props.venue_zip && /*#__PURE__*/React.createElement("span", {
    className: "tribe-postal-code"
  }, " ", props.venue_zip, " "), /*#__PURE__*/React.createElement("span", {
    className: "tribe-country-name"
  }, props.venue_country))), props.display_description == "yes" && props.display_description !== "" && /*#__PURE__*/React.createElement("div", {
    className: "ebec-minimal-list-desc"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ebec-event-content",
    itemprop: "description",
    content: props.description
  }, /*#__PURE__*/React.createElement("p", {
    dangerouslySetInnerHTML: {
      __html: desc
    }
  }))), props.event_cost != null && /*#__PURE__*/React.createElement("div", {
    className: "ebec-list-cost",
    style: {
      color: props.main_col
    }
  }, /*#__PURE__*/React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: props.event_cost
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "ebec-style-1-more"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "ebec-events-read-more",
    rel: "bookmark"
  }, props.link_name))), props.eventLayout !== 'minimal' && /*#__PURE__*/React.createElement("div", {
    className: "ebec-right-wrapper"
  }, props.image_url && props.image_url != undefined && props.image_url !== '' &&
  /*#__PURE__*/
  // <a className="ebec-static-small-list-ev-img" href={props.url}>
  React.createElement("a", {
    className: "ebec-static-small-list-ev-img",
    href: "#"
  }, /*#__PURE__*/React.createElement("img", {
    src: props.image_url
  }), /*#__PURE__*/React.createElement("span", {
    className: "image-overlay overlay-type-extern"
  }, /*#__PURE__*/React.createElement("span", {
    className: "image-overlay-inside"
  }))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

/***/ }),

/***/ "./src/Block/reduxStore.js":
/*!*********************************!*\
  !*** ./src/Block/reduxStore.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");


const actions = {
  populateTodo(todo) {
    return {
      type: 'POPULATE_TODO',
      todo
    };
  }
};
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'POPULATE_TODO':
      if (action.todo == "zero") {
        return 'zero';
      } else if (action.todo !== "error") {
        return [...action.todo.events];
      } else {
        return 'error';
      }
    default:
      return state;
  }
};
const selectors = {
  getTodos(state) {
    return state;
  }
};
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.registerStore)('ebec/events_data', {
  reducer,
  actions,
  selectors,
  resolvers: {
    getTodos() {
      _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__({
        path: '/tribe/events/v1/events/?page=1&per_page=999&start_date=0000-01-01&end_date=9999-12-31'
      }).then(events_data => {
        if (events_data.events.length == 0) {
          (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('ebec/events_data').populateTodo("zero");
        } else if (events_data.events) {
          (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('ebec/events_data').populateTodo(events_data);
        } else {
          (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('ebec/events_data').populateTodo("error");
        }
      }).catch(function () {
        (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('ebec/events_data').populateTodo("error");
      });
    }
  }
});

/***/ }),

/***/ "./src/Block/styling.js":
/*!******************************!*\
  !*** ./src/Block/styling.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Components_css_generateCSS_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Components/css/generateCSS.js */ "./src/Components/css/generateCSS.js");
/* harmony import */ var _Components_css_generateCSSUnit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Components/css/generateCSSUnit.js */ "./src/Components/css/generateCSSUnit.js");
/**
 * Returns Dynamic Generated CSS
 */



function contentEventStyle(props) {
  const {
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
    event_link_letter_spacing
  } = props.attributes;
  var selectors = {
    " .ebec-header-year": {
      "color": main_skin_color
    },
    " .ebec-header-line": {
      "background-color": main_skin_color
    },
    " .ebec-event-datetimes .ev-mo": {
      "color": main_skin_color
    },
    " .ebec-event-datetimes .ebec-ev-day": {
      "color": main_skin_color
    },
    " .ebec-list-wrapper>:not(.ebec-minimal-list-wrapper) .ebec-list-posts": {
      "border-left-color": main_skin_color
    },
    " .ebec-event-details": {
      "border-left-color": main_skin_color
    },
    " .ebec-events-title": {
      "color": event_title_color,
      "font-size": event_title_font + 'px',
      "font-family": event_title_family,
      "font-weight": event_title_weight,
      "text-transform": event_title_transform,
      "font-style": event_title_style,
      "text-decoration": event_title_decoration,
      "line-height": "initial" === event_title_line_height ? 'initial' : event_title_line_height + 'px',
      "letter-spacing": event_title_letter_spacing + 'px'
    },
    " .ebec-date-area": {
      "color": event_date_color,
      "font-size": event_date_font + 'px',
      "font-family": event_date_family,
      "font-weight": event_date_weight,
      "text-transform": event_date_transform,
      "font-style": event_date_style,
      "text-decoration": event_date_decoration,
      "line-height": "initial" === event_date_line_height ? 'initial' : event_date_line_height + 'px',
      "letter-spacing": event_date_letter_spacing + 'px'
    },
    " .ebec-list-venue": {
      "color": event_venue_color,
      "font-size": event_venue_font + 'px',
      "font-family": event_venue_family,
      "font-weight": event_venue_weight,
      "text-transform": event_venue_transform,
      "font-style": event_venue_style,
      "text-decoration": event_venue_decoration,
      "line-height": "initial" === event_venue_line_height ? 'initial' : event_venue_line_height + 'px',
      "letter-spacing": event_venue_letter_spacing + 'px'
    },
    " .ebec-event-content": {
      "color": event_description_color,
      "font-family": event_description_family,
      "font-weight": event_description_weight,
      "text-transform": event_description_transform,
      "font-style": event_description_style,
      "text-decoration": event_description_decoration,
      "letter-spacing": event_description_letter_spacing + 'px'
    },
    " .ebec-event-content p": {
      "font-size": event_description_font + 'px',
      "line-height": "initial" === event_description_line_height ? 'initial' : event_description_line_height + 'px'
    },
    " .ebec-events-read-more": {
      "color": event_link_color,
      "font-size": event_link_font + 'px',
      "font-family": event_link_family,
      "font-weight": event_link_weight,
      "text-transform": event_link_transform,
      "font-style": event_link_style,
      "text-decoration": event_link_decoration,
      "line-height": "initial" === event_link_line_height ? 'initial' : event_link_line_height + 'px',
      "letter-spacing": event_link_letter_spacing + 'px'
    },
    " .ebec-list-venue a ": {
      "color": event_venue_color
    }
  };
  var styling_css = "";
  var id = `#block-${props.clientId}`;
  styling_css = (0,_Components_css_generateCSS_js__WEBPACK_IMPORTED_MODULE_0__["default"])(selectors, id);
  return styling_css;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (contentEventStyle);

/***/ }),

/***/ "./src/Components/css/generateCSS.js":
/*!*******************************************!*\
  !*** ./src/Components/css/generateCSS.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function generateCSS(selectors, id, isResponsive = false, responsiveType = "") {
  var gen_styling_css = "";
  for (var i in selectors) {
    var sel = selectors[i];
    var css = "";
    for (var j in sel) {
      var checkString = true;
      if (typeof sel[j] === "string" && sel[j].length === 0) {
        checkString = false;
      }
      if ('font-family' === j && typeof sel[j] != "undefined" && 'Default' === sel[j]) {
        continue;
      }
      if (typeof sel[j] != "undefined" && checkString) {
        if ('font-family' === j) {
          css += j + ": " + "'" + sel[j] + "'" + ";";
        } else {
          css += j + ": " + sel[j] + ";";
        }
      }
    }
    if (css.length !== 0) {
      gen_styling_css += id;
      gen_styling_css += i + "{";
      gen_styling_css += css;
      gen_styling_css += "}";
    }
  }
  return gen_styling_css;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (generateCSS);

/***/ }),

/***/ "./src/Components/css/generateCSSUnit.js":
/*!***********************************************!*\
  !*** ./src/Components/css/generateCSSUnit.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function generateCSSUnit(value, unit) {
  var css = "";
  if (typeof value != "undefined") {
    css += value + unit;
  }
  return css;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (generateCSSUnit);

/***/ }),

/***/ "./src/Components/icons.js":
/*!*********************************!*\
  !*** ./src/Components/icons.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const EctIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "100%",
  height: "100%",
  viewBox: "0 0 62 62",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
  xmlSpace: "preserve",
  xmlnsSerif: "http://www.serif.com/",
  fillRule: "evenodd",
  clipRule: "evenodd",
  strokeLinecap: "square",
  strokeLinejoin: "round",
  strokeMiterlimit: 1.5
}, /*#__PURE__*/React.createElement("g", {
  id: "icon"
}, /*#__PURE__*/React.createElement("path", {
  d: "M55.831,16.969c0,-4.158 -3.375,-7.533 -7.533,-7.533l-35.156,-0c-4.158,-0 -7.533,3.375 -7.533,7.533l-0,35.156c-0,4.158 3.375,7.533 7.533,7.533l35.156,0c4.158,0 7.533,-3.375 7.533,-7.533l0,-35.156Z",
  fill: "#fff"
}), /*#__PURE__*/React.createElement("clipPath", {
  id: "_clip1"
}, /*#__PURE__*/React.createElement("path", {
  d: "M55.831,16.969c0,-4.158 -3.375,-7.533 -7.533,-7.533l-35.156,-0c-4.158,-0 -7.533,3.375 -7.533,7.533l-0,35.156c-0,4.158 3.375,7.533 7.533,7.533l35.156,0c4.158,0 7.533,-3.375 7.533,-7.533l0,-35.156Z"
})), /*#__PURE__*/React.createElement("g", {
  clipPath: "url(#_clip1)"
}, /*#__PURE__*/React.createElement("rect", {
  x: "5.609",
  y: "9.436",
  width: "50.222",
  height: "11.858",
  fill: "#008bff"
})), /*#__PURE__*/React.createElement("path", {
  d: "M55.831,16.969c0,-4.158 -3.375,-7.533 -7.533,-7.533l-35.156,-0c-4.158,-0 -7.533,3.375 -7.533,7.533l-0,35.156c-0,4.158 3.375,7.533 7.533,7.533l35.156,0c4.158,0 7.533,-3.375 7.533,-7.533l0,-35.156Z",
  fill: "none",
  stroke: "#0f1031",
  strokeWidth: "1.88px"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16.625,1.707c0,-0.489 -0.396,-0.885 -0.885,-0.885c-0.488,-0 -0.885,0.396 -0.885,0.885l0,15.458c0,0.488 0.397,0.885 0.885,0.885c0.489,-0 0.885,-0.397 0.885,-0.885l0,-15.458Z",
  fill: "#0f1031"
}), /*#__PURE__*/React.createElement("path", {
  d: "M46.585,1.707c-0,-0.489 -0.397,-0.885 -0.885,-0.885c-0.489,-0 -0.885,0.396 -0.885,0.885l-0,15.458c-0,0.488 0.396,0.885 0.885,0.885c0.488,-0 0.885,-0.397 0.885,-0.885l-0,-15.458Z",
  fill: "#0f1031"
}), /*#__PURE__*/React.createElement("g", {
  id: "big-plus"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "30.72",
  cy: "40.348",
  r: "14.068",
  fill: "#fff",
  stroke: "#a7a7a7",
  strokeWidth: "4.73px"
}), /*#__PURE__*/React.createElement("path", {
  d: "M28.546,47.958l-0,-5.672l-5.515,-0l0,-3.876l5.515,-0l-0,-5.672l4.348,0l0,5.672l5.515,-0l-0,3.876l-5.515,-0l0,5.672l-4.348,-0Z",
  fill: "#a7a7a7",
  fillRule: "nonzero"
}))));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EctIcon);

/***/ }),

/***/ "./src/Components/typography.js":
/*!**************************************!*\
  !*** ./src/Components/typography.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Typography: () => (/* binding */ Typography)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _font_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../font.json */ "./src/font.json");


const {
  PanelBody,
  DateTimePicker,
  TextControl,
  ColorPicker,
  SelectControl,
  ToggleControl,
  RangeControl,
  RadioControl
} = wp.components;
const {
  __
} = wp.i18n;
class Typography extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Component {
  render() {
    let fontFamilyOption = [];
    for (const property in _font_json__WEBPACK_IMPORTED_MODULE_1__.fonts) {
      fontFamilyOption.push({
        label: property,
        value: _font_json__WEBPACK_IMPORTED_MODULE_1__.fonts[property]
      });
    }
    let fontWeightOption = [{
      label: "100",
      value: "100"
    }, {
      label: "200",
      value: "200"
    }, {
      label: "300",
      value: "300"
    }, {
      label: "400",
      value: "400"
    }, {
      label: "500",
      value: "500"
    }, {
      label: "600",
      value: "600"
    }, {
      label: "700",
      value: "700"
    }, {
      label: "800",
      value: "800"
    }, {
      label: "900",
      value: "900"
    }, {
      label: "Normal",
      value: "normal"
    }, {
      label: "Bold",
      value: "bold"
    }];
    let fontTransformOption = [{
      label: 'Uppercasse',
      value: 'uppercase'
    }, {
      label: 'Lowercase',
      value: 'lowercase'
    }, {
      label: 'Capitalize',
      value: 'capitalize'
    }, {
      label: 'Normal',
      value: 'normal'
    }, {
      label: 'Default',
      value: 'none'
    }];
    let fontStyleOption = [{
      label: 'Normal',
      value: 'normal'
    }, {
      label: 'Italic',
      value: 'italic'
    }, {
      label: 'Oblique',
      value: 'oblique'
    }, {
      label: 'Default',
      value: 'initial'
    }];
    let textDecorationOption = [{
      label: 'None',
      value: 'none'
    }, {
      label: 'Overline',
      value: 'overline'
    }, {
      label: 'Underline',
      value: 'underline'
    }, {
      label: 'Line-Through',
      value: 'line-through'
    }, {
      label: 'Default',
      value: 'initial'
    }];
    return /*#__PURE__*/React.createElement(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/React.createElement(RangeControl, {
      label: __("Font Size (in Pixel)", "ebec"),
      value: this.props.fontSize,
      onChange: this.props.fontSizeHandle,
      min: 0,
      max: 100
    }), /*#__PURE__*/React.createElement(SelectControl, {
      label: __('Family', 'ebec'),
      options: fontFamilyOption,
      value: this.props.fontFamily,
      onChange: this.props.fontFamilyHandle
    }), /*#__PURE__*/React.createElement(SelectControl, {
      label: __('Weight', 'ebec'),
      options: fontWeightOption,
      value: this.props.fontWeight,
      onChange: this.props.fontWeightHandle
    }), /*#__PURE__*/React.createElement(SelectControl, {
      label: __('Transform', 'ebec'),
      options: fontTransformOption,
      value: this.props.fontTransform,
      onChange: this.props.fontTransformHandle
    }), /*#__PURE__*/React.createElement(SelectControl, {
      label: __('Style', 'ebec'),
      options: fontStyleOption,
      value: this.props.fontStyle,
      onChange: this.props.fontStyleHandle
    }), /*#__PURE__*/React.createElement(SelectControl, {
      label: __(' Decoration', 'ebec'),
      options: textDecorationOption,
      value: this.props.textDecoration,
      onChange: this.props.textDecorationHandle
    }), /*#__PURE__*/React.createElement(RangeControl, {
      label: __("Line Height (in Pixel)", "ebec"),
      value: this.props.eventLineHeight,
      onChange: this.props.eventLineHeightHandle,
      min: 0,
      max: 100
    }), /*#__PURE__*/React.createElement(RangeControl, {
      label: __("Letter Spacing (in Pixel)", "ebec"),
      value: this.props.eventLetterSpacing,
      onChange: this.props.eventLetterSpacingHandle,
      min: -5,
      max: 10,
      step: 0.1
    }));
  }
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Block_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Block/index.js */ "./src/Block/index.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _Block_reduxStore_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Block/reduxStore.js */ "./src/Block/reduxStore.js");




/***/ }),

/***/ "./src/font.json":
/*!***********************!*\
  !*** ./src/font.json ***!
  \***********************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"fonts":{"Abel":"Abel","Abril Fatface":"Abril Fatface","Acme":"Acme","Alegreya":"Alegreya","Alex Brush":"Alex Brush","Amaranth":"Amaranth","Amatic SC":"Amatic SC","Anton":"Anton","Arbutus Slab":"Arbutus Slab","Architects Daughter":"Architects Daughter","Archivo":"Archivo","Archivo Black":"Archivo Black","Arima Madurai":"Arima Madurai","Asap":"Asap","Bad Script":"Bad Script","Baloo Bhaina":"Baloo Bhaina","Bangers":"Bangers","Berkshire Swash":"Berkshire Swash","Bitter":"Bitter","Boogaloo":"Boogaloo","Bree Serif":"Bree Serif","Bungee Shade":"Bungee Shade","Cantata One":"Cantata One","Catamaran":"Catamaran","Caveat":"Caveat","Caveat Brush":"Caveat Brush","Ceviche One":"Ceviche One","Chewy":"Chewy","Contrail One":"Contrail One","Crete Round":"Crete Round","Dancing Script":"Dancing Script","Exo 2":"Exo 2","Fascinate":"Fascinate","Francois One":"Francois One","Freckle Face":"Freckle Face","Fredoka One":"Fredoka One","Gloria Hallelujah":"Gloria Hallelujah","Gochi Hand":"Gochi Hand","Great Vibes":"Great Vibes","Handlee":"Handlee","Inconsolata":"Inconsolata","Indie Flower":"Indie Flower","Kaushan Script":"Kaushan Script","Lalezar":"Lalezar","Lato":"Lato","Libre Baskerville":"Libre Baskerville","Life Savers":"Life Savers","Lobster":"Lobster","Lora":"Lora","Luckiest Guy":"Luckiest Guy","Marcellus SC":"Marcellus SC","Monoton":"Monoton","Montserrat":"Montserrat","News Cycle":"News Cycle","Nothing You Could Do":"Nothing You Could Do","Noto Serif":"Noto Serif","Oleo Script Swash Caps":"Oleo Script Swash Caps","Open Sans":"Open Sans","Open Sans Condensed":"Open Sans Condensed","Oranienbaum":"Oranienbaum","Oswald":"Oswald","PT Sans":"PT Sans","PT Sans Narrow":"PT Sans Narrow","PT Serif":"PT Serif","Pacifico":"Pacifico","Patrick Hand":"Patrick Hand","Peralta":"Peralta","Permanent Marker":"Permanent Marker","Philosopher":"Philosopher","Play":"Play","Playfair Display":"Playfair Display","Playfair Display SC":"Playfair Display SC","Poiret One":"Poiret One","Press Start 2P":"Press Start 2P","Prosto One":"Prosto One","Quattrocento":"Quattrocento","Questrial":"Questrial","Quicksand":"Quicksand","Raleway":"Raleway","Rancho":"Rancho","Righteous":"Righteous","Roboto":"Roboto","Roboto Condensed":"Roboto Condensed","Roboto Slab":"Roboto Slab","Rubik":"Rubik","Rye":"Rye","Satisfy":"Satisfy","Shadows Into Light":"Shadows Into Light","Shojumaru":"Shojumaru","Sigmar One":"Sigmar One","Skranji":"Skranji","Slabo 27px":"Slabo 27px","Special Elite":"Special Elite","Tinos":"Tinos","Ultra":"Ultra","UnifrakturMaguntia":"UnifrakturMaguntia","VT323":"VT323","Yanone Kaffeesatz":"Yanone Kaffeesatz"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkevents_lists_block_for_the_events_calendar"] = globalThis["webpackChunkevents_lists_block_for_the_events_calendar"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map