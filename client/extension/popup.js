document.addEventListener("DOMContentLoaded", function() {
    chrome.storage.local.get(["orders"], function(result) {
        let orders = result.orders || [];
        let list = document.getElementById("orderList");
        orders.forEach(order => {
            let li = document.createElement("li");
            li.textContent = order;
            list.appendChild(li);
        });
    });
});
