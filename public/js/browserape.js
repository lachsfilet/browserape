// Check dependencies

// jQuery
if (typeof $ === "undefined" && $.fn.jquery !== "1.11.1")
    throw new Error("Report editor requires jQuery version 1.11.1");

// jQuery UI
if (typeof jQuery.ui === "undefined") {
    throw new Error("Report editor requires jQuery UI");
}

window.browserape = {
    version: "0.0.1"
};
