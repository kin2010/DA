import httpStatus from 'http-status';
import APIError from './APIError';
import log from './logger';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const myPhone = process.env.MY_TWILIO_NUMBER;
const client = require('twilio')(accountSid, authToken);
export type TSendPhoneParams = {
  otp: string;
  phone: string;
};
export const sendPhone = async ({
  otp,
  phone,
}: TSendPhoneParams): Promise<void> => {
  try {
    await client.messages
      .create({
        body: `Đây là mã OTP của bạn ${otp}`,
        from: myPhone,
        to: `+84${phone}`,
      })
      .then((res: any) => log.info(res as string))
      .catch((err: any) => log.info(err as string));
  } catch (error) {
    throw new APIError({
      message: 'Error Send Phone ',
      status: httpStatus.BAD_REQUEST,
    });
  }
};
