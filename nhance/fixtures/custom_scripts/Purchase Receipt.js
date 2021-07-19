frappe.ui.form.on("Purchase Receipt",{
	set_warehouse:function(frm){
		var warehouse = cur_frm.doc.set_warehouse;
		if(warehouse != undefined){
			var rarb_warehouse = get_rarb_warehouse(warehouse);
			//console.log("target is not undefined");
			//console.log("rarb_warehouse------------"+rarb_warehouse);
			if(warehouse == rarb_warehouse){
				//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_trg", true);
				 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_trg", true)
				
					 cur_frm.set_query("pch_rarb_location_trg", "items", function(frm, cdt, cdn) {
						var d = locals[cdt][cdn];
						var t_warehouse = d.warehouse;
						var rarb_warehouse_list = get_rarb_warehouse_item_name(t_warehouse);
						//console.log("rarb_warehouse-------trg--------"+rarb_warehouse_list);
						 return {
							    "filters": [
								["RARB ID", "name", "in", rarb_warehouse_list],

							]
							}
						cur_frm.refresh_field("items");
						cur_frm.refresh_field("pch_rarb_location_trg");
					});
					//rarb_warehouse_list = [1,2,3,4];
					//frappe.meta.get_docfield("Purchase Receipt Item", "pch_rarb_location_trg", frm.docname).options = rarb_warehouse_list;
						refresh_field("pch_rarb_location_trg");
						refresh_field("items");
				
			}else{
				//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_trg", false);
				 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_trg", false)
			}
		}else{
			//console.log("targer is undifined---------");
			//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_trg", false);
			 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_trg", false)
		}
		frappe.ui.form.on("Purchase Receipt Item",{
			warehouse: function(frm,cdt,cdn){
				var d = locals[cdt][cdn];
				var child_warehouse = d.warehouse;
				if(child_warehouse != undefined){
					var rarb_warehouse = get_rarb_warehouse(child_warehouse);
					//console.log("target is not undefined");
					//console.log("rarb_warehouse------------"+rarb_warehouse);
					if(child_warehouse == rarb_warehouse){
						var rarb_warehouse_name = []
						//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_trg", true);
						 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_trg", true)
						 cur_frm.set_query("pch_rarb_location_trg", "items", function(frm, cdt, cdn) {
						var d = locals[cdt][cdn];
						var t_warehouse = d.warehouse;
						var rarb_warehouse_list = get_rarb_warehouse_item_name(t_warehouse);
						//console.log("rarb_warehouse-------trg--------"+rarb_warehouse_list);
						 return {
							    "filters": [
								["RARB ID", "name", "in", rarb_warehouse_list],

							]
							}
						cur_frm.refresh_field("items");
						cur_frm.refresh_field("pch_rarb_location_trg");
					});
					//rarb_warehouse_list = [1,2,3,4];
					//frappe.meta.get_docfield("Purchase Receipt Item", "pch_rarb_location_trg", frm.docname).options = rarb_warehouse_list;
						refresh_field("pch_rarb_location_trg");
						refresh_field("items");
						
					}else{
						//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_trg", false);
						 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_trg", false)
					}
				}else{
					//console.log("targer is undifined---------");
					//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_trg", false);
					 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_trg", false)
				}
			}
		})
	},
	onload : function(frm){
		var warehouse = cur_frm.doc.set_warehouse;
		if(warehouse != undefined){
			var rarb_warehouse = get_rarb_warehouse(warehouse);
			//console.log("target is not undefined");
			//console.log("rarb_warehouse------------"+rarb_warehouse);
			if(warehouse == rarb_warehouse){
				//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_trg", true);
				 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_trg", true)
				var rarb_warehouse_name = [];
				 cur_frm.set_query("pch_rarb_location_trg", "items", function(frm, cdt, cdn) {
						var d = locals[cdt][cdn];
						var t_warehouse = d.warehouse;
						var rarb_warehouse_list = get_rarb_warehouse_item_name(t_warehouse);
						//console.log("rarb_warehouse-------trg--------"+rarb_warehouse_list);
						 return {
							    "filters": [
								["RARB ID", "name", "in", rarb_warehouse_list],

							]
							}
						cur_frm.refresh_field("items");
						cur_frm.refresh_field("pch_rarb_location_trg");
					});
					//rarb_warehouse_list = [1,2,3,4];
				//	frappe.meta.get_docfield("Purchase Receipt Item", "pch_rarb_location_trg", frm.docname).options = rarb_warehouse_list;
						refresh_field("pch_rarb_location_trg");
						refresh_field("items");
			}else{
				//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_trg", false);
				 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_trg", false)
			}
		}else{
			//console.log("targer is undifined---------");
			//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_trg", false);
			 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_trg", false)
		}
		frappe.ui.form.on("Purchase Receipt Item",{
			warehouse: function(frm,cdt,cdn){
				var d = locals[cdt][cdn];
				var child_warehouse = d.warehouse;
				if(child_warehouse != undefined){
					var rarb_warehouse = get_rarb_warehouse(child_warehouse);
					//console.log("target is not undefined");
					//console.log("rarb_warehouse------------"+rarb_warehouse);
					if(child_warehouse == rarb_warehouse){
						var rarb_warehouse_name = []
						//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_trg", true);
						 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_trg", true)
						 cur_frm.set_query("pch_rarb_location_trg", "items", function(frm, cdt, cdn) {
						var d = locals[cdt][cdn];
						var t_warehouse = d.warehouse;
						var rarb_warehouse_list = get_rarb_warehouse_item_name(t_warehouse);
						//console.log("rarb_warehouse-------trg--------"+rarb_warehouse_list);
						 return {
							    "filters": [
								["RARB ID", "name", "in", rarb_warehouse_list],

							]
							}
						cur_frm.refresh_field("items");
						cur_frm.refresh_field("pch_rarb_location_trg");
					});
					//rarb_warehouse_list = [1,2,3,4];
					//frappe.meta.get_docfield("Purchase Receipt Item", "pch_rarb_location_trg", frm.docname).options = rarb_warehouse_list;
						refresh_field("pch_rarb_location_trg");
						refresh_field("items");
						
					}else{
						//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_trg", false);
						 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_trg", false)
					}
				}else{
					//console.log("targer is undifined---------");
					//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_trg", false);
					 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_trg", false)
				}
			}
		})
	}
})
frappe.ui.form.on("Purchase Receipt","before_save", function(frm,cdt,cdn){
	
	 $.each(frm.doc.items, function(i, d) {
		var item_code = d.item_code;
		var warehouse = d.warehouse;
		//console.log("on save warehosue------------"+warehouse);
		var pch_rarb_location_trg = d.pch_rarb_location_trg;
		if(pch_rarb_location_trg != undefined){
		var get_items_details = get_rarb_items_detail(warehouse,pch_rarb_location_trg);
		//console.log("get_items_details------------"+get_items_details);
		if(get_items_details != undefined){
			if(get_items_details != item_code){
				frappe.msgprint('"'+pch_rarb_location_trg+'"'+" This RARB Location(Source Warehouse) is reserved for specific item "+'"'+get_items_details+'"');
				frappe.validated = false;
			}
		}
		}
	})
})
function get_rarb_warehouse(warehouse){
	var supplier_criticality = "";
	frappe.call({
		method: 'nhance.nhance.doctype.rarb_warehouse.rarb_warehouse.get_rarb_warehouse',
		args: {
		   "warehouse":warehouse
		},
		async: false,
		callback: function(r) {
		   if(r.message != undefined){
			    //console.log("supplier criticality..." + JSON.stringify(r.message));
			   supplier_criticality = r.message[0].warehouse;
			  // //console.log("warehnouse=============="+supplier_criticality);
			}
		}
    });
    return supplier_criticality;
}
function get_rarb_warehouse_item_name(warehouse){
	var supplier_criticality = [];
	frappe.call({
		method: 'nhance.nhance.doctype.rarb_warehouse.rarb_warehouse.get_rarb_warehouse_item_name',
		args: {
		   "warehouse":warehouse
		},
		async: false,
		callback: function(r) {
		    //console.log("supplier criticality..." + JSON.stringify(r.message));
			 for (var i = 0; i < r.message.length; i++) {
				    supplier_criticality.push(r.message[i].rarb_id);
				    
				}
			//console.log("supplier_criticality---11111----" + supplier_criticality);
		}
    });
    return supplier_criticality;
}
function get_rarb_items_detail(warehouse,pch_rarb_location_src){
	var supplier_criticality = ""
	frappe.call({
		method: 'nhance.nhance.doctype.rarb_warehouse.rarb_warehouse.get_rarb_items_detail',
		args: {
		   "warehouse":warehouse,
		   "pch_rarb_location_src":pch_rarb_location_src
		},
		async: false,
		callback: function(r) {
		    //console.log("supplier criticality..." + JSON.stringify(r.message));
			 for (var i = 0; i < r.message.length; i++) {
				    supplier_criticality = r.message[i].rarb_item;
				    
				}
			//console.log("supplier_criticality---11111----" + supplier_criticality);
		}
    });
    return supplier_criticality
}
