var smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */
var settings = {
    filename: "_smartgrid",
    outputStyle: 'scss',
    /* less || scss || sass || styl */
    columns: 2,
    /* number of grid columns */
    offset: '0px',
    /* gutter width px || % */
    mobileFirst: 'mobileFirst',
    /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '1920px',
        /* max-width оn very large screen */
        fields: '80px' /* side fields */
    },
    breakPoints: {
        lg: {
            width: '1440px',
            /* -> @media (max-width: 1100px) */
        },
        sm: {
            width: '768px',
            offset: '30px',
            fields: '39px' /* set fields only if you want to change container.fields */
        },
        xs: {
            width: '320px',
            fields: '15px'
        }
        /* 
        We can create any quantity of break points.
 
        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    }
};

smartgrid('./src/precss', settings);