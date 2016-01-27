function openSchedulerDialog() {
    var dialogId = 'dialog';
    var dialogTitle = 'Scheduler';
    var dialogHeight = 300;
    var dialogWidth = 350;
    debugger;
    var dialogContentSrc = 'ks_NzKelvin.account.Scheduler.html';
    var jqueryuiCssSrc = 'ks_common/jqueryui/jquery_ui.css';
    if (typeof (Xrm) !== typeof (undefined) && Xrm
        && typeof (Xrm.Page) !== typeof (undefined) && Xrm.Page
        && typeof (Xrm.Page.context) !== typeof (undefined) && Xrm.Page.context) {
        var webResourcesUrl = Xrm.Page.context.getClientUrl() + '/WebResources/';
        dialogContentSrc = webResourcesUrl + dialogContentSrc;
        jqueryuiCssSrc = webResourcesUrl + jqueryuiCssSrc;
    }
    var zIndex = 1000;
    var modalDialog = true;

    var dlg = new ks.Dialog(
        dialogId,
        dialogTitle,
        dialogHeight,
        dialogWidth,
        dialogContentSrc,
        jqueryuiCssSrc,
        zIndex,
        modalDialog
    );

    dlg.open();
}