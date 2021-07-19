//RARB Location (Source Warehouse) and RARB Location (Target Warehouse) start from here.....
 
frappe.ui.form.on("Stock Entry", "refresh", function(frm ,cdt , cdn){
	frappe.ui.form.on("Stock Entry Detail", {
		t_warehouse : function(frm, cdt , cdn){
			cur_frm.refresh_field("items")
			var d = locals[cdt][cdn];
			var s_warehouse = d.s_warehouse;
			var t_warehouse = d.t_warehouse;
			
			////console.log("t_warehouse----------------"+t_warehouse);
			////console.log("s_warehouse----------------"+s_warehouse);
			if(t_warehouse != undefined){
				var rarb_warehouse = get_rarb_warehouse(t_warehouse);
				//console.log("target is not undefined");
				//console.log("rarb_warehouse------------"+rarb_warehouse);
				if(t_warehouse == rarb_warehouse){
					//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_trg", true);
					// cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_trg", true)
					 var rarb_warehouse_list = [];
					 cur_frm.set_query("pch_rarb_location_trg", "items", function(frm, cdt, cdn) {
						var d = locals[cdt][cdn];
						var t_warehouse = d.t_warehouse;
						 rarb_warehouse_list = get_rarb_warehouse_item_name(t_warehouse);
						//console.log("rarb_warehouse-------trg--------"+rarb_warehouse_list);
						 return {
							    "filters": [
								["RARB ID", "name", "in", rarb_warehouse_list],

							]
							}
						cur_frm.refresh_field("items");
						cur_frm.refresh_field("pch_rarb_location_trg");
					});
					// rarb_warehouse = get_rarb_warehouse_item_name(t_warehouse);
					//frappe.meta.get_docfield("Stock Entry Detail", "pch_rarb_location_trg", frm.docname).options = rarb_warehouse;
				}else{
					//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_trg", false);
					 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_trg", false)
					
				}
			}else{
				//console.log("targer is undifined---------");
				//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_trg", false);
				 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_trg", false)
			}
			if(s_warehouse == undefined){
				//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_src", false);
			 	cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_src", false);
			}
			
			
		},
		s_warehouse : function(frm, cdt , cdn){
			var d = locals[cdt][cdn];
			var s_warehouse = d.s_warehouse;
			var t_warehouse = d.t_warehouse;
			//console.log("t_warehouse----------------"+t_warehouse);
			//console.log("s_warehouse----------------"+s_warehouse);
			if(s_warehouse != undefined){
				//console.log("target is not undefined");
				var rarb_warehouse = get_rarb_warehouse(s_warehouse);
				//console.log("rarb_warehouse------------"+rarb_warehouse);
				//console.log("target is not undefined");
				if(s_warehouse == rarb_warehouse){
					//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_src", true);
					 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_src", true);
					var rarb_warehouse_list = [];
					//console.log("true");
					 cur_frm.set_query("pch_rarb_location_src", "items", function(frm, cdt, cdn) {
						var d = locals[cdt][cdn];
						var s_warehouse = d.s_warehouse;
						 rarb_warehouse_list = get_rarb_warehouse_item_name(s_warehouse);
						
						//console.log("rarb_warehouse--------src-------"+JSON.stringify(rarb_warehouse_list));
						
						 return {
							    "filters": [
								["RARB ID", "name", "in", rarb_warehouse_list]
							    ]
							}
						refresh_field("pch_rarb_location_src");
						refresh_field("items");
					});
					//rarb_warehouse = get_rarb_warehouse_item_name(t_warehouse);
					//frappe.meta.get_docfield("Stock Entry Detail", "pch_rarb_location_src1", frm.docname).options = rarb_warehouse;
					
				}else{
					//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_src", false);
			 		cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_src", false);
				}
		
			}else{
				//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_src", false);
			 	cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_src", false);
			}
			if(t_warehouse == undefined){
				//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_trg", false);
				 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_trg", false)
			}
			
			
			
		},
		pch_rarb_location_src : function(frm){
			var rarb_warehouse_list = []
			 cur_frm.set_query("pch_rarb_location_src", "items", function(frm, cdt, cdn) {
				var d = locals[cdt][cdn];
				var s_warehouse = d.s_warehouse;
				 rarb_warehouse_list = get_rarb_warehouse_item_name(s_warehouse);
				//console.log("rarb_warehouse_list------src---------"+rarb_warehouse_list);
				 return {
					    "filters": [
						["RARB ID", "name", "in", rarb_warehouse_list]
					    ]
					}
			});
		},
		pch_rarb_location_trg : function(frm){
			var rarb_warehouse_list = []
			 cur_frm.set_query("pch_rarb_location_trg", "items", function(frm, cdt, cdn) {
				var d = locals[cdt][cdn];
				var t_warehouse = d.t_warehouse;
				 rarb_warehouse_list = get_rarb_warehouse_item_name(t_warehouse);
				//console.log("rarb_warehouse----trg-----------"+rarb_warehouse_list);
				 return {
					    "filters": [
						["RARB ID", "name", "in", rarb_warehouse_list]
					    ]
					}
			});
		}
		
	});
	
})
frappe.ui.form.on("Stock Entry","before_save", function(frm,cdt,cdn){
	
	 $.each(frm.doc.items, function(i, d) {
		var item_code = d.item_code;
		var warehouse = d.s_warehouse;
		//console.log("on save warehosue------------"+warehouse);
		var pch_rarb_location_src = d.pch_rarb_location_src;
		if(pch_rarb_location_src != undefined){
		var get_items_details = get_rarb_items_detail(warehouse,pch_rarb_location_src);
		//console.log("get_items_details------------"+get_items_details);
		if(get_items_details != undefined){
			if(get_items_details != item_code){
				frappe.msgprint('"'+pch_rarb_location_src+'"'+" This RARB Location(Source Warehouse) is reserved for specific item "+'"'+get_items_details+'"');
				frappe.validated = false;
			}
		}}
		
	})
})
frappe.ui.form.on("Stock Entry","before_save", function(frm,cdt,cdn){
	
	 $.each(frm.doc.items, function(i, d) {
		var item_code = d.item_code;
		var warehouse = d.t_warehouse;
		//console.log("on save warehosue------------"+warehouse);
		var pch_rarb_location_src = d.pch_rarb_location_trg;
		if(pch_rarb_location_src != undefined){
		var get_items_details = get_rarb_items_detail(warehouse,pch_rarb_location_src);
		//console.log("get_items_details------------"+get_items_details);
		if(get_items_details != undefined){
			if(get_items_details != item_code){
				frappe.msgprint('"'+pch_rarb_location_src+'"'+" This RARB Location (Target Warehouse) is reserved for specific item "+'"'+get_items_details+'"');
				frappe.validated = false;
			}
		}}
		
	})
})
frappe.ui.form.on("Stock Entry","before_submit", function(frm,cdt,cdn){
	//console.log("hello stock entry saved");
 	$.each(frm.doc.items, function(i, item) {
		if(item.s_warhouse != undefined){
			var rarb_warehouse = get_rarb_warehouse(item.s_warhouse);
			if(item.s_warehouse == rarb_warehouse){
				//console.log("source warehouse matched");
				//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_src", true);
				 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_src", true);
			}
			else{
				 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_src", false);
			}
		}
		else{
			 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_src", false);
		}
		if(item.t_warehouse != undefined){
			var rarb_warehouse = get_rarb_warehouse(item.t_warehouse);
			if(item.t_warehouse == rarb_warehouse){
				//console.log("targer warehouuse matched");
				//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_src", true);
				 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_trg", true);
			}
			else{
				 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_trg", false);
			}
		}
		else{
			 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_trg", false);
		}
		
	})

})
frappe.ui.form.on("Stock Entry","onload", function(frm,cdt,cdn){
	//console.log("hello stock entry saved");
 	$.each(frm.doc.items, function(i, item) {
		if(item.s_warehouse != undefined){
			//console.log("s warehosue ------------"+item.s_warehouse);
			var rarb_warehouse = get_rarb_warehouse(item.s_warehouse);
			if(item.s_warehouse == rarb_warehouse){
				//console.log("source warehouse matched");
				//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_src", true);
				 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_src", true);
				cur_frm.set_query("pch_rarb_location_src", "items", function(frm, cdt, cdn) {
					var d = locals[cdt][cdn];
					var s_warehouse = d.s_warehouse;
					var rarb_warehouse_list = get_rarb_warehouse_item_name(s_warehouse);
					//console.log("rarb_warehouse_list------src---------"+rarb_warehouse_list);
					 return {
						    "filters": [
							["RARB ID", "name", "in", rarb_warehouse_list]
						    ]
						}
					refresh_field("items");
					refresh_field("pch_rarb_location_src");
				});
			}
			else{
				 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_src", false);
			}
		}
		else{
			 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_src", false);
		}
		if(item.t_warehouse != undefined){
			var rarb_warehouse = get_rarb_warehouse(item.t_warehouse);
			if(item.t_warehouse == rarb_warehouse){
				//console.log("targer warehouuse matched");
				//cur_frm.fields_dict.items.grid.toggle_display("pch_rarb_location_src", true);
				 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_trg", true);
				cur_frm.set_query("pch_rarb_location_trg", "items", function(frm, cdt, cdn) {
					var d = locals[cdt][cdn];
					var s_warehouse = d.s_warehouse;
					var rarb_warehouse_list = get_rarb_warehouse_item_name(s_warehouse);
					//console.log("rarb_warehouse_list------src---------"+rarb_warehouse_list);
					 return {
						    "filters": [
							["RARB ID", "name", "in", rarb_warehouse_list]
						    ]
						}
					refresh_field("items");
					refresh_field("pch_rarb_location_trg");
				});
			}
			else{
				 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_trg", false);
			}
		}
		else{
			 cur_frm.fields_dict.items.grid.toggle_reqd("pch_rarb_location_trg", false);
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
		    //console.log("supplier criticality..." + JSON.stringify(r.message));
		   supplier_criticality = r.message[0].warehouse;
		   //console.log("warehnouse=============="+supplier_criticality);
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

//rarb location end here
