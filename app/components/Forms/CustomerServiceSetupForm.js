

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
export default function CustomerServiceSetupForm({ setBasicFormData, basicFormData, }) {
  const [urls, setUrls] = useState(basicFormData?.urls ?? [])
  const [formValues, setFormValues] = useState({
    enable_refund: basicFormData?.enable_refund ?? '',
    refund_friendliness: basicFormData?.refund_friendliness ?? '1',
    logo_upload: basicFormData?.logo_upload ?? '',
    faq_upload: basicFormData?.faq_upload ?? '',
    bot_name: basicFormData?.business_name ?? '',
    enable_cancellations: basicFormData?.enable_cancellations ?? false,
    cancellation_friendliness: basicFormData?.cancellation_friendliness ?? '1',
    email_ticketing_system: basicFormData?.email_ticketing_system ?? 'Other',
    ecommerce_platform: basicFormData?.ecommerce_platform ?? 'Other',
    payments_platform: basicFormData?.payments_platform ?? 'Other',
    refund_tolerance: false,
    payment_platform: basicFormData?.payment_platform ?? '',
    faq_url: basicFormData?.faq_url ?? '',
    help_center_url: basicFormData?.help_center_url ?? '',
    refund_return_url: basicFormData?.refund_return_url ?? '',
    membership_policy_url: basicFormData?.membership_policy_url ?? '',
    shipping_policy_url: basicFormData?.shipping_policy_url ?? '',
    other_url: basicFormData?.other_url ?? '',
  })
  const handleUrlValue = (e) => {
    const { value } = e.target;
    if (value.includes(' ') ||value.includes('.com') ) {
      const url_values = value.split(' ');
      setFormValues((prev) => {
        return {
          ...prev,
          faq_url: '',
        };
      });
      url_values.forEach((name) => {
        const trimmedUrl = name.trim();
        if (trimmedUrl && !urls.includes(trimmedUrl)) {
          setUrls((prev) => {
            setBasicFormData((prev_state) => {
              return {
                ...prev_state,
                urls: [...prev, trimmedUrl]
              }
            })
            return [...prev, trimmedUrl]
          });

        }
      });
    } else {
      setFormValues({ ...formValues, faq_url: value });
    }

  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const { value } = e.target;
      const url_values = value.split(' ');
      setFormValues((prev) => {
        return {
          ...prev,
          faq_url: '',
        };
      });
      url_values.forEach((name) => {
        const trimmedUrl = name.trim();
        if (trimmedUrl && !urls.includes(trimmedUrl)) {
          setUrls((prev) => {
            setBasicFormData((prev_state) => {
              return {
                ...prev_state,
                urls: [...prev, trimmedUrl]
              }
            })
            return [...prev, trimmedUrl]
          });
        }
      });
    }
  }
  // Get title
  const RemoveUrls = (element) => {
    const updatedChips = urls.filter((x) => x !== element);
    setUrls(updatedChips);
    setBasicFormData((prev_state) => {
      return {
        ...prev_state,
        urls: [...updatedChips]
      }
    })
  }
  return (
    <div className="w-full">
      <div className="">
        <div className="grid grid-cols-1  my-4 gap-4">
          <div className='my-2'>
            <div className={`inline`}>
              <label htmlFor={"agent_name"} className="block text-sm font-medium text-heading"><span className='flex items-center gap-2'>Add your Help Center or FAQ URL
              </span></label>
              <div className='flex flex-wrap justify-start items-center border h-auto w-auto border-border p-1 rounded-md mt-2'>
                <div className='flex flex-wrap items-center justify-start gap-1'>
                  {urls.length > 0 && urls.map((element, key) =>
                    <div
                      className="[word-wrap: break-word]   flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] key  px-[10px] py-0 text-[13px] font-normal normal-case leading-loose text-heading shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1]  border border-border" key={key}>
                      {element.trim()}
                      <XMarkIcon className=" h-4 w-4 cursor-pointer " onClick={(e) => { RemoveUrls(element) }} />
                    </div>
                  )}
                </div>
                <input onKeyDown={handleKeyDown} value={formValues.faq_url} required onChange={handleUrlValue} type={"text"} placeholder={urls.length>0 ?'Add another url':"Add your Help Center or FAQ URL"} className={` block  px-3 py-2 bg-white  rounded-md  text-sm placeholder-slate-400   placeholder-slate-400  focus:outline-none border  disabled:bg-slate-50 disabled:text-slate-500  w-auto  border-none ring-0 focus:border-none focus-visible:border-none`} id={"faq_url"} name={"faq_url"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}