function showDialog() {
    var rootUrl = "";
    if (typeof Xrm != "undefined") {
        rootUrl = Xrm.Page.context.getClientUrl() + "//WebResources/ks_/RibbonDemo/";
    }

    var jqueryuicssUrl = rootUrl + 'jqueryui.min.css';
    var schedulerhtmlUrl = rootUrl + 'AccountAppointmentScheduler.html';
    var jqueryuijsUrl = Xrm.Page.context.getClientUrl() + '/_static/_common/scripts/jquery_ui_1.8.21.min.js' //rootUrl + 'jqueryui.min.js';

    //debugger;
    console.log(jqueryuicssUrl); //XXX
    $('<link/>', {
        rel: 'stylesheet',
        type: 'text/css',
        href: jqueryuicssUrl
    }).appendTo('head');

    //var url = null;
    //if (typeof Xrm == "undefined") {
    //    url = "AccountAppointmentScheduler.html";
    //} else {
    //    url = Xrm.Page.context.getClientUrl() + "//WebResources/ks_/RibbonDemo/AccountAppointmentScheduler.html";
    //}

    console.log(schedulerhtmlUrl); //XXX
    $('<iframe/>', {
        id: 'appointment-scheduler',
        title: 'Appointment Scheduler',
        src: schedulerhtmlUrl
    }).appendTo('body').hide();

    console.log(jqueryuijsUrl); //XXX
    $.getScript(jqueryuijsUrl, function () {
        $("#appointment-scheduler").show();

        $("#appointment-scheduler").dialog({
            height: 320,
            modal: true,
            buttons: {
                Ok: function () {
                    $(this).dialog("close");
                    $("#appointment-scheduler").remove();
                }
            }
        });
    });


}