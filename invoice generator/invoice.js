// Get elements from the form
const invoiceForm = document.getElementById('invoiceForm');

// Add event listener for form submission
invoiceForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get form data
    const formData = new FormData(invoiceForm);
    
    // Generate random order number (you can customize this as needed)
    const orderNumber = generateOrderNumber();
    
    // Construct invoice data object
    const invoiceData = {
        customerName: formData.get('customerName'),
        customerAddress: formData.get('customerAddress'),
        orderNumber: orderNumber,
        orderDate: formData.get('orderDate'),
        items: getSelectedItems(formData.getAll('items[]')), // Convert to array of selected items
        quantity: parseInt(formData.get('quantity')),
        reverseCharge: formData.get('reverseCharge')
    };
    
    // Generate invoice HTML
    const invoiceHTML = generateInvoice(invoiceData);
    
    // Open a new window with the invoice content
    const newWindow = window.open('', '_blank');
    newWindow.document.open();
    newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invoice</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                }
                .invoice-box {
                    max-width: 800px;
                    margin: auto;
                    padding: 20px;
                    border: 1px solid #eee;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    font-size: 16px;
                    line-height: 24px;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .header img {
                    max-width: 150px;
                }
                .header .title-text {
                    text-align: right;
                }
                .information td {
                    padding: 10px 0;
                }
                .information strong {
                    display: block;
                    margin-bottom: 5px;
                }
                .heading {
                    background-color: #f2f2f2;
                    font-weight: bold;
                }
                .item {
                    background-color: #ffffff;
                }
                .item:last-child {
                    background-color: #f9f9f9;
                }
                .total {
                    background-color: #f2f2f2;
                    font-weight: bold;
                }
                .total td {
                    font-weight: bold;
                }
                .amount-in-words {
                    border-top: none;
                    border-bottom: none;
                    font-weight: bold;
                }
                .amount-in-words td {
                    border: none;
                }
                .new-row td {
                    border: none;
                    font-weight: bold;
                }
                .below-table {
                    padding-left: 40px;
                    text-align: left;
                }
                .information-table {
                    width: 100%;
                }
                .information-table td {
                    width: 50%;
                    vertical-align: top;
                }
                .invoice-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                .invoice-table th, .invoice-table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                .invoice-table th {
                    background-color: #f2f2f2;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="invoice-box">
                <div class="header">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Company Logo">
                    <div class="title-text">
                        <strong>Tax Invoice/Bill of Supply/Cash Memo</strong><br>
                        (Original for Recipient)
                    </div>
                </div>
                ${invoiceHTML}
                <div class="below-table">
                    Whether tax is payable under reverse charge - ${invoiceData.reverseCharge}
                </div>
            </div>
        </body>
        </html>
    `);
    newWindow.document.close();
});

// Function to generate random order number
function generateOrderNumber() {
    return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit random number
}

// Function to get selected items as an array
function getSelectedItems(selectedItems) {
    let items = [];
    selectedItems.forEach(item => {
        switch (item) {
            case 'SH-05-42':
                items.push('Varasiddhi Silks Men\'s Formal Shirt (SH-05-42)');
                break;
            case 'SH-05-40':
                items.push('Varasiddhi Silks Men\'s Formal Shirt (SH-05-40)');
                break;
            // Add more cases for additional products
        }
    });
    return items;
}

// Function to generate invoice HTML
function generateInvoice(data) {
    // Define your invoice HTML structure here based on the provided example
    const invoiceHTML = `
        <table cellpadding="0" cellspacing="0" class="information-table">
            <tr class="information">
                <td>
                    <strong>Sold By :</strong><br>
                    Varasiddhi Silk Exports<br>
                    75, 3rd Cross, Lalbagh Road<br>
                    BENGALURU, KARNATAKA, 560027<br>
                    IN<br>
                    PAN No: AACFV3325K<br>
                    GST Registration No: 29AACFV3325K1ZY
                </td>
                <td style="text-align: right;">
                    <strong>Billing Address :</strong><br>
                    ${data.customerName}<br>
                    ${data.customerAddress}<br>
                    State/UT Code: 29
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Order Number:</strong> ${data.orderNumber}<br>
                    <strong>Order Date:</strong> ${data.orderDate}
                </td>
                <td style="text-align: right;">
                    <strong>Shipping Address :</strong><br>
                    ${data.customerName}<br>
                    ${data.customerAddress}<br>
                    State/UT Code: 29
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <table class="invoice-table">
                        <thead>
                            <tr class="heading">
                                <th style="width: 5%;">Sl. No</th>
                                <th style="width: 45%;">Description</th>
                                <th style="width: 10%;">Unit Price</th>
                                <th style="width: 5%;">Qty</th>
                                <th style="width: 10%;">Net Amount</th>
                                <th style="width: 10%;">Tax Rate</th>
                                <th style="width: 10%;">Tax Type</th>
                                <th style="width: 10%;">Tax Amount</th>
                                <th style="width: 15%;">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generateInvoiceItems(data.items, data.quantity)}
                            <tr class="total">
                                <td colspan="7">TOTAL:</td>
                                <td>₹${calculateTax(data.quantity)}</td>
                                <td>₹${calculateTotal(data.quantity)}</td>
                            </tr>
                            <tr class="amount-in-words">
                                <td colspan="9">AMOUNT IN WORDS:<br> One Thousand One Hundred Ninety-Five Rupees Only</td>
                            </tr>
                            <tr class="additional-row">
                                <td colspan="8"></td>
                                <td colspan="1" style="text-align: right;">
                                    <div style="text-align: center; margin-top: 5px;">For Varasiddhi Silk Exports:</div>    
                                    <div style="border-bottom: 25px solid #efefef; width: 100px; margin: 0 auto;"></div>
                                    <div style="text-align: center; margin-top: 5px;">Authorized Signatory</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </table>
    `;
    
    return invoiceHTML;
}

// Function to generate invoice items HTML
function generateInvoiceItems(items, quantity) {
    let itemHTML = '';
    items.forEach((item, index) => {
        itemHTML += `
            <tr class="item">
                <td>${index + 1}</td>
                <td>${item}<br><br>Shipping Charges</td>
                <td>₹338.10<br><br>₹30.96</td>
                <td>${quantity}</td>
                <td>₹${(338.10 * quantity).toFixed(2)}<br><br>₹${(30.96 * quantity).toFixed(2)}</td>
                <td>2.5%<br>2.5%<br>2.5%<br>2.5%</td>
                <td>CGST<br>SGST<br>CGST<br>SGST</td>
                <td>₹${(13.45 * quantity).toFixed(2)}<br>₹${(13.45 * quantity).toFixed(2)}<br>₹${(0.77 * quantity).toFixed(2)}<br>₹${(0.77 * quantity).toFixed(2)}</td>
                <td>₹${(338.10 * quantity + 30.96 * quantity + 56.88).toFixed(2)}</td>
            </tr>
        `;
    });
    return itemHTML;
}

// Function to calculate tax
function calculateTax(quantity) {
    return (56.88 * quantity).toFixed(2); // Replace with your tax calculation logic if needed
}

// Function to calculate total amount
function calculateTotal(quantity) {
    return (1195.00 * quantity).toFixed(2); // Replace with your total amount calculation logic if needed
}
