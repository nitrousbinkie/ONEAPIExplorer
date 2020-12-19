$(function(){

    /*
     * How do we get the data collections for a given client id
     */
    var getDataCollections = function(clientid, callback){
        notification("Loading data collections for " + clientid);
        var notifiedCallback = function(callback){
            return function(data){
                notification("Loaded " + clientid);
                callback(data);
            }
        }
        $.get("mockdata/DataCollections.json", notifiedCallback(callback));
    }

    /*
     * Get the definition of a data collection
     */
    var getDataCollectionDescription = function(clientid, datacollection, callback){
        notification("Loading " + datacollection + "...");
        $.get("mockdata/DataCollectionDescription.json", function(data){
            notification(datacollection + " loaded!");
            callback(data);
        });
    }

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
    }

    /*
     * Query a selected data collection
     */
    var showDataCollection = function(clientid, datacollection){

    }

    /*
     * Populate the browser
     */
    $("#datacollections").DataCollectionTree({
        clients:["11008", "10132"],
        getDataCollections:getDataCollections,
        getDataCollectionDescription:getDataCollectionDescription
    });

})