import axios from 'axios';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';

const initPayment = async (payload: any) => {
  try {
    const data = {
      store_id: config.sslCommerz.storeID,
      store_passwd: config.sslCommerz.storePassword,
      total_amount: payload.total_amount,
      currency: 'BDT',
      tran_id: payload.tran_id, // use unique tran_id for each api call
      success_url: 'http://localhost:3000/success',
      fail_url: 'http://localhost:3000/fail',
      cancel_url: 'http://localhost:3000/cancel',
      ipn_url: 'http://localhost:3000/ipn',
      shipping_method: 'Courier',
      product_name: payload.product_name,
      product_category: payload.product_category,
      product_profile: 'N/A',
      cus_name: payload.cus_name,
      cus_email: payload.cus_email,
      cus_add1: payload.cus_add1,
      cus_add2: payload.cus_add2,
      cus_city: payload.cus_city,
      cus_state: payload.cus_state,
      cus_postcode: payload.cus_postcode,
      cus_country: payload.cus_country,
      cus_phone: payload.cus_phone,
      cus_fax: 'N/A',
      ship_name: payload.ship_name,
      ship_add1: payload.ship_add1,
      ship_add2: payload.ship_add2,
      ship_city: payload.ship_city,
      ship_state: payload.ship_state,
      ship_postcode: payload.ship_postcode,
      ship_country: payload.ship_country,
    };
    const response = await axios({
      method: 'POST',
      url: config.sslCommerz.sslPaymentUrl,
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log('Hit payment: ', response);
    return response.data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Payment error');
  }
};

const validate = async (data: any) => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${config.sslCommerz.sslValidationUrl}?val_id=${data.val_id}&store_id=${config.sslCommerz.storeID}&store_passwd=${config.sslCommerz.storePassword}&format=json`,
    });
    console.log('response: ', response);
    return response.data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Payment validation error');
  }
};

export const sslService = {
  initPayment,
  validate,
};
