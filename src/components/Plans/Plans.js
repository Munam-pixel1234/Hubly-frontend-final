import React from 'react';
import PlanCard from '../PlanCard/PlanCard';
import styles from './Plans.module.css';


export default function Plans(){
return (
<section className={styles.plans}>
<div className={styles.container}>
<h2>We have plans for everyone!</h2>
<p className={styles.lead}>We started with a strong foundation, then simply built all of the sales and <br/>marketing tools ALL businesses need under one platform.</p>
<div className={styles.grid}>
<PlanCard title="Starter" price="$199" features={["Unlimited Users","GMB Messaging","Reputation Management","GMB Call Tracking","24/7 Award Winning Support"]} />
<PlanCard title="Grow" price="$399" features={["Pipeline Management","Marketing Automation Campaigns","Live Call Transfer","GMB Messaging","Embed-able Form Builder","Reputation Management","24/7 Award Winning Support"]} />
</div>
</div>
</section>
);
}