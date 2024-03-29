function spart(lyes) {
    var k;
    var ApplicantsData = [];
    for (var j = 0; j < parseInt(lyes); j++) {
        ApplicantsData[j] = {};
        if (j > 0) {ApplicantsData[j]["Relationship"] = $("#Relationship_" + j).val()}
        k = j + 1;
        ApplicantsData[j]["ApplicantSerialNo"] = k.toString();ApplicantsData[j]["FirstName"] = $("#FirstName_" + j).val();ApplicantsData[j]["SurName"] = $("#SurName_" + j).val();ApplicantsData[j]["LastName"] = $("#LastName_" + j).val();
        var datefield = $("#DateOfBirth_" + j).val();
        if (datefield !== null && datefield !== '' && datefield !== undefined) {ApplicantsData[j]["ServerDateOfBirth"] = moment($("#DateOfBirth_" + j).val(), 'YYYY-MM-DD').format('YYYY-MM-DD')}
        ApplicantsData[j]["PlaceOfBirth"] = $("#PlaceOfBirth_" + j).val();
        ApplicantsData[j]["CountryOfBirthId"] = $("#CountryOfBirthId_" + j).val();
        ApplicantsData[j]["NationalityId"] = $("#NationalityId_" + j).val();
        ApplicantsData[j]["NationalityAtBirthId"] = $("#NationalityAtBirthId_" + j).val();
        ApplicantsData[j]["GenderId"] = $("#GenderId_" + j).val();
        ApplicantsData[j]["MaritalStatusId"] = $("#MaritalStatusId_" + j).val();
        ApplicantsData[j]["IsMinor"] = $('#IsMinor_' + j).prop('checked');
        ApplicantsData[j]["MinorParentSurname"] = $("#MinorParentSurname_" + j).val();
        ApplicantsData[j]["MinorParentFirstName"] = $("#MinorParentFirstName_" + j).val();
        ApplicantsData[j]["MinorParentLastName"] = $("#MinorParentLastName_" + j).val();
        ApplicantsData[j]["MinorParentNationalityId"] = $("#MinorParentNationalityId_" + j).val();
        ApplicantsData[j]["MinorParentAddress"] = $("#MinorParentAddress_" + j).val();
        ApplicantsData[j]["NationalIdentityNumber"] = $("#NationalIdentityNumber_" + j).val();
        ApplicantsData[j]["PassportType"] = $("#PassportType_" + j).val();
        ApplicantsData[j]["PassportNo"] = $("#PassportNo_" + j).val();
        datefield = $("#IssueDate_" + j).val();
        if (datefield !== null && datefield !== '' && datefield !== undefined) {ApplicantsData[j]["ServerPassportIssueDate"] = moment($("#IssueDate_" + j).val(), 'YYYY-MM-DD').format('YYYY-MM-DD');}
        datefield = $("#ExpiryDate_" + j).val();
        if (datefield !== null && datefield !== '' && datefield !== undefined) {ApplicantsData[j]["ServerPassportExpiryDate"] = moment($("#ExpiryDate_" + j).val(), 'YYYY-MM-DD').format('YYYY-MM-DD');}
        datefield = $("#TravelDate_" + j).val();
        if (datefield !== null && datefield !== '' && datefield !== undefined) {ApplicantsData[j]["ServerTravelDate"] = moment($("#TravelDate_" + j).val(), 'YYYY-MM-DD').format('YYYY-MM-DD');}
        ApplicantsData[j]["IssuePlace"] = $("#IssuePlace_" + j).val();
        ApplicantsData[j]["IssueCountryId"] = $("#IssueCountryId_" + j).val();
        ApplicantsData[j]["HomeAddressLine1"] = $("#HomeAddressLine1_" + j).val();
        ApplicantsData[j]["HomeAddressLine2"] = $("#HomeAddressLine2_" + j).val();
        ApplicantsData[j]["HomeAddressCountryId"] = $("#HomeAddressCountryId_" + j).val();
        ApplicantsData[j]["HomeAddressState"] = $("#HomeAddressState_" + j).val();
        ApplicantsData[j]["HomeAddressCity"] = $("#HomeAddressCity_" + j).val();
        ApplicantsData[j]["HomeAddressPostalCode"] = $("#HomeAddressPostalCode_" + j).val();
        ApplicantsData[j]["HomeAddressContactNumber"] = $("#HomeAddressContactNumber_" + j).val();
        ApplicantsData[j]["HasOtherResidenceship"] = $('#HasOtherResidenceship_' + j).prop('checked');
        ApplicantsData[j]["OtherResidenceshipPermitNumber"] = $("#OtherResidenceshipPermitNumber_" + j).val();
        datefield = $("#OtherResidenceshipPermitValidUntill_" + j).val();
        if (datefield !== null && datefield !== '' && datefield !== undefined) {ApplicantsData[j]["ServerOtherResidenceshipPermitValidUntill"] = moment($("#OtherResidenceshipPermitValidUntill_" + j).val(), 'YYYY-MM-DD').format('YYYY-MM-DD');}
        ApplicantsData[j]["EmployerName"] = $("#EmployerName_" + j).val();
        ApplicantsData[j]["EmployerPhone"] = $("#EmployerPhone_" + j).val();
        ApplicantsData[j]["EmployerAddress"] = $("#EmployerAddress_" + j).val();
        ApplicantsData[j]["CurrentOccupationId"] = $("#CurrentOccupationId_" + j).val();
        ApplicantsData[j]["PurposeOfJourneyId"] = $("#PurposeOfJourneyId_" + j).val();
        ApplicantsData[j]["MemberStateDestinationId"] = $("#MemberStateDestinationId_" + j).val();
        ApplicantsData[j]["MemberStateSecondDestinationId"] = $("#MemberStateSecondDestinationId_" + j).val();
        ApplicantsData[j]["MemberStateFirstEntryId"] = $("#MemberStateFirstEntryId_" + j).val();
        ApplicantsData[j]["NumberOfEntriesRequested"] = $("#NumberOfEntriesRequested_" + j).val();
        ApplicantsData[j]["IntendedStayDuration"] = $("#IntendedStayDuration_" + j).val();
        ApplicantsData[j]["IsVisaIssuedBefore"] = $('#IsVisaIssuedBefore_' + j).prop('checked');
        ApplicantsData[j]["PreviousVisaNumber"] = $("#PreviousVisaNumber_" + j).val();
        datefield = $("#PreviousVisaValidFrom_" + j).val();
        if (datefield !== null && datefield !== '' && datefield !== undefined) {ApplicantsData[j]["ServerPreviousVisaValidFrom"] = moment($("#PreviousVisaValidFrom_" + j).val(), 'YYYY-MM-DD').format('YYYY-MM-DD');}
        datefield = $("#PreviousVisaValidTo_" + j).val();
        if (datefield !== null && datefield !== '' && datefield !== undefined) {ApplicantsData[j]["ServerPreviousVisaValidTo"] = moment($("#PreviousVisaValidTo_" + j).val(), 'YYYY-MM-DD').format('YYYY-MM-DD');}
        ApplicantsData[j]["PreviousVisaIssuedCountryId"] = $("#PreviousVisaIssuedCountryId_" + j).val();
        ApplicantsData[j]["PreviousFingerPrintStatus"] = $('input[name="PreviousFingerPrintStatus_' + j + '"]:checked').val();
        datefield = $("#PreviousFingerPrintDate_" + j).val();
        if (datefield !== null && datefield !== '' && datefield !== undefined) {ApplicantsData[j]["ServerPreviousFingerPrintDate"] = kendo.toString($("#PreviousFingerPrintDate_" + j).data("kendoDatePicker").value(), 'yyyy-MM-dd');}
        ApplicantsData[j]["FinalDestinationIssuedByCountryId"] = $("#FinalDestinationIssuedByCountryId_" + j).val();
        datefield = $("#FinalDestinationValidFromDate_" + j).val();
        if (datefield !== null && datefield !== '' && datefield !== undefined) {ApplicantsData[j]["ServerFinalDestinationValidFromDate"] = kendo.toString($("#FinalDestinationValidFromDate_" + j).data("kendoDatePicker").value(), 'yyyy-MM-dd');}
        datefield = $("#FinalDestinationValidToDate_" + j).val();
        if (datefield !== null && datefield !== '' && datefield !== undefined) {ApplicantsData[j]["ServerFinalDestinationValidToDate"] = moment($("#FinalDestinationValidToDate_" + j).val(), 'YYYY-MM-DD').format('YYYY-MM-DD');}
        datefield = $("#IntendedDateOfArrival_" + j).val();
        if (datefield !== null && datefield !== '' && datefield !== undefined) {ApplicantsData[j]["ServerIntendedDateOfArrival"] = moment($("#IntendedDateOfArrival_" + j).val(), 'YYYY-MM-DD').format('YYYY-MM-DD');}
        datefield = $("#IntendedDateOfDeparture_" + j).val();
        if (datefield !== null && datefield !== '' && datefield !== undefined) {ApplicantsData[j]["ServerIntendedDateOfDeparture"] = moment($("#IntendedDateOfDeparture_" + j).val(), 'YYYY-MM-DD').format('YYYY-MM-DD');}
        ApplicantsData[j]["BlsInvitingAuthority"] = $('input[name="BlsInvitingAuthority_' + j + '"]:checked').val();
        ApplicantsData[j]["InvitingAuthorityName"] = $("#InvitingAuthorityName_" + j).val();
        ApplicantsData[j]["InvitingCountryId"] = $("#InvitingCountryId_" + j).val();
        ApplicantsData[j]["InvitingCity"] = $("#InvitingCity_" + j).val();
        ApplicantsData[j]["InvitingZipCode"] = $("#InvitingZipCode_" + j).val();
        ApplicantsData[j]["InvitingAddress"] = $("#InvitingAddress_" + j).val();
        ApplicantsData[j]["InvitingEmail"] = $("#InvitingEmail_" + j).val();
        ApplicantsData[j]["InvitingContactNo"] = $("#InvitingContactNo_" + j).val();
        ApplicantsData[j]["InvitingFaxNo"] = $("#InvitingFaxNo_" + j).val();
        ApplicantsData[j]["InvitingContactName"] = $("#InvitingContactName_" + j).val();
        ApplicantsData[j]["InvitingContactSurname"] = $("#InvitingContactSurname_" + j).val();
        ApplicantsData[j]["InvitingContactCountryId"] = $("#InvitingContactCountryId_" + j).val();
        ApplicantsData[j]["InvitingContactCity"] = $("#InvitingContactCity_" + j).val();
        ApplicantsData[j]["InvitingContactZipCode"] = $("#InvitingContactZipCode_" + j).val();
        ApplicantsData[j]["InvitingContactAddress"] = $("#InvitingContactAddress_" + j).val();
        ApplicantsData[j]["InvitingContactContactNo"] = $("#InvitingContactContactNo_" + j).val();
        ApplicantsData[j]["InvitingContactEmail"] = $("#InvitingContactEmail_" + j).val();
        ApplicantsData[j]["InvitingContactFaxNo"] = $("#InvitingContactFaxNo_" + j).val();
        ApplicantsData[j]["CostCoveredById"] = $("#CostCoveredById_" + j).val();
        ApplicantsData[j]["MeansOfSupportId"] = $("#MeansOfSupportId_" + j).val();
        ApplicantsData[j]["OtherCitizenSurname"] = $("#OtherCitizenSurname_" + j).val();
        ApplicantsData[j]["OtherCitizenFirstName"] = $("#OtherCitizenFirstName_" + j).val();
        datefield = $("#OtherCitizenDateOfBirth_" + j).val();
        if (datefield !== null && datefield !== '' && datefield !== undefined) {ApplicantsData[j]["ServerOtherCitizenDateOfBirth"] = moment($("#OtherCitizenDateOfBirth_" + j).val(), 'YYYY-MM-DD').format('YYYY-MM-DD');}
        ApplicantsData[j]["OtherCitizenNationalityId"] = $("#OtherCitizenNationalityId_" + j).val();
        ApplicantsData[j]["OtherCitizenDocumentNumber"] = $("#OtherCitizenDocumentNumber_" + j).val();
        ApplicantsData[j]["OtherCitizenFamilyRelationshipId"] = $("#OtherCitizenFamilyRelationshipId_" + j).val();
        ApplicantsData[j]["ParentId"] = "2f7ceee4-dd23-413a-b03a-65bb99ca3f53";
        ApplicantsData[j]["ApplicantId"] = $("#ApplicantId_" + j).val();
        ApplicantsData[j]["Id"] = $("#ApplicantId_" + j).val();
    }
    var detailsString = JSON.stringify(ApplicantsData);
    $("#ApplicantsDetailsList").val(detailsString);
    SUBFORMTZ();
}
