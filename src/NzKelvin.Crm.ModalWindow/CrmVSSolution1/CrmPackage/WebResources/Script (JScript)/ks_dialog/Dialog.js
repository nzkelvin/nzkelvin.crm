/*todo:
* parameter fix - simpler - more configurable
* CSS fix - looks more like CRM
* performance - use require.js - not to load everything at start
* Test with Mobile
*/

if (typeof (ks) == typeof (undefined) || !ks) {
    ks = { __namespace: true };
}

ks.Dialog = function (dialogId, dialogTitle, dialogHeight, dialogWidth, dialogContentSrc, jqueryuiCssSrc, zIndex, modalDialog) {
    this.dialogId = dialogId;
    this.dialogTitle = dialogTitle;
    this.dialogHeight = dialogHeight;
    this.dialogWidth = dialogWidth;
    this.dialogContentSrc = dialogContentSrc;
    this.jqueryuiCssSrc = jqueryuiCssSrc;
    this.zIndex = zIndex;
    this.modalDialog = typeof (modalDialog) === 'boolean' ? modalDialog : true;
}

ks.Dialog.prototype.open = function () {
    var cssReady = false;
    if ($('link[href="' + this.jqueryuiCssSrc + '"]').length > 0) {
        cssReady = true;
    }

    var jqueryUiCss = this.init();

    if (cssReady) {
        this.dialog.dialog('open');
    }
    else {
        var that = this;
        jqueryUiCss.load(function () {
            that.dialog.dialog('open');
        })
    }
}

ks.Dialog.prototype.init = function () {
    var body = $('body');
    var head = $('head');
    if (window.parent && window.parent.document) {
        body = window.parent.document.body;
        head = window.parent.document.head;
    }

    // load jquery ui css
    var jqueryUiCssJqueryResults = $('link[href="' + this.jqueryuiCssSrc + '"]');
    var jqueryUiCss = null;
    if (!jqueryUiCssJqueryResults.length) {
        var jqueryUiCss = $('<link>', {
            rel: 'stylesheet',
            href: this.jqueryuiCssSrc
        });
        jqueryUiCss.appendTo(head);

        if (typeof (this.zIndex) !== typeof (undefined) && this.zIndex) {
            $("<style type='text/css'> .ui-front { z-index: " + this.zIndex
                + " !important; } .ui-dialog { z-index: " + (this.zIndex + 1) + " !important ;} </style>")
                .appendTo(head);
        }
    } else {
        jqueryUiCss = jqueryUiCssJqueryResults[0];
    }

    // dialog
    var dialog = $('#' + this.dialogId);
    if (!dialog.length) {
        dialog = $('<div>', {
            id: this.dialogId,
            title: this.dialogTitle
        });
    }
    dialog.appendTo(body);
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
        
    return jqueryUiCss;
}