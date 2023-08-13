import React from "react"
// hooks
import useTranslate from "hooks/useTranslate"
// apis
import { useCreationStepThreeMutation } from "store/api/auth/companyApi"
// components
import { Icon as Iconify } from "@iconify/react"
import MotionContainer from "components/animate/MotionContainer"
import Button from "components/Button"
import { fCurrency } from "utils/formatNumber"

interface SubscriptionProps {
  handleNext: (plan: number) => void
}

export default function Subscription({ handleNext }: SubscriptionProps) {
  const { t } = useTranslate()
  const [creationStepThree, { isLoading }] = useCreationStepThreeMutation()

  const handleSubscription = (tier: 0 | 1 | 2 | 3) => {
    creationStepThree({ tier })
    handleNext(tier)
  }

  return (
    <>
      <MotionContainer>
        <div className='container relative mx-auto flex h-full flex-col items-center justify-center gap-5 rounded-xl  px-5 py-10 shadow-md sm:px-16 md:px-20'>
          <div className='flex h-full w-full flex-col items-center gap-6'>
            <h1 className='text-3xl font-semibold'>{t("Select Subscription")}</h1>
            <p className='text-center text-gray-600 dark:text-gray-300'>
              {t("Choose the perfect plan for your needs")}
            </p>
            <div className='flex items-center justify-between'>
              <MotionContainer>
                <div
                  className='grid grid-cols-1 items-center justify-around divide-x divide-y divide-dashed divide-gray-400 overflow-hidden rounded border border-dashed rtl:divide-x-reverse
                lg:grid-cols-2'
                >
                  <div className='flex h-full flex-col p-10 transition-all'>
                    <div className='mb-3 flex items-center gap-2'>
                      <Iconify
                        className='text-primary-600 dark:text-primary-400'
                        icon='bi:lightning-charge-fill'
                        height={20}
                      />
                      <h3 className='text-3xl font-semibold'>{t("Free")}</h3>
                    </div>
                    <p className='mb-10 flex-1 leading-loose text-gray-600 dark:text-gray-300'>
                      {t(
                        "Perfect for freelancers, Businessmen who want to take their work to the next level"
                      )}
                    </p>
                    <h3 className='mb-10 text-5xl'>
                      {fCurrency(0)}
                      <span className='text-2xl text-gray-400'>Da</span>
                      <span className='text-sm text-gray-600 dark:text-gray-300'>
                        {" "}
                        {t("per month")}
                      </span>
                    </h3>
                    <h6 className='mb-2 font-semibold'>{t("Free includes")}: </h6>
                    <ul className='mb-10 flex flex-1 flex-col justify-center gap-3'>
                      <li className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                        <div>
                          <Iconify
                            icon='ph:check-circle-fill'
                            height={20}
                            className='text-primary-900 dark:text-primary-400'
                          />
                        </div>{" "}
                        {t("Up to")} 2 {t("Users")}
                      </li>
                      <li className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                        <div>
                          <Iconify
                            icon='ph:check-circle-fill'
                            height={20}
                            className='text-primary-900 dark:text-primary-400'
                          />
                        </div>{" "}
                        {t("Up to")} 100 {t("Contacts/Leads")}
                      </li>
                      <li className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                        <div>
                          <Iconify
                            icon='ph:check-circle-fill'
                            height={20}
                            className='text-primary-900 dark:text-primary-400'
                          />
                        </div>{" "}
                        {t("Up to")} 4 {t("Users Segments")}
                      </li>
                    </ul>
                    <Button loading={isLoading} onClick={() => handleSubscription(0)}>
                      {t("Get Started with Free")}
                    </Button>
                  </div>
                  <div className='flex flex-col  p-10 transition-all duration-500'>
                    <div className='mb-3 flex items-center gap-2'>
                      <Iconify
                        className='text-secondary-600 dark:text-secondary-400'
                        icon='material-symbols:star-rounded'
                        height={24}
                      />
                      <h3 className='text-3xl font-semibold'>{t("Professional")}</h3>
                    </div>
                    <p className='mb-10 flex-1 leading-loose text-gray-600 dark:text-gray-300'>
                      {t(
                        "Perfect for startups, Helps them get started, Manage their investment funds and get more leads"
                      )}
                    </p>
                    <h3 className='mb-10 text-5xl'>
                      {fCurrency(5000)}
                      <span className='text-2xl text-gray-400'>Da</span>
                      <span className='text-sm text-gray-600 dark:text-gray-300'>
                        {" "}
                        {t("per month")}
                      </span>
                    </h3>
                    <h6 className='mb-2 font-semibold'>{t("Professional includes")}: </h6>
                    <ul className='mb-10 flex flex-1 flex-col justify-center gap-3'>
                      <li className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                        <div>
                          <Iconify
                            icon='ph:check-circle-fill'
                            height={20}
                            className='text-secondary-900 dark:text-secondary-400'
                          />
                        </div>{" "}
                        {t("Up to")} 5 {t("Users")}
                      </li>
                      <li className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                        <div>
                          <Iconify
                            icon='ph:check-circle-fill'
                            height={20}
                            className='text-secondary-900 dark:text-secondary-400'
                          />
                        </div>{" "}
                        {t("Up to")} 300 {t("Contacts/Leads")}
                      </li>
                      <li className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                        <div>
                          <Iconify
                            icon='ph:check-circle-fill'
                            height={20}
                            className='text-secondary-900 dark:text-secondary-400'
                          />
                        </div>{" "}
                        {t("Up to")} 20 {t("Users Segments")}
                      </li>
                    </ul>
                    <Button loading={isLoading} onClick={() => handleSubscription(1)}>
                      {t("Start Free Trail")}
                    </Button>
                  </div>
                  <div className='flex h-full flex-col  p-10 transition-all duration-500'>
                    <div className='flex items-center gap-2'>
                      <Iconify
                        className='text-primary-600 dark:text-primary-400'
                        icon='ri:vip-diamond-fill'
                        height={20}
                      />
                      <h3 className='text-3xl font-semibold'>{t("Enterprise")}</h3>
                    </div>{" "}
                    <p className='mb-10 flex-1 leading-loose text-gray-600 dark:text-gray-300'>
                      {t(
                        "Perfect for established companies who are using paper and want to digitize their workflow"
                      )}
                    </p>
                    <h3 className='mb-10 text-5xl'>
                      {fCurrency(15000)}
                      <span className='text-2xl text-gray-400'>Da</span>
                      <span className='text-sm text-gray-600 dark:text-gray-300'>
                        {" "}
                        {t("per month")}
                      </span>
                    </h3>
                    <h6 className='mb-2 font-semibold'>{t("Enterprise includes")}: </h6>
                    <ul className='mb-10 flex flex-1 flex-col justify-center gap-3'>
                      <li className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                        <div>
                          <Iconify
                            icon='ph:check-circle-fill'
                            height={20}
                            className='text-primary-900 dark:text-primary-400'
                          />
                        </div>{" "}
                        {t("Up to")} 12 {t("Users")}
                      </li>
                      <li className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                        <div>
                          <Iconify
                            icon='ph:check-circle-fill'
                            height={20}
                            className='text-primary-900 dark:text-primary-400'
                          />
                        </div>{" "}
                        {t("Up to")} 1000 {t("Contacts/Leads")}
                      </li>
                      <li className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                        <div>
                          <Iconify
                            icon='ph:check-circle-fill'
                            height={20}
                            className='text-primary-900 dark:text-primary-400'
                          />
                        </div>{" "}
                        {t("Up to")} 100 {t("Users Segments")}
                      </li>
                    </ul>
                    <Button loading={isLoading} onClick={() => handleSubscription(2)}>
                      {t("Start Free Trail")}
                    </Button>
                  </div>
                  <div className='flex h-full flex-col  p-10 transition-all duration-500'>
                    <div className='flex items-center gap-2'>
                      <Iconify
                        className='text-secondary-600 dark:text-secondary-400'
                        icon='fa6-solid:crown'
                        height={20}
                      />
                      <h3 className='text-3xl font-semibold'>{t("Partner")}</h3>
                    </div>{" "}
                    <p className='mb-10 flex-1 leading-loose text-gray-600 dark:text-gray-300'>
                      {t(
                        "Get the most by becoming a partner and access everything we have to offer."
                      )}
                    </p>
                    <h3 className='mb-10 text-5xl'>
                      {fCurrency(30000)}
                      <span className='text-2xl text-gray-400'>Da</span>
                      <span className='text-sm text-gray-600 dark:text-gray-300'>
                        {" "}
                        {t("per month")}
                      </span>
                    </h3>
                    <h6 className='mb-2 font-semibold'>{t("Enterprise includes")}: </h6>
                    <ul className='mb-10 flex flex-1 flex-col justify-center gap-3'>
                      <li className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                        <div>
                          <Iconify
                            icon='ph:check-circle-fill'
                            height={20}
                            className='text-secondary-900 dark:text-secondary-400'
                          />
                        </div>{" "}
                        {t("Up to")} 50 {t("Users")}
                      </li>
                      <li className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                        <div>
                          <Iconify
                            icon='ph:check-circle-fill'
                            height={20}
                            className='text-secondary-900 dark:text-secondary-400'
                          />
                        </div>{" "}
                        {t("Up to")} 5000 {t("Contacts/Leads")}
                      </li>
                      <li className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                        <div>
                          <Iconify
                            icon='ph:check-circle-fill'
                            height={20}
                            className='text-secondary-900 dark:text-secondary-400'
                          />
                        </div>{" "}
                        {t("Up to")} 200 {t("Users Segments")}
                      </li>
                    </ul>
                    <Button loading={isLoading} onClick={() => handleSubscription(3)}>
                      {t("Start Free Trail")}
                    </Button>
                  </div>
                </div>
              </MotionContainer>
            </div>
            <p className='whitespace-pre-line text-center text-sm text-gray-600 dark:text-gray-300'>
              {t(
                "We are pleased to offer you a complimentary 30-day trial period, during which you can explore the features and benefits of our subscription service without any obligation."
              )}{" "}
              {t(
                "Our subscription plans operate on an annual billing cycle and are automatically renewed between 20 to 5 days prior to the conclusion of the current subscription term. This seamless renewal process ensures uninterrupted access to our premium offerings."
              )}
              {t(
                "We value your experience and look forward to assisting you in making an informed decision about selecting the subscription that best aligns with your needs."
              )}
            </p>
          </div>
        </div>
      </MotionContainer>
    </>
  )
}
