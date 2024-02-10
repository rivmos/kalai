import { Button, Input } from '@/components/ui'
import React from 'react'


const Newsletter = () => {
  return (
    <div className="relative isolate overflow-hidden bg-orange-200 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto container px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-gray-600 sm:text-4xl">Unlock a World of Artistic Wonder!</h2>
            <p className="mt-4 text-lg leading-8 text-gray-500">
            Enjoy subscriber-only promotions, discounts on artwork purchases, and early access to limited edition prints.

            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Enter your email"
              />
              <Button
                variant='solid'
                className="hover:!text-gray-900 rounded-md bg-orange-900"
              >
                Subscribe
              </Button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                {/* <CalendarDaysIcon className="h-6 w-6 text-white" aria-hidden="true" /> */}
              </div>
              <dt className="mt-4 font-semibold text-gray-700">New Artwork Releases</dt>
              <dd className="mt-2 leading-7 text-gray-600">
              Be among the first to view and purchase new pieces from emerging and established artists.

              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                {/* <HandRaisedIcon className="h-6 w-6 text-white" aria-hidden="true" /> */}
              </div>
              <dt className="mt-4 font-semibold text-gray-700">Exclusive Events</dt>
              <dd className="mt-2 leading-7 text-gray-600">
              Receive invitations to private viewings, art fairs, and exhibitions.

              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-yellow-200 to-indigo-300 opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  
  )
}

export default Newsletter