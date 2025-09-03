(function () {

    console.log("################## GetMembers.js injected");

    // DOM selection examples: document.querySelectorAll("._aigs span") or "._aig-" or ".x12lumcd"
    /*
    const members = Array.from(document.querySelectorAll(".x12lumcd"))
        .map(el => el.textContent.trim())
        .filter(Boolean);
    */

    const members = [];
    const groupName = document.querySelector("header span[title]")?.getAttribute("title") || "Unknown Group";

    // find all visible member entries in the side modal
    const items = document.querySelectorAll("div[role='button'] span[title]");

    items.forEach(el => {
        const name = el.getAttribute("title");
        if (name && name !== groupName) { // skip the group name itself
            members.push([groupName, name]);
        }
    });

    console.log("Extracted members:", members);

    chrome.runtime.sendMessage({ type: "MEMBERS_RESULT", members: members });
})();
