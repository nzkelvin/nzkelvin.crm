if (typeof (ks) == typeof (undefined) || !ks) {
    ks = { __namespace: true };
}

ks.Dialog = function (dialogId, dialogTitle, dialogHeight, dialogWidth, dialogContentSrc, jqueryuiCssSrc, modalDialog) {
    this.dialogId = dialogId;
    this.dialogTitle = dialogTitle;
    this.dialogHeight = dialogHeight;
    this.dialogWidth = dialogWidth;
    this.dialogContentSrc = dialogContentSrc;
    this.jqueryuiCssSrc = jqueryuiCssSrc;
    this.modalDialog = typeof (modalDialog) === 'boolean' ? modalDialog : true;
}

ks.Dialog.prototype.open = function () {
    this.init();
    this.dialog.dialog('open');
}

ks.Dialog.prototype.init = function () {
    // load jquery ui
    var jqueryUiCssSource = this.jqueryuiCssSrc;//'./ks_common/jqueryui/jquery_ui.css';
    var jqueryUiCssJqueryResults = $('link[href="' + jqueryUiCssSource + '"]');
    var jqueryUiCss = null;
    if (!jqueryUiCssJqueryResults.length) {
        var jqueryUiCss = $('<link>', {
            rel: 'stylesheet',
            href: jqueryUiCssSource
        });
        
        jqueryUiCss.appendTo('head');
    } else {
        jqueryUiCss = jqueryUiCssJqueryResults[0];
    }

    var dialog = $('#' + this.dialogId);
    if (!dialog.length) {
        dialog = $('<div>', {
            id: this.dialogId,
            title: this.dialogTitle
        });
    }
    dialog.appendTo('body');
    dialog.dialog({
        autoOpen: false,
        height: this.dialogHeight,
        width: this.dialogWidth,
        modal: this.modalDialog
    });

    // dialog content
    dialogFrame = $('<iframe>', {
        src: this.dialogContentSrc,
        frameborder: 0,
        seamless: 'seamless'
    })
    dialogFrame.css('width', '100%');
    dialogFrame.css('height', '100%');
    dialogFrame.appendTo(dialog);

    // clean up in dialog close event
    dialog.on('dialogclose', { dlg: dialog }, function (event) {
        event.data.dlg.remove();
    });

    this.dialog = dialog;
        
    


}