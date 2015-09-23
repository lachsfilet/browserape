window.browserape.editor = {
    
        wrapText: function (event, ui) {
            var source = $(this);
            var dropvalue = source.data("dropvalue");
            var getter = softship.sapas.tariff[dropvalue.namespace][dropvalue.method];
            var text = getter(source);

            ui.helper.data("dropvalue", text);
            ui.helper.css("width", "auto");

            var editor = $("#formula-editor-pad");
            var content = editor.contents();
            //console.debug(content);

            // Wrap all text nodes into <span class"text-editor-word"></span> tags
            var contentList = content.map(function () {
                return this.nodeType === Node.TEXT_NODE
                    ? $(this).text().split(/(?=\s)/)
                    : this;
            }).map(function (index, value) {
                return typeof value === "string" ?
                    '<span class="text-editor-word">' + this + '</span>' :
                    this;
            }).get();

            var contentListPlaceholder = ['<span class="formula-editor-droppable">|</span>'];
            $.each(contentList, function () {
                contentListPlaceholder.push(this);
                contentListPlaceholder.push('<span class="formula-editor-droppable">|</span>');
            });

            editor.empty();
            editor.append(contentListPlaceholder);

            //console.debug(contentList);
            //console.debug(contentListPlaceholder);
            
            var droppable = ".formula-editor-droppable";
            if ($(".text-editor-word").length === 0)
                droppable = "#formula-editor-pad";

            $(droppable).droppable({
                accept: ".draggable",
                hoverClass: "formula-editor-droppable-hover",
                drop: window.softship.sapas.tariff.formulaEditor.insertDroppedText,
                tolerance: "pointer"
            });
        },

        unwrapText: function () {
            $("#formula-editor-pad").find(".text-editor-word").contents().unwrap();
            $(".formula-editor-droppable").remove();
        },

        insertDroppedText: function(event, ui) {
            var element = ui.helper;
            console.debug(element.data("dropvalue"));
            var text = element.data("dropvalue");
            var target = $(this);
            if (this.id === "formula-editor-pad")
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
