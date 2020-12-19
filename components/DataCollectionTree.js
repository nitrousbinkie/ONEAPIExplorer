(function($){
    $.fn.DataCollectionTree = function(options){

        // Populate the details of a client into the rootElement specified
        var populateClient = function(clientid, rootElement){
            return function(data){

                rootElement.empty();

                // We always need two folders, one for tables
                let tables = $("<div>");
                tables.addClass("treeitem folder");
                tables.text("Tables");
                rootElement.append(tables);
                let tableschildren = $("<div>");
                tableschildren.addClass("treechildren");
                tables.click(function(){
                    tableschildren.toggle();
                });
                tableschildren.css("display", "none");
                rootElement.append(tableschildren);

                // And one for stored procedures
                let procedures = $("<div>");
                procedures.addClass("treeitem folder");
                procedures.text("Procedures");
                rootElement.append(procedures);
                let procedureschildren = $("<div>");
                procedureschildren.addClass("treechildren");
                procedures.click(function(){
                    procedureschildren.toggle();
                });
                rootElement.append(procedureschildren);

                // Populate each data collection in the client
                for(var x in data.Rows){
                    let dc = data.Rows[x];

                    if(dc.DataCollectionType === "Table"){
                        let datacollection = $("<div>");
                        datacollection.addClass("treeitem table");
                        datacollection.text(dc.DataCollectionCode);
                        tableschildren.append(datacollection);

                        let datacollectionchildren = $("<div>")
                        datacollectionchildren.addClass("treechildren");
                        tableschildren.append(datacollectionchildren);
                        datacollection.click(function(){
                            if(datacollectionchildren.children().length > 0){
                                datacollectionchildren.toggle();
                            }
                            else{
                                datacollectionchildren.append("Loading...");
                                options.getDataCollectionDescription(clientid, dc.DataCollectionCode, renderTableDescription(datacollectionchildren));
                            }
                        });
                        datacollection.dblclick(function(){
                            options.showDataCollection(clientid, dc.DataCollectionCode);
                        });
                    }
                    else if(dc.DataCollectionType === "StoredProcedure"){
                        let datacollection = $("<div>");
                        datacollection.addClass("treeitem procedure");
                        datacollection.text(dc.DataCollectionCode);
                        procedureschildren.append(datacollection);

                        let datacollectionchildren = $("<div>")
                        datacollectionchildren.addClass("treechildren");
                        tableschildren.append(datacollectionchildren);
                        datacollection.click(function(){
                            if(datacollectionchildren.children().length > 0){
                                datacollectionchildren.toggle();
                            }
                            else{
                                datacollectionchildren.append("Loading...");
                                options.getDataCollectionDescription(clientid, dc.DataCollectionCode, renderStoredProcedureDescription(datacollectionchildren));
                            }
                        });
                    }
                }
            }
        }

        // Takes the data collection description output and a root element, and populates it with the description
        var renderTableDescription = function(parentElement){
            return function(data){

                parentElement.empty();

                let columns = $("<div>");
                columns.text("Columns");
                columns.addClass("treeitem folder");
                let columnChildren = $("<div>");
                columnChildren.addClass("treechildren");
                columnChildren.css("display", "none");
                columns.click(function(){
                    columnChildren.toggle();
                });

                for(var x in data.Definition.Columns){
                    let col = data.Definition.Columns[x];

                    let colDiv = $("<div>");
                    colDiv.addClass("treeitem column");
                    colDiv.text(col.DisplayName + " (" + col.DataType + ")" + (col.IsId?" ID":""));
                    columnChildren.append(colDiv);
                }

                parentElement.append(columns);
                parentElement.append(columnChildren);
            }
        }

        // Takes the data collection description output and a root element and populates a stored procedure's details
        var renderStoredProcedureDescription = function(parentElement){

        }

        // Add a tree root for each client
        for(let x in options.clients){
            let client = $("<div>");
            client.text(options.clients[x]);
            client.addClass("treeitem db");
            let clientChildren = $("<div>");
            clientChildren.addClass("treechildren");

            client.click(function(){
                clientChildren.toggle();
            })

            this.append(client);
            this.append(clientChildren);

            // Add the root folders
            let dc = $("<div>");
            dc.addClass("treeitem folder");
            dc.text("Data Collections");
            clientChildren.append(dc);
            let dcChildren = $("<div>");
            dcChildren.addClass("treechildren");
            dc.click(function(){
                if(dcChildren.children().length>0){
                    dcChildren.toggle();
                }
                else{
                    // Use the function provided to get details of the client and add it to the tree
                    dcChildren.append("Loading...");
                    options.getDataCollections(options.clients[x], populateClient(options.clients[x], dcChildren));
                }
            });
            clientChildren.append(dcChildren);

            let lists = $("<div>");
            lists.addClass("treeitem folder");
            lists.text("Lists");
            clientChildren.append(lists);
        }

        return this;
    };
}(jQuery));