console.log("Interop script loaded");

window.registerMembersHandler = (dotnetHelper) => {
    chrome.runtime.onMessage.addListener((message) => {

        console.log("Received message:", message);

        if (message.type === "GROUP_MEMBERS") {
            dotnetHelper.invokeMethodAsync("OnMembersReceived", message.members);
        }
    });
};