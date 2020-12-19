(function($){
    $.fn.TableDataCollectionView = function(options){
        let menu = $("<div>");
        menu.addClass("tabstrip");

        this.append(menu);
        return this;
    };
}(jQuery));