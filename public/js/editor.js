window.browserape.editor = {
    
        wrapText: function (event, ui) {
            ui.helper.css( {"width": "auto", "list-style": "none"});

            var editor = $("#editpad");
            editor.toggleClass("editpad-hover");
            var content = editor.contents();
            //console.debug(content);

            // Wrap all text nodes into <span class"text-editor-word"></span> tags
            var contentList = content.map(function () {
                return this.nodeType === Node.TEXT_NODE
                    ? $(this).text().split(/(?=\s)/)
                    : this;
            }).map(function (index, value) {
                return typeof value === "string" ?
                    '<span class="editpad-word">' + this + '</span>' :
                    this;
            }).get();

            var contentListPlaceholder = contentList.length > 0 ?  ['<span class="editpad-droppable">|</span>'] : [];
            $.each(contentList, function () {
                contentListPlaceholder.push(this);
                contentListPlaceholder.push('<span class="editpad-droppable">|</span>');
            });

            editor.empty();
            editor.append(contentListPlaceholder);

            //console.debug(contentList);
            //console.debug(contentListPlaceholder);
            
            var droppable = ".editpad-droppable";
            if ($(".editpad-droppable").length === 0)
                droppable = "#editpad";

            $(droppable).droppable({
                accept: ".draggable-entity",
                hoverClass: "editpad-droppable-hover",
                drop: browserape.editor.insertDroppedText,
                tolerance: "pointer"
            });
        },

        unwrapText: function () {
            var editpad = $("#editpad"); 
            editpad.find(".editpad-word").contents().unwrap();
            $(".editpad-droppable").remove();
            editpad.toggleClass("editpad-hover");
        },

        insertDroppedText: function(event, ui) {
            var element = ui.helper;
            var text = element.text();
            var target = $(this);
            if (this.id === "editpad")
                target.append(text);
            else
                target.after(text);
            target.droppable("destroy");
        },

        getCaretPosition: function () {
            //console.debug("document.selection: %s, window.getSelection: %s, textarea.selectionStart: %s", document.selection, window.getSelection, textarea.selectionStart);
            //console.debug(window.getSelection().getRangeAt(0));
            if (typeof window.getSelection == "undefined")
                return {
                    element: null,
                    position: -1
                };

            var selection = window.getSelection();
            if (selection.rangeCount <= 0) {
                console.debug("Range count: %d", selection.rangeCount);
                return {
                    element: selection.focusNode,
                    position: -1   
                };
            }

            var range = selection.getRangeAt(0);
            console.debug("Range start offset: %d", range.startOffset);
            return {
                element: range.startContainer,
                position: range.startOffset
            };
        }
};

$(".draggable-entity").draggable({
    appendTo: "body",
    containment: "body",
    cursor: "grab",
    cursorAt: { left: -20, top: -20 },
    helper: "clone",
    opacity: 0.4,
    revert: "invalid",
    start: browserape.editor.wrapText,
    stop: browserape.editor.unwrapText
});
