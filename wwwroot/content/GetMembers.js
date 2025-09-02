(function () {
    console.log("GetMembers.js injected");

    // Example: select all span elements inside the group info
    const members = Array.from(document.querySelectorAll("._aigs span"))
        .map(el => el.textContent.trim())
        .filter(Boolean);

    console.log("Extracted members:", members);

    chrome.runtime.sendMessage({ type: "MEMBERS_RESULT", members: members });
})();
