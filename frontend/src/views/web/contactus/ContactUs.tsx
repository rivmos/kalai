import React from 'react'
import ContactForm from './ContactForm'

const ContactUs = () => {
  return (
    <div className='bg-indigo-50'>
      <div className='container mx-auto py-12 lg:!py-24'>
        <h2 className="text-3xl font-bold uppercase text-center tracking-tight text-gray-700 sm:text-4xl">Get in touch</h2>
        <p className='text-center mt-2 mb-8 text-base w-1/2 mx-auto'>Please feel free to get in touch with us via any convenient means (phone, whatsapp, email, submit a contact form). We will be glad to answer your questions as soon as possible.</p>
        <div className="bg-contactImage bg-center bg-contain bg-no-repeat lg:bg-left flex justify-center lg:justify-end py-12 lg:py-0">
          <ContactForm className='p-4 lg:px-20 lg:py-20 bg-white rounded-xl lg:rounded-l-[15%] w-[280px] lg:w-[700px] space-y-6' />
        </div>
      </div>
    </div>
  )
}

export default ContactUs