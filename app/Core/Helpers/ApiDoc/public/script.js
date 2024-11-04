const detailChange = (key) => {
    // Toggle display for the left column
    $('div[data-testid="two-column-left"]').each(function () {
        if ($(this).css("display") === "none") {
            $(this).css({
                display: "block",
            });
        } else {
            $(this).css({
                display: "none",
            });
        }
    });

    // Toggle styles for the right column
    $('div[data-testid="two-column-right"]').each(function () {
        if ($(this).css("max-width") === "500px") {
            $(this).css({
                width: "100%",
                margin: "0px",
                maxWidth: "100%",
            });
        } else {
            $(this).css({
                width: "40%",
                marginLeft: "64px",
                maxWidth: "500px",
            });
        }
    });
};

const addChangeDetailButton = () => {
    const h1 = $("h1").html();
    $("h1").html(
        h1 +
            '<br/> <button onclick="detailChange()" type="button" class="sl-button sl-form-group-border sl-h-sm sl-text-base sl-font-medium sl-px-1.5 sl-bg-primary hover:sl-bg-primary-dark active:sl-bg-primary-darker disabled:sl-bg-canvas-100 sl-text-on-primary disabled:sl-text-body sl-rounded sl-border-transparent sl-border disabled:sl-opacity-70">Change Detail</button>'
    );
};

async function setup(configJ) {
    docContainer.innerHTML = `<elements-api  data-theme='dark' apidescriptiondocument='${JSON.stringify(
        configJ
    )
        .replaceAll('"', "&quot;")
        .replaceAll(
            "'",
            "&#39;"
        )}' layout="sidebar" router="hash"></elements-api>`;

    const stopligtScript = document.createElement("script");
    stopligtScript.setAttribute("src", "/api/doc/assets/stoplight.min.js");
    document.head.appendChild(stopligtScript);

    const jqueryScript = document.createElement("script");
    jqueryScript.setAttribute("src", "/api/doc/assets/jquery.min.js");
    document.head.appendChild(jqueryScript);

    const searchString = document.createElement("script");
    searchString.setAttribute("src", "/api/doc/assets/sl-search.js");
    document.head.appendChild(searchString);

    setTimeout(() => {
        document.getElementById("loader").remove();
        document.getElementById("docContainer").style.display = "block";
    }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
    const currentURL = window.location.href;
    const key = currentURL.split("/api/doc/")[1].split("#/")[0];
    const navbarItems = document.querySelectorAll(".navbar__item");
    navbarItems.forEach((item) => {
        if (item.getAttribute("data-key") === key) {
            item.classList.add("active");
        }
    });
});

window.onhashchange = function () {
    // URL has changed, append the button to <h1>
    addChangeDetailButton();
};
