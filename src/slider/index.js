import React from 'react'
import './style.css'
import brainImage from './images/brain.png'
import helpImage from './images/help.png'
import findImage from './images/find.png'

class Slider extends React.Component {
    render() {
        return(
            <div>
                <div className="slider">
                    <svg viewBox="0 0 500 105" preserveAspectRatio="none" className="shape">
                        <polygon points="600 61.82 476.72 105 351 74.68 157 105 0 55.39 0 -87 600 -87 600 61.82" className="under-slider"/>
                    </svg>
                    <div className="title">غربالگری اولیه‌ی اوتیسم</div>
                    <div className="boxes">
                        <div className="slider-box box-one">
                            <img className='box-image' src={brainImage}/>
                            <div className='box-title'>تقویت مغز</div>
                            <div className='box-under-title'>یه متن کوچیک در مورد تقویت مغز و این چیزا متن کوچیک در مورد </div>
                        </div>
                        <div className="slider-box box-two">
                            <img className='box-image' src={helpImage}/>
                            <div className='box-title'>کمک جهانی</div>
                            <div className='box-under-title'>کمک جهانی رو اینجا توضیح بده مثلا بده جهانی رو اینجا توضیح بده</div>
                        </div>
                        <div className="slider-box box-three">
                            <img className='box-image' src={findImage}/>
                            <div className='box-title'>غربالگری اوتیسم</div>
                            <div className='box-under-title'> مورد غربالگری آنلاین حرف بزن و آنلاین حرف بزن و این چیزا رو تفت بده</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Slider