/**
 * Returns Dynamic Generated CSS from the shared selector map
 * (includes/style-selector-map.json — keep in sync with EBEC_Style_Settings).
 */

import generateCSS from "../Components/css/generateCSS.js"
import generateCSSUnit from "../Components/css/generateCSSUnit.js"
import styleMap from "../../includes/style-selector-map.json"

/**
 * Darken a hex color by a percent.
 * Keep in sync with PHP ebec_darken_color() in includes/ebec-functions.php
 * (same clamp: channel values limited to 0–255).
 */
function darkenColor(color, percent) {
    var num = parseInt(color.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) - amt,
      G = ((num >> 8) & 0x00FF) - amt,
      B = (num & 0x0000FF) - amt;

    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 0 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }

function resolvePropValue( prop, attributes ) {
    const attr = prop.attr;
    if ( ! attr || attributes[ attr ] === undefined || attributes[ attr ] === '' ) {
        return undefined;
    }
    let value = attributes[ attr ];
    if ( prop.darken ) {
        value = darkenColor( value, prop.darken );
    }
    if ( prop.template ) {
        value = prop.template.replace( '{value}', value );
    }
    if ( prop.important ) {
        value = value + ' !important';
    }
    return value;
}

function typographyProps( rule, attributes ) {
    const prefix = rule.typography;
    const omit = rule.omit || [];
    const only = rule.only || [];
    const lineHeightRaw = attributes[ `${prefix}_line_height` ];
    const decoration = attributes[ `${prefix}_decoration` ] + ( rule.decorationImportant ? ' !important' : '' );

    const all = {
        "color": attributes[ `${prefix}_color` ],
        "font-size": generateCSSUnit( attributes[ `${prefix}_font` ], 'px' ),
        "font-family": attributes[ `${prefix}_family` ],
        "font-weight": attributes[ `${prefix}_weight` ],
        "text-transform": attributes[ `${prefix}_transform` ],
        "font-style": attributes[ `${prefix}_style` ],
        "text-decoration": decoration,
        "line-height": "initial" === lineHeightRaw ? 'initial' : generateCSSUnit( lineHeightRaw, 'px' ),
        "letter-spacing": generateCSSUnit( attributes[ `${prefix}_letter_spacing` ], 'px' ),
    };

    const out = {};
    Object.keys( all ).forEach( ( property ) => {
        if ( only.length && ! only.includes( property ) ) {
            return;
        }
        if ( omit.includes( property ) ) {
            return;
        }
        out[ property ] = all[ property ];
    } );
    return out;
}

function mapSelectorToKey( selector ) {
    const trimmed = String( selector || '' ).trim();
    if ( trimmed.charAt( 0 ) === '>' || trimmed.charAt( 0 ) === '+' || trimmed.charAt( 0 ) === '~' ) {
        return trimmed;
    }
    return ' ' + trimmed;
}

function contentEventStyle( props ) {
    const attributes = props.attributes;
    const selectors = {};

    ( styleMap.rules || [] ).forEach( ( rule ) => {
        if ( ! rule.selector ) {
            return;
        }
        const key = mapSelectorToKey( rule.selector );
        let decls = {};

        if ( rule.typography ) {
            decls = { ...decls, ...typographyProps( rule, attributes ) };
        }
        if ( Array.isArray( rule.props ) ) {
            rule.props.forEach( ( prop ) => {
                const value = resolvePropValue( prop, attributes );
                if ( value !== undefined && prop.property ) {
                    decls[ prop.property ] = value;
                }
            } );
        }

        if ( Object.keys( decls ).length ) {
            selectors[ key ] = { ...( selectors[ key ] || {} ), ...decls };
        }
    } );

    return generateCSS( selectors, `#block-${ props.clientId }` );
}
export default contentEventStyle
