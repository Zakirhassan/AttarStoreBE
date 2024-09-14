const paymentService = require('../services/paymentService');

const createOrder = async (req, res) => {
    try {
        const order = await paymentService.createOrder(req.body.amount);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Error creating order' });
    }
};

const getPaymentDetails = async (req, res) => {
    try {
        const paymentDetails = await paymentService.getPaymentDetails(req.params.paymentId);
        res.json(paymentDetails);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching payment details' });
    }
};

module.exports = { createOrder, getPaymentDetails };
