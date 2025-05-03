import { checkoutAction } from '@/lib/payments/actions';
import { Check } from 'lucide-react';
import { getStripePrices, getStripeProducts } from '@/lib/payments/stripe';
import { SubmitButton } from './submit-button';

// Prices are fresh for one hour max
export const revalidate = 3600;

export default async function PricingPage() {
  const [prices, products] = await Promise.all([
    getStripePrices(),
    getStripeProducts(),
  ]);

  const basicPlan = products.find((product) => product.name === 'Basic');
  const privatePilotPlan = products.find((product) => product.name === 'Private Pilot');
  const fighterPlan = products.find((product) => product.name === 'Fighter');
  const bomberPlan = products.find((product) => product.name === 'Bomber');
  const enterprisePlan = products.find((product) => product.name === 'Supporting The Mission');

  const basicPrice = prices.find((price) => price.productId === basicPlan?.id);
  const privatePilotPrice = prices.find((price) => price.productId === privatePilotPlan?.id);
  const fighterPrice = prices.find((price) => price.productId === fighterPlan?.id);
  const bomberPrice = prices.find((price) => price.productId === bomberPlan?.id);
  const enterprisePrice = prices.find((price) => price.productId === enterprisePlan?.id);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-8 max-w-xl mx-auto">
        <PricingCard
          name={basicPlan?.name || 'Basic'}
          price={basicPrice?.unitAmount || 800}
          interval={basicPrice?.interval || 'month'}
          trialDays={basicPrice?.trialPeriodDays || 7}
          features={[
            'Unlimited Usage',
            'Unlimited Workspace Members',
            'Email Support',
          ]}
          priceId={basicPrice?.id}
        />
        <PricingCard
          name={privatePilotPlan?.name || 'Private Pilot'}
          price={privatePilotPrice?.unitAmount || 1200}
          interval={privatePilotPrice?.interval || 'month'}
          trialDays={privatePilotPrice?.trialPeriodDays || 7}
          features={[
            'Everything in Basic, and:',
            'Early Access to New Features',
            '24/7 Support + Slack Access',
          ]}
          priceId={privatePilotPrice?.id}
        />
        <PricingCard
          name={fighterPlan?.name || 'Fighter'}
          price={fighterPrice?.unitAmount || 1200}
          interval={fighterPrice?.interval || 'month'}
          trialDays={fighterPrice?.trialPeriodDays || 7}
          features={[
            'Everything in Basic, and:',
            'Early Access to New Features',
            '24/7 Support + Slack Access',
          ]}
          priceId={fighterPrice?.id}
        />
        <PricingCard
          name={bomberPlan?.name || 'Bomber'}
          price={bomberPrice?.unitAmount || 1200}
          interval={bomberPrice?.interval || 'month'}
          trialDays={bomberPrice?.trialPeriodDays || 7}
          features={[
            'Everything in Basic, and:',
            'Early Access to New Features',
            '24/7 Support + Slack Access',
          ]}
          priceId={bomberPrice?.id}
        />
        <PricingCard
          name={enterprisePlan?.name || 'Supporting The Mission'}
          price={enterprisePrice?.unitAmount || 1200}
          interval={enterprisePrice?.interval || 'month'}
          trialDays={enterprisePrice?.trialPeriodDays || 7}
          features={[
            'Everything in Basic, and:',
            'Early Access to New Features',
            '24/7 Support + Slack Access',
          ]}
          priceId={enterprisePrice?.id}
        />
      </div>
    </main>
  );
}

function PricingCard({
  name,
  price,
  interval,
  trialDays,
  features,
  priceId,
}: {
  name: string;
  price: number;
  interval: string;
  trialDays: number;
  features: string[];
  priceId?: string;
}) {
  return (
    <div className="pt-6">
      <h2 className="text-2xl font-medium text-primary mb-2">{name}</h2>
      <p className="text-sm text-primary mb-4">
        with {trialDays} day free trial
      </p>
      <p className="text-4xl font-medium text-primary mb-6">
        ${price / 100}{' '}
        <span className="text-xl font-normal text-primary">
          per user / {interval}
        </span>
      </p>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-chart-2 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-primary">{feature}</span>
          </li>
        ))}
      </ul>
      <form action={checkoutAction}>
        <input type="hidden" name="priceId" value={priceId} />
        <SubmitButton />
      </form>
    </div>
  );
}
