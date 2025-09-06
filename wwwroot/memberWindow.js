window.openMemberWindow = function (member) {
    const win = window.open("", "_blank", "width=300,height=150");
    if (win) {
        win.document.write("<!DOCTYPE html><html><head><title>Member</title></head><body>");
        win.document.write("<h2 style='font-family: Arial; text-align: center; margin-top: 50px;'>Member: " + member + "</h2>");
        win.document.write("</body></html>");
        win.document.close();
        win.focus();
    } else {
        alert("Popup blocked! Please allow popups for this extension.");
    }
};
