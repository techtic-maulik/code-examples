
import { ConfigService } from './config.service';
const stripe_key = ConfigService.get('STRIPE_SECRET_KEY');
export const stripe = require('stripe')(stripe_key);
const paypal_mode = ConfigService.get('PAYPAL_MODE');
const paypal_client_id = ConfigService.get('PAYPAL_CLIENT_ID');
const paypal_client_secret = ConfigService.get('PAYPAL_CLIENT_SECRET');

export const paypal = require('paypal-rest-sdk');
paypal.configure({
	'mode': paypal_mode, //sandbox or live
	'client_id': paypal_client_id,
	'client_secret': paypal_client_secret
});
