import React, {StyleSheet, Dimensions} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "body": {
        "width": "100%",
        "height": "100%",
        "fontFamily": "Lora,\"Helvetica Neue\",Helvetica,Arial,sans-serif",
        "webkitTapHighlightColor": "rgba(255,255,255,.2)"
    },
    "html": {
        "width": "100%",
        "height": "100%"
    },
    "h1": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 35,
        "marginLeft": 0,
        "textTransform": "uppercase",
        "fontFamily": "Montserrat,\"Helvetica Neue\",Helvetica,Arial,sans-serif",
        "fontWeight": 700,
        "letterSpacing": 1
    },
    "h2": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 35,
        "marginLeft": 0,
        "textTransform": "uppercase",
        "fontFamily": "Montserrat,\"Helvetica Neue\",Helvetica,Arial,sans-serif",
        "fontWeight": 700,
        "letterSpacing": 1
    },
    "h3": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 35,
        "marginLeft": 0,
        "fontFamily": "Montserrat,\"Helvetica Neue\",Helvetica,Arial,sans-serif",
        "fontWeight": 700,
        "letterSpacing": 1
    },
    "h4": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 35,
        "marginLeft": 0,
        "fontFamily": "Montserrat,\"Helvetica Neue\",Helvetica,Arial,sans-serif",
        "fontWeight": 700,
        "letterSpacing": 1
    },
    "h5": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 35,
        "marginLeft": 0,
        "fontFamily": "Montserrat,\"Helvetica Neue\",Helvetica,Arial,sans-serif",
        "fontWeight": 700,
        "letterSpacing": 1
    },
    "h6": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 35,
        "marginLeft": 0,
        "fontFamily": "Montserrat,\"Helvetica Neue\",Helvetica,Arial,sans-serif",
        "fontWeight": 700,
        "letterSpacing": 1
    },
    "p": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 25,
        "marginLeft": 0,
        "fontSize": 18,
        "lineHeight": 1.5
    },
    "li": {
        "listStyleType": "none"
    },
    "ul": {
        "paddingTop": 0,
        "paddingRight": 0,
        "paddingBottom": 0,
        "paddingLeft": 0,
        "listStyleType": "none",
        "display": "block"
    },
    "nav": {
        "marginBottom": 200
    },
    "navbar-default": {
        "marginBottom": 0,
        "borderBottom": "1 solid rgba(255,255,255,.3)",
        "textTransform": "uppercase",
        "fontFamily": "Montserrat,\"Helvetica Neue\",Helvetica,Arial,sans-serif",
        "backgroundColor": "#009688",
        "width": "100%",
        "color": "white"
    },
    "navbar-default navbar-brand": {
        "fontWeight": 700,
        "backgroundColor": "#009688",
        "color": "white"
    },
    "navbar-default navbar-brand:hover": {
        "outline": 0,
        "color": "rgba(255, 255, 255, 0.5)"
    },
    "uib-datepicker": {
        "backgroundColor": "white",
        "color": "#009688"
    },
    "navbar-default navbar-brand navbar-toggle": {
        "fontSize": 24,
        "color": "white",
        "backgroundColor": "#009688",
        "transition": "all linear 0.5s"
    },
    "menuToggleButton": {
        "color": "white",
        "backgroundColor": "#009688",
        "display": "",
        "transition": "all linear 0.5s",
        "float": "right",
        "verticalAlign": "top"
    },
    "navbar-default navbar-toggle icon-bar": {
        "color": "white",
        "transition": "all linear 0.5s",
        "backgroundColor": "white"
    },
    "menuToggleButton li": {
        "display": "block"
    },
    "timeSpace": {
        "marginTop": 100
    },
    "navbar-default navbar-nav>li>a": {
        "color": "white"
    },
    "nav navbar-nav ul": {
        "marginTop": 30
    },
    "collapse navbar-collapse navbar-right navbar-main-collapse": {
        "marginTop": 30
    },
    "dropDownMenuList": {
        "float": "right",
        "maxWidth": 30,
        "paddingRight": 30,
        "boxShadow": "0 4 8 0 rgba(0, 0, 0, 0.2), 0 6 20 0 rgba(0, 0, 0, 0.19)",
        "backgroundColor": "#009688",
        "color": "white"
    },
    "icon-bar": {
        "color": "white"
    },
    "navbar-default li": {
        "color": "inherit"
    },
    "dropdown-menu ul": {
        "backgroundColor": "#009688"
    },
    "navbar-default navbar-brand navbar-toggle:focus": {
        "outline": 0,
        "backgroundColor": "#fff    color: white"
    },
    "navbar-default navbar-brand navbar-toggle:active": {
        "outline": 0,
        "backgroundColor": "#fff    color: white"
    },
    "navbar-default a": {
        "color": "#fff"
    },
    "logo a:hover a:focus": {
        "color": "rgb(255,255,255)"
    },
    "page-scroll": {
        "color": "white"
    },
    "navbar-header": {
        "backgroundColor": "#009688",
        "display": "inline"
    },
    "navbar-header a:hover": {
        "color": "rgba(255,255,255,.5)"
    },
    "navbar-collapsed-list": {
        "display": "inline",
        "marginTop": 30
    },
    "navbar-default nav li a": {
        "WebkitTransition": "background .3s ease-in-out",
        "MozTransition": "background .3s ease-in-out",
        "transition": "background .3s ease-in-out"
    },
    "collapsedLinks li a:hover": {
        "backgroundColor": "#009688"
    },
    "navbar-default nav li a:hover": {
        "outline": 0,
        "color": "rgba(255,255,255,.5)",
        "backgroundColor": "#009688"
    },
    "navbar-default nav li a:focus": {
        "outline": 0,
        "backgroundColor": "#009688"
    },
    "navbar-default nav li a:active": {
        "outline": 0,
        "backgroundColor": "#009688"
    },
    "navbar-default nav liactive": {
        "outline": 0
    },
    "navbar-default nav liactive a": {
        "backgroundColor": "rgba(255,255,255,.3)"
    },
    "navbar-default nav liactive a:hover": {
        "color": "#fff"
    },
    "navbar-fixed-top": {
        "height": 124
    },
    "intro": {
        "display": "table",
        "width": "100%",
        "height": "auto",
        "maxHeight": "800    padding: 200 0 200 0",
        "textAlign": "center",
        "color": "white",
        "background": "url(../img/studioBackground.jpeg) no-repeat top center scroll",
        "backgroundColor": "#000",
        "backgroundSize": "cover",
        "WebkitBackgroundSize": "cover",
        "MozBackgroundSize": "cover",
        "OBackgroundSize": "cover"
    },
    "intro h1": {
        "color": "white"
    },
    "uib-timepickerintro intro-body": {
        "display": "table-cell",
        "verticalAlign": "middle"
    },
    "intro intro-body brand-heading": {
        "verticalAlign": "middle",
        "fontSize": 40,
        "marginTop": 100
    },
    "intro intro-body intro-text": {
        "fontSize": 18
    },
    "content-section": {
        "paddingTop": 10,
        "paddingRight": 0,
        "paddingBottom": 100,
        "paddingLeft": 0
    },
    "@medownload": {
        "display": "table-cell"
    },
    "uib-timepicker": {
        "backgroundColor": "white",
        "color": "#009688"
    },
    "disabled": {
        "backgroundColor": "red",
        "color": "red"
    },
    "btn": {
        "borderRadius": 0,
        "textTransform": "uppercase",
        "fontFamily": "Montserrat,\"Helvetica Neue\",Helvetica,Arial,sans-serif",
        "fontWeight": 400,
        "WebkitTransition": "all .3s ease-in-out",
        "MozTransition": "all .3s ease-in-out",
        "transition": "all .3s ease-in-out"
    },
    "btn-default": {
        "border": "1 solid #009688",
        "color": "#009688",
        "backgroundColor": "transparent"
    },
    "btn-default:hover": {
        "border": "1 solid #009688",
        "outline": 0,
        "color": "white",
        "backgroundColor": "#009688"
    },
    "btn-default:focus": {
        "border": "1 solid #009688",
        "outline": 0,
        "color": "white",
        "backgroundColor": "#009688"
    },
    "btn-inverse": {
        "backgroundColor": "#009688",
        "color": "white"
    },
    "btn-inverse:hover": {
        "border": "1 solid #009688",
        "color": "#009688",
        "backgroundColor": "transparent"
    },
    "btn-inverse:focus": {
        "border": "1 solid #009688",
        "color": "#009688",
        "backgroundColor": "transparent"
    },
    "btn-more": {
        "border": "1 solid #9c27b0",
        "color": "#9c27b0",
        "backgroundColor": "transparent"
    },
    "btn-more:hover": {
        "border": "1 solid #9c27b0",
        "outline": 0,
        "color": "white",
        "backgroundColor": "#9c27b0"
    },
    "btn-more:focus": {
        "border": "1 solid #9c27b0",
        "outline": 0,
        "color": "white",
        "backgroundColor": "#9c27b0"
    },
    "btn-cancel": {
        "border": "1 solid #F44336",
        "color": "#F44336",
        "backgroundColor": "transparent"
    },
    "btn-cancel:hover": {
        "border": "1 solid #F44336",
        "outline": 0,
        "color": "#000",
        "backgroundColor": "#F44336"
    },
    "btn-cancel:focus": {
        "border": "1 solid #F44336",
        "outline": 0,
        "color": "#000",
        "backgroundColor": "#F44336"
    },
    "ulbanner-social-buttons": {
        "marginTop": 0
    },
    "footer": {
        "paddingTop": 50,
        "paddingRight": 0,
        "paddingBottom": 50,
        "paddingLeft": 0
    },
    "footer p": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "::-moz-selection": {
        "textShadow": "none",
        "background": "rgba(255,255,255,.2)"
    },
    "::selection": {
        "textShadow": "none",
        "background": "rgba(255,255,255,.2)"
    },
    "img::selection": {
        "background": "0 0"
    },
    "img::-moz-selection": {
        "background": "0 0"
    },
    "search": {
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto",
        "float": "none",
        "textAlign": "center",
        "paddingTop": 20,
        "paddingRight": 20,
        "paddingBottom": 20,
        "paddingLeft": 20
    },
    "col-md-12 column form": {
        "display": "table",
        "marginTop": "auto",
        "marginRight": "auto",
        "marginBottom": "auto",
        "marginLeft": "auto"
    },
    "submitSearchButton": {
        "marginTop": 30
    },
    "introInfo": {
        "paddingTop": 100,
        "paddingRight": 0,
        "paddingBottom": 200,
        "paddingLeft": 0
    },
    "about": {
        "paddingTop": 200,
        "paddingRight": 0,
        "paddingBottom": 200,
        "paddingLeft": 0,
        "minHeight": 800
    },
    "filler": {
        "paddingTop": 200,
        "paddingRight": 0,
        "paddingBottom": 200,
        "paddingLeft": 0,
        "minHeight": 800
    },
    "introArtist": {
        "paddingTop": 200,
        "paddingRight": 0,
        "paddingBottom": 200,
        "paddingLeft": 0,
        "minHeight": 800
    },
    "download": {
        "verticalAlign": "middle",
        "width": "100%",
        "paddingTop": 130,
        "paddingRight": 0,
        "paddingBottom": 120,
        "paddingLeft": 0,
        "color": "#fff",
        "background": "url(../img/studioBackground.jpeg) no-repeat center center scroll",
        "backgroundColor": "#000",
        "WebkitBackgroundSize": "cover",
        "MozBackgroundSize": "cover",
        "backgroundSize": "cover",
        "OBackgroundSize": "cover",
        "display": "table",
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto"
    },
    "exampleInputEmail1": {
        "width": "25%",
        "textAlign": "left",
        "verticalAlign": "middle",
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto"
    },
    "contact": {
        "paddingTop": 260,
        "paddingRight": 0,
        "paddingBottom": 250,
        "paddingLeft": 0
    },
    "contactInfo": {
        "marginTop": "100 0 100 0"
    },
    "userInfo": {
        "paddingTop": 100,
        "paddingRight": 0,
        "paddingBottom": 100,
        "paddingLeft": 0,
        "backgroundColor": "#30353c"
    },
    "intro-Studio": {
        "display": "table",
        "width": "100%",
        "height": "auto",
        "paddingTop": 110,
        "paddingRight": 0,
        "paddingBottom": 10,
        "paddingLeft": 0,
        "textAlign": "center",
        "minHeight": 800,
        "color": "#fff",
        "background": "url(../img/studioHands.jpg) no-repeat bottom center scroll",
        "backgroundColor": "#000",
        "WebkitBackgroundSize": "cover",
        "MozBackgroundSize": "cover",
        "backgroundSize": "cover",
        "OBackgroundSize": "cover"
    },
    "intro-Studio h1": {
        "fontSize": 40
    },
    "intro-Artist": {
        "display": "table",
        "width": "100%",
        "height": "auto",
        "paddingTop": 200,
        "paddingRight": 0,
        "paddingBottom": 200,
        "paddingLeft": 0,
        "textAlign": "center",
        "color": "white",
        "minHeight": 800,
        "background": "url(../img/bassist.jpeg) no-repeat bottom center scroll",
        "backgroundColor": "#000",
        "WebkitBackgroundSize": "cover",
        "MozBackgroundSize": "cover",
        "backgroundSize": "cover",
        "OBackgroundSize": "cover"
    },
    "intro-Artist h2": {
        "color": "white"
    },
    "studioSearchForm": {
        "paddingBottom": 50
    },
    "addStudio": {
        "marginTop": 25,
        "marginRight": 0,
        "marginBottom": 25,
        "marginLeft": 0,
        "width": "100%",
        "textAlign": "center",
        "verticalAlign": "middle"
    },
    "addTextInput": {
        "marginTop": 20,
        "marginRight": 0,
        "marginBottom": 20,
        "marginLeft": 0
    },
    "modal-header": {},
    "modal-body": {},
    "modal-footer": {},
    "successfulAddStudio": {
        "marginTop": 30
    },
    "studioFormName": {
        "width": "100%",
        "textAlign": "left",
        "verticalAlign": "middle"
    },
    "selectProfileType": {
        "textAlign": "center",
        "verticalAlign": "middle"
    },
    "selectOptions": {
        "textAlign": "center",
        "verticalAlign": "middle"
    },
    "selectOptions button": {
        "marginBottom": 10
    },
    "select": {
        "marginBottom": 10,
        "verticalAlign": "middle"
    },
    "input": {
        "marginBottom": 10
    },
    "selectOptions label": {
        "fontWeight": "bold",
        "textAlign": "left"
    },
    "studioFormName button": {
        "marginBottom": 10
    },
    "studioFormName img": {
        "marginTop": 20
    },
    "studioFormName textarea": {
        "height": 200,
        "marginBottom": 10
    },
    "studioFormName label": {
        "fontWeight": "bold",
        "marginTop": 10,
        "fontSize": 18
    },
    "studioFormName input": {
        "verticalAlign": "middle"
    },
    "loginInput": {
        "textAlign": "center"
    },
    "login": {
        "paddingTop": 100,
        "paddingRight": 0,
        "paddingBottom": 100,
        "paddingLeft": 0,
        "marginTop": 100,
        "marginRight": 50,
        "marginBottom": 100,
        "marginLeft": 50,
        "backgroundColor": "white",
        "color": "black"
    },
    "signUp": {
        "paddingTop": 100,
        "paddingRight": 0,
        "paddingBottom": 200,
        "paddingLeft": 0,
        "marginTop": 100,
        "marginRight": 50,
        "marginBottom": 0,
        "marginLeft": 50
    },
    "submitButtons": {
        "marginTop": 20
    },
    "loginConfirmButton": {
        "marginTop": 20,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "width": "100%",
        "textAlign": "center",
        "display": "block"
    },
    "studioSearchResults": {
        "backgroundColor": "white"
    },
    "profile": {
        "minHeight": 600
    },
    "divider": {
        "borderTop": "1 solid rgba(0,0,0,0.1)"
    },
    "emphasis": {
        "borderTop": "4 solid transparent",
        "display": "inline-block",
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10,
        "verticalAlign": "top"
    },
    "emphasis:hover": {
        "borderTop": "4 solid #29b6f6"
    },
    "emphasis h2": {
        "marginBottom": 0
    },
    "spantags": {
        "background": "#1abc9c",
        "borderRadius": 2,
        "color": "white",
        "fontWeight": "bold",
        "paddingTop": 2,
        "paddingRight": 4,
        "paddingBottom": 2,
        "paddingLeft": 4
    },
    "dropdown-menu": {
        "backgroundColor": "white",
        "boxShadow": "none",
        "WebkitBoxShadow": "none",
        "width": 250,
        "marginLeft": -125,
        "left": "50%"
    },
    "dropdown-menu divider": {
        "background": "none"
    },
    "dropdown-menu>li>a": {
        "color": "white"
    },
    "dropup dropdown-menu": {
        "marginBottom": 10
    },
    "dropup dropdown-menu:before": {
        "content": "\"\"",
        "borderTop": "10 solid #34495e",
        "borderRight": "10 solid transparent",
        "borderLeft": "10 solid transparent",
        "position": "absolute",
        "bottom": -10,
        "left": "50%",
        "marginLeft": -10,
        "zIndex": 10
    },
    "img": {
        "height": 150
    },
    "profilePhoto": {
        "display": "inline-block",
        "verticalAlign": "top",
        "float": "right"
    },
    "collapse a": {
        "backgroundColor": "#009688",
        "color": "white"
    },
    "li ng-scope": {
        "backgroundColor": "transparent !important"
    },
    "event-item": {
        "backgroundColor": "transparent !important"
    },
    "aboutInfo": {
        "display": "inline-block",
        "verticalAlign": "top",
        "textJustify": "inter-word",
        "textAlign": "justify",
        "marginBottom": 20,
        "marginTop": ""
    },
    "calendar": {
        "marginTop": 20,
        "borderColor": "white"
    },
    "full button span": {
        "backgroundColor": "limegreen",
        "borderRadius": 32,
        "color": "black"
    },
    "partially button span": {
        "backgroundColor": "orange",
        "borderRadius": 32,
        "color": "black"
    },
    "schedule": {
        "display": "inline-block",
        "verticalAlign": "top"
    },
    "calendario": {
        "display": "inline-block"
    },
    "profile_container": {
        "paddingTop": 20,
        "marginTop": 110,
        "paddingBottom": 200,
        "color": "white",
        "backgroundColor": "#2a2a2a"
    },
    "profilePage_container": {
        "paddingTop": 20,
        "marginTop": 130,
        "minHeight": 500
    },
    "profilePage_container a:hover": {
        "color": "#295c86"
    },
    "editPageInfo": {
        "position": "fixed"
    },
    "textarea": {
        "height": 200,
        "marginTop": 20,
        "border": "1 solid grey"
    },
    "mwl-calendar a:hover": {
        "color": "rgba(255, 255, 255, 0.5)"
    },
    "submitSessionDate": {},
    "mwl-calendar": {
        "marginBottom": 20
    },
    "sessionTimes": {
        "marginTop": 20
    },
    "bookDiv": {
        "marginTop": 15,
        "marginRight": 15,
        "marginBottom": 15,
        "marginLeft": 15
    },
    "animate-show": {
        "lineHeight": 20,
        "opacity": 1,
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10
    },
    "animate-showng-hide-add": {
        "transition": "all linear 0.5s"
    },
    "animate-showng-hide-remove": {
        "transition": "all linear 0.5s"
    },
    "animate-showng-hide": {
        "lineHeight": 0,
        "opacity": 0,
        "paddingTop": 0,
        "paddingRight": 10,
        "paddingBottom": 0,
        "paddingLeft": 10
    },
    "animate-if": {
        "paddingTop": 10,
        "paddingRight": 10,
        "paddingBottom": 10,
        "paddingLeft": 10
    },
    "animate-ifng-enter": {
        "transition": "all cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.5s",
        "opacity": 0
    },
    "animate-ifng-leave": {
        "transition": "all cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.5s",
        "opacity": 1
    },
    "animate-ifng-leaveng-leave-active": {
        "opacity": 0
    },
    "animate-ifng-enterng-enter-active": {
        "opacity": 1
    },
    "tr:hover": {
        "backgroundColor": "rgba(255,255, 255, 0.5)"
    },
    "tr:focus": {
        "backgroundColor": "rgba(255,255, 255, 0.5)"
    },
    "searchPageResults": {
        "borderLeft": "1 solid #009688",
        "minHeight": 500
    },
    "example-animate-container": {
        "background": "white",
        "border": "1 solid black",
        "listStyle": "none",
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0,
        "paddingTop": 0,
        "paddingRight": 10,
        "paddingBottom": 0,
        "paddingLeft": 10
    },
    "animate-repeat": {
        "lineHeight": 30,
        "listStyle": "none",
        "boxSizing": "border-box"
    },
    "animate-repeatng-move": {
        "transition": "all linear 0.5s",
        "opacity": 0,
        "maxHeight": 0
    },
    "animate-repeatng-enter": {
        "transition": "all linear 0.5s",
        "opacity": 0,
        "maxHeight": 0
    },
    "animate-repeatng-leave": {
        "transition": "all linear 0.5s",
        "opacity": 1,
        "maxHeight": 30
    },
    "animate-repeatng-leaveng-leave-active": {
        "opacity": 0,
        "maxHeight": 0
    },
    "animate-repeatng-moveng-move-active": {
        "opacity": 1,
        "maxHeight": 30
    },
    "animate-repeatng-enterng-enter-active": {
        "opacity": 1,
        "maxHeight": 30
    }
});