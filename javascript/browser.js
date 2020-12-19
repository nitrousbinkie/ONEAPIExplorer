$(function(){

    /*
     * How do we get the data collections for a given client id
     */
    var getDataCollections = function(clientid, callback){
        notification("Loading details for " + clientid + "...");
        $.get("mockdata/DataCollections.json", notifiedCallback("Loaded data collections for " + clientid + "!", callback));
    };

    /*
     * Get the definition of a data collection
     */
    var getDataCollectionDescription = function(clientid, datacollection, callback){
        notification("Loading " + datacollection + "...");
        $.get("mockdata/DataCollectionDescription.json", notifiedCallback(datacollection + " loaded!", callback));
    };

    /*
     * Get the lists for a given client
     */
    var getLists = function(clientid, callback){
        notification("Loading lists for " + clientid + "...");
        $.get("mockdata/Lists.json", notifiedCallback("Loaded lists for " + clientid + "!", callback));
    };

    /*
     * Add a notification to a callback
     */
    var notifiedCallback = function(message, callback){
        return function(data){
            notification(message);
            callback(data);
        }
    };

    /*
     * Display a self removing notification message
     */
    var notification = function(message){
        let notification = $("<div>");
        notification.addClass("notification");
        notification.text(message);
        $("#notifications").append(notification);
        setTimeout(function(){
            notification.animate({height:"0px"}, 250);
            notification.delay(250, function(){notification.remove();});
        }, 2000);
    };

    /*
     * Query a selected data collection
     */
    var showDataCollection = function(clientid, datacollection){
        notification("Querying " + datacollection + "...");
        let tab = $("<div>");
        tab.addClass("tab active");
        tab.text(datacollection);
        $(".tab").removeClass("active");
        $(".tabstrip").append(tab);
        tab.click(function(){
            selectTab(tab);
        });
    };

    var selectTab = function(tab){
        $(".tab").removeClass("active");
        tab.addClass("active");
    };

    /*
     * Populate the browser
     */
    $("#datacollections").DataCollectionTree({
        clients:["11008", "10132"],
        getDataCollections:getDataCollections,
        getDataCollectionDescription:getDataCollectionDescription,
        showDataCollection:showDataCollection,
        getLists:getLists
    });

});