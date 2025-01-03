import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';

const Invoice = () => {
  const [invoiceData, setInvoiceData] = useState({
    customerName: '',
    address: '',
    phone: '',
    pincode: '',
    village: '',
    city: '',
    district: '',
    state: '',
    orderNumber: '',
    invoiceNumber: '',
    orderDate: '',
    invoiceDate: '',
    productDescription: '',
    quantity: 0,
    price: 0,
    discount: 0,
    otherCharges: 0,
    sellerName: 'Rani Food',
    sellerAddress: '104, RC School street, Erasakkanyakkanur, Tamil Nadu',
    sellerPhone: '6381360779'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont('times', 'normal');
    doc.setFontSize(10);

    const price = parseFloat(invoiceData.price) || 0;
    const discount = parseFloat(invoiceData.discount) || 0;
    const otherCharges = parseFloat(invoiceData.otherCharges) || 0;
    const grossAmount = price * invoiceData.quantity;
    const totalPrice = grossAmount - discount + otherCharges;

    // Outer Box Layout
    doc.rect(10, 10, 190, 280);

    // Customer Address (Left) and Logo (Right)
    doc.rect(10, 10, 190, 60);
    doc.line(130, 10, 130, 70); // Vertical line for split

    // Customer Address (Left 70%)
    doc.text('Customer Address:', 15, 15);
    doc.text(invoiceData.customerName, 15, 20);
    doc.text(invoiceData.address, 15, 25);
    doc.text(`Phone: ${invoiceData.phone}`, 15, 30);
    doc.text(`Pincode: ${invoiceData.pincode}`, 15, 35);
    doc.text(`Village: ${invoiceData.village}`, 15, 40);
    doc.text(`City: ${invoiceData.city}`, 15, 45);
    doc.text(`District: ${invoiceData.district}`, 15, 50);
    doc.text(`State: ${invoiceData.state}`, 15, 55);

    // Add Logo and QR Code (Right 30%)
    const logo = new Image();
    logo.src = 'logo.png'; // Path relative to public folder
    const qrCode = new Image();
    qrCode.src = 'qr.JPG'; // Path relative to public folder

    logo.onload = () => {
      doc.addImage(logo, 'PNG', 135, 15, 25, 25);
      qrCode.onload = () => {
        doc.addImage(qrCode, 'JPG', 165, 15, 25, 25);

        // Bill To / Ship To and Sold By Sections with separation
        doc.rect(10, 75, 190, 40);
        doc.line(105, 75, 105, 115); // Vertical line separating sections

        // Bill To / Ship To (Left)
        doc.text('Bill To / Ship To:', 15, 85);
        doc.text(invoiceData.customerName, 15, 90);
        doc.text(invoiceData.address, 15, 95);
        doc.text(invoiceData.phone, 15, 100);

        // Sold By (Right)
        doc.text('Sold By:', 110, 85);
        doc.text(invoiceData.sellerName, 110, 90);
        doc.text(invoiceData.sellerAddress, 110, 95);
        doc.text(invoiceData.sellerPhone, 110, 100);

        // Product Details Footer
        doc.rect(10, 120, 190, 30);
        doc.text('Description', 15, 130);
        doc.text('Qty', 75, 130);
        doc.text('Gross Amount', 105, 130);
        doc.text('Discount', 135, 130);
        doc.text('Total', 165, 130);

        doc.text(invoiceData.productDescription, 15, 140);
        doc.text(invoiceData.quantity.toString(), 75, 140);
        doc.text(`RS ${grossAmount.toFixed(2)}`, 105, 140);
        doc.text(`RS ${discount.toFixed(2)}`, 135, 140);
        doc.setFont('times', 'bold');
        doc.text(`RS ${totalPrice.toFixed(2)}`, 165, 140);

        // Footer Section
        doc.text(`Total Amount: RS ${totalPrice.toFixed(2)}`, 15, 160);
        doc.text('© Rani Foods 2025', 15, 170);

        // Payment Section
        doc.setFont('times', 'bold');
        doc.text('Please make the payment if pending.', 15, 185);

        // Add Payment Image
        const paymentImage = new Image();
        paymentImage.src = 'payupi.jpg'; // Path relative to src folder
        paymentImage.onload = () => {
          doc.addImage(paymentImage, 'JPG', 80, 170, 100, 105); // Image placement
          doc.save('invoice.pdf');
        };
      };
    };
  };
  return (
    <div className="container my-5">
     <div className="text-center mb-4">
        <img src="logo.png" alt="Rani Foods Logo" style={{ width: '100px' }} />
        <h2>Rani Foods Invoice Generator</h2>
      </div>
      <form>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Customer Name</label>
            <input type="text" name="customerName" value={invoiceData.customerName} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-6 mb-3">
            <label>Phone</label>
            <input type="text" name="phone" value={invoiceData.phone} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-6 mb-3">
            <label>Address</label>
            <textarea name="address" value={invoiceData.address} onChange={handleChange} className="form-control"></textarea>
          </div>
          <div className="col-md-3 mb-3">
            <label>Pincode</label>
            <input type="text" name="pincode" value={invoiceData.pincode} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-3 mb-3">
            <label>Village/Town</label>
            <input type="text" name="village" value={invoiceData.village} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-3 mb-3">
            <label>City</label>
            <input type="text" name="city" value={invoiceData.city} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-3 mb-3">
            <label>District</label>
            <input type="text" name="district" value={invoiceData.district} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-3 mb-3">
            <label>State</label>
            <input type="text" name="state" value={invoiceData.state} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-6 mb-3">
          <label>Product Description</label>
          <select name="productDescription" value={invoiceData.productDescription} onChange={handleChange} className="form-control">
            <option value="">Select Product</option>
            <option value="Nenthara Banana Powder 100g">Nenthara Banana Powder 100g</option>
            <option value="Aavaram Poo Powder 100g">Aavaram Poo Powder 100g</option>
            <option value="Tea Powder CTC 100g">Tea Powder CTC 100g</option>
            <option value="Tea Powder CTC 250g">Tea Powder CTC 250g</option>
            <option value="Tea Powder CTC 500g">Tea Powder CTC 500g</option>
            <option value="Nenthara Banana Powder 200g">Nenthara Banana Powder 200g</option>
            <option value="Nenthara Banana Powder 500g">Nenthara Banana Powder 500g</option>
            <option value="Nenthara Banana Powder 1kg">Nenthara Banana Powder 1kg</option>
          </select>
        </div>
          <div className="col-md-3 mb-3">
            <label>Quantity</label>
            <input type="number" name="quantity" value={invoiceData.quantity} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-3 mb-3">
            <label>Price</label>
            <input type="number" name="price" value={invoiceData.price} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-3 mb-3">
            <label>Discount</label>
            <input type="number" name="discount" value={invoiceData.discount} onChange={handleChange} className="form-control" />
          </div>
        </div>
        <button type="button" className="btn btn-primary w-100" onClick={generatePDF}>Generate Invoice</button>
      </form>
    </div>
  );
};

export default Invoice;
