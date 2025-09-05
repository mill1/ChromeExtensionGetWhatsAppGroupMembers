(function () {
    console.log("################## GetMembers.js injected");

    const headerTitle = document.querySelector("header span[title]")?.getAttribute("title") || "";
    let members = [];

    if (headerTitle.includes(",")) {
        // Case: header shows participants instead of a group name
        members = headerTitle.split(",").map(m => m.trim());
    } else {
        // Case: header is an actual group name -> scrape from sidebar
        const sidebar = document.querySelector('div[role="dialog"], aside[role="presentation"]');
        if (sidebar) {
            members = [...sidebar.querySelectorAll('span[dir="auto"][title]')]
                .map(el => el.getAttribute("title"))
                .filter(name =>
                    name &&
                    name !== headerTitle &&
                    !name.toLowerCase().includes("aan het typen")
                );
        }
    }

    console.log("Extracted members:", members);
    chrome.runtime.sendMessage({ type: "MEMBERS_RESULT", members });
})();
