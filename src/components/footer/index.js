import React from 'react'
import './style.css'

import utLogo from './images/ut-logo.png'
import autismLogo from './images/a.png'

import bazaarDownload from './images/download.png'
import googleDownload from './images/download2.png'

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <footer>
                <div className='about-container'>
                    <div className='about'>
                        <div className='about-title'>غربالگری اولیه‌ی اتیسم - سامانه‌ی آنلاین غربالگری کودکان</div>
                        <div className='about-text'> به عنوان یکی از قدیمی‌ترین فروشگاه های اینترنتی با بیش از یک دهه تجربه، با پایبندی به سه اصل، پرداخت در محل، 7 روز ضمانت بازگشت کالا و تضمین اصل‌بودن کالا موفق شده تا همگام با فروشگاه‌های معتبر جهان، به بزرگ‌ترین فروشگاه اینترنتی ایران تبدیل شود. به محض ورود به سایت دیجی‌کالا با دنیایی از کالا رو به رو می‌شوید! هر آنچه که نیاز دارید و به ذهن شما خطور می‌کند در اینجا پیدا خواهید کرد.مشاهده بیشتر</div>
                    </div>
                    <div className='image-box'>
                        <img className='about-img' src={utLogo} />
                        <img className='about-img' src={autismLogo} />
                    </div>
                </div>
                <div className='about-line' />
                <div className='download'>
                    <div className='download-title'>می‌توانید برنامه کاربری غربالگری کودکان را از طریق لینک‌های مقابل دانلود کنید - در حال حاضر تنها برای گوشی‌ها با سیستم‌عامل اندروید قابل استفاده می‌باشد.</div>
                    <div>
                        <img className='download-img' src={bazaarDownload} />
                        <img className='download-img' src={googleDownload} />
                    </div>
                </div>
                <div className='copy-right'>تمامی حقوق این وبسایت برای تمام کودکان اتیسم محفوظ می‌باشد و هرگونه‌ استفاده غیر تجاری برای کمک به این کودکان مجاز می‌باشد.</div>
            </footer>
        );
    }
}

export default Footer