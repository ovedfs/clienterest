$(document).ready(function(){

	getCategories();

	$("#form-submit").on("click", function(e){
		e.preventDefault();

		var id = parseInt($("#form-id").val());

		if(id == 0) addCategory();
		else updateCategory(id);
	});

	$("body").on("click", ".btn-delete", function(e){
		e.preventDefault();

		if(confirm("¿Desea eliminar este registro?")){
			var id = $(this).data("id");

			deleteCategory(id);	
		}
	});

	$("body").on("click", ".btn-edit", function(e){
		e.preventDefault();

		var id = $(this).data("id");

		editCategory(id);	

	});

	$("#btn-add").on("click", function(){
		$("#name").val("");
		$("#color").val("#000000");
		$("#form-id").val(0);
		$("#form-submit").val("Save");
		$("#name").focus();
	});

});

function addCategory()
{
	var name = $("#name").val();
	var color = $("#color").val();

	var path = "http://localhost/rest001/api/category";
	var data = {'name': name, 'color': color};

	$.post(
		path,
		data,
		function(response){
			console.log(response);

			getCategories();
		},
		'json'
	);
}

function editCategory(id)
{
	var path = "http://localhost/rest001/api/category/" + id;

	$.get(
		path, 
		{}, 
		function(category){
			console.log(category);

			$("#name").val(category.name);
			$("#color").val(category.color);
			$("#form-id").val(category.id);
			$("#form-submit").val("Update");
			$("#name").focus();
		}, 
		'json'
	);
}

function updateCategory(id)
{
	var name = $("#name").val();
	var color = $("#color").val();

	$.ajax({
		url: "http://localhost/rest001/api/category/" + id,
		type: "PUT",
		dataType: 'json',
		data: {"id": id, "name": name, "color": color},
		success: function(response){
			console.log(response);
			getCategories();
		}
	});
}

function deleteCategory(id)
{
	$.ajax({
		url: "http://localhost/rest001/api/category/" + id,
		type: "DELETE",
		dataType: 'json',
		data: {"id": id},
		success: function(response){
			console.log(response);
			getCategories();
		}
	});
}

function getCategories()
{
	var path = "http://localhost/rest001/api/category";

	$.get(
		path, 
		{}, 
		function(data){
			console.log(data);

			showCategories(data);
		}, 
		'json'
	);	
}

function showCategories(data)
{
	var html = "";

	for(var item in data){
		html += "<li class='list-group-item'>";
		html += "<a href='#' data-id='" + data[item].id + "' class='btn btn-warning btn-edit'> Edit</a> ";
		html += "<a href='#' data-id='" + data[item].id + "' class='btn btn-danger btn-delete'> Delete</a>";
		html += data[item].name;
		html += " <span style='background:" + data[item].color + "'>" + data[item].color + "</span>";
		html += "</li>";
	}

	$("#categories").html(html);
}