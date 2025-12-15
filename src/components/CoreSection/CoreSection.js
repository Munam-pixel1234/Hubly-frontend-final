import React from 'react';
import styles from './CoreSection.module.css';


export default function CoreSection(){
return (
<section className={styles.core}>
<div className={styles.container}>
<div className={styles.textBlock}>
<h2>At its core, Hubly is a robust CRM <br/>solution.</h2>
<p>Hubly helps businesses streamline customer interactions, track leads, and automate tasks—<br/>saving you time and maximizing revenue. Whether you're a startup or an enterprise, Hubly <br/> adapts to your needs, giving you the tools to scale efficiently.</p>
</div>
<div className={styles.card}>
<div className={styles.cardLeft}>
<h3>MULTIPLE PLATFORMS TOGETHER!</h3>
<p>Email communication is a breeze with our fully integrated, drag & drop<br/> email builder.</p>
<h3>CLOSE</h3>
<p>Capture leads using our landing pages ,surveys,forms , calendars,inbound phone <br/>system & more! </p>
<h3>NATURE</h3>
<p>Capture leads using our landing pages,surveys,forms,calendars,inbound<br/>phone system & more!</p>
</div>
<div className={styles.cardRight}>
<img src="/assets/images/I7.png" alt="I7" />
 

</div>
</div>
</div>
</section>
);
}