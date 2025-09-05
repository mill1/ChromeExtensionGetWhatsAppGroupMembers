console.log("Interop script loaded");

window.registerMembersHandler = (dotnetHelper) => {
    chrome.runtime.onMessage.addListener((message) => {

        console.log("Received message:", message);

        if (message.type === "MEMBERS_RESULT") {

            console.log("Invoking .NET method with members:", message.members);

            dotnetHelper.invokeMethodAsync("OnMembersReceived", message.members);
        }
    });
};