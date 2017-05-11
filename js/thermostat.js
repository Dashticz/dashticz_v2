function addThermostatFunctions(thermelement){					
	$(document).delegate((thermelement+' .btn-number'),"click",function(e){
		sliding=true;
	  fieldName = $(this).attr('data-field');
	  type = $(this).attr('data-type');
	  var input = $(thermelement+" strong");
	  var currentVal = input.text().split('°');
	  currentVal = parseFloat(currentVal[0]);
	  if (!isNaN(currentVal)) {
		if (type == 'minus') {

		  if (currentVal > input.attr('min')) {
			input.text(currentVal - 0.5 + _TEMP_SYMBOL).change();
			switchThermostat(parseFloat(input.text()),input);
		  }
		  if (parseFloat(input.text()) == input.attr('min')) {
			$(this).attr('disabled', true);
		  }

		} else if (type == 'plus') {

		  if (currentVal < input.attr('max')) {
			input.text(currentVal + 0.5 + _TEMP_SYMBOL).change();
			switchThermostat(parseFloat(input.text()),input);
		  }
		  if (parseFloat(input.text()) == input.attr('max')) {
			$(this).attr('disabled', true);
		  }

		}
	  } else {
		input.text(0);
	  }
	});

	$(thermelement+' .input-number').focusin(function() {
	  $(this).data('oldValue', $(this).text());
	});

	$(thermelement+' .input-number').change(function() {
	  minValue = parseFloat($(this).attr('min'));
	  maxValue = parseFloat($(this).attr('max'));
	  valueCurrent = parseFloat($(this).text());

	  name = $(this).attr('name');
	  if (valueCurrent >= minValue) {
		$(thermelement+" .btn-number[data-type='minus']").removeAttr('disabled')
	  } else {
		  $(this).val($(this).data('oldValue'));
	  }
	  if (valueCurrent <= maxValue) {
		$(thermelement+" .btn-number[data-type='plus']").removeAttr('disabled')
	  } else {
		  $(this).val($(this).data('oldValue'));
	  }
	});
}