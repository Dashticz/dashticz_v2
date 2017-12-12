function addThermostatFunctions(thermelement) {
    $(document).delegate((thermelement + ' .btn-number'), "click", function (e) {
        sliding = true;
        var fieldName = $(this).attr('data-field');
        var type = $(this).attr('data-type');
        var input = $(thermelement + " strong");
        var currentVal = input.text().split('°');
        currentVal = parseFloat(currentVal[0].replace(',', '.'));
        if (!isNaN(currentVal)) {
            var newValue = (type === 'minus') ? currentVal - 0.5 : currentVal + 0.5;
            if (newValue >= input.attr('min')
                && newValue <= input.attr('max')
            ) {
                input.text(number_format(newValue, 1) + _TEMP_SYMBOL).change();
                switchThermostat(newValue, input);
            }
            if (newValue <= input.attr('min')) {
                $(this).attr('disabled', true);
            }
            if (newValue >= input.attr('max')) {
                $(this).attr('disabled', true);
            }
        } else {
            input.text(0);
        }
    });

    $(thermelement + ' .input-number').focusin(function () {
        $(this).data('oldValue', $(this).text());
    });

    $(thermelement + ' .input-number').change(function () {
        minValue = parseFloat($(this).attr('min'));
        maxValue = parseFloat($(this).attr('max'));
        valueCurrent = parseFloat($(this).text());

        name = $(this).attr('name');
        if (valueCurrent >= minValue) {
            $(thermelement + " .btn-number[data-type='minus']").removeAttr('disabled')
        } else {
            $(this).val($(this).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $(thermelement + " .btn-number[data-type='plus']").removeAttr('disabled')
        } else {
            $(this).val($(this).data('oldValue'));
        }
    });
}
