paypal.Buttons({
    createOrder: function(data, actions) {
        return fetch('/demo/checkout/api/paypal/order/create/', {
            method: 'post'
        }).then(function(res) {
            return res.json();
        }).then(function(orderData) {
            return orderData.id;
        });
    },
    onApprove: function(data, actions) {
        return fetch('/demo/checkout/api/paypal/order/' + data.orderID + '/capture/', {
            method: 'post'
        }).then(function(res) {
            return res.json();
        }).then(function(orderData) {
            // Handle transaction approval as before
            // ...

            // Close the payment overlay
            closePaymentOverlay();

            // Send order information to the server
            sendOrderToServer(orderData);

            // Redirect to thank you page
            actions.redirect('thank_you.html');
        });
    }
}).render('#paypal-button-container');

// Function to close the payment overlay
function closePaymentOverlay() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('online-payment-info').classList.add('hidden');
}

// Function to send order information to the server
function sendOrderToServer(orderData) {
    // Use fetch() or another AJAX method to send the order information to the server
    // Example:
    fetch('/admin/new_order', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    });
}
