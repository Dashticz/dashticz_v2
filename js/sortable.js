// JavaScript Document
function startSortable(){
	$( ".sortable" ).sortable({
		connectWith: ".sortable",
		helper: "clone",
		tolerance: "pointer",
		update: function( ) {
            var data = $(this).sortable('serialize');
            alert(data);
        }
	}).disableSelection();
}