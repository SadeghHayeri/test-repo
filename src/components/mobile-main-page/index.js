import React from 'react'
import './style.css'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import sliderImage from './images/slider.jpg'
import Button from "@material-ui/core/Button";

class MobileMainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return(
            <div className={'mobile-info'} ref={this.targetRef} id={'main'}>
                <div className='mobile-header'>غربالگری اولیه اتیسم</div>
                <img src={sliderImage} className='slider-image'/>

                <div className='mobile-text'>
                    سامانه ی هوشمند مقدماتی تشخیص اتیسم از مجموعه محصولات غربالک شرکت فناوران شناختی پارس میباشد که برای کمک به والدین و متخصصین در غربالگری اولیه اتیسم استفاده میشود. این سامانه حاصل بیش از 5 سال تحقیق توسط محققین این حوزه میباشد که قابلیت غربالگری اولیه با دقت بالایی را داراست. قابل ذکر است که سوالات این پرسشنامه توسط متخصصین باتجربه در حوزه تشخیص و درمان این نوع اختلالات تایید شده است. تا کنون چندین مقاله در مورد این سامانه در نشریات معتبر به چاپ رسیده است.
                    این سامانه ، یک پرسشنامه آن‌لاین در خصوص علایم مهم و اصلی اختلالات اتیسم است که والدین می‌توانند به‌راحتی به آن دسترسی داشته باشند و از آن استفاده کنند. نتایج این پرسشنامه می‌تواند به والدین هشدار اولیه‌ای را در خصوص احتمال ابتلای کودکشان به اتیسم دهد تا بتوانند برای انجام ارزیابی‌های دقیق‌تر به متخصص مراجعه کنند. لازم به ذکر است که تشخیص سامانه منوط به ورود صحیح اطلاعات توسط کاربران بوده و ورود هرگونه اطلاعات غلط یا عدم مطابق با واقع میتواند در نتیجه گیری سامانه تاثیر مستقیم داشته باشد. لذا کاربران باید با دقت کامل به پرکردن اطلاعات در سامانه بپردازند.
                </div>

                <Button className='info-button' variant="contained" color="primary" href='/test'>برای تست آنلاین اینجا کلیک کنید</Button>
                <Button className='info-button' variant="contained" color="primary" href={'/chat'}>برای گفتگوی آنلاین اینجا کلیک کنید</Button>

                <div className='copy-right margin-top'>تمامی حقوق این وبسایت برای تمام کودکان اتیسم محفوظ می‌باشد و هرگونه‌ استفاده غیر تجاری برای کمک به این کودکان مجاز می‌باشد.</div>
            </div>
        );
    }
}

export default MobileMainPage