import React from 'react'
import './style.css'

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          jwt: 'unknown',
        };
    }

    async componentDidMount() {
        const jwt = await sessionStorage.getItem('jwt');
        this.setState({jwt: JSON.parse(jwt)});
    }

    async logout() {
        await sessionStorage.removeItem('jwt');
        this.setState({jwt: null});
    }

    render() {
        return(
            <div>
                <div className='mobile-header'>
                    <div className='mobile-header-title'>غربالگری اولیه اتیسم</div>
                    <div className='mobile-header-topics'>
                        <div className='mobile-header-topic' onClick={() => window.location = '/'}>خانه</div>
                        <div className='mobile-header-topic top-title-selected' onClick={() => window.location = '/blog'}>درباره‌ی اتیسم</div>
                        {this.state.jwt === null && <div className='mobile-header-topic' onClick={() => window.location = '/login'}>ورود</div>}
                        {this.state.jwt !== null && <div className='mobile-header-topic' onClick={() => window.location = '/chat'}>گفتگوی آنلاین</div>}
                        {this.state.jwt !== null && <div className='mobile-header-topic' onClick={() => this.logout()}>خروج</div>}
                    </div>
                </div>

                <div className='mobile-text too-margin-top'>
                    سامانه ی هوشمند مقدماتی تشخیص اتیسم از مجموعه محصولات غربالک شرکت فناوران شناختی پارس میباشد که برای کمک به والدین و متخصصین در غربالگری اولیه اتیسم استفاده میشود. این سامانه حاصل بیش از 5 سال تحقیق توسط محققین این حوزه میباشد که قابلیت غربالگری اولیه با دقت بالایی را داراست. قابل ذکر است که سوالات این پرسشنامه توسط متخصصین باتجربه در حوزه تشخیص و درمان این نوع اختلالات تایید شده است. تا کنون چندین مقاله در مورد این سامانه در نشریات معتبر به چاپ رسیده است.
                    این سامانه ، یک پرسشنامه آن‌لاین در خصوص علایم مهم و اصلی اختلالات اتیسم است که والدین می‌توانند به‌راحتی به آن دسترسی داشته باشند و از آن استفاده کنند. نتایج این پرسشنامه می‌تواند به والدین هشدار اولیه‌ای را در خصوص احتمال ابتلای کودکشان به اتیسم دهد تا بتوانند برای انجام ارزیابی‌های دقیق‌تر به متخصص مراجعه کنند. لازم به ذکر است که تشخیص سامانه منوط به ورود صحیح اطلاعات توسط کاربران بوده و ورود هرگونه اطلاعات غلط یا عدم مطابق با واقع میتواند در نتیجه گیری سامانه تاثیر مستقیم داشته باشد. لذا کاربران باید با دقت کامل به پرکردن اطلاعات در سامانه بپردازند.
                </div>
            </div>
        );
    }
}

export default Blog