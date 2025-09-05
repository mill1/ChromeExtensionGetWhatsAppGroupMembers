(function () {

    console.log("GetMembers,s called");

    let members = [];
    const selectedChat = document.querySelector('div[aria-selected="true"]');

    if (!selectedChat) {
        members = ["Please select a chat."];
        chrome.runtime.sendMessage({ type: "MEMBERS_RESULT", members });
        return;
    }

    const groupName = selectedChat.querySelector('span[title]').getAttribute('title');
    
    // What kind of chat is it?
    const headerTitle = document.querySelector("header span[title]")?.getAttribute("title") || "";

    if (headerTitle.includes(",")) {
        console.log("Group chat selected");

        // split participants
        members = headerTitle.split(",").map(m => m.trim());

        // prepend group name to the list
        if (groupName) {
            members.unshift(groupName);
        }
    }
    else {
        console.log("Single chat selected");                
        members = [groupName];
    }

    console.log("Extracted members:", members);

    function copyToClipboard(text) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        console.log("✅ Members copied to clipboard for your pasting pleasure.");
    }

    if (members.length > 0) {
        copyToClipboard(members.map(m => `"${m}"`).join("\n"));
    }

    chrome.runtime.sendMessage({ type: "MEMBERS_RESULT", members });
})();
