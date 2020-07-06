import React from 'react';
import _ from 'lodash'
import './style.less';
import { Link } from 'react-router-dom';


const WelcomePage = () => {
  return (
    <div className="page-welcome" >
      <img src="http://img.mp.itc.cn/upload/20170305/c8af2f3daa2943619ac59d91364f199a.jpg" alt="" />
      <br />
      <div className='title'>
        <Link to='Fuck' >goFuck</Link>
      </div>
    </div>
  )
};

export default WelcomePage;
