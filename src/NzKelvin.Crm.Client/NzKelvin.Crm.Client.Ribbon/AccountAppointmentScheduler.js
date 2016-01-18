/*
Todo:
+ Progress cycle
+ Error: no property selected
+ pre-check: Appointment date not selected
+ Auto close window on completion
*/

var nzkelvin = nzkelvin || {};

nzkelvin.Common = nzkelvin.Common || {
    parseQueryStringToJson: function () {
        var search = window.location.search.substring(1);
        return search
            ? JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })
            : {};
    }
};

nzkelvin.Common.Crm = nzkelvin.Common.Crm || {
    parseWebResourceCustomParameterToJson: function () {
        var qsJson = nzkelvin.Common.parseQueryStringToJson();

        if (qsJson != null && qsJson.hasOwnProperty("data")) {
            return JSON.parse(qsJson["data"]);
        }
    }
}

nzkelvin.AppointmentScheduler = nzkelvin.AppointmentScheduler || {
    restErrorHandler: function (error) {
        console.log(error.message);
    },
    createAppointment: function () {
        var selectedItems = nzkelvin.Common.Crm.parseWebResourceCustomParameterToJson();
        if (!selectedItems) // check null
            return;

        var apptType = $('#appointmentTypeDropDown option:selected');
        var visitTrigger = $('#visitTriggerDropDown option:selected');

        var wfStaging = {};
        wfStaging.koo_AppointmentType = { Value: apptType.val() };
        wfStaging.koo_VisitTrigger = { Value: visitTrigger.val() };
        wfStaging.koo_AppointmentDate = new Date($("#appointmentDatePicker").val());

        for (var i = 0; i < selectedItems.length; i++) {
            var propertyRec = selectedItems[i];
            wfStaging.koo_name = propertyRec.Name + " " + apptType.text();
            wfStaging.koo_PropertyId = { Id: propertyRec.Id, LogicalName: propertyRec.TypeName, Name: propertyRec.Name };

            //Create the Account
            SDK.REST.createRecord(
                wfStaging,
                "koo_workflowstaging",
                function (wfStagingRec) {
                    console.log("The workflowstaging named \"" + wfStaging.koo_name + "\" was created with the ID : \"" + wfStagingRec.koo_workflowstagingId + "\".");
                },
                nzkelvin.AppointmentScheduler.restErrorHandler
            );
        }
    },
    loadDropDownList: function (entityName, optionsetAttributeName, selectCtrlName) {
        SDK.Metadata.RetrieveAttribute(entityName, optionsetAttributeName, null, true, function (result) {
            for (var i = 0; i < result.OptionSet.Options.length; i++) {
                $('#' + selectCtrlName)
                    .append($('<option></option>').val(result.OptionSet.Options[i].Value)
                                                .html(result.OptionSet.Options[i].Label.LocalizedLabels[0].Label));
            }
        },
        nzkelvin.AppointmentScheduler.restErrorHandler);
    }
}

$(document).ready(function () {
    $("#appointmentDatePicker").datepicker();

    $("#scheduleButton").click(function () {
        nzkelvin.AppointmentScheduler.createAppointment();
    });

    //nzkelvin.AppointmentScheduler.loadDropDownList("koo_workflowstaging", "koo_appointmenttype", "appointmentTypeDropDown");
    //nzkelvin.AppointmentScheduler.loadDropDownList("koo_workflowstaging", "koo_visittrigger", "visitTriggerDropDown");
});