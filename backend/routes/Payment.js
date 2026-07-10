const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// Check if Razorpay keys are configured
const isRazorpayConfigured = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET;

let razorpay = null;
if (isRazorpayConfigured) {
    try {
        const Razorpay = require('razorpay');
        razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        console.log('Razorpay SDK initialized successfully.');
    } catch (err) {
        console.error('Failed to load Razorpay SDK. Falling back to Simulation Mode.', err.message);
    }
} else {
    console.log('Razorpay keys not found. Running in Payment Simulation Mode.');
}

// 1. Create order endpoint
router.post('/orders', async (req, res) => {
    try {
        const { amount } = req.body; // Amount in INR
        if (!amount) {
            return res.status(400).json({ success: false, message: 'Amount is required' });
        }

        const amountInPaise = Math.round(amount * 100);

        if (isRazorpayConfigured && razorpay) {
            const options = {
                amount: amountInPaise,
                currency: 'INR',
                receipt: 'order_rcpt_' + Math.random().toString(36).substring(2, 7)
            };

            const order = await razorpay.orders.create(options);
            return res.json({
                success: true,
                orderId: order.id,
                amount: order.amount,
                currency: order.currency,
                keyId: process.env.RAZORPAY_KEY_ID,
                simulated: false
            });
        } else {
            // Simulated Payment Order Creation
            const simulatedOrderId = 'order_sim_' + Math.random().toString(36).substring(2, 15);
            return res.json({
                success: true,
                orderId: simulatedOrderId,
                amount: amountInPaise,
                currency: 'INR',
                keyId: 'rzp_test_simulated_key_12345',
                simulated: true
            });
        }
    } catch (error) {
        console.error('Error creating payment order:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
});

// 2. Verify payment signature
router.post('/verify', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, simulated } = req.body;

        if (simulated || !isRazorpayConfigured || !razorpay) {
            // Simulated Verification
            if (razorpay_order_id && razorpay_payment_id) {
                return res.json({
                    success: true,
                    message: 'Simulated payment verified successfully',
                    simulated: true
                });
            } else {
                return res.status(400).json({ success: false, message: 'Missing simulated credentials' });
            }
        }

        // Real Verification using SHA256 HMAC
        const text = razorpay_order_id + '|' + razorpay_payment_id;
        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(text)
            .digest('hex');

        if (generated_signature === razorpay_signature) {
            return res.json({
                success: true,
                message: 'Payment verified successfully',
                simulated: false
            });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid payment signature' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;
