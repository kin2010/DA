import sgMail from '@sendgrid/mail';
import httpStatus from 'http-status';
import APIError from '../utils/APIError';
const nodemailer = require('nodemailer');
import configs from '../configs/appConfig';
import log from './logger';
import config from '../configs/appConfig';
const sendEmail = async (email: string, otp: number): Promise<void> => {
  const msg = {
    from: configs.sendGrid.email,
    to: email,
    templateId: configs.sendGrid.template,
    dynamic_template_data: { otp },
  };
  log.info(msg);
  sgMail.setApiKey(configs.sendGrid.key);

  try {
    await sgMail.send(msg);
  } catch (err) {
    log.info(err as string);
    throw new APIError({
      message: 'Error Send Email',
      status: httpStatus.FORBIDDEN,
    });
  }
};
export const sendMailNodeMaier = async (
  email: string,
  otp: number,
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    // config mail server
    service: 'Gmail',
    auth: {
      user: config.userNodemail,
      pass: config.passwordNodemail,
    },
  });
  const mainOptions = {
    // thiết lập đối tượng, nội dung gửi mail
    from: 'Website mỹ phẩm ',
    to: email,
    subject: 'Thanks For Choosing Us',
    text: 'You recieved message from ',
    html: `
    <!DOCTYPE html>
<html>
  <head>
    
   
    <style>
    .wrap{
      padding:30px;
      max-width: 900px;
      border:10px solid pink;
    }
    h1{
      text-align: center;
    }
    img{
      display:block;
      margin:0 auto;
    }
      h2{
        color:pink;
      }
      p{
        color: pink;
      }
       h3{
      border:3px solid pink;
      width:fit-content;
      padding:10px 15px;
      margin:0 auto;
    }
    .otp{
      color:green;
      font-size: 30px;
    }
    </style>
  </head>
  <body>
    <div class='wrap'>
      <h1>Thanks You !</h1>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqFv-L7kcWafx-hmaN-EkU-bI-rGYl6fAKq2s04nmRKREUXci_zvw_XoszuGuwxAs75mE&usqp=CAU'alt='noimg'/>
      <h2> Cảm ơn <i>${email}</i> đã sử dụng dịch vụ của chúng tôi </h2>
     <p>Đây là mã <strong>OTP</strong> để bạn truy cập website:</p> 
      <hr/>
      <h3><span class='otp'>${otp}</span></h3>
    </div>
     
  </body>
</html>
    `,
  };
  try {
    await transporter.sendMail(mainOptions, (error: any) => {
      if (error) {
        log.info(error);
        throw new APIError({
          message: 'Error Send Email',
          status: httpStatus.FORBIDDEN,
        });
      } else {
        log.info('send successfully');
      }
    });
  } catch (error) {
    throw new APIError({
      message: 'Error Send Email',
      status: httpStatus.FORBIDDEN,
    });
  }
};

export default sendEmail;
