window.browserape.server = {
    getObjects: function() {
        $.getJSON("objects", function(data) {
            if(!data.tables)
                return;
            
             $.each(data.tables, function() {
                var draggable = $('<li class="draggable-entity">'+this+'</li>');
                $("#tablelist").append(draggable);
                browserape.editor.addDraggable(draggable);
            });
        });
    }
};

$("#serverobjectpanel").accordion({
    collapsible: true,
    heightStyle: "fill"
});

$("#commandpanel").tabs({
    heightStyle: "fill"
});

$(document).ready(function() {
    browserape.server.getObjects();
});
